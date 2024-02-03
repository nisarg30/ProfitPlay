import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import PortfolioPage from './pages/portfolio';
import OrderHistory from './components/orders/order_history/order_history';
// import OrderPad from './components/orderpad/orderpad';
function App() {

  return (
    <div className='App' style={{ backgroundColor : '#e6e6e6', height : '100%', width : '100%' }}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element= {<OrderHistory />} />
    </Routes>
    </BrowserRouter>
    {/* <Chart /> */}
    </div>
  );
}

export default App;