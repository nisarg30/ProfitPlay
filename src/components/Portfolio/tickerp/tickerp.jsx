import React, { useState } from "react";
import "./tickerp.css";
import { useOrderPad } from "../../../context/OrerPadContext";
import HoverDiv from "../../hoverdiv/hoverdiv";

const Ticker = () => {

  const { isOrderPadVisible, showOrderPad, hideOrderPad } = useOrderPad();
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
      <td className="negative">-1.32 (-0.01%)</td>
      <td className="positive">+69.90 (+0.60%)</td>

      {isHovered && (
        <HoverDiv />
      )}
    </tr>
  );
};

export default Ticker;
