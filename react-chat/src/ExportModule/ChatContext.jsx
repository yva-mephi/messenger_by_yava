import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [currentChatId, setCurrentChatId] = useState(null);

    return (
        <ChatContext.Provider value={{ currentChatId, setCurrentChatId }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    return useContext(ChatContext);
};