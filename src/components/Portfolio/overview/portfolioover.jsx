import React from "react";
import './portfolioo.css'

const PortfolioOverview = () => {
    return (
        <div className="portfolio-cover">
            <div id="portfolioOverview">
                <div class="overviewItem">
                    <span class="label">Investment Amount</span>
                    <span class="value">₹10,000</span>
                </div>

                <div class="overviewItem">
                    <span class="label">Market Value</span>
                    <span class="value">₹12,000</span>
                </div>

                <div class="overviewItem">
                    <span class="label">Total Loss</span>
                    <span class="value">- ₹500</span>
                </div>

                <div class="overviewItem">
                    <span class="label">Days Gain/Loss</span>
                    <span class="value">+ ₹200</span>
                </div>
            </div>
        </div>
    )
}

export default PortfolioOverview;