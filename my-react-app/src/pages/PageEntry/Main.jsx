import React, { useRef, useState, useEffect } from 'react';
import { handleFormSubmit } from './formValidation';

const Main = ({ isDarkMode }) => {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const registerNicknameRef = useRef();
    const registerPasswordRef = useRef();
    const registerFirstNameRef = useRef();
    const registerLastNameRef = useRef();
    const registerPatronymicRef = useRef();

    const loginNicknameRef = useRef();
    const loginPasswordRef = useRef();

    const handleRegister = (e) => {
        e.preventDefault();
        const registerData = {
            nickname: registerNicknameRef.current.value,
            password: registerPasswordRef.current.value,
            firstName: registerFirstNameRef.current.value,
            lastName: registerLastNameRef.current.value,
            patronymic: registerPatronymicRef.current.value,
        };
        handleFormSubmit('register', registerData, setMessage);
        resetForm();
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const loginData = {
            nickname: loginNicknameRef.current.value,
            password: loginPasswordRef.current.value,
        };
        handleFormSubmit('login', loginData, setMessage);
        resetForm();
    };

    const resetForm = () => {
        registerNicknameRef.current.value = '';
        registerPasswordRef.current.value = '';
        registerFirstNameRef.current.value = '';
        registerLastNameRef.current.value = '';
        registerPatronymicRef.current.value = '';
        loginNicknameRef.current.value = '';
        loginPasswordRef.current.value = '';
    };

    useEffect(() => {
        if (message) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <main className={`main ${isDarkMode ? 'dark-mode' : ''}`}>
            <input aria-hidden="true" id="chk" type="checkbox" />
            <div className="signup">
                <form onSubmit={handleRegister}>
                    <label aria-hidden="true" htmlFor="chk" className="registration-label">Регистрация</label>
                    <input ref={registerNicknameRef} name="nickname" placeholder="Никнейм" required type="text" className="data" />
                    <input ref={registerPasswordRef} name="password" placeholder="Пароль" required type="password" className="data" />
                    <input ref={registerFirstNameRef} name="firstName" placeholder="Имя" required type="text" className="data" />
                    <input ref={registerLastNameRef} name="lastName" placeholder="Фамилия" required type="text" className="data" />
                    <input ref={registerPatronymicRef} name="patronymic" placeholder="Отчество" required type="text" className="data" />
                    <button>Зарегистрироваться</button>
                </form>
            </div>
            <div className="login">
                <form onSubmit={handleLogin}>
                    <label aria-hidden="true" htmlFor="chk" className="login-label">Войти</label>
                    <input ref={loginNicknameRef} name="nickname" placeholder="Никнейм" required type="text" className="data" />
                    <input ref={loginPasswordRef} name="password" placeholder="Пароль" required type="password" className="data" />
                    <button>Войти</button>
                </form>
            </div>
            {message && (
                <p className={`${message.includes("успешно") ? "message" : "error"} ${showMessage ? 'show' : ''}`}>
                    {message}
                </p>
            )}
        </main>
    );
};

export default Main;
