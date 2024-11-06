import React, {useEffect, useRef} from 'react';
import DarkmodeButton from "../../ExportModule/DarkmodeButton.jsx";
import Logo from "../../ExportModule/Logo.jsx";
import {userData} from "../../ExportModule/classes/user/users.js"; // Убедитесь, что путь правильный
import styles from '../../styles/messagesPage.module.scss';

const Menu = React.forwardRef(({ isMenuOpen, toggleMenu, isDarkMode, toggleDarkMode }, ref) => {
    // const menuRef = useRef(null);

    // Получаем текущего пользователя
    const currentUserId = localStorage.getItem("currentUser");
    const currentUser = userData.getUser(currentUserId);

    // Обработчик клика вне меню
    // const handleClickOutside = (event) => {
    //     if (menuRef.current && !menuRef.current.contains(event.target)) {
    //         toggleMenu(); // Закрываем меню
    //     }
    // };

    // useEffect(() => {
    //     // Добавляем обработчик события клика
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         // Убираем обработчик при размонтировании компонента
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    return (
        <div ref={ref} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
            {currentUser && (
                <div className={styles.userInfo}>
                    <img src={currentUser.avatar} alt="Avatar" className={styles.avatar}/>
                    <div className={styles.userDetails}>
                        <span
                            className={styles.fullName}>{`${currentUser.lastName} ${currentUser.firstName} ${currentUser.patronymic}`}</span>
                        <span className={styles.username}>@{currentUser.nickname}</span>
                    </div>
                </div>
            )}
            <ul className={styles.menuList}>
                <li>Настройки</li>
                <li>Лента</li>
                <li>Группы</li>
            </ul>
            <div className={styles.darkmodeMessages}>
                <DarkmodeButton isDarkMode={isDarkMode}
                                toggleDarkMode={toggleDarkMode}/>
            </div>
            <footer className={styles.footerMessages}>
                <div className={styles.logoMessages}>
                    <Logo isDarkMode={isDarkMode}/>
                </div>
                <div className={styles.footerTextMessages}>
                    Учебный проект VK Frontend<br/>
                    2024 Все права защищены.&copy;
                </div>
            </footer>
        </div>
    );
});

export default Menu;
