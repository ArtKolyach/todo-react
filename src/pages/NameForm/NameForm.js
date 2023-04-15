import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { IP } from '../../App.js'
import {FormWrapper} from "../../components/FormWrapper/FormWrapper";
import {Form} from "../../components/Form/Form";
import {TextInput} from "../../components/TextInput/TextInput";
import {Button} from "../../components/Button/Button";
import {WarningText} from "../../components/WarningText/WarningText";
import {Link} from "../../components/Link/Link";


const NameForm = () => {

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
        <FormWrapper>
            <Form
                title="Знакомство"
                description="Как к вам обращаться?"
            >
                <TextInput
                    type="text"
                    id="name"
                    placeholder="Имя (необязательно)"
                    onChange={handleInputChange}
                />
                <WarningText/>
                <Button
                    text="Создать аккаунт"
                    onClick={handleButtonClick}
                />
                <Link
                    to='/sign-up'
                    text="Назад"
                />
            </Form>
        </FormWrapper>
    )
}

export default NameForm