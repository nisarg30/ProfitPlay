import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOrderPad } from "../../context/OrderPadContext";
import './orderpad.css';
import BackendLink from "../../datasource/backendlink";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { modifyPortfolio, processBuyTrade, processSellTrade, updateBalance, addOpenOrder } from "../../redux/actions/actions";
import formatNumber from "../../datasource/formatter";
import { getPriceForStock } from "../../redux/reducers/selectors";

const OrderPad = () => { 

    const dispatch = useDispatch();
    const history = useNavigate();
    const { isOrderPadVisible, hideOrderPad, currentValues } = useOrderPad();
    const stockPrices = useSelector(state => state.stocks);
    const [tradeType, setTradeType] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [isBuying, setIsBuying] = useState(false);
    const [isLimit, setIsLimit] = useState(false);
    const [error, setError] = useState('');
    const balance = useSelector(state => state.user.userBalance)

    useEffect(() => {
        if (currentValues) {
            setIsBuying(currentValues.isBuy);
        }
    }, [currentValues]); 

    if (!isOrderPadVisible) {
        return null; 
    }

    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
    const currentHour = currentDate.getHours();
    const isMarketOpen = currentDay > 0 && currentDay < 6 && currentHour >= 9 && currentHour < 15; // Assuming market hours from 9:00 AM to 3:00 PM

    if (!isMarketOpen) {
        return (
            <div className="orderpad" style={{ height : '20rem' , width : '30rem', padding : "5rem"}}>
                <button style={{ float : 'right'}} className="close-orderpad" onClick={hideOrderPad}>
                    X
                </button>
                <p style={{ margin : "auto", fontSize : '2rem', fontWeight : '500'}} className="market-closed">Indian markets are closed. Please try again during market hours.</p>
            </div>
        );
    }

    if (!isOrderPadVisible) {
        return null; 
    }

    const renderPriceInput = () => {
        if (isLimit) {
            return (
                <div className="price-input">
                    <p className="product-type">Price</p>
                    <input
                        type="number"
                        value={price}
                        onChange={handlepriceChange}
                        placeholder="0"
                    />
                </div>
            );
        } else {
            return (
                <div className="price-input">
                    <p className="product-type">Live Price</p>
                    <p className="product-type" style={{marginTop : '2rem'}}>{formatNumber(pricey.price)}</p>
                </div>
            );
        }
    };

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

        if(price == '' && isLimit) {
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
                if (isLimit) {
                    const update = parseFloat(price) * parseFloat(quantity);
                    dispatch(addOpenOrder(response.data.entry));
                    console.log(response.data.entry);
                    setError("order placed successfully");
                } else {
                    console.log(response.data);
                    if (tradeType == 0) { // Assuming 0 means 'Market Order' and executes immediately
                        const payload = {
                            stockName: currentValues.stockname,
                            price: response.data.price,
                            quantity: parseInt(quantity),
                            type: !isBuying 
                        };
                        console.log(payload);
                        dispatch(modifyPortfolio(payload));
                        dispatch(updateBalance(isBuying == false ? -(payload.price * payload.quantity) : (payload.price * payload.quantity)))
                    }
                    else {
                        if(isBuying == false) {
                            const payload = {
                                stockname : currentValues.stockname,
                                quantity : parseInt(quantity),
                                buy_price : response.data.price
                            }
                            dispatch(processBuyTrade(payload));
                            dispatch(updateBalance(-(payload.quantity * payload.buy_price)));
                        }
                        else {
                            const payload = {
                                stockname : currentValues.stockname,
                                quantity : parseInt(quantity),
                                sell_price : response.data.price
                            }
                            dispatch(processSellTrade(payload));
                            dispatch(updateBalance((payload.quantity * payload.sell_price)));
                        }
                    }
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
        // const inputValue = event.target.value.replace(/[^0-9]/g, ''); 
        setPrice(event.target.value);
    };

    const pricey = getPriceForStock(currentValues.stockname);
    console.log(pricey);

    var color1 = (pricey.price - pricey.open).toFixed(2) > 0 ? 1 : 0;
    var triangle1 = color1 > 0 ? "\u25B2" : "\u25BC";

    return (
        <div className="orderpad">
            <div className="header-pad">
                <div className="index-container-pad" id="ind-cont-1">
                    <span className="index-label">{currentValues.stockname}</span>
                    <span className={color1 > 0 ? "green index-value" : "red index-value"}>{formatNumber(pricey.price)}</span>
                    <span className={color1 > 0 ? "green index-change" : "red index-change"}>{triangle1}
                    {formatNumber((pricey.price - pricey.open).toFixed(2))}&nbsp;
                    ({((pricey.price - pricey.open)/pricey.open*100).toFixed(2)}) % </span>
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
                            className={tradeType === 1 ? (isBuying == false ? "activtb" : "activts") : '' + 'product'}
                            onClick={() => handleTradeChange(1)}
                        >
                            Intraday
                        </button>
                        <button
                            className={tradeType === 0 ? (isBuying == false ? "activtb" : "activts") : '' + 'product'}
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
                            className={isLimit === true ? (isBuying == false ? "activtb" : "activts") : '' + 'product'}
                            onClick={() => setIsLimit(true)}
                        >
                            Limit
                        </button>
                        <button
                            className={isLimit === false ? (isBuying == false ? "activtb" : "activts") : '' + 'product'}
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
                {renderPriceInput()}
            </div>
            <div className="balance">
                <div className="balance-display">
                    <p>Availabel Cash</p>
                    <p>₹ {formatNumber(balance.toFixed(2))}</p>
                </div>
                <button className={(isBuying == false ? "activtb place-order-b" : "activts place-order-s")} onClick={placeorder}>
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
