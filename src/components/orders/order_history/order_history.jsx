import React, { useState, useEffect } from "react";
import OrderOver from "./order_over/order_over";
import OrderHistoryTable from "./order_h_t/order_h_t";
import "./order_history.css";
import { useSelector } from "react-redux";
const OrderHistory = () => {

    const orderHistory = useSelector(state => state.orders.orderHistory);
    const [totalbut, setTotalBuy] = useState(0);

    useEffect(() => {
        let x = 0;
        orderHistory.forEach(element => {
            x += (element.quantity * element.buy_price);
        });
        setTotalBuy(x);
    }, [orderHistory])

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