import React from "react";
import './portfolioo.css'
import formatNumber from "../../../datasource/formatter";

const PortfolioOverview = ({ invest, currnt, totalDayChange }) => {

    const abc = currnt - invest;

    return (
        <div className="portfolio-cover">
            <div className="overview">
                <div className="over-text">
                    <p> Equity Portfolio Overview </p>
                    <div id="portfolioOverview">
                        <div className="overviewItem">
                            <span className="label">Investment Amount</span>
                            <span className="value">₹{formatNumber(invest)}</span>
                        </div>

                        <div className="overviewItem">
                            <span class="label">Market Value</span>
                            <span class="value">₹{formatNumber(currnt)}</span>
                        </div>

                        <div className="overviewItem">
                            <span className="label">Total Gain / Loss</span>
                            <span className={"value " + (abc > 0 ? "green" : "red")}>₹ {formatNumber((currnt - invest).toFixed(2))} &nbsp;&nbsp;({((currnt-invest)/invest*100).toFixed(2)}%)</span>
                        </div>
                        
                        <div className="overviewItem">
                            <span className="label">Days Gain/Loss</span>
                            <span className={"value " + ((totalDayChange > 0) ? "green" : "red")}>₹{totalDayChange.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioOverview;