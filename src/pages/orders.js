import React from "react";

import Header from "../components/header/header";
import Watchlist from "../components/watchlist/watchlist";
import Watchcontrol from "../components/watchcontrol/watchcontrol";
import OrdersContainer from "../components/orders/order";
import OrderPad from "../components/orderpad/orderpad";
import SearchBar from "../components/searchbar/searchbar";

import { OrderPadProvider } from "../context/OrderPadContext";

const Orders = () => {
    return (
        <OrderPadProvider >
            <div className='OrderPage' style={{'width' : '100vw', boxSizing : 'border-box'}}>
                <Header />
                <div style={{display : "flex", width : '100%'}}>
                    <div>
                        <Watchcontrol />
                        <SearchBar />
                        <Watchlist />
                    </div>
                    <OrdersContainer />
                </div>
                <OrderPad />
            </div>
        </OrderPadProvider>
    );
}

export default Orders;