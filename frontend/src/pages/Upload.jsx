import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {useWallContext} from '../hooks/useWallContext';
import {useAuthContext} from '../hooks/useAuthContext';

// UploadWallpaperForm.jsx
export default function UploadWallpaperForm() {
  const [error,setError] = useState(null);
  const {dispatch}       = useWallContext();
  const {user}           = useAuthContext();
  const [title,setTitle] = useState('');
  const [category,setCategory] = useState('');
  const [description,setDescription] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in!");
      return;
    }
    //Select the file that user uploaded:
    const fileInput = document.querySelector("#wall_pic_yo").files[0];
    //Check if the file is of jpeg or jpg or png format:(only those are allowed):
    if (fileInput && fileInput.type !== 'image/jpeg' && fileInput.type !== 'image/jpg' && fileInput.type !== 'image/png') {
      alert("Only JPEG/JPG/PNG images are allowed 😭");
      return;
    }
    //Now we send the booty home:
    const formData = new FormData();
    formData.append('wall_pic',fileInput);
    formData.append('title',title);
    formData.append("category",category);
    formData.append("description",description);
    const response = await fetch('http://localhost:4000/api/walls/',{
      method:'POST',
      body : formData,
      headers : {"Authorization":`Bearer ${user.token}`}
    });
    const json = await response.json();
    if (!response.ok){
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      dispatch({type:"UPLOADWALLS",payload:json});
      navigate('/home',{replace:true});
    }
  }

  return (
    <div className="min-h-screen bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 text-black flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md p-8 rounded-xl">
        <button onClick={() => navigate('/')} className="absolute top-4 left-4 text-black underline">← Back</button>
        <h2 className="text-2xl font-bold mb-6 text-center discov">Upload New Wallpaper</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
           type="text"
           value={title}
           onChange={e=>{setTitle(e.target.value)}}
           placeholder="Title"
           className="w-full px-4 py-2 rounded-md bg-white/30 placeholder-gray-600 focus:outline-none" />
          <input
           type="text" 
           value={category}
           onChange={e=>{setCategory(e.target.value)}}
           placeholder="Category" 
           className="w-full px-4 py-2 rounded-md bg-white/30 placeholder-gray-600 focus:outline-none" />
          
          <input
          type="file"
          id='wall_pic_yo'
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full px-4 py-2 border rounded-md bg-white/10 backdrop-blur-md"
          required
        />
          
          <textarea
           value={description}
           onChange={e=>{setDescription(e.target.value)}}
           placeholder="Description (optional)" 
           rows="4" 
           className="w-full px-4 py-2 rounded-md bg-white/30 placeholder-gray-600 focus:outline-none"></textarea>
          <button className="w-full bg-black hover:bg-blue-800 text-white font-bold py-2 rounded-md">Upload</button>
        </form>
      </div>
    </div>
  );
}