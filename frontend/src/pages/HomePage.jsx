import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useThemeContext } from '../hooks/useThemeContext';
import { useWallContext } from '../hooks/useWallContext';
import { useAuthContext } from '../hooks/useAuthContext';



const HomePage = () => {
  const {walls,dispatch} = useWallContext();
  const {theme} = useThemeContext();
  const {user}  = useAuthContext();


  useEffect(()=>{
    const fetchAllWalls = async () => {
      const resp = await fetch('https://wallpaperappbackend-production.up.railway.app/api/walls',{headers:{"Authorization":`Bearer ${user.token}`}});
      const wap  = await resp.json();
      if (resp.ok) {
        dispatch({type:"SETWALLS",payload:wap})
      }
    }
    if (user) {
      fetchAllWalls();
    }
  },[dispatch,user])

  return (
    <div className={`${theme === 'light' ? 'light' : 'dark'} mainshit min-h-screen dark:bg-gray-800 bg-white font-inter p-4 sm:p-6 lg:p-8`}>
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl discov font-extrabold dark:text-white text-black mb-2">
          Explore Wallpapers
        </h1>
        <p className="text-lg sm:text-xl dark:text-white text-black">
          A curated collection of stunning wallpapers for your device.
        </p>
      </header>

      {/* Wallpapers Grid */}
      <section className="wall_grid grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-6">
        {!walls && <p>No Wallpapers yet</p>}
        {walls && walls.map((wallpaper) => (
          <div
            key={wallpaper.id}
            className="wall_p_grid w-63 h-112 group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
          >
            {/* Wallpaper Image */}
            <img
              src={wallpaper.wall}
              alt={wallpaper.title}
              className="w-63 h-112 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = `https://placehold.co/400x600/cccccc/333333?text=Error`; // Placeholder on error
              }}
            />

            {/* Overlay for details/actions on hover */}
            <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full  hover:bg-linear-to-t from-gray-700 via-transparent to-black flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="p-4 text-center w-full">
                <h3 className="text-white text-xl font-semibold mb-1 group-hover:translate-y-0 translate-y-full transition-transform duration-300 delay-100">
                  {wallpaper.title}
                </h3>
                <p className='text-white italic mb-1 group-hover:translate-y-0 translate-y-full transition-transform duration-300 delay-130'>
                    {`-- by ${wallpaper.user_id.name}`}
                </p>
                <p className="text-white font-bold mb-1 text-sm group-hover:translate-y-0 translate-y-full transition-transform duration-300 delay-150">
                  {wallpaper.category}
                </p>
                <a
                  className="cursor-pointer mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full text-sm shadow-md transition-all duration-300 transform group-hover:scale-100 scale-0 group-hover:translate-y-0 translate-y-full delay-200"
                  href={wallpaper.wall}
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;