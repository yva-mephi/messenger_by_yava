import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const ThemeContext = createContext();

// Провайдер контекста
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Хук для использования контекста
export const useTheme = () => {
    return useContext(ThemeContext);
};
