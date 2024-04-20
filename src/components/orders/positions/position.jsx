import React, { useEffect, useState } from "react";
import Ticker from "./position_ticker.jsx";
import Tickerc from "./closepost.jsx";
import './positions.css'
import io from "socket.io-client"
import BackendLink from "../../../datasource/backendlink.js";

import { useSelector, useDispatch } from 'react-redux';
import { updateStockPrice } from "../../../redux/actions/actions.js";

const Positions = () => {

    const openpos = useSelector(state => state.orders.openPos);
    const closepos = useSelector(state => state.orders.closePos);
    const stockPrices = useSelector(state => state.stocks);
    const dispatch = useDispatch();

    const [extsocket, setExtSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(BackendLink.geneserve);
        setExtSocket(newSocket);

        newSocket.on('update', (data) => {
            dispatch(updateStockPrice(data.stock, data.price, data.open));
        });

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (extsocket) {
            extsocket.emit('joinrequest', openpos);
            extsocket.emit('joinrequest', closepos);
        }
    }, [openpos, closepos, extsocket]);

    return (
        <div className="positions">
            <div className="position-container">
                <div className="total-gain-loss">
                    <span>
                        Open Positions
                    </span>
                </div>
                <div className="position-container-semi">
                    <table className="positions-table">
                        <thead>
                            <tr className="heading">
                                <th>Stock Name</th>
                                <th>Action / Order Type</th>
                                <th>Quantity</th>
                                <th>ATP</th>
                                <th>LTP</th>
                                <th>Gain / Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openpos.length !== 0 && openpos.map((item, index) => {
                                const currentPrice = stockPrices[item.stockname].price; // Correctly compute the current price here.
                                const change =  (stockPrices[item.stockname].price -  stockPrices[item.stockname].open).toFixed(2);
                                const pchange = ((stockPrices[item.stockname].price -  stockPrices[item.stockname].open)/ stockPrices[item.stockname].open).toFixed(2);
                                return (
                                    <Ticker key={index} currentValues={{ ...item, currentPrice: currentPrice, change : change, pchange : pchange }} /> 
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="total-gain-loss">
                    <span>
                        Close Positions
                    </span>
                </div>
                <div className="position-container-semi">
                    <table className="positions-table">
                        <thead>
                            <tr className="heading">
                                <th>Stock Name</th>
                                <th>Quantity</th>
                                <th>BUY PRICE</th>
                                <th>SELL PRICE</th>
                                <th>LTP</th>
                                <th>Gain / Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            {closepos.length !== 0 && closepos.map((item, index) => {
                                const currentPrice = stockPrices[item.stockname].price; // Correctly compute the current price here.
                                const change =  (stockPrices[item.stockname].price -  stockPrices[item.stockname].open).toFixed(2);
                                const pchange = ((stockPrices[item.stockname].price -  stockPrices[item.stockname].open)/ stockPrices[item.stockname].open*100).toFixed(2);
                                return (
                                    <Ticker key={index} currentValues={{ ...item, currentPrice: currentPrice, change : change, pchange : pchange }} /> 
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="total-gain-loss">
                    <span>
                        Total G/L : -175.00
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Positions;
