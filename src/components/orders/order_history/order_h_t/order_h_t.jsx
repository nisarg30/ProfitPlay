import React from "react";
import "./order_h_t.css";
import Ticker from "./order_h_ticker";

const OrderHistoryTable = () => {
    return (
        <table className="history-table">
            <thead>
                <tr className="heading">
                    <th>Stock Name</th>
                    <th>Action/Order Type</th>
                    <th>Exec. Quantity</th>
                    <th>Placed Price</th>
                    <th>Exec. Price</th>
                    <th>LTP</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(30)].map((_, index) => (
                    <Ticker key={index} />
                ))}
            </tbody>
        </table>
    )
}

export default OrderHistoryTable;