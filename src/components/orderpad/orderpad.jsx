import React, { useState } from "react";
import { useOrderPad } from "../../context/OrerPadContext";
import './orderpad.css';

const OrderPad = () => { 

    const { isOrderPadVisible, hideOrderPad } = useOrderPad();
    const [tradeType, setTradeType] = useState('intraday');
    const [numberValue, setNumberValue] = useState('');

    if (!isOrderPadVisible) {
        return null; 
    }
    
    const handleTradeChange = (xyz) => {
        setTradeType(xyz);
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, ''); 
        setNumberValue(inputValue);
    };

    return (
        <div className="orderpad">
            <div className="header-pad">
                <div className="index-container-pad" id="ind-cont-1">
                    <span className="index-label">BANKNIFTY</span>
                    <span className="index-value green">23456.10</span>
                    <span className="index-change green">&#9650; 446.12 (12.2%)</span>
                </div> 
                <div className="toggle-button">
                    <div className="button b2" id="button-10">
                        <input type="checkbox" className="checkbox"/>
                        <div className="knobs">
                            <span>B</span>
                        </div>
                        <div className="layer"></div>
                    </div>
                </div>
                <button className="close-orderpad" onClick={hideOrderPad}>
                    X
                </button>
            </div>
            <div className="selector">
                <div className="trade-selection">
                    <p className="product-type">Product Type</p>
                    <div className="separator">
                        <button
                            className={tradeType === 'intraday' ? 'activt' : '' + 'product'}
                            onClick={() => handleTradeChange('intraday')}
                        >
                            Intraday
                        </button>
                        <button
                            className={tradeType === 'delivery' ? 'activt' : '' + 'product'}
                            onClick={() => handleTradeChange('delivery')}
                        >
                            Delivery
                        </button>
                    </div>
                </div>
                <div className="quantity-sel">
                    <p className="product-type">Quantity</p>
                    <input
                        type="number"
                        value={numberValue}
                        onChange={handleInputChange}
                        placeholder="0"
                    />
                </div>
                <div className="price-input">
                    <p className="product-type">Price</p>
                    <input
                        type="number"
                        value={numberValue}
                        onChange={handleInputChange}
                        placeholder="0"
                    />
                </div>
            </div>
            <div className="balance">
                <div className="balance-display">
                    <p>Availabel Cash</p>
                    <p>₹ 1,02,220.11</p>
                </div>
                <button className="place-order product">
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default OrderPad;
