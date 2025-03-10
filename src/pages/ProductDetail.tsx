import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import {
  ArrowLeft,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyForm, setBuyForm] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
  });

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Product not found
          </h1>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 inline-flex items-center text-[#8B5D33] hover:text-[#6B4423]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const allImages = [product.image, ...(product.gallery || [])];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const previousImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  const handleBuySubmit = () => {

    // Create order message
    const orderMessage = `New Order! \n\nCustomer Details:\nName: ${buyForm.name}\nPhone: ${buyForm.phone
    }\nAddress: ${buyForm.address}\n\nProduct: ${product.name}\nPrice: ₹${product.price.toFixed(2)}(Qty: ${buyForm.quantity})\n\nTotal:₹${product.price*buyForm.quantity}`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(orderMessage);

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/+916355972287?text=${encodedMessage}`, "_blank");

    // Close modal
    setShowBuyModal(false);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate("/shop")}
          className="inline-flex items-center text-[#8B5D33] hover:text-[#6B4423] mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative group mb-4">
              <img
                src={allImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>

              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative rounded-md overflow-hidden ${
                    selectedImageIndex === index ? "ring-2 ring-[#8B5D33]" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-black ${
                      selectedImageIndex === index ? "opacity-0" : "opacity-40"
                    } transition-opacity duration-300`}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <p className="text-2xl font-bold text-[#8B5D33] mb-6">
              ₹{product.price.toFixed(2)}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-600">
                <Truck className="h-5 w-5 mr-2" />
                <span>Free shipping on orders.</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Shield className="h-5 w-5 mr-2" />
                <span>100% pure and natural Peanuts.</span>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setShowBuyModal(true)}
                className="flex-1 bg-white border-2 text-[#8B5D33] py-3 px-6 rounded-md font-medium hover:bg-green-600 hover:text-white transition-colors transform duration-200"
              >
                Buy Now
              </button>
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-[#8B5D33] text-white py-3 px-6 rounded-md font-medium hover:bg-[#6B4423] transition-colors transform  duration-200"
              >
                Add to Cart
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">Source</h3>
                  <p className="text-gray-600">
                    Made From 100% pure and roasted Peanuts!
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Size</h3>
                  <p className="text-gray-600">Mentioned At Title</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Storage</h3>
                  <p className="text-gray-600">
                    Store in a cool, dry place. Refrigeration needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      <AnimatePresence>
        {showBuyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowBuyModal(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Buy Now</h3>
                <button
                  onClick={() => setShowBuyModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleBuySubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={buyForm.name}
                    onChange={(e) =>
                      setBuyForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={buyForm.phone}
                    onChange={(e) =>
                      setBuyForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    required
                    value={buyForm.address}
                    onChange={(e) =>
                      setBuyForm((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
                    placeholder="Enter your complete delivery address"
                  />
                </div>

                <div>
                  <label className="block mb-4">
                    Quantity:
                    <input
                      type="number"
                      required
                      min="1"
                      value={buyForm.quantity}
                      onChange={(e) =>
                        setBuyForm({
                          ...buyForm,
                          quantity: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded mt-1"
                      placeholder="Enter quantity"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8B5D33] text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
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

export default ProductDetail;
