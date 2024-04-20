// Action creators for user-related actions
export const updateBalance = (amount) => {
    return {
      type: 'UPDATE_BALANCE',
      payload: amount
    };
  };
  
  export const setBalance = (amount) => {
    return {
      type: 'SET_BALANCE',
      payload: amount
    };
  };

  export const setPortfolio = (portfolio) => {
    return {
      type: 'SET_PORTFOLIO',
      payload: portfolio
    };
  };

  export const modifyPortfolio = (order) => {
    return {
      type: 'MODIFY_PORTFOLIO',
      payload: order
    };
  };

  export const setOpenOrders = (openOrders) => {
    return {
      type: 'SET_OPEN_ORDER',
      payload: openOrders
    };
  };

  export const setOpenPositions = (positions) => {
    return {
      type: 'SET_OPEN_POSITION',
      payload: positions
    };
  };

  export const setClosePositions = (positions) => {
    return {
      type: 'SET_CLOSE_POSITION',
      payload: positions
    };
  };
  
  export const setOrdersHistory = (oorderHistory) => {
    return {
      type: 'SET_ORDER_HISTORY',
      payload: oorderHistory
    };
  };

  export const addOpenOrder = (order) => {
    return {
      type: 'ADD_OPEN_ORDER',
      payload: order
    };
  };
  
  export const removeOpenOrder = (order) => {
    return {
      type: 'REMOVE_OPEN_ORDER',
      payload: order
    };
  };

  export const updateStockPrice = (stockName, price, open) => {
    return {
        type: 'UPDATE_STOCK_PRICE',
        payload: { stockName, price, open }
    };
  };

  export const processBuyTrade = (trade) => {
    console.log(trade);
    return {
        type: 'PROCESS_BUY_TRADE',
        payload: trade
    };
  };

  export const processSellTrade = (trade) => {
    console.log(trade);
      return {
          type: 'PROCESS_SELL_TRADE',
          payload: trade
      };
  };

  export const deliveryLimitPostExec = (order) => {
    return {
        type: 'DELIVERY_LIMIT_POSTEXEC',
        payload: order
    };
};
