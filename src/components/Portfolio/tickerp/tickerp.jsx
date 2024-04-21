import React, { useState } from "react";
import "./tickerp.css";
import HoverDiv from "../../hoverdiv/hoverdivp";
import formatNumber from "../../../datasource/formatter";

const Ticker = ({ currentValues }) => { 
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    
    <tr
      className="portfolio-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      <td>{currentValues.stockname}</td> 
      <td>{formatNumber(currentValues.quantity)}</td>
      <td>{formatNumber(currentValues.currentPrice)}</td>
      <td>{formatNumber(currentValues.buy_price.toFixed(2))}</td>
      <td>{formatNumber((currentValues.quantity * currentValues.buy_price).toFixed(2))}</td>
      <td>{formatNumber((currentValues.quantity * currentValues.currentPrice).toFixed(2))}</td>
      <td className="negative">{formatNumber((currentValues.currentPrice - currentValues.buy_price).toFixed(2))}&nbsp;&nbsp;({((currentValues.currentPrice - currentValues.buy_price)/currentValues.buy_price*100).toFixed(2)}%)</td>
      <td className="positive">{formatNumber(currentValues.change)}&nbsp;&nbsp;({currentValues.pchange}%)</td>

      {isHovered && (
        <HoverDiv currentValues={currentValues} />
      )}
    </tr>
  );
};

export default Ticker;
