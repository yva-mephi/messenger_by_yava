import { userData } from '../../ExportModule/classes/user/users.js'; // Импортируем userData
import pageManager from '../../ExportModule/classes/PageManager.js';
import {saveToLocalStorage} from '../../ExportModule/utils/storage.js';

export const validateRegistration = ({ nickname, password, firstName, lastName, patronymic }) => {
    if (!nickname || !password || !firstName || !lastName || !patronymic) {
        return { success: false, message: "Все поля обязательны для заполнения." };
    }
    if (password.length < 6) {
        return { success: false, message: "Пароль должен содержать не менее 6 символов." };
    }
    return { success: true };
};

export const validateLogin = ({ nickname, password }) => {
    if (!nickname || !password) {
        return { success: false, message: "Логин и пароль обязательны для заполнения." };
    }
    return { success: true };
};

export const handleFormSubmit = (action, data, setMessage) => {
    if (action === 'register') {
        const validation = validateRegistration(data);
        if (!validation.success) {
            setMessage(validation.message);
            return;
        }

        // Проверяем, существует ли уже пользователь с таким никнеймом
        if (userData.getUserByNickname(data.nickname)) {
            setMessage("Пользователь с таким никнеймом уже существует.");
            return;
        }

        userData.addUser (data);
        setMessage("Регистрация успешна!");
    } else if (action === 'login') {
        const validation = validateLogin(data);
        if (!validation.success) {
            setMessage(validation.message);
            return;
        }

        const user = userData.getUserByNickname(data.nickname);
        if (user && user.password === data.password) {
            setMessage("Авторизация успешна!");
            // handleNavigate = 'messages';
            saveToLocalStorage(Number(user.id), 'currentUser')
            pageManager.navigateTo('messages'); // переключаем страницу
        } else {
            setMessage("Неверный логин или пароль.");
        }
    }
};
