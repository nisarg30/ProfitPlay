import React, { useState } from "react";
import "./tickerp.css";

const Ticker = () => {
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
      <td title="TATA CONSULTANCY SERV LT">TCS</td>
      <td>3</td>
      <td>3,884.60</td>
      <td>3,885.04</td>
      <td>11,655.12</td>
      <td>11,653.80</td>
      <td className="negative">-1.32% (-0.01%)</td>
      <td className="positive">+69.90% (+0.60%)</td>

      {isHovered && (
        
        <div className="hover-div">
            <button className="button-buy">B</button>
            <button className="button-sell">S</button>
            <button className="button-chart">Chart</button>
        </div>
        // </td>
      )}
    </tr>
  );
};

export default Ticker;
