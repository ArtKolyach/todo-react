import React from "react";
import './CreateListComponent.css'
import {TextInput} from "../../../components/TextInput/TextInput";
import {Button} from "../../../components/Button/Button";

export const CreateListComponent = ({onChange, onKeyDown, id, onClick}) => {
    return (
        <div className='create-list-wrapper'>
            <TextInput
                type='text'
                id ={id}
                className='create-list-wrapper__input'
                placeholder='Новая задача...'
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <Button
                text='Добавить'
                id='create-list-wrapper__button'
                onClick={onClick}
            />
        </div>
    )
}