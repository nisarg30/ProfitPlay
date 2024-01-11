import React from 'react';
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src="/download.png" alt="LOGO" />
            </div>
            <div className="index-container">
                <div className="index" id="ind-cont-1">
                    <span className="index-label">BANKNIFTY</span>
                    <span className="index-value green">23456.10</span>
                    <span className="index-change green">&#9650; 446.12 (12.2%)</span>
                </div>
                <div className='splitter'>
                    <span className='splitter1'> | </span>
                </div>
                <div className="index" id="ind-cont-2">
                    <span className="index-label">NIFTY</span>
                    <span className="index-value red">23456.10</span>
                    <span className="index-change red">&#9660; 446.12 (12.2%)</span>
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
                <div className="icon" title="Watchlist">
                    <span>Watchlist</span>
                </div>
                <div className="icon" title="Portfolio">
                    <span>Portfolio</span>
                </div>
                <div className="icon" title="Orders">
                    <span>Orders</span>
                </div>
                <div className="icon" title="Account">
                    <span>Account</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
