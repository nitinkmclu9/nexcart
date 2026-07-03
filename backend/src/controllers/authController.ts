import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { TransactionalEmailsClient } from '@getbrevo/brevo/transactionalEmails';
import User from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';
import { asyncHandler, AppError } from '../middleware/errorHandler';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const brevoClient = new TransactionalEmailsClient({
  apiKey: process.env.BREVO_API_KEY || ''
});

// Generate JWT Token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: (process.env.JWT_EXPIRE || '7d') as any
  });
};

// Send token response
const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + (parseInt(process.env.JWT_EXPIRE || '7') * 24 * 60 * 60 * 1000)
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError('User already exists', 400);
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  // Check if user is blocked
  if (user.isBlocked) {
    throw new AppError('Your account has been blocked', 403);
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Google OAuth login
// @route   POST /api/auth/google
// @access  Public
export const googleLogin = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { credential } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();
  if (!payload) {
    throw new AppError('Invalid Google token', 400);
  }

  const { email, name, picture } = payload;

  // Check if user exists
  let user = await User.findOne({ email });

  if (!user) {
    // Create new user
    user = await User.create({
      name: name || email?.split('@')[0],
      email: email!,
      password: Math.random().toString(36).slice(-8),
      avatar: picture || ''
    });
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?.id,
    { name, avatar },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Forgot password - send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError('Please provide an email address', 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('No account found with this email', 404);
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  user.resetPasswordOTP = otp;
  user.resetPasswordOTPExpiry = expiry;
  await user.save({ validateBeforeSave: false });

  try {
    await brevoClient.sendTransacEmail({
      sender: { email: process.env.BREVO_FROM_EMAIL || 'kaushal.pandey@thecodershub.co.in', name: 'NexCart' },
      to: [{ email, name: user.name }],
      subject: 'Password Reset OTP - NexCart',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #1E88E5;">NexCart - Password Reset</h2>
          <p>Hello ${user.name},</p>
          <p>Your OTP to reset your password is:</p>
          <div style="text-align: center; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1E88E5;">${otp}</span>
          </div>
          <p>This OTP is valid for <strong>10 minutes</strong>.</p>
          <p>If you did not request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p style="color: #888; font-size: 12px;">NexCart - Your Trusted E-Commerce Platform</p>
        </div>
      `
    });

    res.status(200).json({
      success: true,
      message: 'OTP sent to your email'
    });
  } catch (error) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError('Failed to send OTP. Please try again.', 500);
  }
});

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new AppError('Please provide email and OTP', 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('No account found with this email', 404);
  }

  if (!user.resetPasswordOTP || !user.resetPasswordOTPExpiry) {
    throw new AppError('No OTP requested. Please request a new one.', 400);
  }

  if (user.resetPasswordOTPExpiry < new Date()) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError('OTP has expired. Please request a new one.', 400);
  }

  if (user.resetPasswordOTP !== otp) {
    throw new AppError('Invalid OTP', 400);
  }

  res.status(200).json({
    success: true,
    message: 'OTP verified successfully'
  });
});

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    throw new AppError('Please provide email, OTP, and new password', 400);
  }

  if (newPassword.length < 6) {
    throw new AppError('Password must be at least 6 characters', 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('No account found with this email', 404);
  }

  if (!user.resetPasswordOTP || !user.resetPasswordOTPExpiry) {
    throw new AppError('No OTP requested. Please request a new one.', 400);
  }

  if (user.resetPasswordOTPExpiry < new Date()) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError('OTP has expired. Please request a new one.', 400);
  }

  if (user.resetPasswordOTP !== otp) {
    throw new AppError('Invalid OTP', 400);
  }

  user.password = newPassword;
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpiry = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (_req: AuthRequest, res: Response) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
});
