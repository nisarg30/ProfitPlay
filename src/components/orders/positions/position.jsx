import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticker from "./position_ticker.jsx";
import './positions.css'
import BackendLink from "../../../datasource/backendlink.js";
import io from "socket.io-client"

const Positions = () => {

    const [openpos, setopenpos] = useState([]);
    const [closepos, setclosepos] = useState([]);
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
            if(openpos.length > 0) {  extsocket.emit('joinrequest', openpos); }
            if(closepos.length > 0) { extsocket.emit('joinrequest', closepos); }
        }
    }, [openpos, closepos, extsocket]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(BackendLink.positions, { token: token });
                setopenpos(response.data.ope.log);
                setclosepos(response.data.close);
            } catch (error) {
                console.error('Error fetching positions:', error);
            }
        };
        fetchData();
    }, []);

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
                            {openpos.length!=0 && openpos.map((item, index) => (
                                <Ticker key={index} currentValues={item} />
                            ))}
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
                                <th>Action / Order Type</th>
                                <th>Quantity</th>
                                <th>ATP</th>
                                <th>LTP</th>
                                <th>Gain / Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            {closepos.length!=0 && closepos.map((item, index) => (
                                <Ticker key={index} currentValues={item} />
                            ))}     
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
