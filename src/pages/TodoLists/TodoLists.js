import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {IP, NGROK_TOKEN} from "../../App";
import '../AuthForm/AuthForm.css'
import './TodoLists.css'
import {CreateListComponent} from "./CreateListComponent/CreateListComponent";
import {ListsWrapper} from "./ListsWrapper/ListsWrapper";
import {WarningText} from "../../components/WarningText/WarningText";


export const TodoLists = () => {
    const navigate = useNavigate()
    const params = useLocation()

    const [createListInput, setCreateListInput] = useState('')
    const [lists, setLists] = useState([])
    const [userToken, setUserToken] = useState(params.state ? params.state.userToken : false)
    const [warningValue, setWarningValue] = useState(null);
    const [name, setName] = useState()

    useEffect(() => {
        document.title = 'Главная страница'
        getUserName()
        getAllLists()
    }, [])

    useEffect(() => {
        if (!userToken) {
            console.log('Не авторизован')
            navigate('../sign-in')
        }
        console.log(`Токен`, userToken)
    }, [userToken])

    const handleExit = () => {
        setUserToken(null)
        console.log('Токен обнулён')
    }

    const config = {
        headers: {
            Authorization: "Bearer " + userToken,
            ...NGROK_TOKEN
        }
    }


    const getUserName = async () => {
        try {
            const response = await axios.get(`${IP}/api/account/`, config)
            const name = response.data.name
            console.log('GetUserName:', name)
            setName(name)
        } catch (err) {
            console.log('Ошибка получения имени',err)
        }
    }

    const LISTS_URL = `${IP}/api/lists`;

    const createList = async (newTitle) => {
        const newListData = {
            title: newTitle,
        };

        try {
            const response = await axios.post(`${LISTS_URL}/`,
                JSON.stringify(newListData),
                config)
            console.log("Создан\n");
            console.log(response);
        } catch (error) {
            console.log(error);
            setWarningValue(`Ошибка ${error.code}`)
        }
    };

    const getAllLists = async () => {
        try {
            const response = await axios.get(`${LISTS_URL}/`, config)
            console.log(`Ответ getAllLists:`, response)
            if (response.data.data) {
                const newLists = [...response.data.data]
                setLists(newLists)
            } else {
                setLists([])
            }
        } catch (error) {
            console.log(error);
        }
    }

        const handleCreateListButtonClick = async () => {
            await createList(createListInput)
            console.log('Обновляю листы по нажатию')
            getAllLists()
        }

        const handleKeyDown = async ({key}) => {
            if (key === 'Enter') {
                await createList(createListInput)
                console.log('Обновляю листы по кнопке')
                getAllLists()
            }
        }

        useEffect(() => {
            console.log(`Массив листов после рендера:`, lists)
        }, [lists])

        const handleInputChange = ({target: {value}}) => {
            setCreateListInput(value)
        }

        return (
            <div className='lists-content-wrapper'>
                <div className='lists-header'>
                    <p className='lists-header__greetings'>
                        {`Здравствуйте` + (name ? ", " + name : '')}
                    </p>
                    <p
                        className="lists-header__exit-button"
                        onClick={handleExit}
                    >
                        Выйти
                    </p>
                </div>
                <CreateListComponent
                    id='create-list-input'
                    onChange={handleInputChange}
                    onClick={handleCreateListButtonClick}
                    onKeyDown={handleKeyDown}
                />
                <WarningText
                    text={warningValue}
                    id='lists-warning-text'
                />
                <ListsWrapper
                    getAllLists={getAllLists}
                    config = {config}
                >
                    {lists}
                </ListsWrapper>
            </div>
        )
    }
