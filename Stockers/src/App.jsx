import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Users from './pages/Users'
import LoginPageComponent from './pages/LoginPageComponent'
import RegisterPageComponent from './pages/RegisterPageComponent'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
     <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<LoginPageComponent />} />
          <Route path="/register" element={<RegisterPageComponent />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
