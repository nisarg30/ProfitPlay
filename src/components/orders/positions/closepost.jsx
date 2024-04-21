import React, { useState } from "react";
import HoverDiv from "../../hoverdiv/hoverdivp.jsx"
import formatNumber from "../../../datasource/formatter.js";

const Tickerc = ({ currentValues }) => {

    //const { isOrderPadVisible, showOrderPad, hideOrderPad } = useOrderPad();
    const [isHovered, setIsHovered] = useState(false);
    const gainp = ((currentValues.sell_price - currentValues.buy_price)/ currentValues.buy_price) * 100;
    const gain = (currentValues.sell_price - currentValues.buy_price);
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
            <td>{formatNumber(currentValues.quantity)}</td>
            <td>{formatNumber(currentValues.buy_price.toFixed(2))}</td>
            <td>{formatNumber(currentValues.sell_price.toFixed(2))}</td>
            <td>{formatNumber(currentValues.currentPrice)}</td>
            <td>{ formatNumber(gain.toFixed(2)) }   { gainp.toFixed(2) }% </td>
        
        {isHovered && (
            <HoverDiv currentValues={currentValues}/>
        )}
        </tr>
    );
};

export default Tickerc;
