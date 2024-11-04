// App.jsx
import React, { useState, useEffect } from 'react';
import Entry from "./pages/PageEntry/Entry.jsx";
import Messages from "./pages/PageMessages/Messages.jsx";
import pageManager from "./ExportModule/classes/PageManager.js"; // Импортируем экземпляр PageManager

function App() {
    const [currentPage, setCurrentPage] = useState(pageManager.currentPage);

    useEffect(() => {
        const updatePage = () => {
            setCurrentPage(pageManager.currentPage);
        };

        // Подписываемся на изменения страницы
        const interval = setInterval(updatePage, 100); // Проверяем каждую долю секунды

        return () => clearInterval(interval); // Очистка при размонтировании
    }, []);

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
        <div className="App">
            {renderPage()}
        </div>
    );
}

export default App;
