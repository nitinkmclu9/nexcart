# NexCart E-Commerce Platform - Push to GitHub

## Quick Steps to Deploy Backend

### 1. Initialize Git Repository

```bash
cd nexcart
git init
git add .
git commit -m "Initial commit - NexCart E-Commerce Platform"
```

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `nexcart`
3. Description: "Modern Full-Stack E-Commerce Platform"
4. Choose **Private** or **Public**
5. Click **Create repository**

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/nexcart.git
git branch -M main
git push -u origin main
```

### 4. Deploy Backend to Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click **New +** → **Blueprint**
4. Select your `nexcart` repository
5. Render will detect `backend/render.yaml`
6. Add environment variables (see DEPLOYMENT.md)
7. Click **Apply**

### 5. Update Frontend

1. Go to https://vercel.com/dashboard
2. Select your frontend project
3. Settings → Environment Variables
4. Add `NEXT_PUBLIC_API_URL` with your Render backend URL
5. Redeploy

---

**That's it! Your full-stack e-commerce platform will be live!** 🚀
