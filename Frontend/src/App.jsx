import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import {Toaster} from 'react-hot-toast'
import { authContextProvider } from './ccontext/AuthContext'

function App() {
  const [count, setCount] = useState(0)
  const {authuser}=useContext(authContextProvider)

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
    <Toaster/>
    <Routes>
      
      <Route path="/" element={authuser?<Home/>:<Navigate to="/login"/>}/>
      <Route path="/login" element={!authuser? <Login/>:<Navigate to="/"/>}/>
      <Route path="/profile" element={authuser?<Profile/>:<Navigate to="/login"/>}/>
    </Routes>
    </div>
  )
}

export default App
