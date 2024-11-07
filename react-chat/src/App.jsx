import React, { useState, useEffect } from 'react';
import Entry from "./pages/PageEntry/Entry.jsx";
import Messages from "./pages/PageMessages/Messages.jsx";
import { PageProvider, usePageContext } from './ExportModule/PageContext.jsx';
import { ThemeProvider } from './ExportModule/ThemeContext.jsx';

const App = () => {
    return (
        <ThemeProvider>
            <PageProvider>
                <MainComponent />
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