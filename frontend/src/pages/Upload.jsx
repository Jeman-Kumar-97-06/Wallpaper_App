import { useNavigate } from "react-router-dom";
// 📄 UploadWallpaperForm.jsx
export default function UploadWallpaperForm() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-blue-950 text-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md p-8 rounded-xl">
        <button onClick={() => navigate('/')} className="absolute top-4 left-4 text-white underline">← Back</button>
        <h2 className="text-2xl font-bold mb-6 text-center">Upload New Wallpaper</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Title" className="w-full px-4 py-2 rounded-md bg-white/30 placeholder-white/80 focus:outline-none" />
          <input type="text" placeholder="Category" className="w-full px-4 py-2 rounded-md bg-white/30 placeholder-white/80 focus:outline-none" />
          <input type="url" placeholder="Image URL" className="w-full px-4 py-2 rounded-md bg-white/30 placeholder-white/80 focus:outline-none" />
          <textarea placeholder="Description (optional)" rows="4" className="w-full px-4 py-2 rounded-md bg-white/30 placeholder-white/80 focus:outline-none"></textarea>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">Upload</button>
        </form>
      </div>
    </div>
  );
}