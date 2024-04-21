import React, { useState } from "react";
import "./order_h_ticker.css";
// import { useOrderPad } from "../../../context/OrerPadContext";
import HoverDiv from "../../../hoverdiv/hoverdivp";
import formatNumber from "../../../../datasource/formatter";

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
      <td>{currentValues.stockname}</td>
      <td>BUY / DELIEVRY</td>
      <td>{formatNumber(currentValues.quantity)}</td>
      <td>{formatNumber(currentValues.buy_price)}</td>
      <td>{formatNumber(currentValues.sell_price)}</td>
      <td>{formatNumber(currentValues.currentPrice) }</td>
      <td>Executed</td>

      {isHovered && (
        <HoverDiv currentValues={currentValues}/>
      )}
    </tr>
  );
};

export default Ticker;
