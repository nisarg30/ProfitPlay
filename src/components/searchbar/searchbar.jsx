import React from "react";
import './searchbar.css';

const SearchBar = () => {
    return (
        <div class="flex">
            <div class="search-container">
                <em class="icon-search"></em>
                <input class="search-input" type="text" placeholder="Search for stock or company" id="portfolio-search" />
            </div>
        </div>
    )
}

export default SearchBar;