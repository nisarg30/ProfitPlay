import React, { useState } from "react";
import "./tickerp.css";
import HoverDiv from "../../hoverdiv/hoverdivp";

const Ticker = ({ currentValues }) => { // Destructuring props here

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
      <td>{currentValues.quantity}</td>
      <td>{currentValues.buy_price.toFixed(2)}</td>
      <td>100</td>
      <td>{(currentValues.quantity * currentValues.buy_price).toFixed(2)}</td>
      <td>{currentValues.quantity * 100}</td>
      <td className="negative">20%</td>
      <td className="positive">100&</td>

      {isHovered && (
        <HoverDiv currentValues={currentValues} />
      )}
    </tr>
  );
};

export default Ticker;
