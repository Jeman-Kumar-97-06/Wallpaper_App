import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage2() {
  const images = [
    "https://wallpapers.com/images/hd/4k-android-blue-green-shore-z3cftk0apksilm31.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5JMUKynWNp9W09jSchaq1rKPCDghOnCiug&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAdOi7FVB3avk8GMEuTOAI3Ty9VSVV0JTgXw&s",
    "https://images.unsplash.com/photo-1500817487388-039e623edc21?fm=jpg&q=60&w=3000",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const getIndex = (offset) => {
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
              className={`object-cover transition-all duration-700 rounded-xl shadow-lg ${
                idx === 1
                  ? "w-[300px] h-[600px] scale-105 z-10"
                  : "w-[150px] h-[300px] opacity-50 blur-sm"
              }`}
            />
          ))}
        </div>

        {/* Hero Text */}
        <h2 className="discov text-shadow-lg text-4xl z-10 sm:text-5xl font-extrabold text-[white] mt-3 mb-4">Discover & Share Stunning Wallpapers</h2>
        <p className="text-shadow-lg text-lg z-10 font-bold text-white mb-8">Browse, upload, and download stunning mobile wallpapers — all in one place.</p>
        
        <Link to="/login" className="bg-black text-white font-bold px-6 py-3 rounded-full text-lg hover:bg-blue-800 transition">Explore Wallpapers</Link>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-white text-center py-3 text-sm text-black font-bold">
        &copy; {new Date().getFullYear()} Wallpaperz. All rights reserved.
      </footer>
    </div>
  );
}
