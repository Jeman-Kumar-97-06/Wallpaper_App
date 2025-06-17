import Navbar from "./components/Navbar"
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import AboutPage from "./pages/About"
import UploadWallpaperForm from "./pages/Upload"
import LandingPage2 from "./pages/LandingPage2"
import HomePage from "./pages/HomePage"
import { useAuthContext } from "./hooks/useAuthContext"

function App() {
  const {user} = useAuthContext();
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/home' element={user ? <><Navbar/><HomePage/></> : <LoginPage/>}/>
        <Route exact path='/' element={user ? <><Navbar/><HomePage/></> : <LandingPage2/>}/>
        <Route exact path="/login" element={user ? <><Navbar/><HomePage/></> : <LoginPage/>}/>
        <Route exact path='/signup' element={user ? <><Navbar/><HomePage/></> : <SignupPage/>}/>
        <Route exact path='/about' element={<AboutPage/>}/>
        <Route exact path='/upload' element={user ? <UploadWallpaperForm/> : <Navigate to='/login'/>}/>
      </Routes>
    </BrowserRouter>
  </>)
}

export default App
