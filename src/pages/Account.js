import React from "react";

import Header from "../components/header/header";
import Watchlist from "../components/watchlist/watchlist";
import Watchcontrol from "../components/watchcontrol/watchcontrol";
import Account from "../components/account/account";
import OrderPad from "../components/orderpad/orderpad";
import SearchBar from "../components/searchbar/searchbar";

import { OrderPadProvider } from "../context/OrderPadContext";

const Accounts = () => {
    return (
        <OrderPadProvider >
            <div className='AccountPage' style={{'width' : '100vw', boxSizing : 'border-box'}}>
                <Header />
                <div style={{display : "flex", width : '100%'}}>
                    <div>
                        <Watchcontrol />
                        <SearchBar />
                        <Watchlist />
                    </div>
                    <Account />
                </div>
                <OrderPad />
            </div>
        </OrderPadProvider>
    );
}

export default Accounts;