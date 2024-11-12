import React, { useEffect, useRef, useState } from 'react';
import { chatData } from '../../ExportModule/classes/chat/chats.js';
import { userData } from '../../ExportModule/classes/user/users.js';
import { generateUniqueId, getCurrentUserId } from '../../ExportModule/utils.js';
import { useChatContext } from '../../ExportModule/ChatContext';
import { usePageContext } from '../../ExportModule/PageContext';
import styles from '../../styles/chatPage.module.scss'; // Импортируем стили
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import CircleIcon from '@mui/icons-material/Circle';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { saveChatData } from "../../ExportModule/utils/storage.js";
import { useTheme } from '../../ExportModule/ThemeContext.jsx';

const Chat = () => {
    const { navigateTo } = usePageContext();
    const { currentChatId } = useChatContext();
    const userId = getCurrentUserId();
    const [messages, setMessages] = useState([]);
    const [hoveredMessageId, setHoveredMessageId] = useState(null);
    const [messageText, setMessageText] = useState('');
    const { isDarkMode } = useTheme();

    useEffect(() => {
        loadMessages();
    }, [currentChatId]);

    const loadMessages = () => {
        const chat = chatData.getChat(currentChatId);
        if (chat) {
            const updatedMessages = chat.messages.map(message => {
                if (message.userId !== userId && (message.status === 'check' || message.status === 'sent')) {
                    message.status = 'read';
                }
                return message;
            });
            setMessages(updatedMessages);
        }
    };

    const sendMessage = (event) => {
        event.preventDefault();
        if (!messageText.trim()) return;

        const messageData = {
            id: generateUniqueId(),
            text: messageText,
            status: 'sent',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            userId: userId,
            chatId: currentChatId,
        };

        chatData.addMessage(currentChatId, messageData);
        loadMessages(); // Обновляем сообщения
        saveChatData(chatData);
        setMessageText(''); // Очищаем поле ввода
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                // Если нажата Shift + Enter, добавляем новую строку
                setMessageText(prev => prev + '\n');
            } else {
                // Отправляем сообщение
                sendMessage(event);
            }
        }
    };

    const createMessageElement = (message, index) => {
        const isSentByCurrentUser  = userId === message.userId;
        const MessageIcon = message.status === 'read' ? <DoneAllSharpIcon /> : <CheckSharpIcon />;
        const isLastReceived = !isSentByCurrentUser  && (index === messages.length - 1 || messages[index + 1].userId === userId);

        return (
            <li
                key={message.id}
                className={`${styles.message} ${isSentByCurrentUser  ? styles.sent : styles.received}`}
                onMouseEnter={() => setHoveredMessageId(message.id)}
                onMouseLeave={() => setHoveredMessageId(null)}
            >
                {isLastReceived && (
                    <img src={userData.getUser (message.userId).avatar} alt="Avatar" className={styles.avatar} />
                )}
                <div className={styles.messageContent}>
                    {hoveredMessageId === message.id && (
                        <button
                            onClick={() => deleteMessage(message.id)}
                            className={`${styles.deleteButton} ${hoveredMessageId === message.id ? styles.show : ''}`}
                        >
                            <DeleteForeverIcon />
                        </button>
                    )}
                    <span className={styles.messageText}
                          dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br>') }} />
                </div>
                <span className={styles.timestamp}>{message.timestamp}</span>
                <span className={styles.messageStatusIcon}>{MessageIcon}</span>
            </li>
        );
    };

    const deleteMessage = (messageId) => {
        chatData.deleteMessage(currentChatId, messageId);
        loadMessages();
        saveChatData(chatData);
    };

    const prevPage = () => {
        navigateTo('messages');
    };

    return (
        <div className={`${styles.chatContainer} ${isDarkMode ? styles.darkMode : ''}`}>
            <header className={styles.chatHeader}>
                <div className={styles.partnerInfo}>
                    <button className={styles.backbuttonChat} onClick={prevPage}>
                        <ArrowBackSharpIcon />
                    </button>
                    <div className={styles.partnerName}>
                        {userData.getUser (currentChatId).lastName} {userData.getUser (currentChatId).firstName}
                    </div>
                    <div className={styles.partnerStatus}>
                        <CircleIcon />
                        <span className={styles.partnerStatusText}>offline</span>
                    </div>
                    <button type="button" className={styles.moreButton}>
                        <MoreVertRoundedIcon />
                    </button>
                </div>
                <button type="button" className={styles.phoneButton}>
                    <PhoneRoundedIcon />
                </button>
            </header>
            <main className={styles.chatMain}>
                <ul className={styles.messages}>
                    {messages.map((message, index) => createMessageElement(message, index))}
                </ul>
            </main>
            <footer className={styles.chatFooter}>
                <form className={styles.messageForm} onSubmit={sendMessage}>
                    <button type="button" className={styles.buttonAttach}>
                        <AttachFileIcon className={styles.attachIco} />
                    </button>
                    <textarea
                        className={styles.inputContain}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Написать сообщение..."
                        rows={1} // Начальная высота
                        style={{ resize: 'none', overflow: 'hidden' }} // Отключаем изменение размера
                    />
                    <button type="submit" className={styles.buttonSubmit}>
                        <SendRoundedIcon />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default Chat;
