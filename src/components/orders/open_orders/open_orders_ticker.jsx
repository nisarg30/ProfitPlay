import React, { useState } from "react";
import HoverDiv from "../../hoverdiv/hoverdivp.jsx";
import formatNumber from "../../../datasource/formatter.js";

const Ticker = ({ currentValues }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const color = currentValues.change > 0 ? 1 : 0;
    const triangle = currentValues.change > 0 ? "\u25B2" : "\u25BC";

    return (
        <tr
            className="open-orders-row"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: "relative" }}
        >
            <td>{currentValues.stockname}</td>
            <td>{currentValues.direction === 0 ? "BUY" : "SELL"} / {currentValues.ordertime === 0 ? "DELIVERY" : "INTRADAY"}</td>
            <td>{formatNumber(currentValues.quantity)}</td>
            <td style={{ fontWeight : '600' }} className={ color == 1 ? "green" : "red"}>
                {formatNumber(currentValues.currentPrice)} {triangle} {currentValues.change} ({currentValues.pchange}%)
            </td>
            <td>{formatNumber(currentValues.ex_price)}</td>

            {isHovered && <HoverDiv currentValues={currentValues} />}
        </tr>
    );
};

export default Ticker;
