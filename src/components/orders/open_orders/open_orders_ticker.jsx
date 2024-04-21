import React, { useState } from "react";
// import { useOrderPad } from "../../../context/OrerPadContext";
import HoverDiv from "../../hoverdiv/hoverdivp.jsx"
import formatNumber from "../../../datasource/formatter.js";

const Ticker = ({ currentValues }) => {

    //const { isOrderPadVisible, showOrderPad, hideOrderPad } = useOrderPad();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <tr
        className="open-orders-row"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
        >
            <td>{ currentValues.stockname}</td>
            <td>{ currentValues.direction == 0 ? "BUY" : "SELL" }&nbsp; / &nbsp; { currentValues.ordertime == 0 ? "DELIVERY" : "INTRADAY"}</td>
            <td>{ formatNumber(currentValues.quantity) }</td>
            <td>{ formatNumber(currentValues.currentPrice) }</td>
            <td>{ formatNumber(currentValues.ex_price) }</td>

            {isHovered && (
                <HoverDiv currentValues={currentValues}/>
            )}
        </tr>
    );
};

export default Ticker;
