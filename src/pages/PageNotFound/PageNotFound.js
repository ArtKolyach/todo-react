import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import './PageNotFound.css'

const PageNotFound = () => {

    useEffect(() => {
        document.title = 'Страница не найдена';
    }, [])

    return (
        <div className="page-not-found-wrapper">

                <h1
                    className="page-not-found-wrapper__title title"
                >
                    Ошибка 404
                </h1>
                <h2
                    className="page-not-found-wrapper__description title"
                >
                    Страница не найдена
                </h2>
            <Link
                to='/sign-in'
                className="page-not-found-wrapper__link"
            >
                На главную
            </Link>
        </div>
    )
}

export default PageNotFound;