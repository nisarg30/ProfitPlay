import React from "react";
import Ticker from "./open_orders_ticker";
import "./open_orders.css"

const OpenOrders = () => {
    return (
        <div className="open-orders-container">
            <table className="open-orders-table">
                <thead>
                    <tr className="heading">
                        <th>Stock Name</th>
                        <th>Action / Order Type</th>
                        <th>Quantity</th>
                        <th>LTP</th>
                        <th>Order Price</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(30)].map((_, index) => (
                        <Ticker key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OpenOrders;