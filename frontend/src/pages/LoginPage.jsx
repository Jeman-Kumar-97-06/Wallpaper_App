// 📄 LoginPage.jsx
import { Link,useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 bg-center bg-fixed">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
        <button onClick={() => navigate('/')} className="absolute top-4 left-4 text-black font-bold underline">← Back</button>
        <h2 className="text-2xl font-bold text-black mb-6 text-center discov">Login to Wallpaperz</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-md bg-white/40 text-black placeholder-gray/80 focus:outline-none" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded-md bg-white/40 text-black placeholder-gray/80 focus:outline-none" />
          <button className="w-full bg-black hover:bg-blue-800 text-white py-2 rounded-md">Login</button>
        </form>
        <p className="text-sm text-black mt-4 text-center">
          Don't have an account? <Link to="/signup" className="underline text-blue-700">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}