// 📄 LoginPage.jsx
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500817487388-039e623edc21?fm=jpg&q=60&w=3000)' }}>
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Login to Wallpaperz</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-md bg-white/40 text-black placeholder-gray/80 focus:outline-none" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded-md bg-white/40 text-black placeholder-gray/80 focus:outline-none" />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-black py-2 rounded-md">Login</button>
        </form>
        <p className="text-sm text-black mt-4 text-center">
          Don't have an account? <Link to="/signup" className="underline text-blue-700">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}