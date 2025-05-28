import React from 'react';
import Navbar from '../components/Navbar';

// Placeholder wallpaper data - In a real app, you'd fetch this from an API
const wallpapers = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  url: `https://source.unsplash.com/random/400x600/?android-wallpaper,${i}`, // Random images for variety
  title: `Wallpaper ${i + 1}`,
  category: i % 2 === 0 ? 'Abstract' : 'Nature',
}));

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-900 dark:text-gray-100 font-inter p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl discov font-extrabold text-indigo-700 text-white mb-2">
          Explore Wallpapers
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
          A curated collection of stunning wallpapers for your device.
        </p>
      </header>

      {/* Wallpapers Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-6">
        {wallpapers.map((wallpaper) => (
          <div
            key={wallpaper.id}
            className="w-63 h-112 group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
          >
            {/* Wallpaper Image */}
            <img
              src={wallpaper.url}
              alt={wallpaper.title}
              className="w-63 h-112 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = `https://placehold.co/400x600/cccccc/333333?text=Error`; // Placeholder on error
              }}
            />

            {/* Overlay for details/actions on hover */}
            <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="p-4 text-center w-full">
                <h3 className="text-white text-xl font-semibold mb-1 group-hover:translate-y-0 translate-y-full transition-transform duration-300 delay-100">
                  {wallpaper.title}
                </h3>
                <p className="text-gray-300 text-sm group-hover:translate-y-0 translate-y-full transition-transform duration-300 delay-150">
                  {wallpaper.category}
                </p>
                <button
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full text-sm shadow-md transition-all duration-300 transform group-hover:scale-100 scale-0 group-hover:translate-y-0 translate-y-full delay-200"
                  onClick={() => console.log(`Download ${wallpaper.title}`)}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;