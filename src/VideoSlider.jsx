import React, { useState, useEffect, useContext } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Navbar from "./Navbar";
import { DataContext } from "./contexts/DataContext";

const VideoSlider = () => {
  const { data } = useContext(DataContext);

  const sliderData =
    data?.data?.sections.filter(
      (section) => section?.section_data?.template === "slider_template"
    )[0] || {};

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = sliderData?.posts?.list?.length || 0;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prevSlide) => prevSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prevSlide) => prevSlide - 1);
    }
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 10000);
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const isVideo = (slide) => {
    const videoExtensions = [".mp4", ".webm", ".ogg"];
    return videoExtensions.some((ext) =>
      slide?.images[0]?.full_path?.includes(ext)
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {sliderData?.posts?.list?.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ transition: "opacity 0.5s ease-in-out" }}
        >
          {isVideo(slide) ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              src={slide?.images[0]?.full_path}
            />
          ) : (
            <img
              className="w-full h-full object-cover"
              src={slide?.images[0]?.full_path}
              alt={slide?.data?.title}
            />
          )}
          <div className="absolute inset-0 z-20 text-white">
            <Navbar bgStyle={"transparent"} />

            <div className="flex flex-col h-full justify-evenly px-24">
              <div className="">
                <p className="text-sm mb-2">{slide?.data?.title}</p>
                <h1
                  className="text-6xl font-semibold leading-tight mb-4"
                  dangerouslySetInnerHTML={{ __html: slide?.data?.subtitle }}
                ></h1>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-2xl">{`${
                  currentSlide + 1 < 10
                    ? `0${currentSlide + 1}`
                    : currentSlide + 1
                }`}</div>
                <div className="relative w-full h-1 bg-white bg-opacity-30">
                  <div
                    className="h-full bg-white transition-all duration-1000"
                    style={{
                      width: `${((currentSlide + 1) / totalSlides) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <button
                      onClick={prevSlide}
                      className={`text-white hover:text-gray-400 ${
                        currentSlide === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={currentSlide === 0}
                    >
                      <FaArrowLeft size={24} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className={`ml-2 text-white hover:text-gray-400 ${
                        currentSlide === totalSlides - 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={currentSlide === totalSlides - 1}
                    >
                      <FaArrowRight size={24} />
                    </button>
                  </div>
                  <div>
                    <p
                      className="text-sm text-white"
                      dangerouslySetInnerHTML={{
                        __html: slide?.data?.short_desc,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoSlider;
