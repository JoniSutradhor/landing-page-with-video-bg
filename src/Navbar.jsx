import React, { useState } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const Navbar = ({ bgStyle = "black" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`bg-${bgStyle}}`}>
      <div className="px-24">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <img
              src="https://bestinbd.com/projects/web/task/admin/uploads/page/test/1726300616NHRSW.svg"
              alt="Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {[
              "Home",
              "About Us",
              "Business Units",
              "Sustainability",
              "Media Center",
              "Career",
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className={`relative text-white group ${
                  item === "Home"
                    ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-100 after:origin-left'
                    : ""
                }`}
              >
                {item}
                {item !== "Home" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                )}
              </a>
            ))}
          </div>
          <div className="hidden md:block">
            <button className="flex items-center gap-2 text-white py-2 px-5 rounded-full bg-gray-900 ">
              <span>Contact</span>
              <ArrowOutwardIcon fontSize="small" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={handleMobileMenuToggle}
              className="text-white hover:text-gray-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              "Home",
              "About Us",
              "Business Units",
              "Sustainability",
              "Media Center",
              "Career",
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className="block px-3 py-2 rounded-md text-white hover:bg-gray-700"
              >
                {item}
              </a>
            ))}
            <a
              href="#"
              className="block px-3 py-2 mt-2 bg-white text-black rounded-md hover:bg-gray-200"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
