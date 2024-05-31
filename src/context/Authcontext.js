import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackendLink from '../datasource/backendlink';
import { useWebSocket } from './WebSocketCOntext';
import io from 'socket.io-client';

import { useDispatch } from 'react-redux';
import { setOpenOrders, setOpenPositions, setClosePositions, setOrdersHistory, setPortfolio, setBalance } from '../redux/actions/actions';

const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {

    const { setSocket, socket } = useWebSocket();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [watchlists, setWatchlists] = useState([]);
    const [activeWatchlist, setActiveWatchlist] = useState(0);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if(!isLoggedIn) return;
        // fetch portolio
        const fetchPortfolio = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(BackendLink.portfolio, { token: token });
                dispatch(setPortfolio(response.data.portfolio)); 
                dispatch(setBalance(response.data.balance));
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };
        fetchPortfolio();
    }, [isLoggedIn]);

    useEffect(() => {
        if(!isLoggedIn) return;
        // fetch open orders
        const fetchOpenOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(BackendLink.openorders, { token: token });
                dispatch(setOpenOrders(response.data.openOrders));
            } catch (error) {
                console.error('Error fetching open orders:', error);
            }
        };
        fetchOpenOrders();
    }, [isLoggedIn]); 

    useEffect(() => {
        if(!isLoggedIn) return;
        // fetch positions
        const fetchPositions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(BackendLink.positions, { token: token });
                dispatch(setClosePositions(response.data.close));
                dispatch(setOpenPositions(response.data.ope.log));
            } catch (error) {
                console.error('Error fetching positions:', error);
            }
        };
        fetchPositions();
    }, [isLoggedIn]);

    useEffect(() => {
        if(!isLoggedIn) return;
        // fetch order history
        const fetchOrderHistory = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.post(BackendLink.orderHistory, { token : token });
            dispatch(setOrdersHistory(response.data.logos))
        }

        fetchOrderHistory();
    },[isLoggedIn]);

    useEffect(() => { 
        const token = localStorage.getItem('token');
        if(!socket && isLoggedIn && token && watchlists.length > 0) {
            const newSocket = io(BackendLink.authserve, {
                auth: { token: token },
                autoConnect: true,
                reconnection: true,
                reconnectionAttempts: Infinity,  // Keep trying to reconnect
                reconnectionDelay: 1000,         // Start with 1 second
                reconnectionDelayMax: 5000,      // Maximum delay between connections
                randomizationFactor: 0.5
            });

            setSocket(newSocket);
        }

        return () => {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if(socket && watchlists[activeWatchlist])
        {
            socket.emit('joinrequest', watchlists[activeWatchlist].watchlist.array);    
        }
    },[socket, watchlists])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token);
        } else {
            navigate('./login');
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {

    }, [activeWatchlist]);

    const verifyToken = async (token) => {
        try {
            const response = await axios.post(BackendLink.jwt, { token : token });
            if (response.status === 200) {
                setIsLoggedIn(true);
                setWatchlists(response.data.data);
            } else {
                handleTokenVerificationFailure();
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            handleTokenVerificationFailure();
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    };

    const handleTokenVerificationFailure = () => {
        logout();
        navigate('/login');
    };

    return (
        <AuthorizationContext.Provider value={{ isLoggedIn, isLoading, watchlists, setActiveWatchlist, activeWatchlist, setWatchlists, login, logout }} >
            {!isLoading && children} {/* Render children only when loading is complete */}
        </AuthorizationContext.Provider>
    );
};

export const useAuthorization = () => useContext(AuthorizationContext);
