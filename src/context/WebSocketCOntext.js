import React, { createContext, useEffect, useState, useContext } from 'react';

import { updateStockPrice } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
import { deliveryLimitPostExec, processBuyTrade, processSellTrade, removeOpenOrder, updateBalance } from '../redux/actions/actions';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {

    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!socket) return;

        socket.on('update', (data) => {
            dispatch(updateStockPrice(data.stock, data.price, data.open));
        });

        socket.on('order_executed', (data) => {
            console.log(data);
            dispatch(removeOpenOrder(data));
            if(data.ordertime == 0) {
                const payload = {
                    stockName: data.stockname,
                    price: data.ex_price,
                    quantity: data.quantity,
                    type: data.direction == 0 ? true : false
                };
                const updatedBalance = (data.quantity * data.ex_price);
                dispatch(updateBalance(data.direction == 0 ? -updatedBalance : updatedBalance));
                dispatch(deliveryLimitPostExec(payload));
            }
            else {
                const updatebalance = (data.quantity * data.ex_price);
                if(data.direction == false) {
                    const payload = {
                        stockname : data.stockname,
                        quantity : data.quantity,
                        buy_price : data.ex_price
                    }
                    dispatch(processBuyTrade(payload));
                }
                else {
                    const payload = {
                        stockname : data.stockname,
                        quantity : data.quantity,
                        sell_price : data.ex_price
                    }
                    dispatch(processSellTrade(payload));
                }
                dispatch(updateBalance(data.direction == false ? -updatebalance : updatebalance));
            }
        });

        return () => {
            socket.off('update');
            socket.off('order_executed');
        };
    }, [socket]);

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
        <WebSocketContext.Provider value={{joinReq, leaveReq, socket, setSocket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
