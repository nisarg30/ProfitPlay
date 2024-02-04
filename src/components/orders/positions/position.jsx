import React from "react";
import Ticker from "./position_ticker.jsx";
import './positions.css'
const Positions = () => {
    return (
        <div className="positions">
            <div className="position-container">
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
                        {[...Array(30)].map((_, index) => (
                            <Ticker key={index} />
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
    )
}

export default Positions;