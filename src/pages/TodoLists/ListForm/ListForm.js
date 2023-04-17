import React from "react";
import './ListForm.css'

export const ListForm = (props) => {
    return (
        <div  className='list-form'>
            <div className='list-form__header'>
                <div className='list-form__title-wrapper'>
                    <img src='public/icons/checkbox.svg'/>
                    <input
                        className='list-form__title'
                        type="text"
                        value={props.children}
                    />
                </div>
                <p>П</p>
            </div>
            <div className='list-form__items'>
                Здесь могут быть ваши итемы
            </div>
        </div>
    )
}