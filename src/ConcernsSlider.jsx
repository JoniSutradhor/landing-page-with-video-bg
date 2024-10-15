import React, { useContext, useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { DataContext } from "./contexts/DataContext";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const ConcernCard = ({ concern, isHovered }) => {
  return (
    <div
      className={`group relative p-4 bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-lg h-64`}
    >
      <div
        className={`relative z-10 flex flex-col justify-between h-full ${
          isHovered ? "opacity-0" : "group-hover:opacity-0"
        } transition-opacity duration-300 ease-out`}
      >
        <div className="flex">
          <img
            src={concern?.images[0]?.full_path}
            alt={concern?.images[0]?.img_alt}
            className="w-20 h-20 object-contain"
          />
        </div>
        <div>
          <p className="text-sm text-gray-600">{concern?.data?.short_desc}</p>
        </div>
      </div>
      <div
        className={`absolute inset-0 flex flex-col justify-between p-4 text-white ${
          isHovered ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100 transition-opacity duration-300 ease-out z-20`}
      >
        <div>
          <h3 className="text-lg font-semibold">{concern?.data?.title}</h3>
        </div>
        <div>
          <p className="text-sm">{concern?.data?.short_desc}</p>
        </div>
      </div>
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transform ${
          isHovered ? "translate-y-0" : "translate-y-full"
        } group-hover:translate-y-0 transition-transform duration-500 ease-out`}
        style={{ backgroundImage: `url(${concern?.images[1]?.full_path})` }}
      ></div>
    </div>
  );
};

const ConcernsSlider = () => {
  const { data } = useContext(DataContext);
  const sliderRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const sliderData =
    data?.data?.sections.filter(
      (section) => section?.section_data?.template === "concerns"
    )[0] || {};

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => {
      setHoveredIndex(next);
    },
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  useEffect(() => {
    setHoveredIndex(0);
  }, []);

  return (
    <div className="container mx-auto px-24 py-44">
      <div className="w-full h-1 bg-gray-200 mb-4">
        <div className="h-full bg-orange-500 w-1/12"></div>
      </div>
      <div className="flex justify-between pb-16">
        <h2 className="text-5xl font-bold">Our Concerns</h2>
        <div className="flex items-start gap-4">
          <div className="flex space-x-2">
            <button
              onClick={handlePrevClick}
              className="text-gray-300 hover:text-gray-400 p-2 rounded-full border-2 border-gray-300 hover:border-gray-400"
            >
              <FaArrowLeft size={16} />
            </button>
            <button
              onClick={handleNextClick}
              className="text-gray-300 hover:text-gray-400 p-2 rounded-full border-2 border-gray-300 hover:border-gray-400"
            >
              <FaArrowRight size={16} />
            </button>
          </div>

          <button className="flex items-center gap-2 text-gray-300 hover:text-gray-400 py-1 px-3 rounded-full border-2 border-gray-300 hover:border-gray-400">
            <span>View All</span>
            <ArrowOutwardIcon fontSize="small" />
          </button>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {sliderData?.posts?.list.map((concern, index) => (
          <ConcernCard
            key={index}
            concern={concern}
            isHovered={index === hoveredIndex}
          />
        ))}
      </Slider>
    </div>
  );
};

export default ConcernsSlider;
