# Zorodoor - Streetwear E-commerce Website

A modern, full-featured e-commerce platform for **Zorodoor**, a Gen Z focused streetwear brand centered on brutal self-expression with anime-inspired designs.

## 🎨 Features

- **Modern Dark Theme**: Sleek black background with cyan and pink accents
- **Complete Product Catalog**: 12+ streetwear products (hoodies, t-shirts, lowers, mangas, collectibles)
- **Smart Shopping Cart**: LocalStorage persistence, discount codes, quantity controls
- **Wishlist System**: Save favorite products for later
- **Advanced Filtering**: Category, price, size filters with real-time updates
- **Responsive Design**: Mobile-first approach, works on all devices
- **Product Reviews & Ratings**: Star ratings with review counts
- **Newsletter Signup**: Email collection for marketing

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context + LocalStorage
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Image Optimization**: Next/Image

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project**
   ```bash
   cd "f:/google anti/zoro"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file based on `.env.example`:
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
   STRIPE_SECRET_KEY=sk_test_YOUR_KEY
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Available Discount Codes

Use these codes at checkout:

- `WELCOME10` - 10% off your order
- `ZORO20` - 20% off your order  
- `BRUTAL30` - 30% off your order

## 📁 Project Structure

```
zoro/
├── app/                      # Next.js app router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage
│   ├── shop/                # Shop page
│   ├── product/[slug]/      # Product detail pages
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   └── globals.css          # Global styles with Tailwind
│
├── components/              # React components
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── RatingStars.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── Breadcrumbs.tsx
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── products/            # Product-specific components
│       └── ProductCard.tsx
│
├── lib/                     # Utility functions and contexts
│   ├── contexts/            # React context providers
│   │   ├── CartContext.tsx
│   │   ├── WishlistContext.tsx
│   │   └── UserContext.tsx
│   └── utils.ts             # Helper functions
│
├── data/                    # Static data
│   └── products.json        # Product catalog
│
└── public/                  # Static assets
    └── products/            # Product images
```

## 👑 Admin Dashboard (New!)
Manage your products easily without seeking code changes.

1. Navigate to `/admin` (e.g., `http://localhost:3000/admin`)
2. Login with passcode: `admin123`
3. **Features**:
   - **View All Products**: See current inventory.
   - **Add Product**: Upload images and create new products instantly.
   - **Delete Product**: Remove items from the catalog.

> **Note**: In development mode (`npm run dev`), changes are saved to `data/products.json` and persist. In production (Vercel), file system writes are ephemeral; for production, connect to a database (MongoDB/Postgres).

## 🛍️ How to Add New Products
Use the **Admin Dashboard** explained above! 

Alternatively, manually edit `/data/products.json`:
```json
{
  "id": "prod_013",
  ...
}
```
Add product images to `/public/products/` folder.

## 🎨 Customization

### Colors

Edit `/app/globals.css` to change the color scheme:

```css
@theme inline {
  --color-primary-bg: #000000;           /* Main background */
  --color-accent-cyan: #00DFC0;          /* Primary accent */
  --color-accent-pink: #FF3366;          /* Secondary accent */
  /* ... other colors */
}
```

### Brand Name

1. Update logo in `/components/layout/Navbar.tsx`
2. Update footer in `/components/layout/Footer.tsx`
3. Update metadata in `/app/layout.tsx`

## 🚀 Deployment to Vercel

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   -  Click "Deploy"

## 🧪 Testing Checklist

- [x] Homepage loads correctly
- [x] Product cards display with images and pricing
- [x] Cart operations (add, remove, update quantity)
- [x] Wishlist functionality
- [x] Discount codes apply correctly
- [x] Filters work on shop page
- [x] Product detail page shows all information
- [x] Responsive design on mobile
- [x] Navbar cart/wishlist badges update

## 📝 Future Enhancements

- Stripe payment integration
- User authentication with NextAuth
- Order history and tracking
- Product search functionality
- Size guide modal
- Customer reviews system
- Backend API with database
- Admin dashboard

## 👤 Authentication

Currently uses mock authentication. To login:
- Any email and password combination will work
- User data stored in localStorage

## 🐛 Known Issues

- Image generation quota reached - some products use placeholder images
- Stripe integration requires API keys to be configured

## 📄 License

This project is for demonstration purposes. All rights reserved to Zorodoor.

## 🤝 Contributing

This is a Next.js project built with love for the streetwear community. Feel free to customize it for your own brand!

---

**Built with brutal self-expression in mind.** 🔥
