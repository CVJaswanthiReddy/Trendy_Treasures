import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryList from "./CategoryList";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

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

// Carousel Component defined within Header
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
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center text-center justify-center text-white px-4">
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
    <>
      <div>
        {/* Carousel Section */}
        <section className="carousel-container">
          <Carousel data={slidesData} />
        </section>
        <CategoryList />
      </div>
    </>
  );
};

export default Header;
