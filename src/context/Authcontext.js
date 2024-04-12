import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackendLink from '../datasource/backendlink';
import { useWebSocket } from './WebSocketCOntext';
import io from 'socket.io-client';

const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {

    const { setSocket, socket } = useWebSocket();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [watchlists, setWatchlists] = useState([]);
    const [activeWatchlist, setActiveWatchlist] = useState(0);
    const navigate = useNavigate();

    useEffect(() => { 

        if( watchlists.length == 0) return;
        if(!socket && isLoggedIn) {
            const newSocket = io("http://localhost:4002");
            setSocket(newSocket);
            
            newSocket.on('connect', () => {
                newSocket.emit('joinrequest', watchlists[activeWatchlist].watchlist.array);
            });
        }

        return () => {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [isLoggedIn]);

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
