import React from 'react';
import './watchlist.css';
import Ticker from '../ticker/ticker';
import { useAuthorization } from '../../context/Authcontext';
import { UseSelector, useSelector } from 'react-redux';

const Watchlist = () => {
    const { activeWatchlist, watchlists } = useAuthorization();
    const stockPrices = useSelector(state => state.stocks);

    if (!watchlists || watchlists.length === 0 || !watchlists[activeWatchlist]) {
        return (
            <div className="watchlist-container">
                <div className="watchlist-content">
                    <div className="watchlist-list">
                        No watchlist found
                    </div>
                </div>
            </div>
        );
    }

    const watchlistArray = watchlists[activeWatchlist].watchlist.array;

    // Check if watchlistArray exists and has items
    if (!watchlistArray || watchlistArray.length === 0) {
        return (
            <div className="watchlist-container">
                <div className="watchlist-content">
                    <div className="watchlist-list">
                        Add some stocks to your watchlist
                    </div>
                </div>
            </div>
        );
    }

    const watchlistItems = watchlistArray.map((stock, index) => (
        <div key={index} className="watchlist-item">
            <Ticker
                stockname={stock.stockname}
                price={stockPrices[stock.stockname]!==undefined ? stockPrices[stock.stockname].price : 0}     
                change={stockPrices[stock.stockname]!==undefined ? (stockPrices[stock.stockname].price - stockPrices[stock.stockname].open).toFixed(2) : 0}
                pchange={stockPrices[stock.stockname]!==undefined ? (((stockPrices[stock.stockname].price - stockPrices[stock.stockname].open)/stockPrices[stock.stockname].open)*100).toFixed(2) : 0}
            />
        </div>
    ));

    return (
        <div className="watchlist-container">
            <div className="watchlist-content">
                <div className="watchlist-list">
                    {watchlistItems}
                </div>
            </div>
        </div>
    );
};

export default Watchlist;
