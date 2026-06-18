# NexCart - Modern Full-Stack E-Commerce Platform

A premium, enterprise-level e-commerce platform built with Next.js, Node.js, MongoDB, and modern web technologies. Comparable to Amazon, Flipkart, and Myntra with a unique premium design.

![NexCart](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## ✨ Features

### Customer Features
- 🏠 **Home Page**: Hero banner, featured products, categories, testimonials
- 🛍️ **Product Listing**: Advanced filters, search, sorting, grid/list view
- 📦 **Product Details**: Image gallery, variants (color/size), reviews, related products
- 🛒 **Shopping Cart**: Quantity management, coupon codes, order summary
- 💳 **Checkout**: Multiple payment methods (Stripe, Razorpay, UPI)
- 👤 **User Dashboard**: Profile, order history, wishlist, addresses
- 🔐 **Authentication**: JWT, Google OAuth, secure sessions

### Admin Features
- 📊 **Analytics Dashboard**: Revenue graphs, order statistics, customer analytics
- 📦 **Product Management**: Add, edit, delete products
- 🏷️ **Category Management**: Organize product categories
- 📋 **Order Management**: View orders, update status, tracking
- 👥 **User Management**: View users, block/unblock accounts

### Advanced Features
- ⚡ **Real-time Search**: Instant product search with debouncing
- 💾 **Wishlist System**: Save favorite products
- 🎯 **Product Recommendations**: Smart suggestions
- ⏱️ **Recently Viewed**: Track browsing history
- 📧 **Email Notifications**: Order confirmations, password resets
- 📱 **Responsive Design**: Mobile-first, app-like experience
- 🌙 **Dark/Light Mode**: Theme switching
- 🎨 **Smooth Animations**: Framer Motion transitions
- 🔍 **SEO Optimized**: Meta tags, structured data

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Google OAuth
- **Payments**: Stripe, Razorpay
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator

## 📁 Project Structure

```
nexcart/
├── frontend/                    # Next.js Frontend
│   ├── app/                     # App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── products/           # Product pages
│   │   ├── cart/               # Shopping cart
│   │   ├── auth/               # Authentication pages
│   │   └── dashboard/          # User dashboard
│   ├── components/             # React components
│   │   ├── layout/            # Header, Footer
│   │   └── products/          # Product cards, etc.
│   ├── lib/                    # Utilities, API client
│   ├── store/                  # Zustand stores
│   └── types/                  # TypeScript interfaces
│
├── backend/                     # Express.js Backend
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth, error handling
│   │   └── utils/            # Helper functions
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nexcart
```

2. **Setup Backend**
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials
# - MongoDB connection string
# - JWT secret
# - Stripe/Razorpay keys (optional)
# - Google OAuth credentials (optional)
```

3. **Setup Frontend**
```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. **Run the Application**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

5. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- API Health Check: http://localhost:5000/api/health

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexcart

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe (Optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Razorpay (Optional)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Payments
- `POST /api/payments/stripe` - Create Stripe session
- `POST /api/payments/stripe/webhook` - Stripe webhook
- `POST /api/payments/razorpay` - Create Razorpay order
- `POST /api/payments/razorpay/verify` - Verify Razorpay payment

### Admin
- `GET /api/admin/analytics` - Get analytics data
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/block` - Block/unblock user
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/categories` - Get categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category

### Reviews
- `POST /api/reviews` - Add review
- `GET /api/reviews/product/:productId` - Get product reviews

## 🗄️ Database Models

- **User**: name, email, password, role, avatar, addresses, wishlist
- **Product**: name, description, price, images, category, brand, stock, ratings
- **Category**: name, slug, description, parentCategory
- **Order**: user, products, totalAmount, status, paymentMethod, shippingAddress
- **Review**: user, product, rating, comment, isVerifiedPurchase
- **Cart**: user, items, totalItems, totalPrice
- **Coupon**: code, discountType, discountValue, usageLimit, expiryDate

## 🎨 Design Features

- **Color Palette**: Dark Navy, White, Blue Gradient, Purple Accent
- **Typography**: Inter font family
- **Components**: Glassmorphism effects, gradient accents
- **Animations**: Smooth page transitions, hover effects
- **Responsive**: Mobile-first design, works on all devices

## 🔒 Security Features

- ✅ JWT Authentication with secure cookies
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Input validation and sanitization
- ✅ Rate limiting on API endpoints
- ✅ XSS protection with Helmet
- ✅ CORS configuration
- ✅ Secure session management

## ⚡ Performance Optimizations

- ✅ Server-side rendering (Next.js)
- ✅ Image optimization (Next.js Image)
- ✅ Lazy loading components
- ✅ Code splitting
- ✅ API response caching
- ✅ Database indexing
- ✅ Efficient queries with Mongoose

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend

# Build
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend (Render)
```bash
cd backend

# Build
npm run build

# Deploy to Render
# Connect your GitHub repository
# Set environment variables in Render dashboard
# Build command: npm run build
# Start command: node dist/server.js
```

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Add to backend `.env` file

## 📝 Development Scripts

### Backend
```bash
npm run dev      # Start development server with nodemon
npm run build    # Compile TypeScript
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🧪 Testing
```bash
# Backend tests (coming soon)
cd backend
npm test

# Frontend tests (coming soon)
cd frontend
npm test
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**NexCart Team**

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- MongoDB for the database
- All open-source contributors

## 📞 Support

For support, email support@nexcart.com or open an issue in the repository.

---

**Made with ❤️ using Next.js, Node.js, and MongoDB**
