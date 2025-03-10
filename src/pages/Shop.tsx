import React, { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";

const Shop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  // Filter products based on search term and price filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesPrice = true;
    if (priceFilter === "under99") {
      matchesPrice = product.price <= 270;
    } else if (priceFilter === "99to199") {
      matchesPrice = product.price >= 270 && product.price <= 450;
    } else if (priceFilter === "over299") {
      matchesPrice = product.price > 800;
    }

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-[#8B5D33] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Our Products</h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            <strong>
              Mr.B nuts all products are Manufactured From Completely Organic
              Homemade Process.
            </strong>
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="w-full md:w-auto">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="under99">Under 270 </option>
              <option value="99to199">₹200 - ₹450</option>
              <option value="over299">Over ₹450</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
