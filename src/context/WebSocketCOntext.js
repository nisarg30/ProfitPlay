import React, { createContext, useEffect, useState, useContext } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [stockPrices, setStockPrices] = useState({});

    useEffect(() => {
        if (!socket) return;

        socket.on('update', (data) => {
            console.log(data);
            updateStockPrice(data.stock, data.price);
        });

        return () => {
            socket.off('update');
        };
    }, [socket]);

    const updateStockPrice = (stockName, price) => {
        setStockPrices((prevStockPrices) => ({
            ...prevStockPrices,
            [stockName]: price,
        }));
    };

    const joinReq = (list) => {
        if (socket) {
            socket.emit('joinrequest', list);
        } else {
            console.error('Socket connection is not established');
        }
    };
    
    
    const leaveReq = (list) => {
        socket.emit('leaverequest', list);
    };

    return (
        <WebSocketContext.Provider value={{stockPrices, joinReq, leaveReq, socket, setSocket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
