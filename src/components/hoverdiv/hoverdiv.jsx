import React from "react";
import './hoverdiv.css'

import { useOrderPad } from "../../context/OrerPadContext";

const HoverDiv = () => {

    const { isOrderPadVisible, showOrderPad, hideOrderPad } = useOrderPad();

    return (
        <div className="hover-div">
            <button className="button-buy" onClick={showOrderPad}>B</button>
            <button className="button-sell" onClick={showOrderPad}>S</button>
            <button className="button-chart">Chart</button>
        </div>
    );
}

export default HoverDiv;