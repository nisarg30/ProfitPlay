import React from "react";
import './order_over.css'
import formatNumber from "../../../../datasource/formatter";

const OrderOver = ({ totalbuy, totalsell }) => {
    return (
        <div className="order-over">
            <div className="buy-cont">
                <div className="buy-symbol">
                    <span>B</span>
                </div>
                <div className="buy-text">
                    <div className="total-buy">Total Buy</div>
                    <div className="price-transaction">
                        <div className="buy-amount">&#8377;{formatNumber(totalbuy.toFixed(2))}</div>
                    </div>
                </div>
            </div>
            <div className="buy-cont">
                <div className="sell-symbol">
                    <span>S</span>
                </div>
                <div className="sell-text">
                    <div className="total-sell">Total SELL</div>
                    <div className="price-transaction">
                        <div className="sell-amount">&#8377;{formatNumber(totalsell.toFixed(2))}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderOver;
