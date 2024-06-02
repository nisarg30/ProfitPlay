import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthorizationProvider } from './context/Authcontext.js';
import { WebSocketProvider } from './context/WebSocketCOntext.js';
import './App.css';

const PortfolioPage = lazy(() => import('./pages/portfolio'));
const Orders = lazy(() => import('./pages/orders'));
const Accounts = lazy(() => import('./pages/Account.js'));
const StockChart = lazy(() => import("./components/chart/chart.jsx"));
const Login = lazy(() => import('./components/login/login.jsx'));
const Home = lazy(() => import('./components/home/home.jsx'));

function App() {
  return (
    <div className='App' style={{ backgroundColor: 'var(--color-background-grey)', height: '100vh', width: '100vw' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={
              <WebSocketProvider>
                <AuthorizationProvider>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/portfolio" element={<PortfolioPage />} />
                      <Route path="/accounts" element={<Accounts />} />
                      <Route path="/charts" element={<StockChart />} />
                    </Routes>
                  </Suspense>
                </AuthorizationProvider>
              </WebSocketProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
