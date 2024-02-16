import React from "react";
import SearchBar from "../searchbar/searchbar";
import PortfolioOverview from "./overview/portfolioover";
import Ticker from "./tickerp/tickerp";
import './portfolio.css';

const Portfolio = () => {
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
                            {[...Array(30)].map((_, index) => (
                                <Ticker key={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
