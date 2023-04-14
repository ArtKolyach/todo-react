import React, {useEffect} from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {IP} from "./App";
import './css/AuthForm.css'
import './css/TodoLists.css'

const TodoLists = () => {
    const navigate = useNavigate()
    const params = useLocation()
    const userToken = params.state.userToken

    const config = {
        headers: {
            Authorization: "Bearer " + userToken,
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

    useEffect(() => {
        document.title = 'Главная страница'
        console.log(params)
    }, [params])

    const handleButtonClick = () => {
        getAllLists()
    }

    return (
        <div className='lists-content-wrapper'>
            <div className='lists-header'>
                Главная страница
                <input
                    className="auth-form__enter-button button"
                    type="button"
                    value="Получить листы"
                    onClick={handleButtonClick}
                />
                <Link
                    to='/sign-in'
                    className="page-not-found-wrapper__link"
                >
                    Авторизация
                </Link>
            </div>
        </div>
    )
}

export default TodoLists;