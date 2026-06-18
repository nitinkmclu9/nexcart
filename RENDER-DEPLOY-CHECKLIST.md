# 🚀 Deploy NexCart Backend to Render - Simple Checklist

## ✅ STEP 1: Create MongoDB Database (5 minutes)

1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with Google (fastest)
3. Click **"Build a Database"** → Choose **FREE (M0)**
4. Create database user:
   - Username: `nexcartadmin`
   - Password: (create strong password - **SAVE IT!**)
5. Click **"Add IP Address"** → **"Allow Access from Anywhere"** → **"Confirm"**
6. Click **"Connect"** → **"Connect your application"**
7. Copy connection string and replace `<password>`:
   ```
   mongodb+srv://nexcartadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/nexcart?retryWrites=true&w=majority
   ```

**☑ Done?** Copy your MongoDB URI and move to Step 2.

---

## ✅ STEP 2: ZIP Your Backend Folder

1. Open File Explorer
2. Navigate to: `C:\Users\nitin\OneDrive\E comerse website\nexcart`
3. Right-click on **`backend`** folder
4. Click **"Send to"** → **"Compressed (zipped) folder"**
5. This creates **`backend.zip`**

**☑ Done?** You should have `backend.zip` file ready.

---

## ✅ STEP 3: Deploy to Render

### 3.1 Create Render Account
1. Go to: **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** or **Google**

### 3.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Click **"Deploy a plain server"** (or "Upload a ZIP")
3. **Upload** your `backend.zip` file
4. Configure:

| Setting | Value |
|---------|-------|
| **Name** | `nexcart-backend` |
| **Region** | Oregon (US West) |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `node dist/server.js` |
| **Plan** | Free |

### 3.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these **ONE BY ONE**:

| KEY | VALUE |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGODB_URI` | `mongodb+srv://nexcartadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/nexcart?retryWrites=true&w=majority` |
| `JWT_SECRET` | `super-secret-jwt-key-12345-change-this` |
| `JWT_EXPIRE` | `7d` |
| `FRONTEND_URL` | `https://frontend-fawn-psi-99.vercel.app` |

**⚠️ IMPORTANT:** Replace `YOUR_PASSWORD` and `cluster0.xxxxx` with your actual MongoDB credentials!

### 3.4 Deploy
1. Click **"Create Web Service"**
2. Wait **3-5 minutes** for build and deployment
3. Watch the logs in Render dashboard

---

## ✅ STEP 4: Test Your Backend

After deployment shows **"Live"**:

1. Your backend URL will be: `https://nexcart-backend-xxxxx.onrender.com`
2. Test health check: Open in browser:
   ```
   https://nexcart-backend-xxxxx.onrender.com/api/health
   ```
3. You should see:
   ```json
   {"status":"OK","message":"NexCart API is running"}
   ```

**☑ Working?** Move to Step 5!

---

## ✅ STEP 5: Connect Frontend to Backend

1. Go to: **https://vercel.com/dashboard**
2. Click your project: **`nexcart-frontend`**
3. Go to: **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://nexcart-backend-xxxxx.onrender.com/api`
   - **Environment:** Check ✅ Production
5. Click **"Save"**
6. Go to **"Deployments"** tab
7. Click **⋮** (three dots) on latest deployment → **"Redeploy"**

---

## 🎉 DONE! Your Full Stack App is LIVE!

**Your URLs:**
- Frontend: https://frontend-fawn-psi-99.vercel.app
- Backend: https://nexcart-backend-xxxxx.onrender.com
- API Health: https://nexcart-backend-xxxxx.onrender.com/api/health

---

## 📋 Environment Variables Quick Reference

Copy and paste these when deploying to Render:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://nexcartadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/nexcart?retryWrites=true&w=majority
JWT_SECRET=super-secret-jwt-key-12345-change-this
JWT_EXPIRE=7d
FRONTEND_URL=https://frontend-fawn-psi-99.vercel.app
```

---

## 🔍 Testing Your API

After deployment, test these endpoints in your browser:

1. **Health Check:**
   ```
   https://your-backend.onrender.com/api/health
   ```

2. **Get Products (will be empty initially):**
   ```
   https://your-backend.onrender.com/api/products
   ```

3. **Register a User:**
   Use Postman or any API tool:
   ```
   POST https://your-backend.onrender.com/api/auth/register
   Body: {"name":"Test","email":"test@test.com","password":"123456"}
   ```

---

## ⚡ Important Notes

1. **First Load:** Render free tier sleeps after 15 min. First request takes ~50 seconds to wake up.
2. **MongoDB Atlas:** Free tier has 512MB storage (plenty for testing).
3. **Admin Access:** First user registered will need manual role update to admin in MongoDB.
4. **Logs:** Check Render dashboard logs if something fails.

---

## 🆘 Troubleshooting

**❌ Backend won't start?**
- Check Render logs in dashboard
- Verify MONGODB_URI is correct
- Make sure all 6 environment variables are set

**❌ Can't connect to database?**
- In MongoDB Atlas: Network Access → Should show `0.0.0.0/0`
- Check username/password in connection string
- Ensure database name is `/nexcart` at the end

**❌ Frontend shows errors?**
- Verify NEXT_PUBLIC_API_URL ends with `/api`
- Redeploy frontend after adding environment variable
- Check browser console for error messages

---

## 📞 Need Help?

- **Render Docs:** https://render.com/docs
- **MongoDB Atlas Guide:** https://www.mongodb.com/docs/atlas/getting-started/
- **Common Errors:** Check Render deployment logs

---

**Ready? Start with STEP 1 and follow the checklist!** 🚀

Each step takes 2-5 minutes. Total deployment time: ~15 minutes.
