import React from 'react';
import Logo from "../../ExportModule/Logo.jsx";
import DarkmodeButton from "../../ExportModule/DarkmodeButton.jsx";
import SearchField from "../../ExportModule/SearchField.jsx";

const Header = ({ isDarkMode, toggleDarkMode }) =>  {

    return (
        <header className="header">
            <Logo isDarkMode={isDarkMode} />
            <DarkmodeButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} className = 'darkmode-toggle'/>
            <SearchField isDarkMode={isDarkMode} />
        </header>
    )
}

export default Header;