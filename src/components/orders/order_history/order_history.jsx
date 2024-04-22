import React, { useState, useEffect } from "react";
import OrderOver from "./order_over/order_over";
import OrderHistoryTable from "./order_h_t/order_h_t";
import "./order_history.css";
import { useSelector } from "react-redux";
const OrderHistory = () => {

    const orderHistory = useSelector(state => state.orders.orderHistory);
    const [totalbut, setTotalBuy] = useState(0);
    const [trade, setTrades] = useState(0);

    useEffect(() => {
        let x = 0;
        let y = 0;
        orderHistory.forEach(element => {
            x += (element.quantity * element.buy_price);
            if(element.quantity == 0) {
                y = y+1;
            }
        });
        setTrades(y);
        setTotalBuy(x);
    }, [orderHistory])

    if(orderHistory.length == trade) {
        return (
            <div className="open-orders-container">
                <div className="image-cont">
                    <img src="/no-history.svg" alt="empty"/>
                </div>
                <div className="image-cont">
                    <p> You have not executed any Intraday Trades today.</p>
                    <p> Place some "Intraday" orders from "OrderPad".</p>
                </div>
            </div>
        )
    }

    return (
        <div className="OrderHistory">
            <div className="order-over">
                <OrderOver totalbuy={totalbut} totalsell={totalbut}/>
            </div>
            <div className="order-history-table">
                <OrderHistoryTable />
            </div>
        </div>
    )
}

export default OrderHistory;