import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {IP} from "../../App";
import '../AuthForm/AuthForm.css'
import './TodoLists.css'
import {CreateListComponent} from "./CreateListComponent/CreateListComponent";
import {ListsWrapper} from "./ListsWrapper/ListsWrapper";

const TodoLists = () => {
    const navigate = useNavigate()
    const params = useLocation()

    const [createListInput, setCreateListInput] = useState('')
    const [lists, setLists] = useState([])

    const userName = 'Артём'

    useEffect(() => {
        document.title = 'Главная страница'
        console.log(params)
    }, [])

/*    if (params.state !== null) {
        console.log('Вы не авторизированы')
        navigate('../sign-in')
    }

    const userToken = params.state.userToken*/

    const config = {
        headers: {
/*            Authorization: "Bearer " + userToken,*/
            'ngrok-skip-browser-warning': 1
        },
    };

/*    const setTokenHeader = () =>
        (config.headers.Authorization = "Bearer " + userToken);*/

    const LISTS_URL = `${IP}/api/lists`;

    const getAllLists = () => {

        axios
            .get(`${LISTS_URL}/`, config)
            .then((response) => console.log(response))
            .catch(error => {
                console.log(error);
            });
    };

    const getList = (listID) => {

        axios
            .get(`${LISTS_URL}/${listID}`, config)
            .then((response) => console.log(response))
            .catch(function (error) {
                console.log(error);
            });
    };

    const createList = () => {
        const newListData = {
            title: "Тестовый лист",
            description: "Описание тестового листа",
        };


        axios
            .post(`${LISTS_URL}/`, JSON.stringify(newListData), config)
            .then((response) => {
                console.log("Создан\n");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const deleteList = (listID) => {

        axios
            .delete(`${LISTS_URL}/${listID}`, config)
            .then((response) => {
                console.log("Удалён\n");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleGetListsButtonClick = () => {
        getAllLists()
    }

    const handleCreateListButtonClick = () => {
        const newLists = [...lists]
        newLists.push(createListInput)
        setLists(newLists)
    }

    useEffect(() => {
        console.log(lists)
    }, [lists])

    const handleInputChange = ({ target: { value }}) => {
        setCreateListInput(value)
    }

    useEffect(() => {
        console.log(createListInput)
    }, [createListInput])

    return (
        <div className='lists-content-wrapper'>
            <div className='lists-header'>
                <p className='lists-header__greetings'>
                    Здравствуйте, {userName}
                </p>
                <Link
                    to='/sign-in'
                    className="lists-header__exit-button"
                >
                    Выйти
                </Link>
            </div>
            <CreateListComponent
                id='create-list-input'
                onChange={handleInputChange}
                onClick={handleCreateListButtonClick}
            />
            <ListsWrapper>
                {lists}
            </ListsWrapper>
        </div>
    )
}

export default TodoLists;