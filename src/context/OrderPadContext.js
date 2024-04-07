import React, { createContext, useContext, useState } from 'react';

const OrderPadContext = createContext();

export const OrderPadProvider = ({ children }) => {
    const [isOrderPadVisible, setOrderPadVisible] = useState(false);
    const [currentValues, setCurrentValues] = useState(null); // State to hold current values

    const showOrderPad = (values) => {
        setCurrentValues(values);
        setOrderPadVisible(true);
    };

    const hideOrderPad = () => {
        setOrderPadVisible(false);
    };

    return (
        <OrderPadContext.Provider value={{ isOrderPadVisible, showOrderPad, hideOrderPad, currentValues }}>
            {children}
        </OrderPadContext.Provider>
    );
};

export const useOrderPad = () => {
    return useContext(OrderPadContext);
};