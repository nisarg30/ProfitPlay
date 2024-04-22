import React from "react";
import './hoverdiv.css';
import { useOrderPad } from "../../context/OrderPadContext";
import { useNavigate } from "react-router-dom";

const HoverDiv = ({ currentValues }) => {
    const { showOrderPad } = useOrderPad();
    const navigate = useNavigate();

    const handleChart = () => {
        localStorage.setItem("chart_stock", currentValues.stockname);
        navigate('/charts');
    }

    return (
        <div className="hover-div">
            <button className="button-buy" onClick={() => showOrderPad({...currentValues, isBuy : false})}>B</button>
            <button className="button-sell" onClick={() => showOrderPad({...currentValues, isBuy : true})}>S</button>
            <button className="button-chart" onClick={handleChart}>Chart</button>
        </div>
    );
}

export default HoverDiv;
