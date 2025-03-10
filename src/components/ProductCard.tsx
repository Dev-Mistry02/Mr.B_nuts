import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, Product } from '../context/CartContext';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {


  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  
  return (
    <div 
      onClick={handleClick}
      className="bg-balck rounded-lg overflow-hidden shadow-md hover:shadow-xxl transition-all duration-300 cursor-pointer group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64.5 object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-[#8B5D33] transition-colors">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#8B5D33]">₹{product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-[#8B5D33] text-white px-4 py-2 rounded hover:bg-[#6B4423] transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
