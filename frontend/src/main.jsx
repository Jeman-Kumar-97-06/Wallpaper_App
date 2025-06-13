import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { WallContextProvider } from './context/WallContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='45807819000-65uksuegefpuak4ijq4mr5b0dn2tsb5f.apps.googleusercontent.com'>
      <WallContextProvider>
        <AuthContextProvider>
          <ThemeContextProvider>
            <App/>
          </ThemeContextProvider>
        </AuthContextProvider>
      </WallContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
