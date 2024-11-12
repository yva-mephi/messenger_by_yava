import React, {useEffect, useRef, useState} from 'react';
import {chatData} from '../../ExportModule/classes/chat/chats.js';
import {userData} from '../../ExportModule/classes/user/users.js';
import {generateUniqueId, getCurrentUserId} from '../../ExportModule/utils.js';
import {useChatContext} from '../../ExportModule/ChatContext';
import {usePageContext} from '../../ExportModule/PageContext';
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
import {saveChatData} from "../../ExportModule/utils/storage.js";
import {useTheme} from '../../ExportModule/ThemeContext.jsx';

const Chat = () => {
    const {navigateTo} = usePageContext();
    const {currentChatId} = useChatContext();
    const {setCurrentPage} = usePageContext();
    const messagesRef = useRef(null);
    const messageInputRef = useRef(null);
    const userId = getCurrentUserId();
    const [messages, setMessages] = useState([]);
    const {isDarkMode} = useTheme();

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
        const messageInput = messageInputRef.current;
        const message = messageInput.value.trim();
        if (!message) return;

        const messageData = {
            id: generateUniqueId(),
            text: message,
            status: 'sent',
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            userId: userId,
            chatId: currentChatId,
        };

        chatData.addMessage(currentChatId, messageData);
        loadMessages(); // Обновляем сообщения
        saveChatData(chatData);
        messageInput.value = ''; // Очищаем поле ввода
    };

    const createMessageElement = (message, index) => {
        const isSentByCurrentUser  = userId === message.userId;
        const MessageIcon = message.status === 'read' ? <DoneAllSharpIcon /> : <CheckSharpIcon />;

        // Определяем, является ли сообщение последним входящим
        const isLastReceived = !isSentByCurrentUser  && index < messages.length - 1 && messages[index + 1].userId !== userId;

        return (
            <li key={message.id} className={`${styles.message} ${isSentByCurrentUser  ? styles.sent : styles.received}`}>
                {!isSentByCurrentUser  && isLastReceived && (
                    <img src={userData.getUser (currentChatId).avatar} alt="Avatar" className={styles.avatar} />
                )}
                <div className={styles.messageContent}>
                <span className={styles.messageText}
                      dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br>') }} />
                </div>
                <span className={styles.timestamp}>{message.timestamp}</span>
                <span className={styles.messageStatusIcon}>{MessageIcon}</span>
            </li>
        );
    };

    const prevPage = () => {
        navigateTo('messages');
    }

    return (
        <div className={`${styles.chatContainer} ${isDarkMode ? styles.darkMode : ''}`} >
            <header className={styles.chatHeader}>
                <div className={styles.partnerInfo}>
                    <button className={styles.backbuttonChat} onClick={prevPage}>
                        <ArrowBackSharpIcon/>
                    </button>
                    <div className={styles.partnerName}>
                        {userData.getUser(currentChatId).lastName} {userData.getUser(currentChatId).firstName}
                    </div>
                    <div className={styles.partnerStatus}>
                        <CircleIcon/>
                        <span className={styles.partnerStatusText}>offline</span>
                    </div>
                    <button type="button" className={styles.moreButton}>
                        <MoreVertRoundedIcon/>
                    </button>
                </div>
                <button type="button" className={styles.phoneButton}>
                    <PhoneRoundedIcon/>
                </button>
            </header>
            <main className={styles.chatMain}>
                <ul ref={messagesRef} className={styles.messages}>
                    {messages.map((message, index) => createMessageElement(message, index))}
                </ul>
            </main>
            <footer className={styles.chatFooter}>
                <form className={styles.messageForm} onSubmit={sendMessage}>
                <button type="submit" className={styles.buttonAttach}>
                        <AttachFileIcon className={styles.attachIco}/>
                    </button>
                    <textarea
                        className={styles.inputContain}
                        ref={messageInputRef}
                        placeholder="Написать сообщение..."
                    />
                    <button type="submit" className={styles.buttonVoice}>
                        <MicNoneRoundedIcon/>
                    </button>
                    <button type="submit" className={styles.buttonEmoji}>
                        <SentimentSatisfiedRoundedIcon/>
                    </button>
                    <button type="submit" className={styles.buttonSubmit}>
                        <SendRoundedIcon/>
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default Chat;