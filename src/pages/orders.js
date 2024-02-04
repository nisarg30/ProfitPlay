import React from "react";

import Header from "../components/header/header";
import Watchlist from "../components/watchlist/watchlist";
import Watchcontrol from "../components/watchcontrol/watchcontrol";
import OrdersContainer from "../components/orders/order";
import OrderPad from "../components/orderpad/orderpad";

const Orders = () => {
    return (
        <div className='Portfoliopage' style={{'width' : '100vw', boxSizing : 'border-box'}}>
            <Header />
            <div style={{display : "flex", width : '100%'}}>
                <div>
                    <Watchcontrol />
                    <Watchlist />
                </div>
                <OrdersContainer />
            </div>
            {/* <OrderPad /> */}
        </div>
    );
}

export default Orders;