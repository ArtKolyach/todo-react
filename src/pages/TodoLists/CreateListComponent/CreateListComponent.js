import React from "react";
import './CreateListComponent.css'
import {TextInput} from "../../../components/TextInput/TextInput";
import {Button} from "../../../components/Button/Button";

export const CreateListComponent = (props) => {
    return (
        <div className='create-list-wrapper'>
            <TextInput
                type='text'
                id ={props.id}
                className='create-list-wrapper__input'
                placeholder='Новая задача...'
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                // ref={props.ref}
            />
            <Button
                text='Добавить'
                id='create-list-wrapper__button'
                onClick={props.onClick}
            />
        </div>
    )
}