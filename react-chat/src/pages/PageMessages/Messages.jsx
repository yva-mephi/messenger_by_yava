import React, { useState, useRef } from "react";
import Menu from "./Menu";
import DarkmodeButton from "../../ExportModule/DarkmodeButton.jsx";
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../styles/messagesPage.module.scss';

const Messages = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    // Обработчик клика на документе
    const handleDocumentClick = (event) => {
        if (isMenuOpen) {
            handleClickOutside(event);
        }
    };

    return (
        <div className={`${styles.messagesPage} ${isDarkMode ? styles.darkMode : ''}`}  onClick={handleDocumentClick}>
            <header className={styles.messagesPage_header}>
                <button className={styles.menuButton} onClick={toggleMenu}>
                    <MenuSharpIcon />
                </button>
                <button className={styles.backbutton}>
                    <ArrowBackSharpIcon />
                </button>
                <div className={`${styles.searchField} ${isDarkMode ? 'dark-mode' : ''}`}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Поиск"
                    />
                    <button className={styles.findButton}>
                        <SearchIcon className={styles.searchIcon} />
                    </button>
                </div>
            </header>
            <main className={styles.messagesMain} >
                {/* Основной контент сообщений */}
            </main>
            <Menu
                ref={menuRef} // Передаём реф в Menu
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />
        </div>
    );
};

export default Messages;
