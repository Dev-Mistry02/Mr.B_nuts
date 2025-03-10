import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Phone } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import logo from "../photos/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h1 className="text-xl mb-0">
              <Link to="/">
                <img
                  src={logo}
                  alt="Mr. Bnut Logo"
                  className="h-20 w-auto relative "
                />
                {/* Increased height */}
              </Link>
            </h1>
            <p className="text-gray-400 mb-4">
              Pure, raw, and Purified Butter straight from our Peanut to your
              table.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Shop(Factory)</h4>
            <ul className="space-y-2">
              <li>
                <p className="text-gray-400">
                  {" "}
                  LL7 , green park appartment, Collage road, Gauharbag, Billimora
                  396321
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              Source Of Communication
            </h4>
            <p className="text-gray-400 mb-4">
              Follow us on Social Media for more updates !
            </p>
            <ul className="space-y-2">
              <div className="flex space-x-4">
                <a
                  href="https://wa.me/+916355972287?text=Hello"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <BsWhatsapp className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/mr.b_nuts?igsh=MXAxY2trZTl1YjF6cQ==" target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="tel:+916355972287"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="h-6 w-6" />
                </a>
              </div>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/Contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {" "}
                  Need Help?
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Mr. Bnut . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
