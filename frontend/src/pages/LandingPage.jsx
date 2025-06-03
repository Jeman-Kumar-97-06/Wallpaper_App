import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import { useThemeContext } from "../hooks/useThemeContext";

export default function LandingPage() {
  const images = [
    "https://wallpapers.com/images/hd/4k-android-blue-green-shore-z3cftk0apksilm31.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5JMUKynWNp9W09jSchaq1rKPCDghOnCiug&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAdOi7FVB3avk8GMEuTOAI3Ty9VSVV0JTgXw&s",
    "https://images.unsplash.com/photo-1500817487388-039e623edc21?fm=jpg&q=60&w=3000",
  ];

  const {theme} = useThemeContext();

  useEffect(()=>{

    let sessionToken = localStorage.getItem('theme');
    
    if (!sessionToken) {
      sessionToken = theme;
      localStorage.setItem('theme',sessionToken);
    }
  },[theme])

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-800 text-white">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`wallpaper ${i}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            loading="lazy"
          />
        ))}
        <div className="absolute inset-0 bg-grey-300 bg-opacity-40" />
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 relative z-20 bg-white/55 backdrop-blur-md rounded-b-md">
        <h1 className="text-2xl font-bold text-black">Wallpaperz</h1>
        <div className="space-x-4">
          <Link to="/login" className="hover:text-shadow-black text-black">Login</Link>
          <Link to='/signup' className='hover:text-shadow-black text-black'>Signup</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-20 text-center mt-24 px-6">
        <h2 className="text-4xl text-white text-shadow-black sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Discover & Share Stunning Wallpapers
        </h2>
        <p className="text-lg text-white font-bold mb-6 drop-shadow-sm">
          Browse a wide collection of high-quality wallpapers for your desktop and mobile.
        </p>
        <Link
          to="/explore"
          className="bg-[#B2CD9C] hover:bg-[#B2CD9C] text-black px-6 py-3 rounded-full text-lg font-bold transition"
        >
          Explore Wallpapers
        </Link>
      </header>

      {/* Features Section */}
      <section className="relative z-20 mt-24 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <Feature
          title="Curated Collections"
          description="Browse handpicked wallpapers by category and tone."
        />
        <Feature
          title="Upload & Share"
          description="Join our creative community and share your own art."
        />
        <Feature
          title="Free Downloads"
          description="Download wallpapers in HD and 4K without paywalls."
        />
      </section>

      {/* Footer */}
      <footer className="fixed w-[100%] z-20 bottom-0 text-center font-bold py-4 text-sm mt-24 bg-white/55 backdrop-blur-md text-black">
        &copy; {new Date().getFullYear()} Wallpaperz. All rights reserved.
      </footer>
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className="bg-white/55 backdrop-blur-md p-6 rounded-xl text-black shadow-lg hover:shadow-2xl transition">
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
