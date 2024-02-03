import React from "react";
import './hoverdiv.css'
const HoverDiv = () => {
    return (
        <div className="hover-div">
            <button className="button-buy">B</button>
            <button className="button-sell">S</button>
            <button className="button-chart">Chart</button>
        </div>
    );
}

export default HoverDiv;