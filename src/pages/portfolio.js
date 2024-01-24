import React from "react";

import Header from "../components/header/header";
import Watchlist from "../components/watchlist/watchlist";
import Watchcontrol from "../components/watchcontrol/watchcontrol";
import Portfolio from "../components/Portfolio/portfolio";

const PortfolioPage = () => {
    return (
        <div className='Portfoliopage' style={{'width' : '100vw', boxSizing : 'border-box'}}>
            <Header />
            <div style={{display : "flex", width : '100%'}}>
                <div>
                    <Watchcontrol />
                    <Watchlist />
                </div>
                <Portfolio />
            </div>
        </div>
    );
};

export default PortfolioPage;