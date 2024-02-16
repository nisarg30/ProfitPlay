import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackendLink from '../../datasource/backendlink';
import './searchbar.css';
import { useOrderPad } from '../../context/OrerPadContext'

const SearchBar = () => {

    const { isOrderPadVisible, showOrderPad, hideOrderPad } = useOrderPad();
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post(BackendLink.data, { msg: "send data" });
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
                                    <button className='button-add'>+</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
