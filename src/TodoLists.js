import React from "react";
import {Link} from "react-router-dom";

const TodoLists = () => {
    return (
        <div>
            Главная страница
            <Link
                to='/sign-in'
                className="page-not-found-wrapper__link"
            >
                Авторизация
            </Link>
        </div>
    )
}

export default TodoLists;