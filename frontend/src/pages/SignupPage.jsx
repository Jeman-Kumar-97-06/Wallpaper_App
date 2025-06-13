// 📄 SignupPage.jsx
import { Link,useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { useState } from "react";
import {useSignup} from '../hooks/useSignup';


export default function SignupPage() {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const {signup,error,isloading} = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(name,email,password);
  }

  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 bg-center bg-fixed">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
        <button onClick={() => navigate('/')} className="absolute top-4 left-4 text-black font-bold underline">← Back</button>
        <h2 className="text-2xl font-bold text-black mb-6 text-center discov">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <input
           onChange={e=>{setName(e.target.value)}}
           value={name}
           type="text"
           placeholder="Username" 
           className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray/80 focus:outline-none" 
          />
          <input
           onChange={e=>{setEmail(e.target.value)}}
           value={email}
           type="email" 
           placeholder="Email" 
           className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray/80 focus:outline-none" 
           />
          <input
           onChange={e=>{setPassword(e.target.value)}}
           value={password}
           type="password" 
           placeholder="Password" 
           className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray/80 focus:outline-none" />
          <button className="w-full bg-black hover:bg-blue-800 text-white py-2 rounded-md">Sign Up</button>
        </form>
        {!isloading || <div>Please Wait. The server response is slow.😭</div>}
        {error && <div className="text-red-500">{error}</div>}
        <br/>
        <GoogleLoginButton/>
        <p className="text-sm text-black mt-4 text-center">
          Already have an account? <Link to="/login" className="underline text-blue-700">Login</Link>
        </p>
      </div>
    </div>
  );
}