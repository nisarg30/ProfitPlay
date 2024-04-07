import React from 'react';
import './watchlist.css';
import Ticker from '../ticker/ticker';
import { useAuthorization } from '../../context/Authcontext';
import { useWebSocket } from '../../context/WebSocketCOntext';

const Watchlist = () => {
    const { activeWatchlist, watchlists } = useAuthorization();
    const { stockPrices } = useWebSocket();

    if (!watchlists || watchlists.length === 0 || !watchlists[activeWatchlist]) {
        return (
            <div className="watchlist-container">
                <div className="watchlist-content">
                    <div className="watchlist-list">
                        Loading watchlist...
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
                price={stockPrices[stock.stockname]!==undefined ? stockPrices[stock.stockname] : 0}     
                        change={12}
                pchange={34}
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
