import React, { useState } from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import AssistantIcon from '@mui/icons-material/Assistant';
import Logo from "../../ExportModule/Logo.jsx";
import DarkmodeButton from "../../ExportModule/DarkmodeButton.jsx";

const Header = ({ isDarkMode, toggleDarkMode }) =>  {
    const [searchInput, setSearchInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <header className="header">
            <Logo isDarkMode={isDarkMode} />
            <DarkmodeButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <div className={`search-container ${isFocused ? 'focused' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
                <AssistantIcon className="assistant-icon"/>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Поиск..."
                    value={searchInput}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <SearchIcon className="search-icon"/>
                <AppsIcon className="app-icon"/>
            </div>
        </header>
    )
}

export default Header;