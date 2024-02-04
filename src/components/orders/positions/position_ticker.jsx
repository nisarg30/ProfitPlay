import React, { useState } from "react";
// import { useOrderPad } from "../../../context/OrerPadContext";
import HoverDiv from "../../hoverdiv/hoverdiv.jsx"

const Ticker = () => {

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
        className="positions-row"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
        >
        <td title="TATA CONSULTANCY SERV LT">TCS</td>
        <td>BUY / DELIEVRY</td>
        <td>50</td>
        <td>3,550</td>
        <td>3,550</td>
        <td>3,885.04 0.98%</td>
        

        {isHovered && (
            <HoverDiv />
        )}
        </tr>
    );
};

export default Ticker;
