import React, { useEffect, useState, useRef } from 'react';
import { chatData } from '../../ExportModule/classes/chat/chats.js';
import { generateUniqueId, getCurrentUserId } from '../../ExportModule/utils/utils.js';
import { useChatContext } from '../../ExportModule/ChatContext';
import { usePageContext } from '../../ExportModule/PageContext';
import { useTheme } from '../../ExportModule/ThemeContext.jsx';
import Header from './Header';
import Footer from './Footer';
import CreateMessage from './CreateMessage';
import styles from '../../styles/chatPage.module.scss';

const Chat = () => {
    const { navigateTo } = usePageContext();
    const { currentChatId, setCurrentChatId } = useChatContext();
    const userId = getCurrentUserId();
    const [messages, setMessages] = useState([]);
    const [hoveredMessageId, setHoveredMessageId] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [footerHeight, setFooterHeight] = useState(45);
    const messagesEndRef = useRef(null);
    const { isDarkMode } = useTheme();

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

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
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
        loadMessages();
        setMessageText('');
        scrollToBottom();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            sendMessage(event);
        }
    };

    const deleteMessage = (messageId) => {
        chatData.deleteMessage(currentChatId, messageId);
        loadMessages();
    };

    const handleBackButtonClick = () => {
        setCurrentChatId(null); // Сбрасываем ID текущего чата
        navigateTo('messages'); // Возвращаемся на страницу сообщений
    };


    useEffect(() => {
        loadMessages();
    }, [currentChatId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={`${styles.chatContainer} ${isDarkMode ? styles.darkMode : ''}`}>
            <Header currentChatId={currentChatId} onBack={handleBackButtonClick} />
            <main className={styles.chatMain}>
                <ul className={styles.messages} >
                    <CreateMessage
                        messages={messages}
                        userId={userId}
                        hoveredMessageId={hoveredMessageId}
                        setHoveredMessageId={setHoveredMessageId}
                        deleteMessage={deleteMessage}
                    />
                    <div ref={messagesEndRef} />
                </ul>
            </main>
            <Footer
                messageText={messageText}
                setMessageText={setMessageText}
                sendMessage={sendMessage}
                footerHeight={footerHeight}
                handleKeyDown={handleKeyDown}
                setFooterHeight={setFooterHeight}
            />
        </div>
    );
};

export default Chat;
