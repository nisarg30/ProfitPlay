import React from 'react';
import './ticker.css';

const Ticker = ({ stockname, price, change, pchange }) => {
  price = price.toFixed(2);
  change = change.toFixed(2);
  pchange = pchange.toFixed(2);

  return (
    <div className='ticker'>
      <div className='stockname'>
        <span style={{ paddingTop: '0.20rem', marginTop: 'auto', marginBottom: 'auto', fontSize: '0.75rem' }}>
          {stockname}
        </span>
      </div>
      <div className='price-container'>
        <div style={{ paddingBottom: '0.35rem', display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginBottom: 'auto', marginTop: 'auto' }}>
          <span style={{ fontSize: '0.75rem', color: change > 0 ? 'forestgreen' : 'crimson' }}>
            {price}
            {change > 0 ? (
              <span className='up-arrow'>&#9650;</span>
            ) : (
              <span className='down-arrow'>&#9660;</span>
            )}
          </span>
          <span style={{ fontSize: '0.75rem' }}>
            {change + '  (' + pchange + '%)'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
