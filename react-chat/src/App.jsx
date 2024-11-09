import React from 'react';
import Entry from "./pages/PageEntry/Entry.jsx";
import Messages from "./pages/PageMessages/Messages.jsx";
import Chat from "./pages/PageChat/Chat.jsx"; // Импортируем компонент чата
import { PageProvider, usePageContext } from './ExportModule/PageContext.jsx';
import { ThemeProvider } from './ExportModule/ThemeContext.jsx';
import { ChatProvider } from './ExportModule/ChatContext';

const App = () => {
    return (
        <ThemeProvider>
            <PageProvider>
                <ChatProvider>
                    <MainComponent />
                </ChatProvider>
            </PageProvider>
        </ThemeProvider>
    );
};

const MainComponent = () => {
    const { currentPage } = usePageContext();

    const renderPage = () => {
        switch (currentPage) {
            case 'entry':
                return <Entry />;
            case 'messages':
                return <Messages />;
            case 'chat':
                return <Chat />; // Добавляем новый случай для чата
            default:
                return <Entry />;
        }
    };

    return (
        <>
            {renderPage()}
        </>
    );
};

export default App;