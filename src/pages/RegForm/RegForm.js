import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { IP, NGROK_TOKEN } from '../../App.js'
import {FormWrapper} from "../../components/FormWrapper/FormWrapper";
import {Form} from "../../components/Form/Form";
import {TextInput} from "../../components/TextInput/TextInput";
import {Button} from "../../components/Button/Button";
import {WarningText} from "../../components/WarningText/WarningText";
import {Link} from "../../components/Link/Link";

const RegForm = () => {

    const config = {
        headers: {
            ...NGROK_TOKEN
        },
    };

    const [form, setForm] = useState({
        login: null,
        password: null,
        passwordCheck: null,
    });
    const [warningValue, setWarningValue] = useState(null);
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(null);
    const [isPasswordLong, setIsPasswordLong] = useState(null);
    const [isAllFieldsEmpty, setIsAllFieldsEmpty] = useState(true)
    const [isLoginTaken, setIsLoginTaken] = useState()
    const [isAllValidated, setIsAllValidated] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Регистрация';
    }, [])

    const validateIsPasswordLong = async () => {
        if (form.password === null) return null
        return (form.password !== '') &&
            (form.password.length >= 8) &&
            (form.password.length <= 20);
    }

    const validateIsPasswordsMatch = async () => {
        if (form.passwordCheck === null || form.passwordCheck === '') return null
        return (form.password === form.passwordCheck)
    }

    const validateAllFieldsFilled = async () => {
        const props = Object.values(form);
        return props.reduce((acc, current) =>
            acc && Boolean(current))
    }

    const validateIsAllFieldsEmpty = async () => {
        const props = Object.values(form);
        return  !(props.reduce((acc, current) =>
            acc || Boolean(current)))
    }

    const validateLoginTaken = async () => {
        const response = await axios.get(
            `${IP}/auth/sign-up?username=${form.login}`,
            config
        )
        return response.data
    }

    const validateAll = async () => {
        await setIsAllFieldsEmpty(await validateIsAllFieldsEmpty())
        await setIsLoginTaken(await validateLoginTaken())
        await setIsPasswordLong(await validateIsPasswordLong())
        await setIsPasswordsMatch(await validateIsPasswordsMatch())
        console.log('Провалидировано', isPasswordLong)
    }

    useEffect(() => {
        console.log('Запуск изменения варнинга на ререндере')
        changeWarningValue()
    }, [isPasswordLong,
        isPasswordsMatch,
        isAllFieldsEmpty,
        isLoginTaken])

    const changeWarningValue = async () => {
        console.log('Изменяю варнинг')
        if (isAllFieldsEmpty) {
            setWarningValue('Все поля пусты')
        } else {
            console.log('Проверка логина')
            if (form.login && isLoginTaken) {
                setWarningValue('Логин занят')
                return
            }
            console.log('Проверка длины пароля')
            if (form.password && !isPasswordLong) {
                setWarningValue('Длина пароля: 8-20 символов')
                return
            }
            console.log(form.password, form.passwordCheck,  isPasswordLong, !isPasswordsMatch)
            if (form.password && form.passwordCheck && !isPasswordsMatch) {
                setWarningValue('Пароли должны совпадать')
                return
            }
            setWarningValue('Всё ок')
        }
    }

    useEffect(() => {
        validateAll()
    }, [form])

    const handleInputChange = ({ target: { id, value }}) => {
        setForm(prevForm => ({
            ...prevForm,
            [id]: value
        }))
    }

    const handleButtonClick = async () => {
        const regData = {
            name: null,
            username: form.login,
            password: form.password,
        }

        if (!isLoginTaken && isPasswordLong && isPasswordsMatch ) {
            try {
                navigate('set-name', { state: {
                    regData
                    }})
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
                setWarningValue('Заполните все поля')
        }
    }

    return (
        <FormWrapper>
            <Form
            title='Регистрация'
            description='Придумайте логин и пароль'
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
                <TextInput
                    type="password"
                    id="passwordCheck"
                    placeholder="Повторите пароль"
                    onChange={handleInputChange}
                />
                <WarningText text={warningValue} />
                <Button
                    text='Далее'
                    onClick={handleButtonClick}
                />
                <Link
                    to='/sign-in'
                    text="Уже есть аккаунт"
                />
            </Form>
        </FormWrapper>
    )
}

export default RegForm;