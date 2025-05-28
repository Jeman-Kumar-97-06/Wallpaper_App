import { useNavigate } from "react-router-dom";
// UploadWallpaperForm.jsx
export default function UploadWallpaperForm() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 text-black flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md p-8 rounded-xl">
        <button onClick={() => navigate('/')} className="absolute top-4 left-4 text-black underline">← Back</button>
        <h2 className="text-2xl font-bold mb-6 text-center discov">Upload New Wallpaper</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Title" className="w-full px-4 py-2 rounded-md bg-white/30 placeholder-gray-600 focus:outline-none" />
          <input type="text" placeholder="Category" className="w-full px-4 py-2 rounded-md bg-white/30 placeholder-gray-600 focus:outline-none" />
          
          <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full px-4 py-2 border rounded-md bg-white/10 backdrop-blur-md"
          required
        />
          
          <textarea placeholder="Description (optional)" rows="4" className="w-full px-4 py-2 rounded-md bg-white/30 placeholder-gray-600 focus:outline-none"></textarea>
          <button className="w-full bg-black hover:bg-blue-800 text-white font-bold py-2 rounded-md">Upload</button>
        </form>
      </div>
    </div>
  );
}