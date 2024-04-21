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
    const [realised, setRealised] = useState(0);
    const [closeposeTotal, setclosposTotal] = useState(0);
    const [openposeTotal, setopenposeTotal] = useState(0);
    const [unrealised, setUnrealised] = useState(1);
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

        if(!closepos) return;
        let x = 0;
        let y = 0;
        closepos.forEach(element => {
            x = x + (element.quantity * ((element.sell_price - element.buy_price)));
            y = y + (element.quantity * element.buy_price);
        });
        x = x.toFixed(2);
        y = y.toFixed(2);
        setRealised(x);
        setclosposTotal(y);
    },[closepos]);

    useEffect(() => {

        if(!openpos) return;
        let x = 0;
        openpos.forEach(element => {
            x = x + (element.quantity * ((stockPrices[element.stockname].price - element.ex_price)));
        });
        x = x.toFixed(2);
        setUnrealised(x);
    },[openpos, stockPrices]);

    useEffect(() => {

        if(!openpos) return;
        let x = 0;
        openpos.forEach(element => {
            x = x + (element.quantity * element.ex_price);
        });
        x = x.toFixed(2);
        setopenposeTotal(x);
    },[openpos]);

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
                                    item.quantity > 0 && <Tickerc key={index} currentValues={{ ...item, currentPrice: currentPrice, change : change, pchange : pchange }} /> 
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="total-gain-loss" style={{justifyContent : "space-between"}}>
                    <span> Open Positions : {openposeTotal} </span>
                    <span> Unrealised Gain / Loss : {unrealised}&nbsp;&nbsp;({openposeTotal != 0 ? (unrealised/openposeTotal).toFixed(2) : 0}) % </span>
                    <span> Close Positions : {closeposeTotal} </span>
                    <span> Realised Gain / Loss : {realised}&nbsp;&nbsp;({closeposeTotal != 0 ? (realised/closeposeTotal).toFixed(2) : 0})</span>
                </div>
            </div>
        </div>
    )
}

export default Positions;
