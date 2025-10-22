import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useThemeContext } from "../hooks/useThemeContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useWallContext } from "../hooks/useWallContext";

export default function Navbar() {
  const {user} = useAuthContext();
  const {logout} = useLogout();
  const {walls,allWalls,dispatch:wdispatch} = useWallContext();
  const {theme,dispatch} = useThemeContext();

  const [query,setQuery] = useState('');
  const cats = [...allWalls.map(x=>(x.category))];
  const def_walls = (structuredClone(walls))

  const handleEnterKey = () => {
      const filtered = allWalls.filter(w => 
        w.title.toLowerCase().includes(query.toLowerCase()) || 
        w.category.toLowerCase().includes(query.toLowerCase())
      );
  wdispatch({ type: "SETFWALLS", payload: filtered });
  }

  const handleCategory = (e) => {
    console.log(e.target.innerText)
    const cat = e.target.innerText;
    const filtered = allWalls.filter(w =>  
        w.category.toLowerCase().includes(cat.toLowerCase())
      );
    wdispatch({ type: "SETFWALLS", payload: filtered });
  }

  let [isDark,setIsDark] = useState(true);
  
  const handleThemechange = (e) => {
      if (isDark) {
        setIsDark(false)
        dispatch({type:"LIGHT"})
        localStorage.setItem('wall_theme','light')
      }
      else if (!isDark){
        setIsDark(true)
        dispatch({type:"DARK"})
        localStorage.setItem('wall_theme','dark')
      }
  }
  return (
    <nav className="nav-full w-full bg-conic/increasing from-violet-700 via-lime-300 to-violet-700 shadow-md px-4 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="text-2xl font-bold discov text-black">
        <Link to="/">Backgroundz</Link>
      </div>

      {/* Center: Search bar */}
      <div className="sbar flex-1 mx-4 max-w-xl">
        <input
          onChange={e=>setQuery(e.target.value)}
          value={query}
          onKeyDown={(e) => {
              if (e.key === 'Enter') {
                  handleEnterKey()
          }}}
          type="text"
          placeholder="Type anything/nothing & press Enter"
          className={`${theme === 'light' ? 'light' : 'dark'} dark:bg-black dark:text-white bg-white w-full border rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      </div>



      {/* Right: Dropdown, Upload, Auth */}
      <div className="flex items-center gap-4 drop_and_shit">
        
        <button className="cursor-pointer m-1">
            <img onClick={e=>{handleThemechange()}} src={isDark ? "/dark-icon.png" : "/light-icon.png"} alt="theme icon" />
        </button>

        <div>
          <div className="dropdown m-1">
              <button className="dropbtn rounded-2xl p-2 text-black font-bold">Categories</button>
              <div className="dropdown-content">
                {cats.map(w=>(
                  <a onClick={e=>handleCategory(e)} href="#">{w}</a>
                ))}
              </div>
          </div>

          {/* Upload Button */}
          <Link
            to="/upload"
            className="bg-blue-500 hover:bg-blue-600 text-black font-bold px-4 py-2 rounded-full transition m-1"
          >
            Upload
          </Link>
        </div>
        

        {/* Login/Logout Button */}
        <div>
          {user ? <>
                     <span className="px-4 py-2">{user._doc ? user._doc.name : user.name}</span>
                    <button
                      onClick={logout}
                      className="text-sm text-gray-700 hover:text-blue-500 font-bold"
                    >
                      Logout
                    </button>
                  </> : <>
                          <button>
                            Login
                          </button>
                        </>}
        </div>
      </div>
    </nav>
  );
}
