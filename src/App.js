import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioPage from './pages/portfolio';
import Orders from './pages/orders';
import StockChart from "./components/chart/chart.jsx"
import Login from './components/login/login.jsx';
import { AuthorizationProvider } from './context/Authcontext.js';
import { WebSocketProvider } from './context/WebSocketCOntext.js';

function App() {
  return (
    <div className='App' style={{ backgroundColor: '#e6e6e6', height: '100%', width: '100%' }}>
      <BrowserRouter>
        <WebSocketProvider>
          <AuthorizationProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
            </Routes>
          </AuthorizationProvider>
        </WebSocketProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
