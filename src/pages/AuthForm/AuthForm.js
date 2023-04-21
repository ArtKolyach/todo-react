import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {FormWrapper} from "../../components/FormWrapper/FormWrapper";
import {Form} from "../../components/Form/Form";
import {TextInput} from "../../components/TextInput/TextInput";
import {Button} from "../../components/Button/Button";
import {WarningText} from "../../components/WarningText/WarningText";
import {Link} from "../../components/Link/Link";
import { IP, config } from '../../App.js'


const AuthForm = () => {
    const [form, setForm] = useState({ login: null, password: null });
    const [warningValue, setWarningValue] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Авторизация';
    }, [])

    useEffect(() => {

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
                const { data: {token} } = await axios.post(
                    `${IP}/auth/sign-in/`,
                    JSON.stringify(authData),
                    config
                )

                const userToken = token

                setWarningValue(null)
                navigate('../lists', { state: {
                        userToken
                    }})

            } catch (error) {
                console.log(error)

                switch (error.code) {
                    case 'ERR_NETWORK':
                        setWarningValue('Ошибка соединения')
                        break;
                    case 'ERR_BAD_REQUEST':
                        setWarningValue('Неверные данные авторизации')
                        break
                    default: setWarningValue(`Ошибка авторизации\n${error.name}: ${error.code}`)
                }
            }
        } else {
            setWarningValue('Заполните оба поля')
        }
    }

    return (
        <FormWrapper>
            <Form
                title={'Войти'}
                description={'Введите свои логин и пароль'}
            >
                <TextInput
                    type="text"
                    id="login"
                    placeholder="Логин"
                    onChange={handleInputChange}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="Пароль"
                    onChange={handleInputChange}
                />
                <WarningText text={warningValue}/>
                <Button
                    text='Вход'
                    onClick={handleButtonClick}
                />
                <Link
                    to='/sign-up'
                    text='Регистрация'
                />
            </Form>
        </FormWrapper>
    );
}

export default AuthForm;