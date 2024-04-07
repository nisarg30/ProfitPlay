import React from "react";
import './hoverdiv.css';
import { useOrderPad } from "../../context/OrderPadContext";
import BackendLink from "../../datasource/backendlink";
import axios from "axios";
import { useAuthorization } from "../../context/Authcontext";
import { useWebSocket } from "../../context/WebSocketCOntext";

import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

const HoverDiv = ({ currentValues }) => {
    const { showOrderPad } = useOrderPad();

    return (
        <div className="hover-div">
            <button className="button-buy" onClick={() => showOrderPad(currentValues)}>B</button>
            <button className="button-sell" onClick={() => showOrderPad(currentValues)}>S</button>
            <button className="button-chart">Chart</button>
        </div>
    );
}

export default HoverDiv;
