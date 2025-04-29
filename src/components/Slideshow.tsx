"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = ["/image/siam.jpg","/image/siam.jpg", "/image/siam.jpg"];

const Slideshow = ({ navHeight }: { navHeight: number }) => {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const goToPrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="relative w-full h-64 sm:h-80 md:h-[28rem] overflow-hidden rounded-lg shadow-lg"
      style={{ marginTop: `${navHeight}px` }}
    >
      {/* Image */}
      <div className="w-full h-full relative">
        <Image
          src={images[currentImage]}
          alt={`Slide ${currentImage}`}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-700"
        />
      </div>

      {/* Left Button */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-3xl text-white bg-black/40 p-2 rounded-full hover:bg-black/60 transition"
        aria-label="Previous Slide"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-3xl text-white bg-black/40 p-2 rounded-full hover:bg-black/60 transition"
        aria-label="Next Slide"
      >
        ❯
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 w-full flex justify-center space-x-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              currentImage === i ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;