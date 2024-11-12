import React from 'react';
import styles from '../../styles/background.module.scss'; // Импортируем стили как модуль
import { useTheme } from '../../ExportModule/ThemeContext.jsx'; // Импортируем контекст темы

const Background = () => {
    const { isDarkMode } = useTheme(); // Получаем состояние темного режима

    return (
        <div className={isDarkMode ? styles.backgroundDark : styles.backgroundLight}>
            <div className={`${styles.light} ${styles.x1}`}></div>
            <div className={`${styles.light} ${styles.x2}`}></div>
            <div className={`${styles.light} ${styles.x3}`}></div>
            <div className={`${styles.light} ${styles.x4}`}></div>
            <div className={`${styles.light} ${styles.x5}`}></div>
            <div className={`${styles.light} ${styles.x6}`}></div>
            <div className={`${styles.light} ${styles.x7}`}></div>
            <div className={`${styles.light} ${styles.x8}`}></div>
            <div className={`${styles.light} ${styles.x9}`}></div>
        </div>
    );
}

export default Background;

