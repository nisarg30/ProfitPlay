import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './header.css';
import { useSelector } from 'react-redux';
import { useWebSocket } from '../../context/WebSocketCOntext';
import formatNumber from '../../datasource/formatter';

const Header = () => {

    const [activeButton, setActiveButton] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const { socket } = useWebSocket();

    useEffect(() => {
        if(socket) {
            const array = [ {stockname : "NIFTY"}, { stockname : "BANKNIFTY"}]
            socket.emit('joinrequest', array);
        }
    }, [socket]);

    useEffect(() => {
        setActiveButton(location.pathname);
    }, [location.pathname]);

    const handlleNavigate = (route) => {
        setActiveButton(route);
        navigate(route);
    }

    const stockPrices = useSelector(state => state.stocks);
    
    if(stockPrices['BANKNIFTY'] != null) {
        var color = (stockPrices['BANKNIFTY'].price - stockPrices['BANKNIFTY'].open).toFixed(2) > 0 ? 1 : 0;
        var triangle = color > 0 ? "\u25B2" : "\u25BC";
    }

    if(stockPrices['NIFTY'] != null) {
        var color1 = (stockPrices['NIFTY'].price - stockPrices['NIFTY'].open).toFixed(2) > 0 ? 1 : 0;
        var triangle1 = color1 > 0 ? "\u25B2" : "\u25BC";
    }

    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src="/download.png" alt="LOGO" />
            </div>
            <div className="index-container">
                <div className="index" id="ind-cont-1">
                    <span className="index-label">BANKNIFTY&nbsp;</span>
                    <span className={ color == 1 ? "index-change green" : "index-change red"}>{formatNumber(stockPrices['BANKNIFTY'] != null ? stockPrices['BANKNIFTY'].price : 0)}&nbsp; {triangle}</span>
                    <span className={ color == 1 ? "index-change green" : "index-change red"}>&nbsp;{stockPrices['BANKNIFTY'] != null ? formatNumber((stockPrices['BANKNIFTY'].price - stockPrices['BANKNIFTY'].open).toFixed(2)) : 0}&nbsp;&nbsp;({stockPrices['BANKNIFTY'] != null ? (((stockPrices['BANKNIFTY'].price - stockPrices['BANKNIFTY'].open)/ stockPrices['BANKNIFTY'].open)*100).toFixed(2) : 0} %)</span>
                </div>
                <div className='splitter'>
                    <span className='splitter1'> | </span>
                </div>
                <div className="index" id="ind-cont-2">
                    <span className="index-label">NIFTY&nbsp;</span>
                    <span className={ color1 == 1 ? "index-change green" : "index-change red"}>{stockPrices['NIFTY'] != null ? formatNumber(stockPrices['NIFTY'].price) : 0} {triangle1}</span>
                    <span className={ color1 == 1 ? "index-change green" : "index-change red"}>&nbsp;{stockPrices['NIFTY'] != null ? formatNumber((stockPrices['NIFTY'].price - stockPrices['NIFTY'].open).toFixed(2)) : 0}&nbsp;&nbsp;({stockPrices['NIFTY'] != null ? ((stockPrices['NIFTY'].price - stockPrices['NIFTY'].open)/ stockPrices['NIFTY'].open*100).toFixed(2) : 0} %)</span>
                </div>
            </div>
            <div className="icon-container">
                <div className={activeButton === '/charts' ? "icon active-button" : "icon"} title="Charts" onClick={ () => {handlleNavigate('/charts')}}>
                    <span>Charts</span>
                </div>
                <div className={activeButton === '/portfolio' ? "icon active-button" : "icon"} title="Portfolio" onClick={ () => {handlleNavigate('/portfolio')}}>
                    <span>Portfolio</span>
                </div>
                <div className={activeButton === '/orders' ? "icon active-button" : "icon"} title="Orders" onClick={ () => {handlleNavigate('/orders')}}>
                    <span>Orders</span>
                </div>
                <div className={activeButton === '/accounts' ? "icon active-button" : "icon"} title="Account" onClick={ () => {handlleNavigate('/accounts')}}>
                    <span>Account</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
