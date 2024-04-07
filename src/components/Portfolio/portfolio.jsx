import React, { useEffect, useState } from "react";
import PortfolioOverview from "./overview/portfolioover";
import Ticker from "./tickerp/tickerp";
import './portfolio.css';
import BackendLink from "../../datasource/backendlink";
import axios from "axios";
import io from "socket.io-client";

const Portfolio = () => {

    const [portfolio, setPortfolio] = useState([]);
    const [extsocket, setExtSocket] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(BackendLink.portfolio, { token: token });
            setPortfolio(response.data.portfolio);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        }
    };

    useEffect(() => {
        const newSocket = io("http://localhost:4002");
        setExtSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (extsocket) {
            extsocket.emit('joinrequest', portfolio);
        }
    }, [portfolio, extsocket]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="portfolio">
            <div className="overflow-cont">
                <div className="portfolio-overview">
                    <PortfolioOverview />
                </div>
                <div className="ticker-container">
                    <table className="portfolio-table">
                        <thead>
                            <tr className="heading">
                                <th>Stock Name</th>
                                <th>Qty</th>
                                <th>LTP</th>
                                <th>ATP</th>
                                <th>Inv.Amt</th>
                                <th>Mkt Value</th>
                                <th>Overall G/L</th>
                                <th>Day's G/L</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolio.map((item, index) => (
                                <Ticker key={index} currentValues={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
