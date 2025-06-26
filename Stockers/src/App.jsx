import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { createTheme } from './styles/theme/create-theme'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Users from './pages/Users';
import LoginPage from './app/auth/sign-in/page';
import RegisterPageComponent from './pages/RegisterPageComponent';
import Dashboard from './app/dashboard/page';


import './App.css'; // Keep your app-specific styles
import './styles/global.css'; 

const theme = createTheme(); // Use Devias MUI theme generator

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {}

      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<RegisterPageComponent />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
