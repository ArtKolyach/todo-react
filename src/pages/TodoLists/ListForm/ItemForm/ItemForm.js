import React, {useState, useEffect} from "react";
import "./ItemForm.css"
import {IconButton} from "../../../../components/IconButton/IconButton";
import filledCheckbox from "../../../../icons/filled-checkbox.svg";
import emptyCheckbox from "../../../../icons/empty-checkbox.svg";
import deleteListButton from "../../../../icons/delete-button.svg";
import deleteItemButton from "../../../../icons/delete-item-button.svg";
import {IP} from "../../../../App";
import {deleteListItem, updateListItem, getListItem} from "../../../../utils/axiosRequests";

export const ItemForm = (props) => {

    const [titleValue, setTitleValue] = useState(props.children)
    const [isChecked, setIsChecked] = useState()

    useEffect(() => {
        setIsChecked(props.itemChecked)
    }, [])

    const changeItems = async () => {
        await updateListItem(titleValue, isChecked, ...requestProps)
        props.changeItems()
    }

    useEffect(() => {
        if (titleValue === ' ') setTitleValue('')
        changeItems()
    }, [titleValue, isChecked])

    const requestProps = [`${IP}/api/items`, props.itemId, props.config]

    const handleTitleChange = (event) => {
        setTitleValue(event.target.value)
    }

    const handleDeleteButtonClick = async () => {
        await deleteListItem(...requestProps)
        props.changeItems()
    }

    const handleCheckButtonClick = () => {
        setIsChecked(prevState => !prevState)
    }

    return (
        <div className='item-form'>
            <IconButton
                className='delete-item'
                src={deleteItemButton}
                onClick={handleDeleteButtonClick}
                alt='Удалить лист'
            />
            <IconButton
                        className={'checkbox ' + props.itemId}
                        src={isChecked ? filledCheckbox : emptyCheckbox}
                        alt={isChecked ? 'Сделано' : 'Не сделано'}
                        onClick={handleCheckButtonClick}
                    />
            <input
                        className='item-form__title'
                        type="text"
                        onChange={handleTitleChange}
                        value={titleValue}
                        style={{textDecoration: isChecked ? 'line-through' : 'none',
                            backgroundColor:'inherit'
                        }}
                        placeholder='Новый пункт...'
                    />
        </div>
    )
}