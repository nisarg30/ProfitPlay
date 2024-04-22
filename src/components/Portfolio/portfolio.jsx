import React, { useEffect, useState } from "react";
import PortfolioOverview from "./overview/portfolioover";
import Ticker from "./tickerp/tickerp";
import './portfolio.css';
import io from "socket.io-client";
import BackendLink from "../../datasource/backendlink";

import { useDispatch, useSelector } from "react-redux";
import { updateStockPrice } from "../../redux/actions/actions";
import { getPriceForStock } from "../../redux/reducers/selectors";

const Portfolio = () => {
    const portfolio = useSelector(state => state.user.portfolio);
    const stockPrices = useSelector(state => state.stocks);
    const dispatch = useDispatch();

    const [portfolioValue, setPortfolioValue] = useState(0);
    const [currentValuePort, setCurrentValuePort] = useState(0);
    const [totalDayChange, setTotalDayChange] = useState(0); // State for total day change

    useEffect(() => {
        if(!portfolio || !stockPrices) return;

        let totalPortfolioValue = 0;
        let totalCurrentValuePort = 0;
        let totalDayChangeValue = 0; // Accumulator for total day change

        portfolio.forEach((item, index) => {
            totalPortfolioValue += (item.buy_price * item.quantity);
            const currentPrice = stockPrices[item.stockname]?.price || 0;
            const dayChange = currentPrice - (stockPrices[item.stockname]?.open || 0);
            totalDayChangeValue += dayChange; // Accumulate day change
            totalCurrentValuePort += (currentPrice * item.quantity);
        });

        setPortfolioValue(totalPortfolioValue);
        setCurrentValuePort(totalCurrentValuePort);
        setTotalDayChange(totalDayChangeValue); // Update total day change state
    }, [portfolio, stockPrices]);

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
            extsocket.emit('joinrequest', portfolio);
        }
    }, [portfolio, extsocket]);

    if(portfolio.length == 0) {
        return (
            <div className="portfolio">
                <div className="open-orders-container">
                    <div className="image-cont">
                        <img src="/no-history.svg" alt="empty"/>
                    </div>
                    <div className="image-cont">
                        <p> You currently do not have any stocks in your Portfolio.</p>
                        <p> Buy some stocks from our recommendation using "Delivery" product type.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="portfolio">
            <div className="overflow-cont">
                <div className="portfolio-overview">
                    <PortfolioOverview invest={portfolioValue} currnt={currentValuePort} totalDayChange={totalDayChange} /> 
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
                            {portfolio.map((item, index) => {
                                const pricey = getPriceForStock(item.stockname);
                                const currentPrice = pricey.price; // Correctly compute the current price here.
                                const change =  (pricey.price -  pricey.open).toFixed(2);
                                const pchange = ((pricey.price -  pricey.open)/ pricey.open*100).toFixed(2);
                                return (
                                    item.quantity > 0 && <Ticker key={index} currentValues={{ ...item, currentPrice: currentPrice, change: change, pchange: pchange }} />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
