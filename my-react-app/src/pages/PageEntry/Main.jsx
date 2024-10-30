import React from 'react';

const Main = ({ isDarkMode }) => {
    return (
        <main className={`main ${isDarkMode ? 'dark-mode' : ''}`}>
            <input aria-hidden="true" id="chk" type="checkbox"/>
            <div className="signup">
                <form>
                    <label aria-hidden="true" htmlFor="chk" className="registration-label">Регистрация</label>
                    <input name="firstname" placeholder="Имя" required="" type="text" className="data"/>
                    <input name="secondname" placeholder="Фамилия" required="" type="text" className="data"/>
                    <input name="patronymic" placeholder="Отчество" required="" type="text" className="data"/>
                    <input name="login" placeholder="Логин" required="" type="text" className="data"/>
                    <input name="pswd" placeholder="Пароль" required="" type="password" className="data"/>
                    <button>Зарегистрироваться</button>
                </form>
            </div>
            <div className="login">
                <form>
                    <label aria-hidden="true" htmlFor="chk" className="login-label">Войти</label>
                    <input name="login" placeholder="Логин" required="" type="text" className="data"/>
                    <input name="pswd" placeholder="Пароль" required="" type="password" className="data"/>
                    <button>Войти</button>
                </form>
            </div>
        </main>
    )
}

export default Main;