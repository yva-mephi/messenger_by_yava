import React, { useState } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import Background from './Background.jsx';
import '../../styles/style.scss';
import '../../styles/darkmode.scss';
import '../../styles/background.scss';
// import styles from '../../styles/entryPage.module.scss';

const Entry = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <>
            <Background />
            <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <Main isDarkMode={isDarkMode} />
            <Footer />
        </>
    );
};

export default Entry;
