import React, { useState } from 'react'
import "./SearchBar.css"
import searchIcon from "../assets/search.png"

const SearchBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = () => {
        if (inputValue.trim()) {
            onSearch(inputValue.trim());
            setInputValue('');
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                value={inputValue}
                placeholder="Search city..."
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <img src={searchIcon} alt="Search" onClick={handleSearch} className="search-icon" />
        </div>
    )
}

export default SearchBar
