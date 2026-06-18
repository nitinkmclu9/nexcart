'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState('');

  const total = getTotalPrice();
  const shipping = total > 500 ? 0 : 50;
  const tax = Math.round(total * 0.18);
  const finalTotal = total + shipping + tax;

  const handleCheckout = () => {
    toast.success('Proceeding to checkout');
    // Navigate to checkout
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-28 pb-20 container-custom text-center">
          <div className="text-9xl mb-8">🛒</div>
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <Link href="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20 container-custom">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.product._id}
                layout
                className="card p-6 flex gap-6"
              >
                <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0] || '/placeholder.jpg'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
                  <p className="text-gray-600 mb-2">{item.product.brand}</p>
                  {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                  {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                        className="p-2 border rounded-lg hover:bg-gray-100"
                      >
                        <FiMinus />
                      </button>
                      <span className="text-lg font-semibold w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="p-2 border rounded-lg hover:bg-gray-100"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-blue-600">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => {
                          removeItem(item.product._id);
                          toast.success('Item removed');
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <button onClick={() => { clearCart(); toast.success('Cart cleared'); }} className="text-red-600 hover:underline">
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="input-field mb-2"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="w-full btn-secondary">Apply Coupon</button>
              </div>

              <button onClick={handleCheckout} className="w-full btn-primary">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
