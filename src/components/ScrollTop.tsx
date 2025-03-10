import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-[#8B5D33] text-white p-3 rounded-full shadow-lg transition-all z-50 duration-300 hover:bg-[#6B4423] ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      <FaArrowUp className="text-xl" />
    </button>
  );
};

export default ScrollToTop;
