import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioPage from './pages/portfolio';
import Orders from './pages/orders';
import Accounts from './pages/Account.js';
import StockChart from "./components/chart/chart.jsx"
import Login from './components/login/login.jsx';
import { AuthorizationProvider } from './context/Authcontext.js';
import { WebSocketProvider } from './context/WebSocketCOntext.js';
import Home from './components/home/home.jsx';

function App() {
  return (
    <div className='App' style={{ backgroundColor: 'var(--color-background-grey)', height: '100vh', width: '100vw' }}>
      <BrowserRouter>
        <WebSocketProvider>
          <AuthorizationProvider>
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/charts" element={<StockChart/>} />
            </Routes>
          </AuthorizationProvider>
        </WebSocketProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
