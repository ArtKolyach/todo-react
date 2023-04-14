import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate, useLocation, Navigate} from "react-router-dom";
import { IP } from './App.js'


const SetName = () => {

    const [name, setName] = useState(null);
    const [warningValue, setWarningValue] = useState(null);

    const navigate = useNavigate()
    const params = useLocation();
    const regData = params.state.regData

    useEffect(() => {
        document.title = 'Регистрация'
    }, [])

    useEffect(() => {
        regData.name = name;
        console.log(regData)
    }, [name, regData])

    const handleInputChange = (event) => {
        const newName = event.target.value
        setName(newName)
        console.log(name)
    }

    const handleButtonClick = async () => {
            try {
                console.log('Отправляю', regData)
                const response = await axios.post(
                    `${IP}/auth/sign-up`,
                    JSON.stringify(regData),
                )
                console.log(response)
                navigate('../../sign-in')
                setWarningValue(null)
            } catch (error) {
                console.log(error)
            }
    }

    return (
        <div className='auth-content-wrapper'>
            <div className="auth-form set-name-form">
                <h1 className="auth-form__title title">Знакомство</h1>
                <h2 className="auth-form__description descriptive-text">Как к вам обращаться?</h2>
                <input
                    className="auth-form__login-field text-input"
                    type="text"
                    id="name"
                    placeholder="Имя"
                    onChange={handleInputChange}
                />
                <p
                    className='auth-form_warning-wrapper'
                >
                </p>
                <input
                    className="auth-form__enter-button button"
                    type="button"
                    id="login-button"
                    value="Создать аккаунт"
                    onClick={handleButtonClick}
                />
                <Link
                    to='/sign-up'
                    className="auth-form__sign-up-link-wrapper descriptive-text descriptive-text--link"
                >
                    Назад
                </Link>
            </div>
        </div>
    )
}

export default SetName