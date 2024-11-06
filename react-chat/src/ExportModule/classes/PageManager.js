class PageManager {
    constructor() {
        this.currentPage = 'entry'; // Начальная страница
        this.previousPage = null; // Предыдущая страница
    }

    navigateTo(page) {
        this.previousPage = this.currentPage; // Сохраняем предыдущую страницу
        this.currentPage = page; // Устанавливаем новую текущую страницу
    }

    goBack() {
        this.currentPage = this.previousPage; // Возвращаемся на предыдущую страницу
        this.previousPage = null; // Сбрасываем предыдущую страницу
    }
}

const pageManager = new PageManager();

export default pageManager; // Используем default export
