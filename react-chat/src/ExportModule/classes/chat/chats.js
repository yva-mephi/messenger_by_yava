import { initChatData } from "./chats_init";

export class ChatData {
    constructor() {
        this.chats = [];
    }

    // Метод для добавления нового чата
    addChat() {
        const id = (this.chats.length + 1).toString(); // Генерируем ID как строку
        const chat = {
            id: id,
            title: '',
            messages: [],
            users: [],
            avatar: ''
        };
        this.chats.push(chat);
        return chat;
    }

    // Метод для получения чата по его id
    getChat(id) {
        return this.chats.find(chat => chat.id === id) || null;
    }

    // Метод для добавления нового сообщения в чат
    addMessage(chatId, message) {
        const chat = this.getChat(chatId);
        if (chat) {
            chat.messages.push(message);
        }
    }

    // Метод для установки названия чата
    setTitle(chatId, title) {
        const chat = this.getChat(chatId);
        if (chat) {
            chat.title = title;
        }
    }

    // Метод для добавления нового пользователя в чат
    addUser (chatId, userId) {
        const chat = this.getChat(chatId);
        if (chat) {
            chat.users.push(userId);
        }
    }

    addAvatar(chatId, avatarPath) {
        const chat = this.getChat(chatId);
        if (chat) {
            chat.avatar = avatarPath; // Устанавливаем путь к аватарке
        }
    }

    getChatsForUser (userId) {
        return this.chats.filter(chat => chat.users.includes(String(userId))); // Преобразуем userId в строку
    }
}

const chatData = initChatData();

export { chatData };