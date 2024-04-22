import React from "react";
import './hoverdiv.css';
import { useOrderPad } from "../../context/OrderPadContext";
import BackendLink from "../../datasource/backendlink";
import axios from "axios";
import { useAuthorization } from "../../context/Authcontext";
import { useWebSocket } from "../../context/WebSocketCOntext";
import { useNavigate } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

const HoverDiv = ({ currentValues }) => {
    const navigate = useNavigate();
    const { showOrderPad } = useOrderPad();
    const { watchlists, activeWatchlist, setWatchlists } = useAuthorization();
    const { socket } = useWebSocket(); 

    const handleChart = () => {
        localStorage.setItem("chart_stock", currentValues.stockname);
        navigate('/charts');
    }
    
    const removeFromWatchlist = (watchlistIndex, stocknameToRemove) => {
        const updatedWatchlists = [...watchlists]; // Create a copy of the watchlists array
        updatedWatchlists[watchlistIndex].watchlist.array = updatedWatchlists[watchlistIndex].watchlist.array.filter(item => item.stockname !== stocknameToRemove);
        socket.emit('leaverequest', [{ stockname : stocknameToRemove }])
        setWatchlists(updatedWatchlists); 
    };

    const deleteStock = async () => {
        try {
            const token = localStorage.getItem('token');
            const body = {
                token: token,
                watchlistName: watchlists[activeWatchlist].watchlist.name,
                stockName: currentValues.stockname
            };

            const response = await axios.post(BackendLink.deletestock, body);
            if (response.status === 200) {
                removeFromWatchlist(activeWatchlist, currentValues.stockname); // Call removeFromWatchlist after it's declared
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.error("Error deleting stock:", error);
        }
    };

    return (
        <div className="hover-div">
            <button className="button-buy" onClick={() => showOrderPad({...currentValues, isBuy : false})}>B</button>
            <button className="button-sell" onClick={() => showOrderPad({...currentValues, isBuy : true})}>S</button>
            <button className="button-chart" onClick={handleChart}>Chart</button>
            <DeleteIcon className="button-chart" onClick={deleteStock} />
        </div>
    );
}

export default HoverDiv;
