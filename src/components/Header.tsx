import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from "../photos/logo.png";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* <Link to="/" className="text-2xl font-bold text-[#8B5D33]">Mr. Bnut</Link> */}
            <Link to="/">
              <img
                src= {logo}
                alt="Mr. Bnut Logo"
                className="h-[100px] w-[100px]"
              />
              {/* Increased height */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="relative text-[#8B5D33] font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[2px] after:bg-[#A05A2C] after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-[#8B5D33] hover:text-[#6B4423] font-medium flex items-center">
                Shop <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link
                  to="/shop"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  All Products
                </Link>
                <Link
                  to="/shop"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Butter
                </Link>
                <Link
                  to="/shop"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Ladoo
                </Link>
              </div>
            </div>
            {/* <Link to="/about" className="relative text-[#8B5D33] font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[2px] after:bg-[#6B4423] after:transition-all after:duration-300 hover:after:w-full">About</Link> */}
            <Link
              to="/contact"
              className="relative text-[#8B5D33] font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[2px] after:bg-[#6B4423] after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="text-[#8B5D33] hover:text-[#6B4423] relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-[#8B5D33]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-[#8B5D33]">
            <img
                src= {logo}
                alt="Mr. Bnut Logo"
                className="h-[100px] w-[100px]"
              />
            </Link>
            <button
              className="text-[#8B5D33]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-[#8B5D33] text-lg font-medium py-2 border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-[#8B5D33] text-lg font-medium py-2 border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/contact"
                className="text-[#8B5D33] text-lg font-medium py-2 border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className="text-[#8B5D33] text-lg font-medium py-2 border-b border-gray-200 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
