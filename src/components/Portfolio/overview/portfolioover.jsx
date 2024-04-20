import React from "react";
import './portfolioo.css'

const PortfolioOverview = ({ invest, currnt, totalDayChange}) => {
    return (
        <div className="portfolio-cover">
            <div id="portfolioOverview">
                <div class="overviewItem">
                    <span class="label">Investment Amount</span>
                    <span class="value">₹{invest}</span>
                </div>

                <div class="overviewItem">
                    <span class="label">Market Value</span>
                    <span class="value">₹{currnt}</span>
                </div>

                <div class="overviewItem">
                    <span class="label">Total Gain / Loss</span>
                <span class="value">₹ {(currnt - invest).toFixed(2)} &nbsp;&nbsp;({((currnt-invest)/invest*100).toFixed(2)}%)</span>
                </div>
                <div class="overviewItem">
                    <span class="label">Days Gain/Loss</span>
                    <span class="value">+ ₹{totalDayChange.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}

export default PortfolioOverview;