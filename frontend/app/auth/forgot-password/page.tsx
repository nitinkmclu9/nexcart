'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiArrowLeft, FiCheck } from 'react-icons/fi';
import api from '@/lib/api';
import toast from 'react-hot-toast';

type Step = 'email' | 'otp' | 'reset';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email'); return; }

    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('OTP sent to your email!');
      setStep('otp');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) { toast.error('Please enter a valid 6-digit OTP'); return; }

    setLoading(true);
    try {
      await api.post('/auth/verify-otp', { email, otp });
      toast.success('OTP verified!');
      setStep('reset');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return; }

    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, otp, newPassword: password });
      toast.success('Password reset successfully!');
      router.push('/auth/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 w-full max-w-md"
      >
        <div className="flex items-center gap-4 mb-6">
          {step !== 'email' && (
            <button onClick={() => setStep(step === 'otp' ? 'email' : 'otp')} className="text-gray-600 hover:text-gray-900">
              <FiArrowLeft size={20} />
            </button>
          )}
          <div className="flex items-center gap-2">
            {['email', 'otp', 'reset'].map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  ['email', 'otp', 'reset'].indexOf(step) >= i
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {['email', 'otp', 'reset'].indexOf(step) > i ? <FiCheck /> : i + 1}
                </div>
                {i < 2 && <div className={`w-8 h-1 ${['email', 'otp', 'reset'].indexOf(step) > i ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'email' && (
            <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
              <p className="text-gray-600 mb-8">Enter your email and we'll send you an OTP to reset your password.</p>
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field pl-12" placeholder="your@email.com" required />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">{loading ? 'Sending...' : 'Send OTP'}</button>
                <p className="text-center text-gray-600">Remember your password? <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">Sign In</Link></p>
              </form>
            </motion.div>
          )}

          {step === 'otp' && (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-bold mb-2">Enter OTP</h1>
              <p className="text-gray-600 mb-8">We sent a 6-digit OTP to <strong>{email}</strong>. It expires in 10 minutes.</p>
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">OTP</label>
                  <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} className="input-field text-center text-2xl tracking-[8px]" placeholder="000000" maxLength={6} required />
                </div>
                <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">{loading ? 'Verifying...' : 'Verify OTP'}</button>
              </form>
            </motion.div>
          )}

          {step === 'reset' && (
            <motion.div key="reset" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-gray-600 mb-8">Enter your new password.</p>
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">New Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="input-field pl-12" placeholder="At least 6 characters" required />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-2">Confirm Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input-field pl-12" placeholder="Re-enter password" required />
                  </div>
                  <label className="flex items-center mt-2 text-sm">
                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="mr-2" />
                    Show passwords
                  </label>
                </div>
                <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">{loading ? 'Resetting...' : 'Reset Password'}</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
