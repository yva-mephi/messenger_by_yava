import React from 'react';

const Logo = ({ isDarkMode }) => {
    return (
        <a href="/" className="header-link">
            <img
                src={isDarkMode ? "./svg/lightlogo.svg" : "./svg/darklogo.svg"}
                alt="Messenger by yava"
                className="logomode"
            />
            <div className="logo-text">
                <span>messenger</span>
                <span>by yava</span>
            </div>
        </a>
    )
}

export default Logo;