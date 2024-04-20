import React, { useState } from "react";
// import { useOrderPad } from "../../../context/OrerPadContext";
import HoverDiv from "../../hoverdiv/hoverdivp.jsx"

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
            <td title="TATA CONSULTANCY SERV LT">{currentValues.stockname}</td>
            <td>BUY / INTRADAY</td>
            <td>{currentValues.quantity}</td>
            <td>{currentValues.ex_price.toFixed(2)}</td>
            <td>{currentValues.currentPrice}</td>
            <td>{ gain.toFixed(2) } {gainp.toFixed(2)}%</td>
        
        {isHovered && (
            <HoverDiv currentValues={currentValues}/>
        )}
        </tr>
    );
};

export default Ticker;
