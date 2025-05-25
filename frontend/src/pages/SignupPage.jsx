// 📄 SignupPage.jsx
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(https://wallpapers.com/images/hd/nebula-purple-space-iw0zzy8czk9oz5yx.jpg)' }}>
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create an Account</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Username" className="w-full px-4 py-2 rounded-md bg-white/40 text-white placeholder-white/80 focus:outline-none" />
          <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-md bg-white/40 text-white placeholder-white/80 focus:outline-none" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded-md bg-white/40 text-white placeholder-white/80 focus:outline-none" />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">Sign Up</button>
        </form>
        <p className="text-sm text-white mt-4 text-center">
          Already have an account? <Link to="/login" className="underline text-blue-300">Login</Link>
        </p>
      </div>
    </div>
  );
}