import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './utils/ThemeContext.jsx';
import Entry from './pages/EntryPage/Entry.jsx';
import Main from './pages/MainPage/Main.jsx'; // Импортируйте ваш компонент главной страницы

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Entry />} />
                    <Route path="/main" element={<Main />} /> {/* Добавьте маршрут для главной страницы */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
