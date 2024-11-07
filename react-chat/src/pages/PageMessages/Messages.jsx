import React, {useState, useRef, useEffect} from "react";
import {usePageContext} from '../../ExportModule/PageContext.jsx';
import Menu from "./Menu";
import styles from '../../styles/messagesPage.module.scss';
import Header from './Header.jsx';
import {useTheme} from '../../ExportModule/ThemeContext.jsx'; // Import utility functions
import {getChatName, getRelativeDate, getCurrentUserId} from "../../ExportModule/utils.js";
import {chatData} from "../../ExportModule/classes/chat/chats.js";
import {IconButton} from '@mui/material'; // Import Material UI components
import DeleteIcon from '@mui/icons-material/Delete';

const Messages = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const {navigateTo} = usePageContext();
    const {isDarkMode} = useTheme();
    const [userChats, setUserChats] = useState([]);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    const handleDocumentClick = (event) => {
        if (isMenuOpen) {
            handleClickOutside(event);
        }
    };

    useEffect(() => {
        // Fetch user chats when component mounts
        const currentUserId = getCurrentUserId(); // Assuming this function is available
        const chats = chatData.getChatsForUser(currentUserId);
        setUserChats(chats);
    }, []);

    const handleChatClick = (chatId) => {
        navigateTo(`/chat/${chatId}`); // Adjust the navigation as needed
    };

    const handleDeleteChat = (chatId) => {
        const confirmDelete = window.confirm('Вы точно хотите удалить данный чат?');
        if (confirmDelete) {
            chatData.chats = chatData.chats.filter(c => c.id !== chatId);
            setUserChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
            // Optionally save chat data if needed
        }
    };

    return (
        <div className={`${styles.messagesPage} ${isDarkMode ? styles.darkMode : ''}`} onClick={handleDocumentClick}>
            <Header toggleMenu={toggleMenu} navigateTo={navigateTo}/>
            <main className={styles.messagesMain}>
                {/* Основной контент сообщений */}
                <div className={styles.chatsContainer}>
                    <ul className={styles.chats}>
                        {userChats.length > 0 ? userChats.map(chat => {
                            const lastMessage = chat.messages[chat.messages.length - 1] || {};
                            const lastMessageText = lastMessage.text || 'Нет сообщений';
                            const relativeDate = getRelativeDate(lastMessage.date);
                            const chatName = getChatName(chat);
                            return (
                                <li key={chat.id} className={styles.chat} onClick={() => handleChatClick(chat.id)}>
                                    <div className={styles.chatInfo}>
                                        <div className={styles.chatName}>{chatName}</div>
                                        <div className={styles.chatLastMessage}>{lastMessageText}</div>
                                    </div>
                                    <div className={styles.chatTimestamp}>
                                        <div className={styles.time}>{relativeDate}</div>
                                        <IconButton className={styles.deleteButton} onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteChat(chat.id);
                                        }}>
                                            <DeleteIcon className={styles.deleteButtonIco}/>
                                        </IconButton>
                                    </div>
                                </li>
                            );
                        }) : (
                            <p>У вас нет чатов</p>
                        )}
                    </ul>
                </div>
            </main>
            <Menu
                ref={menuRef}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
            />
        </div>
    );
};

export default Messages;