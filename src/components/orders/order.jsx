import React, { useState } from "react";
import OpenOrders from "./open_orders/open_orders";
import Positions from "./positions/position";
import OrderHistory from "./order_history/order_history";
import "./order.css";

const OrdersContainer = () => {
    const [activeComponent, setActiveComponent] = useState("OpenOrders");

    const renderComponent = () => {
        switch (activeComponent) {
            case "Positions":
                return <Positions />;
            case "OrderHistory":
                return <OrderHistory />;
            default:
                return <OpenOrders />;
        }
    };

    return (
        <div className="orders-container">
            <div className="order-buttons">
            <button
                    onClick={() => setActiveComponent("OpenOrders")}
                    className={activeComponent === "OpenOrders" ? "activeButton orders-button" : "orders-button"}
                >
                    Open Orders
                </button>
                <button
                    onClick={() => setActiveComponent("Positions")}
                    className={activeComponent === "Positions" ? "activeButton orders-button" : "orders-button"}
                >
                    Positions
                </button>
                <button
                    onClick={() => setActiveComponent("OrderHistory")}
                    className={activeComponent === "OrderHistory" ? "activeButton orders-button" : "orders-button"}
                >
                    Order History
                </button>
            </div>
            {renderComponent()}
        </div>
    );
}

export default OrdersContainer;
