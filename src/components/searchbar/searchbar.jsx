import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackendLink from '../../datasource/backendlink';
import './searchbar.css';
import { useOrderPad } from '../../context/OrderPadContext'
import { useAuthorization } from '../../context/Authcontext';
import { useWebSocket } from '../../context/WebSocketCOntext';

const SearchBar = () => {

    const { socket } = useWebSocket();
    const { showOrderPad } = useOrderPad();
    const { activeWatchlist, watchlists, setWatchlists } = useAuthorization();
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const addStocks = async (stockname) => {
        const watchf = watchlists[activeWatchlist];
        let stocknameExists = 0;

        if(watchlists!=null && watchf.watchlist.array != undefined && watchf.watchlist.array.length > 0){
            stocknameExists = watchf.watchlist.array.some(item => item.stockname === stockname);
        }

        console.log(stocknameExists);

        if (stocknameExists) {
            setError("stockname already exists in watchlist");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }

        const token = localStorage.getItem('token');
        const bod = {
            token : token,
            stockname: stockname,
            watchlistname : watchlists[activeWatchlist].watchlist.name
        }
        const response = await axios.post(BackendLink.addstocktowatchlist, bod);
        if (response.status === 200) {
            setQuery('');
            setResults('');
            const updatedWatchlists = watchlists.map((watchlist, index) => {
                if (index === activeWatchlist) {
                    const newArray = watchlist.watchlist.array ? [...watchlist.watchlist.array] : []; // Check if array exists
                    newArray.push({ stockname: stockname }); // Push the new item
                    return {
                        ...watchlist,
                        watchlist: {
                            ...watchlist.watchlist,
                            array: newArray // Update the array in the watchlist
                        }
                    };
                }
                return watchlist;
            });
            
            if(socket) {
                socket.emit('joinrequest', [ { stockname : stockname } ])
            }
            setWatchlists(updatedWatchlists);
        }        
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(BackendLink.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue.toUpperCase());
        filterResults(inputValue);
    };

    const filterResults = (inputValue) => {
        if (!inputValue) {
            setResults([]);
            return;
        }

        const filteredResults = data.filter((item) => {
            if (typeof item.stockname === 'string') {
                return item.stockname.toLowerCase().includes(inputValue.toLowerCase());
            }
            return false;
        });
        setResults(filteredResults);
    };

    const handleResultClick = (stockname) => {
        setQuery(stockname);
        setResults([]); // Clear the results when a result is clicked
    };

    return (
        <div className="SearchBar">
            <div className="searchcont">
                <input
                    className="SearchBarInput"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search..."
                />
                <div className="SearchIcon">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div>
            </div>

            {results.length > 0 && (
                <ul className="SearchResults">
                    {results.map((item) => (
                        <li
                            key={item._id}
                            className="SearchResultItem"
                        >
                            <div className='result-div'>
                                <div className="xyz"
                                    onClick={() => handleResultClick(item.stockname)}>
                                    {item.stockname}
                                </div>
                                <div className="buttons-selection">
                                    <button className='button-buy' onClick={showOrderPad}>B</button>
                                    <button className='button-sell' onClick={showOrderPad}>S</button>
                                    <button className='button-chart'>Chart</button>
                                    <button className='button-add' onClick={() => {addStocks(item.stockname)}}>+</button>
                                </div>
                            </div>
                            <span style={{'fontSize' : '0.8rem', color : 'red'}}>{error}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
