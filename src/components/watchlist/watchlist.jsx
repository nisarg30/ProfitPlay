import React from 'react';
import './watchlist.css';
import Ticker from '../ticker/ticker';
import SearchBar from '../searchbar/searchbar';

import { useAuthorization } from '../../context/Authcontext';

const Watchlist = () => {

    const { watchlist } = useAuthorization();

    return (
        <div className="watchlist-container">
            <div className="watchlist-content">
                {/* <div className="watchlist-list">
                    {watchlist.map((stock, index) => (
                    <div key={index} className="watchlist-item">
                        <Ticker
                            stockname={stock.stockname}
                            price={stock.price}
                            change={stock.change}
                            pchange={stock.pchange}
                        />
                    </div>))}
                </div> */}
            </div>
        </div>
    );
};

export default Watchlist;
