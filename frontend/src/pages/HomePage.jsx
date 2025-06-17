import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useThemeContext } from '../hooks/useThemeContext';
import { useWallContext } from '../hooks/useWallContext';
import { useAuthContext } from '../hooks/useAuthContext';

// Placeholder wallpaper data - In a real app, you'd fetch this from an API
const wallpapers = [
    {id:9,url:'https://i.pinimg.com/736x/8e/e1/02/8ee102dc9e4b943e394cb65614d1ecfd.jpg',title:"Doom Guy",category:"Video Games"},
    {id:1,url:'https://i.pinimg.com/736x/2f/55/1c/2f551c9d3129929fc794ae6181abbe41.jpg',title:"Cartoon Car",category:"Cars"},
    {id:2,url:'https://i.pinimg.com/736x/67/64/68/6764681f045254f9f6b10c1a0872db4f.jpg',title:"Bridge",category:"Nature"},
    {id:3,url:'https://i.pinimg.com/736x/4b/2b/f1/4b2bf1b03186f8a169e31ff53bd8b5df.jpg',title:"Batman Dark",category:"DC"},
    {id:4,url:'https://i.pinimg.com/564x/c3/6f/df/c36fdf6f58dd9cc4c5912ad7e6030371.jpg',title:"Sekiro Ready",category:"Video Games"},
    {id:5,url:'https://i.pinimg.com/736x/7c/53/53/7c5353fd1bb39fba01bfc4cebfda62d7.jpg',title:"Superman",category:"DC"},
    {id:6,url:'https://i.pinimg.com/1200x/3e/f1/9d/3ef19db1bf547e3aca71fa7ca5ded071.jpg',title:"Spider Gang",category:"Marvel"},
    {id:7,url:'https://i.pinimg.com/736x/3c/b6/3d/3cb63dd352fe452b88c560e201925797.jpg',title:"AI Astronaut",category:"Space"},
    {id:8,url:'https://i.pinimg.com/originals/f3/fa/8e/f3fa8ecc2c3d924135086fe3b3b0836a.jpg',title:"City Sundown",category:"City Scapes"},
]
// Array.from({ length: 20 }, (_, i) => ({
//   id: i,
//   url: `https://i.pinimg.com/736x/2f/55/1c/2f551c9d3129929fc794ae6181abbe41.jpg`, // Random images for variety
//   title: `Wallpaper ${i + 1}`,
//   category: i % 2 === 0 ? 'Abstract' : 'Nature',
// }));

const HomePage = () => {
  const {walls,dispatch} = useWallContext();
  const {theme} = useThemeContext();
  const {user}  = useAuthContext();
  useEffect(()=>{
    const fetchAllWalls = async () => {
      const resp = await fetch('http://localhost:4000/api/walls',{headers:{"Authorization":`Bearer ${user.token}`}});
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
    <div className={`${theme === 'light' ? 'light' : 'dark'} mainshit min-h-screen dark:bg-gray-700 bg-white font-inter p-4 sm:p-6 lg:p-8`}>
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
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-6">
        {!walls && <p>No Wallpapers yet</p>}
        {walls && walls.map((wallpaper) => (
          <div
            key={wallpaper.id}
            className="w-63 h-112 group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
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
                <p className="text-white font-bold text-sm group-hover:translate-y-0 translate-y-full transition-transform duration-300 delay-150">
                  {wallpaper.category}
                </p>
                <button
                  className="cursor-pointer mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full text-sm shadow-md transition-all duration-300 transform group-hover:scale-100 scale-0 group-hover:translate-y-0 translate-y-full delay-200"
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