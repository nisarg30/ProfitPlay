import React, { useState } from "react";
import "./tickerp.css";
import HoverDiv from "../../hoverdiv/hoverdivp";
import formatNumber from "../../../datasource/formatter";
import { green } from "@mui/material/colors";

const Ticker = ({ currentValues }) => { 
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const triangle = currentValues.change > 0 ? "\u25B2" : "\u25BC";

  return (
    
    <tr
      className="portfolio-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      <td>{currentValues.stockname}</td> 
      <td>{formatNumber(currentValues.quantity)}</td>
      <td className={currentValues.pchange > 0 ? 'green' : 'red'}>{formatNumber(currentValues.currentPrice)} {triangle} {formatNumber(currentValues.change)}&nbsp; {currentValues.pchange}%</td>
      <td>{formatNumber(currentValues.buy_price.toFixed(2))}</td>
      <td>{formatNumber((currentValues.quantity * currentValues.buy_price).toFixed(2))}</td>
      <td>{formatNumber((currentValues.quantity * currentValues.currentPrice).toFixed(2))}</td>
      <td className={(currentValues.currentPrice - currentValues.buy_price) > 0 ? "green" : "red"}>{formatNumber((currentValues.currentPrice - currentValues.buy_price).toFixed(2))}&nbsp;&nbsp;({((currentValues.currentPrice - currentValues.buy_price)/currentValues.buy_price*100).toFixed(2)}%)</td>
      <td className={currentValues.change > 0 ? "green" : "red"}>{formatNumber(currentValues.change)}&nbsp;&nbsp;({currentValues.pchange}%)</td>

      {isHovered && (
        <HoverDiv currentValues={currentValues} />
      )}
    </tr>
  );
};

export default Ticker;
