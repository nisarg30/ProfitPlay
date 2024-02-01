import React, { createContext, useContext, useState } from 'react';

const OrderPadContext = createContext();

export const OrderPadProvider = ({ children }) => {
    const [isOrderPadVisible, setOrderPadVisible] = useState(false);

    const showOrderPad = () => {
        setOrderPadVisible(true);
    };

    const hideOrderPad = () => {
        setOrderPadVisible(false);
    };

    return (
        <OrderPadContext.Provider value={{ isOrderPadVisible, showOrderPad, hideOrderPad }}>
        {children}
        </OrderPadContext.Provider>
    );
};

export const useOrderPad = () => {
    return useContext(OrderPadContext);
};
