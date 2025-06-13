// 📄 LoginPage.jsx
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from 'react-icons/fc'
import {GoogleLoginButton} from '../components/GoogleLoginButton';
import {useLogin} from '../hooks/useLogin';

export default function LoginPage() {

  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  
  const {login,error,isloading} = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(name,password);
  }

  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 bg-center bg-fixed">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
        <button onClick={() => navigate('/')} className="absolute top-4 left-4 text-black font-bold underline">← Back</button>
        <h2 className="text-2xl font-bold text-black mb-6 text-center discov">Login to Wallpaperz</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
           onChange={e=>{setName(e.target.value)}}
           value={name}
           type="email" 
           placeholder="Email" 
           className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray/80 focus:outline-none" 
          />
          <input
           onChange={e=>{setPassword(e.target.value)}}
           value={password}
           type="password" 
           placeholder="Password" 
           className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray/80 focus:outline-none"
          />
          <button className="w-full bg-black hover:bg-blue-800 text-white py-2 rounded-md">Login</button>
        </form>
        {!isloading || <div>Please wait. The server response is slow.😭</div>}
        {error && <div className='text-red-500'>{error}</div>}
        <br/>
        <GoogleLoginButton/>
        <p className="text-sm text-black mt-4 text-center">
          Don't have an account? <Link to="/signup" className="underline text-blue-700">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}