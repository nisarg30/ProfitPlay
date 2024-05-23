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
                        <div className="watch-img-container">
                            <div style={{ margin : "auto", width : '16rem'}}>No watchlist found. Create New Watchlist Using + Button Above.</div>
                        </div>
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
                        <div className='watch-img-container'><img src="/empty-watchlist.png" alt="empty-watchlist" style={{ width : '16rem', marginTop : '50%'}}/></div>
                        <div style={{ padding : '1rem' }}> <p><b>Add stocks.</b></p> <p> This watchlist is empty. Go to "SearchBar" to add items in the watchlist.</p></div>
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
