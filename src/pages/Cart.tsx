import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: ''
  });
  
  // Format price to USD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create order message
    const orderMessage = `New Order!\n\nCustomer Details:\nName: ${checkoutForm.name}\nPhone: ${checkoutForm.phone}\nAddress: ${checkoutForm.address}\n\nOrder Details:\n${cart.map(item => `${item.name} x ${item.quantity} - ${formatPrice(item.price * (item.quantity || 1))}`).join('\n')}\n\nTotal: ${formatPrice(getCartTotal())}`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(orderMessage);
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/+916355972287?text=${encodedMessage}`, '_blank');
    
    // Close modal
    setShowCheckoutModal(false);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-[#8B5D33] mb-8">Your Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/shop" 
              className="inline-block bg-[#8B5D33] text-white px-6 py-3 rounded-md font-medium hover:bg-[#6B4423] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#8B5D33] mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Cart Items ({getCartCount()})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200" >
                {cart.map(item => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                    <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="sm:ml-6 flex-grow">
                      <div className="flex justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="font-semibold text-[#8B5D33]">{formatPrice(item.price)}</p>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 text-gray-800">{item.quantity || 1}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-gray-200">
                <Link 
                  to="/shop" 
                  className="inline-flex items-center text-[#8B5D33] hover:text-[#6B4423] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-lg text-[#8B5D33]">{formatPrice(getCartTotal())}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowCheckoutModal(true)}
                className="w-full bg-[#8B5D33] text-white py-3 rounded-md font-medium hover:bg-[#6B4423] transition-colors mb-4"
              >
                Proceed to Checkout
              </button>
              
              <div className="text-sm text-gray-500 space-y-2">
                <p>We accept:</p>
                <div className="flex space-x-2">
                  <div className="bg-gray-100 rounded px-2 py-1">UPI</div>
                  {/* <div className="bg-gray-100 rounded px-2 py-1">Cash On Delivery</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Checkout</h3>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    required
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
                    placeholder="Enter your complete delivery address"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8B5D33] text-white py-3 rounded-md font-medium hover:bg-[#6B4423] transition-colors"
                >
                  Place Order via WhatsApp
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;