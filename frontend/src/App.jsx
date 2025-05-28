import Navbar from "./components/Navbar"
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import AboutPage from "./pages/About"
import UploadWallpaperForm from "./pages/Upload"
import LandingPage2 from "./pages/LandingPage2"
import HomePage from "./pages/HomePage"

function App() {
  return (<>
  <BrowserRouter>
    <Routes>
      <Route exact path='/home' element={<><Navbar/><HomePage/></>}/>
      <Route exact path='/' element={<LandingPage2/>}/>
      <Route exact path="/login" element={<LoginPage/>}/>
      <Route exact path='/signup' element={<SignupPage/>}/>
      <Route exact path='/about' element={<AboutPage/>}/>
      <Route exact path='/upload' element={<UploadWallpaperForm/>}/>
    </Routes>
  </BrowserRouter>
  </>)
}

export default App
