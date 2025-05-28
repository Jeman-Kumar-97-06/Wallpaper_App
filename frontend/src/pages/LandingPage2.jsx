import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage2() {
  const images = [
    "https://i.pinimg.com/736x/2f/55/1c/2f551c9d3129929fc794ae6181abbe41.jpg",
    "https://i.pinimg.com/736x/67/64/68/6764681f045254f9f6b10c1a0872db4f.jpg",
    "https://i.pinimg.com/736x/4b/2b/f1/4b2bf1b03186f8a169e31ff53bd8b5df.jpg",
    "https://i.pinimg.com/564x/c3/6f/df/c36fdf6f58dd9cc4c5912ad7e6030371.jpg",
    "https://i.pinimg.com/736x/7c/53/53/7c5353fd1bb39fba01bfc4cebfda62d7.jpg",
    "https://i.pinimg.com/1200x/3e/f1/9d/3ef19db1bf547e3aca71fa7ca5ded071.jpg",
    "https://i.pinimg.com/736x/3c/b6/3d/3cb63dd352fe452b88c560e201925797.jpg",
    "https://i.pinimg.com/originals/f3/fa/8e/f3fa8ecc2c3d924135086fe3b3b0836a.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },2000);
    return () => clearInterval(interval);
  }, [images.length]);

  const getIndex = (offset) => {
    console.log((currentIndex + offset + images.length) % images.length)
    return (currentIndex + offset + images.length) % images.length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700">
      {/* Navbar */}
      {/* <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white z-10 relative">
        <h1 className="text-2xl font-bold text-blue-600">Wallpaperz</h1>
        <div className="space-x-4">
          <Link to="/upload" className="text-gray-700 hover:text-blue-500">Upload</Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
        </div>
      </nav> */}

      {/* Hero Section with focused slideshow */}
      <div className="mt-15 relative flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="flex items-center justify-center gap-4 h-[400px] z-0">
          {[getIndex(-1), currentIndex, getIndex(1)].map((i, idx) => (
            <img
              key={i}
              src={images[i]}
              alt={`Wallpaper ${i}`}
              className={`object-cover transition-all duration-300 rounded-xl shadow-lg ${
                idx === 1
                  ? "w-[300px] h-[600px] scale-105 z-10"
                  : "w-[150px] h-[300px] opacity-50 blur-sm"
              }`}
            />
          ))}
        </div>

        {/* Hero Text */}
        <h2 className="discov text-shadow-lg text-4xl z-10 sm:text-5xl font-extrabold mt-3 mb-4"><span className="text-blue-500">Discover</span> & <span className="text-green-500">Share</span> <span className="text-red-500">Stunning</span> <span className="text-white">Wallpapers</span></h2>
        <p className="text-shadow-lg text-lg z-10 font-bold text-white mb-8">Browse, upload, and download stunning mobile wallpapers — all in one place.</p>
        
        <Link to="/home" className="bg-black text-white font-bold px-6 py-3 rounded-full text-lg hover:bg-blue-800 transition">Explore Wallpapers</Link>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-white text-center py-3 text-sm text-black font-bold">
        &copy; {new Date().getFullYear()} Wallpaperz. All rights reserved.
      </footer>
    </div>
  );
}
