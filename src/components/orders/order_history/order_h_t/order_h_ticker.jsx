import React, { useState } from "react";
import "./order_h_ticker.css";
// import { useOrderPad } from "../../../context/OrerPadContext";
import HoverDiv from "../../../hoverdiv/hoverdivp";

const Ticker = ({currentValues}) => {

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
      <td title="TATA CONSULTANCY SERV LT">{currentValues.stockname}</td>
      <td>BUY / DELIEVRY</td>
      <td>{currentValues.quantity}</td>
      <td>{currentValues.buy_price}</td>
      <td>{currentValues.sell_price}</td>
      <td>{ currentValues.currentPrice }</td>
      <td>Executed</td>

      {isHovered && (
        <HoverDiv currentValues={currentValues}/>
      )}
    </tr>
  );
};

export default Ticker;
