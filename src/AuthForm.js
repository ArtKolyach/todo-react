import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate, redirect} from "react-router-dom";
import './css/AuthForm.css'

const AuthForm = () => {
    const [form, setForm] = useState({ login: null, password: null });
    const [warningValue, setWarningValue] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Авторизация';
    }, [])

    useEffect(() => {
        console.log(form)

        if (form.login && form.password) {
            setWarningValue(null)
        }
    }, [form.login, form.password])

    const handleInputChange = ({ target: { id, value }}) => {
        setForm(prevForm => ({
            ...prevForm,
            [id]: value
        }))
    }

    const handleButtonClick = async () => {
        const authData = {
            username: form.login,
            password: form.password,
        }

        console.log(authData);

        if (authData.password && authData.username) {
            try {
                const response = await axios.post(
                    "http://25.23.9.220:8000/auth/sign-in",
                    JSON.stringify(authData),
                )

                console.log(response)

                setWarningValue(null)
                navigate('../')

            } catch ({ message, name, code}) {
                console.log(`${name}: ${code}`)

                switch (code) {
                    case 'ERR_NETWORK':
                        setWarningValue('Ошибка соединения')
                        break;
                    case 'ERR_BAD_REQUEST':
                        setWarningValue('Неверные данные авторизации')
                        break
                    default: setWarningValue(`Ошибка авторизации\n${name}: ${code}`)
                }
            }
        } else {
            setWarningValue('Заполните оба поля')
        }
    }

    return (
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
                    className="auth-form__password-field text-input last-text-input"
                    type="password"
                    id="password"
                    placeholder="Пароль"
                    onChange={handleInputChange}
                />
                <p
                    className='auth-form_warning-wrapper'
                >
                    {warningValue}
                </p>
                <input
                    className="auth-form__enter-button button"
                    type="button"
                    id="login-button"
                    value="Вход"
                    onClick={handleButtonClick}
                />
                <Link
                    to='/sign-up'
                    className="auth-form__sign-up-link-wrapper descriptive-text descriptive-text--link"
                >
                    Регистрация
                </Link>
            </div>
    );
}

export default AuthForm;