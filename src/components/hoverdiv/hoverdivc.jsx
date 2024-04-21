import React from "react";
import './hoverdiv.css';
import { useOrderPad } from "../../context/OrderPadContext";

const HoverDivc = ({ currentValues }) => {
    const { showOrderPad } = useOrderPad();

    return (
        <div className="hover-div">
            <button className="button-buy" onClick={() => showOrderPad({...currentValues, isBuy : false})}>B</button>
            <button className="button-sell" onClick={() => showOrderPad({...currentValues, isBuy : true})}>S</button>
            <button className="button-chart">Chart</button>
            <button className="button-chart">Close</button>
        </div>
    );
}

export default HoverDivc;
