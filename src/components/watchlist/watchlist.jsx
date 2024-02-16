import React from 'react';
import './watchlist.css';
import Ticker from '../ticker/ticker';
import SearchBar from '../searchbar/searchbar';

const Watchlist = () => {
    const watchlist = [
    {
        stockname: "RELIANCE",
        price: 1250,
        change: -125,
        pchange: -2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250,
        change: 125,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.12,
        change: 125.02,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },
    {
        stockname: "RELIANCE",
        price: 1250.00,
        change: 125.00,
        pchange: 2.5
    },

    ];

    return (
        <div className="watchlist-container">
            <div className="watchlist-content">
                <div className="watchlist-list">
                    {watchlist.map((stock, index) => (
                    <div key={index} className="watchlist-item">
                        <Ticker
                            stockname={stock.stockname}
                            price={stock.price}
                            change={stock.change}
                            pchange={stock.pchange}
                        />
                    </div>))}
                </div>
            </div>
        </div>
    );
};

export default Watchlist;
