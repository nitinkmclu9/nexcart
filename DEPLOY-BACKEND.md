# Deploy NexCart Backend to Render - Step by Step Guide

## 🎯 Option 1: Deploy Without Git (Direct Upload)

### Step 1: Create MongoDB Atlas Database (FREE)

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub (takes 2 minutes)
3. Click **"Build a Database"**
4. Choose **FREE (M0)** tier
5. Click **"Create"**
6. **Create Database User:**
   - Username: `nexcartadmin`
   - Password: (create a strong password, save it!)
   - Click **"Create User"**
7. **Allow Access from Anywhere:**
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"**
   - Click **"Confirm"**
8. **Get Connection String:**
   - Click **"Connect"**
   - Choose **"Connect your application"**
   - Copy the connection string (looks like):
     ```
     mongodb+srv://nexcartadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Add database name at the end: `/nexcart`
   - Final format:
     ```
     mongodb+srv://nexcartadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/nexcart?retryWrites=true&w=majority
     ```

---

### Step 2: Prepare Backend Files for Upload

Create a ZIP file of your backend folder:

1. Navigate to: `C:\Users\nitin\OneDrive\E comerse website\nexcart\backend`
2. Right-click on the `backend` folder
3. Select **"Send to"** → **"Compressed (zipped) folder"**
4. This creates `backend.zip`

---

### Step 3: Deploy to Render

1. **Go to:** https://render.com
2. **Sign up** with GitHub or Google
3. **Click:** **"New +"** → **"Web Service"**
4. **Connect GitHub** (if prompted)
5. **Click:** **"Deploy your own image"** (or "Upload a ZIP")
6. **Upload** your `backend.zip` file
7. **Configure:**
   - **Name:** `nexcart-backend`
   - **Region:** Oregon (US West)
   - **Branch:** main
   - **Root Directory:** (leave blank)
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/server.js`
   - **Plan:** Free

8. **Add Environment Variables:**
   Click **"Add Environment Variable"** and add these:

   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `MONGODB_URI` | `mongodb+srv://nexcartadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/nexcart?retryWrites=true&w=majority` |
   | `JWT_SECRET` | `my-super-secret-key-change-this-12345` |
   | `JWT_EXPIRE` | `7d` |
   | `FRONTEND_URL` | `https://frontend-fawn-psi-99.vercel.app` |

   *(Optional - for payments)*
   | `STRIPE_SECRET_KEY` | `sk_test_your_key_here` |
   | `RAZORPAY_KEY_ID` | `rzp_test_your_key` |
   | `RAZORPAY_KEY_SECRET` | `your_secret` |

9. **Click:** **"Create Web Service"**
10. **Wait 3-5 minutes** for deployment

---

### Step 4: Get Your Backend URL

After deployment completes:
- Your backend URL will be: `https://nexcart-backend-xxxxx.onrender.com`
- Test it: `https://nexcart-backend-xxxxx.onrender.com/api/health`
- You should see: `{"status":"OK","message":"NexCart API is running"}`

---

### Step 5: Connect Frontend to Backend

1. **Go to:** https://vercel.com/dashboard
2. **Click** on your `nexcart-frontend` project
3. **Go to:** Settings → Environment Variables
4. **Add:**
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://nexcart-backend-xxxxx.onrender.com/api`
   - Environment: Production ✅
5. **Click:** Save
6. **Redeploy:** Go to Deployments → Click latest → Redeploy

---

## 🎉 Done! Your Full Stack App is Live!

**Frontend:** https://frontend-fawn-psi-99.vercel.app  
**Backend:** https://nexcart-backend-xxxxx.onrender.com  
**API Health:** https://nexcart-backend-xxxxx.onrender.com/api/health

---

## 📋 Option 2: Install Git and Deploy (Better for Updates)

If you want to install Git for easier deployments:

### Install Git on Windows:

1. **Download:** https://git-scm.com/download/win
2. **Run installer** (keep all default settings)
3. **Open new terminal** and run:

```bash
# Navigate to project
cd "C:\Users\nitin\OneDrive\E comerse website\nexcart"

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - NexCart E-Commerce Platform"

# Create GitHub repo at: https://github.com/new
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/nexcart.git
git branch -M main
git push -u origin main
```

4. **Go to Render:** https://render.com
5. **New +** → **Blueprint**
6. **Connect** your GitHub repo
7. Render auto-detects `backend/render.yaml`
8. **Add environment variables** (same as above)
9. **Deploy!**

---

## 🔍 Verify Deployment

Test your backend API:

```bash
# Health check
curl https://your-backend-url.onrender.com/api/health

# Get products
curl https://your-backend-url.onrender.com/api/products

# Register user
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'
```

---

## 💡 Important Notes

1. **Render Free Tier:**
   - Spins down after 15 min of inactivity
   - First request after spin-down takes ~50 seconds
   - Automatically wakes up

2. **MongoDB Atlas Free Tier:**
   - 512MB storage
   - Shared RAM
   - Perfect for development

3. **Security:**
   - Never commit `.env` files to GitHub
   - Use strong JWT_SECRET
   - Keep API keys secure

---

## 🆘 Troubleshooting

**Backend not starting?**
- Check Render logs in dashboard
- Verify MONGODB_URI is correct
- Ensure all environment variables are set

**Can't connect to database?**
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify username/password in connection string
- Check database name is `nexcart`

**Frontend can't reach backend?**
- Verify NEXT_PUBLIC_API_URL is correct
- Must end with `/api`
- Redeploy frontend after changing env vars

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Render Support: https://render.com/support

---

**Ready to deploy? Start with Step 1 (MongoDB Atlas) and follow the steps!** 🚀
