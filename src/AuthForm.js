import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";

const AuthForm = () => {
    const [form, setForm] = useState({ login: '', password: '' });
    const [timeSpent, setTimeSpent] = useState(0);

    useEffect(() => {
        const startTime = new Date();
        setInterval(() => {
            const newTime = new Date();
            setTimeSpent(newTime - startTime);
        }, 1000)
    }, [])

    useEffect(() => {
        console.log('Login now is', form.login)
        return () => {
            console.log('I will rerender')
        }
    }, [form.login, form.password])

    const handleInputChange = ({ target: { id, value }}) => {
        setForm(prevForm => ({
            ...prevForm,
            [id]: value
        }))
    }

    const handleButtonClick = () => {
        const authData = {
            username: form.login,
            password: form.password,
        }

        console.log(authData);

        void axios.post(
            "http://25.34.144.36:8000/auth/sign-in",
            authData,
        )
    }

    return (
        <Fragment>
            <p>{Math.floor(timeSpent/1000)} секунд вы провели на сайте</p>
            <div className="auth-form">
                <h1 className="auth-form__title title">Войти</h1>
                <h2 className="auth-form__description descriptive-text">Введите свои логин и пароль</h2>
                <input
                    className="auth-form__login-field text-input"
                    type="text"
                    id="login"
                    placeholder="Логин"
                    onChange={handleInputChange}
                />
                <input
                    className="auth-form__password-field text-input"
                    type="password"
                    id="password"
                    placeholder="Пароль"
                    onChange={handleInputChange}
                />
                <input
                    className="auth-form__enter-button button"
                    type="button"
                    id="login-button"
                    value="Вход"
                    onClick={handleButtonClick}
                />
                <a
                    className="auth-form__sign-up-link-wrapper"
                    href="sign-up.html"
                >
                <span className="auth-form__sign-up-link descriptive-text descriptive-text--link">
                    Регистрация
                </span>
                </a>
            </div>
        </Fragment>
    );
}

export default AuthForm;