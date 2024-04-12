import React, { useState } from "react";
// import { useOrderPad } from "../../../context/OrerPadContext";
import HoverDiv from "../../hoverdiv/hoverdivp.jsx"

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
            <td title="TATA CONSULTANCY SERV LT">{currentValues.stockname}</td>
            <td>BUY / DELIEVRY</td>
            <td>{ currentValues.quantity }</td>
            <td>3,885.04 0.98%</td>
            <td>{ currentValues.ex_price }</td>

            {isHovered && (
                <HoverDiv currentValues={currentValues}/>
            )}
        </tr>
    );
};

export default Ticker;
