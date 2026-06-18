'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { FiStar, FiShoppingCart, FiHeart, FiMinus, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import api from '@/lib/api';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${params.id}`);
      setProduct(response.data.data);
      if (response.data.data.colors?.length) {
        setSelectedColor(response.data.data.colors[0]);
      }
      if (response.data.data.sizes?.length) {
        setSelectedSize(response.data.data.sizes[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity, selectedColor, selectedSize);
      toast.success('Added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-28 pb-20 container-custom animate-pulse">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="h-96 bg-gray-200 rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20 container-custom">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden mb-4">
              <Image
                src={product.images[0] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="relative h-24 bg-gray-100 rounded overflow-hidden">
                  <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.brand}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <FiStar className="text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{product.ratings.average.toFixed(1)}</span>
                <span className="text-gray-500">({product.ratings.count} reviews)</span>
              </div>
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-blue-600">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block font-semibold mb-2">Color</label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        selectedColor === color
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block font-semibold mb-2">Size</label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        selectedSize === size
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border rounded-lg hover:bg-gray-100"
                >
                  <FiMinus />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border rounded-lg hover:bg-gray-100"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button onClick={handleAddToCart} className="flex-1 btn-primary flex items-center justify-center gap-2">
                <FiShoppingCart /> Add to Cart
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-100">
                <FiHeart />
              </button>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex gap-4 border-b mb-4">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-2 font-semibold ${activeTab === 'description' ? 'border-b-2 border-blue-600' : ''}`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 font-semibold ${activeTab === 'specs' ? 'border-b-2 border-blue-600' : ''}`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 font-semibold ${activeTab === 'reviews' ? 'border-b-2 border-blue-600' : ''}`}
                >
                  Reviews
                </button>
              </div>

              <div className="text-gray-600">
                {activeTab === 'description' && <p>{product.description}</p>}
                {activeTab === 'specs' && <p>Specifications coming soon...</p>}
                {activeTab === 'reviews' && <p>Reviews coming soon...</p>}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
