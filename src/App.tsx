import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollTop";
import Loader from "./components/Loader";
import WelcomeOverlay from "./components/WelcomeOverlay";


function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust loading duration if needed

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
        <WelcomeOverlay />
        {loading && <Loader />} {/* Show loader when loading */}
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        {/* <GoogleReviews /> */}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
