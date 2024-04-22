import { combineReducers } from '@reduxjs/toolkit';

// User and portfolio state
const userInitialState = {
        userBalance: 0,
        portfolio: [],
    };

    function userReducer(state = userInitialState, action) {
        switch (action.type) {
            case 'SET_BALANCE':
                return { ...state, userBalance: action.payload };
            case 'UPDATE_BALANCE':
                return { ...state, userBalance: state.userBalance + action.payload };
            case 'SET_PORTFOLIO':
                return { ...state, portfolio: action.payload };
            case 'MODIFY_PORTFOLIO':
                return { ...state, portfolio: MoDPORT(state.portfolio, action.payload) };
            case 'DELIVERY_LIMIT_POSTEXEC':
                return { ...state, portfolio: MoDPORT(state.portfolio, action.payload) };
            default:
                return state;
        }
    }
    
    function MoDPORT(portfolio, order) {
        const { stockName,  price, quantity, type } = order;
        console.log(stockName, price, quantity, type);
        let newPortfolio = [...portfolio];

        const index = newPortfolio.findIndex(item => item.stockname === stockName);
    
        if (type === true) {
            if (index !== -1) {
                const existingEntry = newPortfolio[index];
                const totalQuantity = existingEntry.quantity + quantity;
                const newAveragePrice = ((existingEntry.buy_price * existingEntry.quantity) + (price * quantity)) / totalQuantity;
                newPortfolio[index] = { ...existingEntry, quantity: totalQuantity, buy_price: newAveragePrice };
                console.log(newPortfolio);
            } else {
                newPortfolio.push({ stockname : stockName, quantity : quantity, buy_price: price });
            }
        } else if (type === false) {
            if (index !== -1) {
                const existingEntry = newPortfolio[index];
                const newQuantity = existingEntry.quantity - quantity;
    
                if (newQuantity > 0) {
                    newPortfolio[index] = { ...existingEntry, quantity: newQuantity };
                } else {
                    newPortfolio.splice(index, 1);
                }
            }
        }
        return newPortfolio;
    }
    
// Orders state (openOrders, closePos, openPos, orderHistory)
const ordersInitialState = {
    openOrders: [],
    closePos: [],
    openPos: [],
    orderHistory: [],
};

function ordersReducer(state = ordersInitialState, action) {
    switch (action.type) {
        case 'SET_OPEN_ORDER':
            return { ...state, openOrders: action.payload };
        case 'SET_CLOSE_POSITION':
            return { ...state, closePos: action.payload };
        case 'SET_OPEN_POSITION':
            return { ...state, openPos: action.payload };
        case 'SET_ORDER_HISTORY':
            return { ...state, orderHistory: action.payload };
        case 'ADD_OPEN_ORDER':
            return { ...state, openOrders: [...state.openOrders, action.payload] };
        case 'REMOVE_OPEN_ORDER':
            console.log(action.payload);
            console.log(state.openOrders);
            return {
                ...state,
                openOrders: state.openOrders.filter(order => {
                    return (
                        order.direction !== action.payload.direction ||
                        order.ex_price !== action.payload.ex_price ||
                        order.ordertime !== action.payload.ordertime ||
                        order.quantity !== action.payload.quantity ||
                        order.stockname !== action.payload.stockname ||
                        order.time !== action.payload.time
                    );
                })
            };
        case 'PROCESS_BUY_TRADE':
            return {
                ...state,
                openPos: processBuyTradeOpenPos(state.openPos, action.payload),
                closePos: processBuyTradeClosePos(state.closePos, action.payload),
                orderHistory: processOrderHistory(state.orderHistory, action.payload, true),
            };
        case 'PROCESS_SELL_TRADE':
            return {
                ...state,
                openPos: processSellTradeOpenPos(state.openPos, action.payload),
                closePos: processSellTradeClosePos(state.closePos, action.payload),
                orderHistory: processOrderHistory(state.orderHistory, action.payload, false),
            };
        default:
            return state;
    }
}

function processBuyTradeOpenPos(openPos, trade) {
    const index = openPos.findIndex(item => item.stockname === trade.stockname);
    const newOpenPos = [...openPos];
    if (index !== -1) {
        const existingEntry = {...newOpenPos[index]};
        existingEntry.quantity += trade.quantity;
        existingEntry.ex_price = ((existingEntry.ex_price * (existingEntry.quantity - trade.quantity)) + (trade.buy_price * trade.quantity)) / existingEntry.quantity;
        newOpenPos[index] = existingEntry;
    } else {
        newOpenPos.push({
            stockname: trade.stockname,
            quantity: trade.quantity,
            ex_price: trade.buy_price,
            direction: 'buy'
        });
    }
    return newOpenPos;
}

function processBuyTradeClosePos(closePos, trade) {
    const index = closePos.findIndex(item => item.stockname === trade.stockname);
    const newClosePos = [...closePos];
    if (index !== -1) {
        const existingEntry = {...newClosePos[index]};
        if (existingEntry.quantity > 0) {
            existingEntry.buy_price = ((existingEntry.buy_price * existingEntry.quantity) + (trade.buy_price * trade.quantity)) / (existingEntry.quantity + trade.quantity);
        }
        newClosePos[index] = existingEntry;
    } else {
        newClosePos.push({
            stockname: trade.stockname,
            quantity: 0,
            buy_price: trade.buy_price,
            sell_price: 0, 
            realised: 0
        });
    }
    return newClosePos;
}

function processSellTradeOpenPos(openPos, trade) {
    const index = openPos.findIndex(item => item.stockname === trade.stockname);
    const newOpenPos = [...openPos];
    if (index !== -1) {
        const existingEntry = {...newOpenPos[index]};
        existingEntry.quantity -= trade.quantity;
        if (existingEntry.quantity > 0) {
            newOpenPos[index] = existingEntry;
        } else {
            newOpenPos.splice(index, 1);
        }
    }
    return newOpenPos;
}

function processSellTradeClosePos(closePos, trade) {
    const index = closePos.findIndex(item => item.stockname === trade.stockname);
    const newClosePos = [...closePos];
    if (index !== -1) {
        const existingEntry = {...newClosePos[index]};
        existingEntry.quantity += trade.quantity;
        existingEntry.sell_price = ((existingEntry.sell_price * (existingEntry.quantity)) + (trade.sell_price * trade.quantity)) / (existingEntry.quantity + trade.quantity);
        newClosePos[index] = existingEntry;
    } else {
        newClosePos.push({
            stockname: trade.stockname,
            quantity: trade.quantity,
            buy_price: 0,
            sell_price: trade.sell_price,
            realised: 0
        });
    }
    return newClosePos;
}

function processOrderHistory(orderHistory, trade, isBuy) {
    const index = orderHistory.findIndex(item => item.stockname === trade.stockname);
    const newOrderHistory = [...orderHistory];
    if (index !== -1) {
        const existingEntry = {...newOrderHistory[index]};
        const totalQuantity = existingEntry.quantity + (!isBuy ? trade.quantity : 0);
        if (isBuy) {
            existingEntry.buy_price = ((existingEntry.buy_price * existingEntry.quantity) + (trade.buy_price * trade.quantity)) / (existingEntry.quantity + trade.quantity);
        } else {
            existingEntry.sell_price = ((existingEntry.sell_price * existingEntry.quantity) + (trade.sell_price * trade.quantity)) / totalQuantity;
        }
        existingEntry.quantity = totalQuantity;
        newOrderHistory[index] = existingEntry;
    } else {
        newOrderHistory.push({
            stockname: trade.stockname,
            quantity: isBuy ? 0 : trade.quantity,
            buy_price: isBuy ? trade.buy_price : 0,
            sell_price: !isBuy ? trade.sell_price : 0,
            realised: 0
        });
    }
    return newOrderHistory;
}

const initialState = {};

const stockPriceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_STOCK_PRICE':
            const { stockName, price, open } = action.payload; 
            const roundedPrice = price.toFixed(2);
            return {
                ...state,
                [stockName]: {
                    price: roundedPrice,
                    open: open,
                }
            };
        default:
            return state;
    }
};


// Combine all reducers
const rootReducer = combineReducers({
    user: userReducer,
    orders: ordersReducer,
    stocks : stockPriceReducer,
});

export default rootReducer;
