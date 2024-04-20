import React, { useState } from "react";
import "./tickerp.css";
import HoverDiv from "../../hoverdiv/hoverdivp";

const Ticker = ({ currentValues }) => { 
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  console.log(currentValues);

  return (
    
    <tr
      className="portfolio-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      <td>{currentValues.stockname}</td> 
      <td>{currentValues.quantity}</td>
      <td>{(currentValues.currentPrice)}</td>
      <td>{currentValues.buy_price.toFixed(2)}</td>
      <td>{(currentValues.quantity * currentValues.buy_price).toFixed(2)}</td>
      <td>{(currentValues.quantity * currentValues.currentPrice).toFixed(2)}</td>
      <td className="negative">{(currentValues.currentPrice - currentValues.buy_price).toFixed(2)}&nbsp;&nbsp;({((currentValues.currentPrice - currentValues.buy_price)/currentValues.buy_price*100).toFixed(2)}%)</td>
      <td className="positive">{currentValues.change}&nbsp;&nbsp;({currentValues.pchange}%)</td>

      {isHovered && (
        <HoverDiv currentValues={currentValues} />
      )}
    </tr>
  );
};

export default Ticker;
