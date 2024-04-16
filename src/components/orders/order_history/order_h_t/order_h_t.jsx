import React from "react";
import { useEffect, useState } from "react";
import "./order_h_t.css";
import Ticker from "./order_h_ticker";
import axios from "axios";
import BackendLink from "../../../../datasource/backendlink";
import io from "socket.io-client";

const OrderHistoryTable = () => {

    const [orderHitory, setOrderHitory] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.post(BackendLink.orderHistory, { token : token });
            if(response.status === 200) {
                setOrderHitory(response.data.logos);
            }
        }

        fetch();
    },[]);

    const [extsocket, setExtSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:4002");
        setExtSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (extsocket) {
            if(orderHitory.length > 0) {  extsocket.emit('joinrequest', orderHitory); }
        }
    }, [orderHitory, extsocket]);
    
    return (
        <table className="history-table">
            <thead>
                <tr className="heading">
                    <th>Stock Name</th>
                    <th>Action/Order Type</th>
                    <th>Quantity</th>
                    <th>Exec. Price</th>
                    <th>LTP</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orderHitory.map((item, index) => {
                    return (
                        <Ticker key={index} currentValues={item } />
                    )
                })}
            </tbody>
        </table>
    )
}

export default OrderHistoryTable;