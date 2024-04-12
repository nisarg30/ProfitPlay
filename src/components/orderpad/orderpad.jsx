import React, { useState } from "react";
import axios from "axios";
import { useOrderPad } from "../../context/OrderPadContext";
import './orderpad.css';
import BackendLink from "../../datasource/backendlink";
import { useNavigate } from "react-router-dom";

const OrderPad = () => { 

    const history = useNavigate();
    const { isOrderPadVisible, hideOrderPad, currentValues } = useOrderPad();
    const [tradeType, setTradeType] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [isBuying, setIsBuying] = useState(false);
    const [isLimit, setIsLimit] = useState(false);
    const [error, setError] = useState('');

    if (!isOrderPadVisible) {
        return null; 
    }

    const handleCheckboxChange = (event) => {
        setIsBuying(event.target.checked);
    }
    
    const placeorder = async () => {
        if(price == '' && quantity == '') {
            setError('Please enter a valid price and quantity');
            return;
        }

        if(quantity == '') {
            setError('Please enter a quantity');
            return;
        }

        if(price == '') {
            setError('Please enter a valid price');
            return;
        }

        const token = localStorage.getItem('token');
        const bod = {
            token : token,
            stockname : currentValues.stockname,
            exprice : parseFloat(price),
            quantity : parseInt(quantity),
            ordertime : tradeType,
            direction : isBuying ? 1 : 0,
        }

        const url = isLimit == 0 ? BackendLink.market : BackendLink.limit;
        const response = await axios.post(url, bod);

        if(response.status === 200) {

            if(response.data.case === 1000) {
                setError("login required");
                setTimeout(() => {
                    setError(null);
                    history('/login');
                }, 3000);
            } else if ( response.data.case === 1001) {
                setError("insufficient funds. Availabel : ");
            } else if ( response.data.case === 1003) {
                setError("you do not own this stock. Shorting is not allowed.");
            } else if( response.data.case === 1004) {
                setError("You do not have sufficient quantity of this stock.")
            } else  if( response.data.case === 1002) {
                if(isLimit){
                    setError("order placed successfully");
                }
                else {
                    setError("order executed successfully");
                }
                setTimeout(() => {
                    setError('');
                    setQuantity('');
                    setPrice('');
                    hideOrderPad();
                }, 2000);
            }
        }
    }

    const handleTradeChange = (xyz) => {
        setTradeType(xyz);
    };

    const handleQuanityChange = (event) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, ''); 
        setQuantity(inputValue);
    };

    const handlepriceChange = (event) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, ''); 
        setPrice(inputValue);
    };

    return (
        <div className="orderpad">
            <div className="header-pad">
                <div className="index-container-pad" id="ind-cont-1">
                    <span className="index-label">{currentValues.stockname}</span>
                    <span className="index-value green">{currentValues.price}</span>
                    <span className="index-change green">&#9650; 446.12 (12.2%)</span>
                </div> 
                <div className="toggle-button">
                    <div className="button b2" id="button-10">
                        <input type="checkbox" className="checkbox" checked={isBuying}
                        onChange={handleCheckboxChange}/>
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
                            className={tradeType === 1 ? 'activt' : '' + 'product'}
                            onClick={() => handleTradeChange(1)}
                        >
                            Intraday
                        </button>
                        <button
                            className={tradeType === 0 ? 'activt' : '' + 'product'}
                            onClick={() => handleTradeChange(0)}
                        >
                            Delivery
                        </button>
                    </div>
                </div>
                <div className="trade-selection">
                    <p className="product-type">Trade Type</p>
                    <div className="separator">
                        <button
                            className={isLimit === true ? 'activt' : '' + 'product'}
                            onClick={() => setIsLimit(true)}
                        >
                            Limit
                        </button>
                        <button
                            className={isLimit === false ? 'activt' : '' + 'product'}
                            onClick={() => setIsLimit(false)}
                        >
                            Market
                        </button>
                    </div>
                </div>
                <div className="quantity-sel">
                    <p className="product-type">Quantity</p>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuanityChange}
                        placeholder="0"
                    />
                </div>
                <div className="price-input">
                    <p className="product-type">Price</p>
                    <input
                        type="number"
                        value={price}
                        onChange={handlepriceChange}
                        placeholder="0"
                    />
                </div>
            </div>
            <div className="balance">
                <div className="balance-display">
                    <p>Availabel Cash</p>
                    <p>₹ 1,02,220.11</p>
                </div>
                <button className="place-order product" onClick={placeorder}>
                    Place Order
                </button>
            </div>
            <div className="error-field" style={{color : 'red'}}>
                {error}
            </div>
        </div>
    );
}

export default OrderPad;
