# 🏗️ NexCart Deployment Architecture

## 📊 How Everything Connects

```
┌─────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                        │
│                                                          │
│  Visits: https://frontend-fawn-psi-99.vercel.app        │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTPS Requests
                     ▼
┌─────────────────────────────────────────────────────────┐
│              VERCEL (Frontend Hosting)                   │
│                                                          │
│  🌐 Next.js 14 App                                       │
│  📁 Static Files + SSR                                   │
│  🔧 Environment: NEXT_PUBLIC_API_URL                     │
│                                                          │
│  URL: https://frontend-fawn-psi-99.vercel.app           │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ API Calls to Backend
                     │ https://nexcart-backend.onrender.com/api
                     ▼
┌─────────────────────────────────────────────────────────┐
│              RENDER (Backend Hosting)                    │
│                                                          │
│  🖥️ Express.js + TypeScript                              │
│  🔐 JWT Authentication                                   │
│  💳 Stripe/Razorpay Integration                          │
│  📧 Email Service                                        │
│  🔧 Environment Variables:                               │
│     • MONGODB_URI                                        │
│     • JWT_SECRET                                         │
│     • STRIPE_KEYS                                        │
│     • etc.                                               │
│                                                          │
│  URL: https://nexcart-backend-xxxxx.onrender.com        │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Database Queries
                     │ mongodb+srv://...
                     ▼
┌─────────────────────────────────────────────────────────┐
│         MONGODB ATLAS (Database Hosting)                 │
│                                                          │
│  🗄️ Database: nexcart                                    │
│  📊 Collections:                                         │
│     • users (authentication, profiles)                   │
│     • products (catalog, inventory)                      │
│     • orders (purchases, payments)                       │
│     • cart (shopping carts)                              │
│     • reviews (ratings, comments)                        │
│     • categories (product categories)                    │
│     • coupons (discount codes)                           │
│                                                          │
│  Cloud: AWS/GCP/Azure (Managed by MongoDB)              │
│  Free Tier: 512MB Storage                               │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### User Registers:
```
Browser → Vercel Frontend → Render Backend → MongoDB
   ↓           ↓                  ↓              ↓
User fills  Receives POST    Validates       Creates user
form data   /api/auth        data, hashes    document in
            /register        password        'users' collection
                               ↓
                         Returns JWT
                         token to browser
```

### User Browses Products:
```
Browser → Vercel Frontend → Render Backend → MongoDB
   ↓           ↓                  ↓              ↓
User clicks  Fetches from     Queries        Returns product
Products     /api/products    'products'     documents
page                        collection
```

### User Makes Purchase:
```
Browser → Vercel Frontend → Render Backend → MongoDB
   ↓           ↓                  ↓              ↓
Checkout     Creates order    Creates        Saves order
page         payment intent   order in DB    with 'pending'
             (Stripe)                        status
                               ↓
                         After payment
                         success, update
                         to 'completed'
```

---

## 🌐 URLs & Endpoints

### Frontend Routes (Vercel):
```
https://frontend-fawn-psi-99.vercel.app/
├── /                      (Home page)
├── /products              (Product listing)
├── /products/:id          (Product details)
├── /cart                  (Shopping cart)
├── /auth/login            (Login page)
├── /auth/register         (Registration)
├── /checkout              (Checkout)
└── /admin                 (Admin dashboard)
```

### Backend API (Render):
```
https://nexcart-backend-xxxxx.onrender.com/api
├── GET    /health                    (Health check)
├── GET    /products                  (All products)
├── GET    /products/:id              (Single product)
├── POST   /auth/register             (Register)
├── POST   /auth/login                (Login)
├── GET    /auth/me                   (Get current user)
├── GET/POST /cart                    (Cart operations)
├── GET/POST /orders                  (Order operations)
├── POST   /payment/stripe            (Stripe payment)
└── POST   /payment/razorpay          (Razorpay payment)
```

---

## 🔐 Security Flow

### Authentication:
```
1. User logs in → Backend validates credentials
2. Backend creates JWT token (expires in 7 days)
3. Token stored in browser (localStorage/cookies)
4. Every API request includes token in header
5. Backend middleware validates token
6. If valid → process request
7. If invalid → return 401 Unauthorized
```

### Database Security:
```
1. MongoDB credentials stored in Render env vars
2. Never exposed in frontend code
3. Database allows access only from Render IP
4. All connections encrypted (TLS/SSL)
5. Passwords hashed with bcrypt (12 rounds)
```

### Payment Security:
```
1. Stripe/Razorpay keys in backend only
2. Frontend never sees secret keys
3. Payment processing done server-side
4. Webhooks verify payment status
5. Orders only confirmed after payment success
```

---

## 💰 Cost Breakdown (FREE Tier)

| Service | What's Hosted | Cost | Limits |
|---------|--------------|------|--------|
| **Vercel** | Frontend (Next.js) | FREE | 100GB bandwidth/month |
| **Render** | Backend (Node.js) | FREE | 750 hours/month, sleeps after 15min |
| **MongoDB Atlas** | Database | FREE | 512MB storage, shared RAM |
| **Total** | Full Stack App | **$0/month** | Perfect for development/testing |

---

## 📈 Scaling Options (When You Need Them)

### When to Upgrade:
- **Vercel:** When you exceed 100GB bandwidth ($20/month Pro)
- **Render:** When you need always-on server ($7/month Starter)
- **MongoDB:** When you exceed 512MB ($9/month M10 tier)

### Production Ready Setup:
```
Vercel Pro ($20/mo) → Always-on Render ($7/mo) → MongoDB M10 ($9/mo)
Total: ~$36/month for production e-commerce site
```

---

## 🎯 Deployment Checklist Summary

```
Phase 1: Database
☐ Create MongoDB Atlas account
☐ Create M0 free cluster
☐ Create database user
☐ Configure network access (0.0.0.0/0)
☐ Get connection string

Phase 2: Backend
☐ ZIP backend folder
☐ Create Render account
☐ Upload ZIP to Render
☐ Configure build/start commands
☐ Add 6 environment variables
☐ Deploy and verify health check

Phase 3: Frontend
☐ Add NEXT_PUBLIC_API_URL to Vercel
☐ Redeploy frontend
☐ Test full stack integration

Phase 4: Testing
☐ Register new user
☐ Browse products
☐ Add to cart
☐ Complete checkout
☐ Verify order in MongoDB
```

---

## 🔍 Monitoring & Debugging

### Where to Check Logs:
- **Frontend Issues:** Browser Console (F12)
- **Backend Issues:** Render Dashboard → Logs
- **Database Issues:** MongoDB Atlas → Logs
- **Deployment Issues:** Vercel/Render build logs

### Common Log Locations:
```
Vercel: Dashboard → Your Project → Deployments → View Build Logs
Render: Dashboard → Your Service → Logs tab
MongoDB: Atlas Dashboard → Clusters → Metrics & Logs
```

---

**Your full-stack e-commerce platform is distributed across 3 cloud services, all on FREE tiers!** 🚀

Frontend: Vercel (Edge Network)
Backend: Render (US West - Oregon)
Database: MongoDB Atlas (Cloud - Global)
