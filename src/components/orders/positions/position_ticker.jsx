import React, { useState } from "react";
// import { useOrderPad } from "../../../context/OrerPadContext";
import HoverDiv from "../../hoverdiv/hoverdivp.jsx"
import formatNumber from "../../../datasource/formatter.js";

const Ticker = ({ currentValues }) => {

    //const { isOrderPadVisible, showOrderPad, hideOrderPad } = useOrderPad();
    const [isHovered, setIsHovered] = useState(false);
    const gainp = ((currentValues.currentPrice - currentValues.ex_price)/ currentValues.currentPrice) * 100;
    const gain = (currentValues.currentPrice - currentValues.ex_price);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <tr
        className="positions-row"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
        >
            <td>{currentValues.stockname}</td>
            <td>BUY / INTRADAY</td>
            <td>{formatNumber(currentValues.quantity)}</td>
            <td>{formatNumber(currentValues.ex_price)}</td>
            <td>{formatNumber(currentValues.currentPrice)}</td>
            <td>{ formatNumber(gain.toFixed(2)) } {gainp.toFixed(2)}%</td>
        
        {isHovered && (
            <HoverDiv currentValues={currentValues}/>
        )}
        </tr>
    );
};

export default Ticker;
