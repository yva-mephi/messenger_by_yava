import React, { useRef, useEffect } from 'react';
import DarkmodeButton from "../../ExportModule/DarkmodeButton.jsx";
import Logo from "../../ExportModule/Logo.jsx";
import { userData } from "../../ExportModule/classes/user/users.js"; // Убедитесь, что путь правильный
import styles from '../../styles/messagesPage.module.scss';

const Menu = ({ isMenuOpen, toggleMenu, isDarkMode, toggleDarkMode }) => {
    const menuRef = useRef(null);

    // Получаем текущего пользователя
    const currentUserId = localStorage.getItem("currentUser");
    const currentUser   = userData.getUser (currentUserId);

    // Обработчик клика вне меню
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            toggleMenu(); // Закрываем меню
        }
    };

    useEffect(() => {
        // Добавляем обработчик события клика
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Убираем обработчик при размонтировании компонента
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
            {currentUser  && (
                <div className={styles.userInfo}>
                    <img src="./public/avatar.png" alt="Avatar" className={styles.avatar} />
                    <div className={styles.userDetails}>
                        <span className={styles.fullName}>{`${currentUser .lastName} ${currentUser .firstName} ${currentUser .patronymic}`}</span>
                        <span className={styles.username}>@{currentUser .nickname}</span>
                    </div>
                </div>
            )}
            <ul className={styles.menuList}>
                <li>Настройки</li>
                <li>Лента</li>
                <li>Группы</li>
                <li><DarkmodeButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} className={styles.darkmodetoggle} /></li>
            </ul>
            <footer className={styles.footer}>
                <div className={styles.menuLogo}>
                    <Logo isDarkMode={isDarkMode} />
                </div>
                Учебный проект VK Frontend<br />
                2024 Все права защищены.&copy;
            </footer>
        </div>
    );
};

export default Menu;
