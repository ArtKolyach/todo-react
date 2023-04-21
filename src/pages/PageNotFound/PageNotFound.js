import React, { useEffect } from "react";
import {Link, NavLink} from "react-router-dom";
import './PageNotFound.css'

const PageNotFound = () => {

    useEffect(() => {
        document.title = 'Страница не найдена';
    }, [])

    return (
        <div className='page-not-found-wrapper'>
            <Link
                className="page-not-found-wrapper__link"
                to='/sign-in'
            >
                <h1
                    className="page-not-found-wrapper__title"
                >
                    Ошибка 404
                </h1>
                <h2
                    className="page-not-found-wrapper__description"
                >
                    Страница не найдена
                </h2>
            </Link>
        </div>

    )
}

export default PageNotFound;