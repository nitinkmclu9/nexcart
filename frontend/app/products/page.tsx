'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { motion } from 'framer-motion';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';
import api from '@/lib/api';
import { Product } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    sort: 'newest',
    search: '',
    page: 1
  });
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = { page: filters.page, limit: 12, sort: filters.sort };
      if (filters.category) params.category = filters.category;
      if (filters.brand) params.brand = filters.brand;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.rating) params.rating = filters.rating;
      if (filters.search) params.search = filters.search;

      const response = await api.get('/products', { params });
      setProducts(response.data.data);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20 container-custom">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="md:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <FiFilter />
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-field"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Category</label>
                <select
                  className="input-field"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
                >
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="shoes">Shoes</option>
                  <option value="watches">Watches</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="input-field"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value, page: 1 })}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="input-field"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value, page: 1 })}
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Minimum Rating</label>
                <select
                  className="input-field"
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value, page: 1 })}
                >
                  <option value="">All Ratings</option>
                  <option value="4">4★ & above</option>
                  <option value="3">3★ & above</option>
                  <option value="2">2★ & above</option>
                </select>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Sort By</label>
                <select
                  className="input-field"
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              <button
                onClick={() => setFilters({
                  category: '',
                  brand: '',
                  minPrice: '',
                  maxPrice: '',
                  rating: '',
                  sort: 'newest',
                  search: '',
                  page: 1
                })}
                className="w-full btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{products.length} products found</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  <FiList />
                </button>
              </div>
            </div>

            {loading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card h-96 animate-pulse bg-gray-200"></div>
                ))}
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12 gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setFilters({ ...filters, page: i + 1 })}
                        className={`px-4 py-2 rounded ${
                          filters.page === i + 1
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
