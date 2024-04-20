import React, { useEffect, useState } from "react";
import Ticker from "./open_orders_ticker";
import "./open_orders.css";
import io from "socket.io-client"
import BackendLink from "../../../datasource/backendlink";

import { useSelector, useDispatch } from 'react-redux';
import { updateStockPrice } from "../../../redux/actions/actions";

const OpenOrders = () => {

    const openOrders = useSelector(state => state.orders.openOrders);
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
            extsocket.emit('joinrequest', openOrders);
        }
    }, [openOrders, extsocket]);

    return (
        <div className="open-orders-container">
            <table className="open-orders-table">
                <thead>
                    <tr className="heading">
                        <th>Stock Name</th>
                        <th>Action / Order Type</th>
                        <th>Quantity</th>
                        <th>LTP</th>
                        <th>Order Price</th>
                    </tr>
                </thead>
                <tbody>
                    {openOrders.map((item, index) => {
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
    );
};

export default OpenOrders;
