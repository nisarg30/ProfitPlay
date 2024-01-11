import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Watchpage from './pages/watch';
import Chart from './components/chart/chart';
function App() {

  return (
    <div className='App' style={{ backgroundColor : '#e6e6e6', height : '100%', width : '100%' }}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element= {<Watchpage />} />
    </Routes>
    </BrowserRouter>
    {/* <Chart /> */}
    </div>
  );
}

export default App;