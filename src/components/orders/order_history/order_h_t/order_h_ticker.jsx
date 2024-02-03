import React, { useState } from "react";
import "./order_h_ticker.css";
// import { useOrderPad } from "../../../context/OrerPadContext";

const Ticker = () => {

//   const { isOrderPadVisible, showOrderPad, hideOrderPad } = useOrderPad();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <tr
      className="order-history-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      <td title="TATA CONSULTANCY SERV LT">TCS</td>
      <td>BUY / DELIEVRY</td>
      <td>50</td>
      <td>3,885.04</td>
      <td>3,550</td>
      <td>3,900</td>
      <td>Executed</td>

      {isHovered && (
        
        <div className="history-hover-div">
            <button className="button-buy">B</button>
            <button className="button-sell">S</button>
            <button className="button-chart">Chart</button>
        </div>
      )}
    </tr>
  );
};

export default Ticker;
