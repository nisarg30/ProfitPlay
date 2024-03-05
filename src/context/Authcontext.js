import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import BackendLink from '../datasource/backendlink';

const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [watchlists, setWatchlists] = useState([]);
    const [activeWatchlist, setActiveWatchlist] = useState(0);
    const navigate = useNavigate(); // Get navigate function

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token);
        } else {
            setIsLoading(false);
        }
    }, []);

    const verifyToken = async (token) => {
        try {
            const response = await axios.post(BackendLink.jwt, { token });
            if (response.status === 200) {
                setIsLoggedIn(true);
                setWatchlists(response.data.data);
            } else {
                handleTokenVerificationFailure(); // Call function to handle failure
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            handleTokenVerificationFailure(); // Call function to handle failure
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
        logout(); // Logout user
        navigate('/login'); // Navigate to login page
    };

    return (
        <AuthorizationContext.Provider value={{ isLoggedIn, isLoading, watchlists, setActiveWatchlist, activeWatchlist, setWatchlists,login, logout }} >
            {children}
        </AuthorizationContext.Provider>
    );
};

export const useAuthorization = () => useContext(AuthorizationContext);
