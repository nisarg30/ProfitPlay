import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticker from "./open_orders_ticker";
import "./open_orders.css";
import BackendLink from "../../../datasource/backendlink";
import io from "socket.io-client"

const OpenOrders = () => {

    const [openOrders, setOpenOrders] = useState([]);
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
            extsocket.emit('joinrequest', openOrders);
        }
    }, [openOrders, extsocket]);

    useEffect(() => {
        const fetchOpenOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(BackendLink.openorders, { token: token });
                setOpenOrders(response.data.openOrders);
            } catch (error) {
                console.error('Error fetching open orders:', error);
            }
        };
        
        fetchOpenOrders();
    }, []); 

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
                    {openOrders.map((item, index) => (
                        <Ticker key={index} currentValues={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OpenOrders;
