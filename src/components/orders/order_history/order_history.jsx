import React from "react";
import OrderOver from "./order_over/order_over";
import OrderHistoryTable from "./order_h_t/order_h_t";
import "./order_history.css";
const OrderHistory = () => {
    return (
        <div className="OrderHistory">
            <div className="order-over">
                <OrderOver />
            </div>
            <div className="history-table">
                <OrderHistoryTable />
            </div>
        </div>
    )
}

export default OrderHistory;