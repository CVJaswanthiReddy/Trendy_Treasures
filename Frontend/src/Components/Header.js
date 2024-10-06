import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { GiRunningShoe, GiTShirt } from "react-icons/gi"; // Additional icons for categories
import { SiNike, SiAdidas, SiPuma, SiZara } from "react-icons/si"; // Use icons from Simple Icons

// Carousel Data
const slidesData = [
  {
    src: "https://themewagon.github.io/famms/images/slider-bg.jpg",
    alt: "Image 1 for carousel",
    heading: "We Picked Every Item With Care",
    subheading: "You Must Try",
    buttonText: "Go To Collection",
    buttonLink: "/collection",
  },
  {
    src: "https://themewagon.github.io/famms/images/arrival-bg.png",
    alt: "Image 2 for carousel",
    heading: "#New Arrivals",
    subheading: "Discover the latest trends and styles",
    buttonText: "Shop Now",
    buttonLink: "/new-arrivals",
  },
  {
    src: "https://picsum.photos/seed/img3/600/400",
    alt: "Image 3 for carousel",
    heading: "Get Ready for the Season",
    subheading: "Limited Time Offers",
    buttonText: "Explore Offers",
    buttonLink: "/offers",
  },
];

// Carousel Component
const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="relative flex justify-center items-center w-full h-[600px]">
      <BsArrowLeftCircleFill
        onClick={prevSlide}
        className="absolute left-4 text-white text-3xl cursor-pointer z-10"
      />

      {data.map((item, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            slide === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover rounded-md"
          />
          <div
            className={`absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center text-center justify-center text-white px-4`}
          >
            <h1 className="text-4xl font-bold mb-4">{item.heading}</h1>
            <p className="text-lg mb-4">{item.subheading}</p>
            <Link
              to={item.buttonLink}
              className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-300"
            >
              {item.buttonText}
            </Link>
          </div>
        </div>
      ))}

      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="absolute right-4 text-white text-3xl cursor-pointer z-10"
      />

      <div className="absolute bottom-4 flex space-x-2">
        {data.map((_, idx) => (
          <button
            key={idx}
            className={`h-2 w-2 rounded-full transition-colors ${
              slide === idx ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setSlide(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <div>
      {/* Header Section */}
      <header className="bg-white shadow-lg p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left: Logo */}
          <div className="text-xl font-bold text-gray-800">
            <Link to="/">Trendy Treasures</Link>
          </div>
          {/* Center: Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link
              to="/products/men"
              className="text-gray-600 hover:text-gray-900"
            >
              Men
            </Link>
            <Link
              to="/products/women"
              className="text-gray-600 hover:text-gray-900"
            >
              Women
            </Link>
            <Link
              to="/products/kids"
              className="text-gray-600 hover:text-gray-900"
            >
              Kids
            </Link>
            <Link
              to="/products/footwear"
              className="text-gray-600 hover:text-gray-900"
            >
              Footwear
            </Link>
            <Link
              to="/products/accessories"
              className="text-gray-600 hover:text-gray-900"
            >
              Accessories
            </Link>
            <Link to="/search" className="text-gray-600 hover:text-gray-900">
              Search
            </Link>
          </nav>

          {/* Right: Cart and Profile */}
          <div className="flex space-x-4">
            <Link
              to="/cart"
              className="text-gray-600 hover:text-gray-900 relative"
            >
              <FaShoppingCart className="text-xl" />
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-gray-900">
              <FaUserCircle className="text-xl" />
            </Link>
          </div>
        </div>
      </header>

      {/* Carousel Section */}
      <section className="carousel-container">
        <Carousel data={slidesData} />
      </section>

      {/* Shop by Category */}
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Shop by Category
        </h2>
        <div className="flex justify-around">
          <div className="text-center">
            <GiTShirt className="text-5xl mx-auto mb-2" />
            <Link to="/products/men" className="text-lg font-semibold">
              Men
            </Link>
          </div>
          <div className="text-center">
            <GiTShirt className="text-5xl mx-auto mb-2" />
            <Link to="/products/women" className="text-lg font-semibold">
              Women
            </Link>
          </div>
          <div className="text-center">
            <GiTShirt className="text-5xl mx-auto mb-2" />
            <Link to="/products/kids" className="text-lg font-semibold">
              Kids
            </Link>
          </div>
          <div className="text-center">
            <GiRunningShoe className="text-5xl mx-auto mb-2" />
            <Link to="/products/footwear" className="text-lg font-semibold">
              Footwear
            </Link>
          </div>
          <div className="text-center">
            <GiRunningShoe className="text-5xl mx-auto mb-2" />
            <Link to="/products/accessories" className="text-lg font-semibold">
              Accessories
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Brand */}
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Shop by Brand</h2>
        <div className="flex justify-around">
          <div className="text-center">
            <SiNike className="text-5xl mx-auto mb-2" />
            <Link to="/brands/nike" className="text-lg font-semibold">
              Nike
            </Link>
          </div>
          <div className="text-center">
            <SiAdidas className="text-5xl mx-auto mb-2" />
            <Link to="/brands/adidas" className="text-lg font-semibold">
              Adidas
            </Link>
          </div>
          <div className="text-center">
            <SiPuma className="text-5xl mx-auto mb-2" />
            <Link to="/brands/puma" className="text-lg font-semibold">
              Puma
            </Link>
          </div>
          <div className="text-center">
            <SiZara className="text-5xl mx-auto mb-2" />
            <Link to="/brands/zara" className="text-lg font-semibold">
              Zara
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
