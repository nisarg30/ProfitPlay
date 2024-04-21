import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackendLink from '../../../datasource/backendlink';
import './sb.css'

const SearchBar = ({ symbol, setSymbol }) => {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.post(BackendLink.data, { msg: "send data" });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
      fetchData();
    }, []);

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
        console.log(stockname);
        localStorage.setItem('chart_stock', stockname);
        setQuery('');
        setSymbol(stockname);
        setResults([]);
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
                            <div className='result-div' onClick={() => handleResultClick(item.stockname)}>
                                <div className="xyz"
                                    >
                                    {item.stockname}
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
