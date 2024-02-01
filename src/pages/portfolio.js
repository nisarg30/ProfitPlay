import React from "react";

import Header from "../components/header/header";
import Watchlist from "../components/watchlist/watchlist";
import Watchcontrol from "../components/watchcontrol/watchcontrol";
import Portfolio from "../components/Portfolio/portfolio";
import OrderPad from "../components/orderpad/orderpad";

import { OrderPadProvider } from '../context/OrerPadContext';

const PortfolioPage = () => {
    return (
        <OrderPadProvider>
            <div className='Portfoliopage' style={{'width' : '100vw', boxSizing : 'border-box'}}>
                <Header />
                <div style={{display : "flex", width : '100%'}}>
                    <div>
                        <Watchcontrol />
                        <Watchlist />
                    </div>
                    <Portfolio />
                </div>
                <OrderPad />
            </div>
        </OrderPadProvider>
    );
};

export default PortfolioPage;