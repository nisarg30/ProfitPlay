import React, { useEffect, useState } from "react";
import Ticker from "./position_ticker.jsx";
import Tickerc from "./closepost.jsx";
import './positions.css'
import io from "socket.io-client"
import BackendLink from "../../../datasource/backendlink.js";

import { useSelector, useDispatch } from 'react-redux';
import { updateStockPrice } from "../../../redux/actions/actions.js";
import { getPriceForStock } from "../../../redux/reducers/selectors.js";

const Positions = () => {

    const openpos = useSelector(state => state.orders.openPos);
    const closepos = useSelector(state => state.orders.closePos);
    const stockPrices = useSelector(state => state.stocks);
    const [realised, setRealised] = useState(0);
    const [closeposeTotal, setclosposTotal] = useState(0);
    const [openposeTotal, setopenposeTotal] = useState(0);
    const [opt, setOpt] = useState(0);
    const [closep, setClosep] = useState(0);
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
        let z = 0;
        closepos.forEach(element => {
            x = x + (element.quantity * ((element.sell_price - element.buy_price)));
            y = y + (element.quantity * element.buy_price);
            if(element.quantity == 0) {
                z = z+1;
            }
        });
        x = x.toFixed(2);
        y = y.toFixed(2);
        setClosep(z);
        setRealised(x);
        setclosposTotal(y);
    },[closepos]);

    useEffect(() => {

        if(!openpos) return;
        let x = 0;
        let y = 0;
        openpos.forEach(element => {
            const pricey = getPriceForStock(element.stockname);
            x = x + (element.quantity * ((pricey.price - element.ex_price)));
            if(element.quantity == 0) {
                y = y+1;
            }
        });
        setOpt(y);
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

    if(openpos.length == opt && closepos.length == closep) {
        return (
            <div className="open-orders-container">
                <div className="image-cont">
                    <img src="/no-history.svg" alt="empty"/>
                </div>
                <div className="image-cont">
                    <p> You do not have any positions to show for today.</p>
                    <p> Buy some stocks using "Intraday" product type from "Orderpad"</p>
                </div>
            </div>
        )
    }

    return (
        <div className="positions">
            <div className="position-container">
                <div className="total-gain-loss">
                    <span style={{ fontWeight : '600'}}>
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
                                const pricey = getPriceForStock(item.stockname);
                                const currentPrice = pricey.price; // Correctly compute the current price here.
                                const change =  (pricey.price -  pricey.open).toFixed(2);
                                const pchange = ((pricey.price -  pricey.open)/ pricey.open*100).toFixed(2);
                                return (
                                    item.quantity > 0 && <Ticker key={index} currentValues={{ ...item, currentPrice: currentPrice, change : change, pchange : pchange }} /> 
                                );
                            })}
                            {
                                openpos.length === opt && (
                                    <tr>
                                        <td colSpan="6">You do not have any open positions today.</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="total-gain-loss">
                    <span style={{ fontWeight : '600'}}>
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
                                const pricey = getPriceForStock(item.stockname);
                                const currentPrice = pricey.price; // Correctly compute the current price here.
                                const change =  (pricey.price -  pricey.open).toFixed(2);
                                const pchange = ((pricey.price -  pricey.open)/ pricey.open*100).toFixed(2);
                                return (
                                    item.quantity > 0 && <Tickerc key={index} currentValues={{ ...item, currentPrice: currentPrice, change : change, pchange : pchange }} /> 
                                );
                            })}
                            {closepos.length === closep && (
                                <tr>
                                    <td colSpan="6" style={{fontWeight : '500', fontSize : '1.2rem'}}>You do not have any closed positions today.</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
                <div className="total-gain-loss" style={{justifyContent : "space-between"}}>
                    <span> Open Positions : &#8377;{openposeTotal} </span>
                    <span className={unrealised > 0 ? "green" : "red"}> Unrealised Gain / Loss : &#8377;{unrealised}&nbsp;&nbsp;({openposeTotal != 0 ? (unrealised*100/openposeTotal).toFixed(2) : 0}) % </span>
                    <span> Close Positions : &#8377;{closeposeTotal} </span>
                    <span className={realised > 0 ? "green" : "red"}> Realised Gain / Loss : &#8377;{realised}&nbsp;&nbsp;({closeposeTotal != 0 ? (realised*100/closeposeTotal).toFixed(2) : 0}%)</span>
                </div>
            </div>
        </div>
    )
}

export default Positions;
