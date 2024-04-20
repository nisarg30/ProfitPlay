import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import { useSelector } from 'react-redux';
import { useWebSocket } from '../../context/WebSocketCOntext';

const Header = () => {
    const navigate = useNavigate();
    const handlleNavigate = (state) => {
        navigate(state)
    }

    const { socket } = useWebSocket();

    useEffect(() => {
        if(socket) {
            const array = [ {stockname : "NIFTY"}, { stockname : "BANKNIFTY"}]
            socket.emit('joinrequest', array);
        }
    }, [socket])
    const stockPrices = useSelector(state => state.stocks);

    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src="/download.png" alt="LOGO" />
            </div>
            <div className="index-container">
                <div className="index" id="ind-cont-1">
                    <span className="index-label">BANKNIFTY</span>
                    <span className="index-value green">{stockPrices['BANKNIFTY'] != null ? stockPrices['BANKNIFTY'].price : 0}&nbsp;</span>
                    <span className="index-change green">&#9650;&nbsp;{stockPrices['BANKNIFTY'] != null ? (stockPrices['BANKNIFTY'].price - stockPrices['BANKNIFTY'].open).toFixed(2) : 0}&nbsp;&nbsp;({stockPrices['BANKNIFTY'] != null ? (((stockPrices['BANKNIFTY'].price - stockPrices['BANKNIFTY'].open)/ stockPrices['BANKNIFTY'].open)*100).toFixed(2) : 0} %)</span>
                </div>
                <div className='splitter'>
                    <span className='splitter1'> | </span>
                </div>
                <div className="index" id="ind-cont-2">
                    <span className="index-label">NIFTY</span>
                    <span className="index-value red">{stockPrices['NIFTY'] != null ? stockPrices['NIFTY'].price : 0}</span>
                    <span className="index-change red">&#9650;&nbsp;{stockPrices['NIFTY'] != null ? (stockPrices['NIFTY'].price - stockPrices['NIFTY'].open).toFixed(2) : 0}&nbsp;&nbsp;({stockPrices['NIFTY'] != null ? ((stockPrices['NIFTY'].price - stockPrices['NIFTY'].open)/ stockPrices['NIFTY'].open*100).toFixed(2) : 0} %)</span>
                </div>
            </div>
            <div className="icon-container">
                {/* <div className="icon" title="Watchlist">
                    <span>📋</span>
                </div>
                <div className="icon" title="Portfolio">
                    <span>💼</span>
                </div>
                <div className="icon" title="Orders">
                    <span>📝</span>
                </div>
                <div className="icon" title="Account">
                    <span>👤</span>
                </div> */}
                <div className="icon" title="Watchlist" >
                    <span>Watchlist</span>
                </div>
                <div className="icon" title="Portfolio" onClick={ () => {handlleNavigate('/portfolio')}}>
                    <span>Portfolio</span>
                </div>
                <div className="icon" title="Orders" onClick={ () => {handlleNavigate('/orders')}}>
                    <span>Orders</span>
                </div>
                <div className="icon" title="Account" onClick={ () => {handlleNavigate('/accounts')}}>
                    <span>Account</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
