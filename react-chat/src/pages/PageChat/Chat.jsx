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

const Chat = () => {
    const { currentChatId } = useChatContext();
    const { setCurrentPage } = usePageContext();
    const messagesRef = useRef(null);
    const messageInputRef = useRef(null);
    const userId = getCurrentUserId();
    const [messages, setMessages] = useState([]);

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
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            userId: userId,
            chatId: currentChatId,
        };

        chatData.addMessage(currentChatId, messageData);
        loadMessages(); // Обновляем сообщения
        messageInput.value = ''; // Очищаем поле ввода
    };

    const createMessageElement = (message) => {
        const isSentByCurrentUser  = userId === message.userId;
        const MessageIcon = message.status === 'read' ? <DoneAllSharpIcon /> : <CheckSharpIcon />;

        return (
            <li key={message.id} className={`${styles.message} ${isSentByCurrentUser  ? styles.sent : styles.received}`}>
                <span className={styles.senderName}>{isSentByCurrentUser  ? 'Вы' : `${userData.getUser (message.userId).lastName} ${userData.getUser (message.userId).firstName}`}</span>
                <span className={styles.messageText} dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br>') }} />
                <span className={styles.timestamp}>{message.timestamp}</span>
                <span className={styles.messageStatusIcon}>{MessageIcon}</span>
            </li>
        );
    };

    return (
        <div className={styles.chatContainer}>
            <header className={styles.chatHeader}>
                <div className={styles.partnerInfo}>
                    <div className={styles.partnerName}>
                        {userData.getUser (currentChatId).lastName} {userData.getUser (currentChatId).firstName}
                    </div>
                    <button type="button" className={styles.moreButton}>
                        <MoreVertRoundedIcon />
                    </button>
                </div>
            </header>
            <main className={styles.chatMain}>
                <ul ref={messagesRef} className={styles.messages}>
                    {messages.map(createMessageElement)}
                </ul>
            </main>
            <footer className={styles.chatFooter}>
                <form className={styles.messageForm} onSubmit={sendMessage}>
                    <textarea
                        className={styles.inputContain}
                        ref={messageInputRef}
                        placeholder="Введите сообщение..."
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