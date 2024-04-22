import React from "react";
import { useEffect, useState } from "react";
import "./order_h_t.css";
import Ticker from "./order_h_ticker";
import io from "socket.io-client";
import BackendLink from "../../../../datasource/backendlink";

import { useSelector, useDispatch } from 'react-redux';
import { updateStockPrice } from "../../../../redux/actions/actions";
import { getPriceForStock } from "../../../../redux/reducers/selectors";

const OrderHistoryTable = () => {

    const orderHistory = useSelector(state => state.orders.orderHistory);
    const stockPrices = useSelector(state => state.stocks);
    const dispatch = useDispatch();
    const [extsocket, setExtSocket] = useState(null);
    const [totalBuy, setTotalBuy] = useState(0);

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
            if(orderHistory.length > 0) {  extsocket.emit('joinrequest', orderHistory); }
        }
    }, [orderHistory, extsocket]);
    
    return (
        <table className="history-table">
            <thead>
                <tr className="heading">
                    <th>Stock Name</th>
                    <th>Action/Order Type</th>
                    <th>Quantity</th>
                    <th>BUY Price</th>
                    <th>SELL Price</th>
                    <th>LTP</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orderHistory.map((item, index) => {
                        const pricey = getPriceForStock(item.stockname);
                        const currentPrice = pricey.price; // Correctly compute the current price here.
                        const change =  (pricey.price -  pricey.open).toFixed(2);
                        const pchange = ((pricey.price -  pricey.open)/ pricey.open*100).toFixed(2);
                            return (
                                item.quantity > 0 && <Ticker key={index} currentValues={{ ...item, currentPrice: currentPrice, change : change, pchange : pchange }} /> 
                            );
                        })}
            </tbody>
        </table>
    )
}

export default OrderHistoryTable;