import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from './styles/theme/create-theme';
import Home from './pages/Home';
import Users from './pages/Users';
import LoginPage from './app/auth/sign-in/page';
import Dashboard from './app/dashboard/page';
import Register from './app/auth/sign-up/page';
import './App.css'; 
import './styles/global.css'; 
import Portfolio from './app/portfolio/page';
import Settings from './app/dashboard/settings/page';
import Account from './app/dashboard/account/page';
import Customers from './app/dashboard/customers/page';
import NotFound from './app/errors/not-found/page';

const theme = createTheme(); // Use Devias MUI theme generator

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {}

      <div className="app">
      
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolio" element = {<Portfolio/>}/>
            <Route path="/settings" element = {<Settings/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account/>}/>
            <Route path="/customers" element={<Customers/>}/>
            <Route path="/errors/not-found" element={<NotFound/>}/>
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
