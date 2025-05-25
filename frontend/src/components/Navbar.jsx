import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">Wallpaperz</Link>
      </div>

      {/* Center: Search bar */}
      <div className="flex-1 mx-4 max-w-xl">
        <input
          type="text"
          placeholder="Search wallpapers..."
          className="w-full border rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Right: Dropdown, Upload, Auth */}
      <div className="flex items-center gap-4">
        {/* Categories Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
            Categories <ChevronDown size={18} />
          </button>
          <ul className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-md py-2 w-40 z-10">
            {["Nature", "Tech", "Abstract", "Animals"].map((cat) => (
              <li key={cat}>
                <Link
                //   to={`/category/${cat.toLowerCase()}`}
                  to='/'
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Upload Button */}
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
        >
          Upload
        </Link>

        {/* Login/Logout Button */}
        <button
          onClick={handleLoginLogout}
          className="text-sm text-gray-700 hover:text-blue-500"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}
