import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { IP } from '../../App.js'
import {FormWrapper} from "../../components/FormWrapper/FormWrapper";
import {Form} from "../../components/Form/Form";
import {TextInput} from "../../components/TextInput/TextInput";
import {Button} from "../../components/Button/Button";
import {WarningText} from "../../components/WarningText/WarningText";
import {Link} from "../../components/Link/Link";

const RegForm = () => {

    const [form, setForm] = useState({
        login: null,
        password: '',
        passwordCheck: null
    });
    const [warningValue, setWarningValue] = useState(null);
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(null);
    const [isPasswordLong, setIsPasswordLong] = useState(null);
    const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Регистрация';
    }, [])

    const validateIsPasswordLong = (password) => {
        return (password !== '') &&
            (password.length >= 8) &&
            (password.length <= 20);
    }

    const validateIsPasswordsMatch = (password, passwordCheck) => {
        return (password === passwordCheck)
    }

    useEffect(() => {

        const regData = { ...form }
        const {login, password, passwordCheck} = regData;

        setIsPasswordLong(validateIsPasswordLong(password))
        setIsPasswordsMatch(validateIsPasswordsMatch(password, passwordCheck))
        console.log(password, passwordCheck, isPasswordLong, isPasswordsMatch)

        if (isPasswordLong && isPasswordsMatch) {
            setWarningValue(null)
        } else {
            if (!isPasswordLong) {
                setWarningValue('Длина пароля: 8-20 символов')
            } else {
                setWarningValue('Пароли должны совпадать')
            }
        }


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

/*        const loginUsed = checkLogin(login)
        if (loginUsed) {
            setWarningValue('Логин уже занят')
        }
        else setWarningValue(null)*/


    }, [form.login, form.password, form.passwordCheck])



    const handleInputChange = ({ target: { id, value }}) => {
        setForm(prevForm => ({
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