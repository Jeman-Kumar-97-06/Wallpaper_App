import Navbar from "./components/Navbar"
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import LandingPage from "./pages/LandingPage"

function App() {
  return (<>
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<LandingPage/>}/>
    </Routes>
  </BrowserRouter>
  </>)
}

export default App
