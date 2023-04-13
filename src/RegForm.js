import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import './css/RegForm.css'

const RegForm = () => {

    const [form, setForm] = useState({ login: null, password: null, passwordCheck: null});
    const [warningValue, setWarningValue] = useState(null);
    const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(null);
    const [isAllFieldsEmpty, setIsAllFieldsEmpty] = useState(true);
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(null);
    const [isPasswordLong, setIsPasswordLong] = useState(null);

    useEffect(() => {
        document.title = 'Регистрация';
    }, [])

    const checkFieldsFilled = (login, password, passwordCheck) => {
        setIsAllFieldsFilled((login && password && passwordCheck))
        return isAllFieldsFilled
    }

    const checkAllFieldsEmpty = (login, password, passwordCheck) => {
        setIsAllFieldsEmpty(!login && !password && !passwordCheck)
        return isAllFieldsFilled;
    }

    const checkPasswordsMatch = (password, passwordCheck) => {
        setIsPasswordsMatch((password === passwordCheck))
        return isPasswordsMatch
    }

    const checkPasswordLong = (password) => {
        setIsPasswordLong(password.length >= 8 && password.length <= 20)
        return isPasswordLong
    }

/*    const checkAll = (login, password, passwordCheck) => {
        checkFieldsFilled(login, password, passwordCheck);
        checkPasswordsMatch(password, passwordCheck);
        if (password !== null)
            checkPasswordLong(password);
    }*/


    useEffect(() => {
        const {login, password, passwordCheck} = form;
        const regData = [ ...form ]

        console.log(...regData)

        if (checkAllFieldsEmpty(...regData)){
            setWarningValue(null)
        } else {
            if (checkFieldsFilled(...regData)) {
                if (checkPasswordLong(password, passwordCheck)) {
                    setWarningValue('Длина пароля')
                }
            }
        }


/*        if (password && (password === passwordCheck)) {
            setIsPasswordsMatch(true);
            setWarningValue(null);
        }
        else {
            if (password) {
                setIsPasswordsMatch(false)
                setWarningValue('Пароли должны совпадать')
            } else setWarningValue(null)
        }*/

    }, [form.login, form.password, form.passwordCheck])

    const handleInputChange = ({ target: { id, value }}) => {
        setForm(prevForm => ({
            ...prevForm,
            [id]: value
        }))
    }

    const handleButtonClick = async () => {
        const regData = {
            username: form.login,
            password: form.password,
        }

        if (regData.username && isPasswordsMatch) {
            try {
                await axios.post(
                    "http://25.55.215.5:8000/auth/sign-in",
                    regData,
                )
                setWarningValue(null)
            } catch (err) {
                console.log(err);
                setWarningValue('Ошибка регистрации')
            }
        } else {
            if (!(regData.username && regData.password && form.passwordCheck))
                setWarningValue('Все поля должны быть заполнены')
        }
    }

    return (
        <div className="reg-form">
            <h1
                className="reg-form__title title reg-title"
            >
                Регистрация
            </h1>
            <h2
                className="auth-form__description descriptive-text"
            >
                Придумайте логин и пароль
            </h2>
            <input
                className="reg-text-input text-input"
                type="text"
                id="login"
                placeholder="Логин"
                onChange={handleInputChange}
            />
            <input
                className="reg-text-input text-input"
                type="password"
                id="password"
                placeholder="Пароль"
                onChange={handleInputChange}
            />
            <input
                className="reg-text-input text-input last-text-input"
                type="password"
                id="passwordCheck"
                placeholder="Повторите пароль"
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
                value="Создать аккаунт"
                onClick={handleButtonClick}
            />
            <Link
                to='/sign-in'
                className="auth-form__sign-up-link-wrapper descriptive-text descriptive-text--link reg-link"
            >
                Уже есть аккаунт
            </Link>
        </div>
    )
}

export default RegForm;