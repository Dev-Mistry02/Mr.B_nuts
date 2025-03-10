import React from "react";
import { Link } from "react-router-dom";
// import { useCart } from '../context/CartContext';
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import WhyChooseUs from "../photos/WhyYouChooseUs.jpg";
import WhyChooseUs2 from "../photos/WhyYouChooseUs2.jpg";
import bg from "../photos/bg2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import GoogleReviews from "../components/GoogleReviews";


const Home: React.FC = () => {
  // Get the first 3 products for the featured section
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={bg} alt="Honey" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {" "}
            Homemade Natuarl Food Products.
          </h1>
          <p className="text-xl text-white mb-6">
            Pure, Nutritious, and Fresh – Peanut Butter Like Never Before!
          </p>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            <strong>Tasty & Healthy + Natural</strong>
          </p>
          <Link
            to="/shop"
            className="inline-block bg-[#8B5D33] text-white px-8 py-3 rounded-md font-medium hover:bg-[#6B4423] transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#8B5D33]">
            Our Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-block border-2 border-[#8B5D33] text-[#8B5D33] px-8 py-3 rounded-md font-medium hover:bg-[#8B5D33] hover:text-white transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div
              className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8"
              data-aos="zoom-in-right"
            >
              {/* Swiper Carousel with Autoplay & Pagination */}
              <Swiper
                autoplay={{ delay: 3000 }} // Auto swipe every 3 sec
                pagination={{ clickable: true }} // Adds dots for mobile users
                modules={[Navigation, Autoplay, Pagination]}
                className="rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-full h-auto"
              >
                <SwiperSlide>
                  <img
                    src={WhyChooseUs}
                    alt="Peanut Butter Process"
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={WhyChooseUs2}
                    alt="Fresh Peanut Butter"
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#8B5D33]">
                Why Choose Us?
              </h2>
              <p className="text-gray-700 mb-4 px-2 sm:px-0">
                At <strong>Mr. Bnut</strong>, we prioritize quality over speed.
                Unlike factory-made peanut butter that takes an hour to produce
                in bulk, our handcrafted process ensures that{" "}
                <strong>
                  every 10 kg is freshly made within an hour without
                  compromising on nutrition.
                </strong>
                Our low-heat processing technique helps retain up to 45% more
                nutrients and health benefits of peanuts. We believe in
                delivering pure, wholesale, and nutrient-packed peanut butter,
                free from unnecessary additives. Choose us for a healthier,
                tastier, and more authentic peanut butter experience!
              </p>
              <a
                href="/shop"
                className="inline-block bg-[#8B5D33] text-white px-6 py-3 rounded-md font-medium hover:bg-[#6B4423] transition-colors"
              >
                Place Order Now !!
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div>
          <h1 className="text-center text-2xl font-bold mb-4">
            Customer Reviews
          </h1>
          <GoogleReviews />
        </div>
      </section>
    </div>
  );
};

export default Home;
