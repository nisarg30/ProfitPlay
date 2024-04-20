import React, { useState } from "react";
// import { useOrderPad } from "../../../context/OrerPadContext";
import HoverDiv from "../../hoverdiv/hoverdivp.jsx"

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
            <td title="TATA CONSULTANCY SERV LT">{currentValues.stockname}</td>
            <td>{currentValues.quantity}</td>
            <td>{currentValues.buy_price.toFixed(2)}</td>
            <td>{currentValues.sell_price.toFixed(2)}</td>
            <td>{currentValues.currentPrice}</td>
            <td>{ gain.toFixed(2) }   { gainp.toFixed(2) }% </td>
        
        {isHovered && (
            <HoverDiv currentValues={currentValues}/>
        )}
        </tr>
    );
};

export default Tickerc;
