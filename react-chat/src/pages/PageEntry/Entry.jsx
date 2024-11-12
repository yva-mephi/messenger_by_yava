import React, { useState } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import Background from './Background.jsx';
import '../../styles/style.scss';
import '../../styles/darkmode.scss';
// import {useTheme} from '../../ExportModule/ThemeContext.jsx'

const Entry = () => {
    // const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <>
            <Background />
            <Header />
            {/*isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}*/}
            <Main />
            {/*isDarkMode={isDarkMode}*/}
            <Footer />
        </>
    );
};

export default Entry;
