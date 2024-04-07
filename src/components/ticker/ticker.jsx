import React, { useState } from 'react';
import './ticker.css';
import { useOrderPad } from '../../context/OrderPadContext';
import HoverDiv from '../hoverdiv/hoverdiv';

const Ticker = ({ stockname, price, change, pchange }) => {
  const [currentValues, setCurrentValues] = useState(null); // State to hold current values of the ticker
  const [isHovered, setIsHovered] = useState(false);
  const { isOrderPadVisible, showOrderPad, hideOrderPad } = useOrderPad();

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCurrentValues({ stockname, price, change, pchange });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
   // price = price.toFixed(2);
  // change = change.toFixed(2);
  // pchange = pchange.toFixed(2);
  return (
    <div
      className='ticker'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='stockname'>
        <span style={{ paddingTop: '0.20rem', marginTop: 'auto', marginBottom: 'auto'  }}>
          {stockname}
        </span>
      </div>
      <div className='price-container'>
        <div style={{ paddingBottom: '0.35rem', display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginBottom: 'auto', marginTop: 'auto' }}>
          <span style={{ color: change > 0 ? 'forestgreen' : 'crimson' }}>
            {price}
            {change > 0 ? (
              <span className='up-arrow'>&#9650;</span>
            ) : (
              <span className='down-arrow'>&#9660;</span>
            )}
          </span>
          <span >
            {change + '  (' + pchange + '%)'}
          </span>
        </div>
      </div>
      {isHovered && <HoverDiv currentValues={currentValues} />} {/* Pass currentValues as prop */}
    </div>
  );
};

export default Ticker;
