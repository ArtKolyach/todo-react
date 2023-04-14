import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { IP } from './App.js'
import {bindReporter} from "web-vitals/dist/modules/lib/bindReporter";

const RegForm = () => {

    const [form, setForm] = useState({ login: null, password: null, passwordCheck: null});
    const [warningValue, setWarningValue] = useState(null);
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(null);
    const [isPasswordLong, setIsPasswordLong] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Регистрация';
    }, [])

    useEffect(() => {

        const regData = { ...form }
        const {login, password, passwordCheck} = regData;


/*        if (password && (password.length >= 8) && (password.length <=20)){
            setIsPasswordLong(true)
            if (password === passwordCheck) {
                setIsPasswordsMatch(true);
                setWarningValue(null);
            }
            else {
                if (password) {
                    setIsPasswordsMatch(false)
                    setWarningValue('Пароли должны совпадать')
                } else setWarningValue(null)
            }
        } else {
            if (password !== null) {
                setIsPasswordLong(false)
                setWarningValue('Длина пароля: 8-20 символов')
            }
        }*/

        const loginUsed = checkLogin(login)
        if (loginUsed) {
            setWarningValue('Логин уже занят')
        }
        else setWarningValue(null)


    }, [form.login, form.password, form.passwordCheck, warningValue])



    const handleInputChange = async ({ target: { id, value }}) => {
        await setForm(prevForm => ({
            ...prevForm,
            [id]: value
        }))
    }

    const checkLogin = async (login) => {
        const config = {
            headers: {
                'ngrok-skip-browser-warning': 1,
            }}

            const response = await axios.get(
                `${IP}/auth/sign-up/${login}`,
                config
            )
            console.log(response.data)

        return response.data
    }

    const handleButtonClick = async () => {
        const regData = {
            name: null,
            username: form.login,
            password: form.password,
        }

        if (regData.username && isPasswordsMatch && isPasswordLong) {
            try {
/*                const response = await axios.post(
                    `http://${IP}/auth/sign-up`,
                    JSON.stringify(regData),
                )
                console.log(response)*/
                navigate('set-name', { state: {
                    regData
                    }})

                setWarningValue(null)
            } catch (error) {
                const { name, code } = error;

                console.log(`${name}: ${code}`, error)

                switch (code) {
                    case 'ERR_NETWORK':
                        setWarningValue('Ошибка соединения')
                        break;
                    case 'ERR_BAD_REQUEST':
                        setWarningValue('Неверные данные регистрации')
                        break
                    default:
                        setWarningValue(`Ошибка регистрации\n${name}: ${code}`)
                }
            }
        } else {
            if (!(regData.username && regData.password && form.passwordCheck))
                setWarningValue('Все поля должны быть заполнены')
        }
    }

    return (
        <div className='auth-content-wrapper'>
            <div className="auth-form reg-form">
                <h1
                    className="auth-form__title title"
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
                    value="Далее"
                    onClick={handleButtonClick}
                />
                <Link
                    to='/sign-in'
                    className="auth-form__sign-up-link-wrapper descriptive-text descriptive-text--link reg-link"
                >
                    Уже есть аккаунт
                </Link>
            </div>
        </div>
    )
}

export default RegForm;