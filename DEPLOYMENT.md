# NexCart - Complete Deployment Guide

Your NexCart e-commerce platform is now **LIVE**! 🎉

## ✅ Current Status

**Frontend (Deployed):** https://frontend-fawn-psi-99.vercel.app
**Backend (Local Only):** Needs deployment

---

## 🚀 Deploy Backend to Render (Free Hosting)

### Step 1: Create MongoDB Atlas Database (Free)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Create a database user with username/password
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/nexcart?retryWrites=true&w=majority
   ```

### Step 2: Deploy Backend to Render

1. Go to https://render.com and sign up/login
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the `nexcart/backend` folder
5. Render will auto-detect `render.yaml`
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A random secret (e.g., `my-super-secret-jwt-key-12345`)
   - `STRIPE_SECRET_KEY`: Your Stripe key (optional)
   - `RAZORPAY_KEY_ID`: Your Razorpay key (optional)
   - `RAZORPAY_KEY_SECRET`: Your Razorpay secret (optional)
   - `GOOGLE_CLIENT_ID`: Your Google OAuth ID (optional)
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth secret (optional)

7. Click **"Apply"** and wait for deployment

### Step 3: Update Frontend Environment Variable

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `nexcart-frontend`
3. Go to **Settings** → **Environment Variables**
4. Add:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend-url.onrender.com/api`
5. Click **Save**
6. Redeploy the frontend (Vercel will auto-redeploy)

---

## 🌐 Your Live URLs

**Frontend:** https://frontend-fawn-psi-99.vercel.app
**Backend API:** (Will be provided by Render after deployment)
**API Health Check:** `your-backend-url.onrender.com/api/health`

---

## 📋 Quick Setup Commands

### Run Locally (For Development)

```bash
# Terminal 1 - Backend
cd nexcart/backend
npm install
npm run dev

# Terminal 2 - Frontend
cd nexcart/frontend
npm install
npm run dev
```

**Local URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 🔧 Environment Variables Required

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexcart
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
FRONTEND_URL=https://frontend-fawn-psi-99.vercel.app

# Optional - Payment Gateways
STRIPE_SECRET_KEY=sk_test_xxx
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx

# Optional - Google OAuth
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

# Optional - Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxx
```

### Frontend (Vercel Environment Variables)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```

---

## ✨ Features Available After Full Deployment

- ✅ Product browsing and search
- ✅ Shopping cart functionality
- ✅ User authentication (JWT + Google)
- ✅ Order placement and tracking
- ✅ Payment processing (Stripe/Razorpay)
- ✅ Admin dashboard
- ✅ Wishlist management
- ✅ Product reviews and ratings
- ✅ Email notifications

---

## 🎯 Next Steps

1. **Deploy MongoDB Atlas** (5 minutes)
2. **Deploy Backend to Render** (10 minutes)
3. **Update Frontend API URL** (2 minutes)
4. **Test the full application** 

---

## 💡 Tips

- Render free tier spins down after 15 minutes of inactivity (first request takes ~50 seconds)
- MongoDB Atlas free tier includes 512MB storage
- Vercel frontend is always live and fast
- Use environment variables for all secrets - never commit them to GitHub

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/

---

**Made with ❤️ using Next.js, Node.js, and MongoDB**
