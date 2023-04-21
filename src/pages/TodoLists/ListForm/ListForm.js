import React, {useEffect, useState} from "react";
import './ListForm.css'
import emptyCheckbox from '../../../icons/empty-checkbox.svg'
import filledCheckbox from '../../../icons/filled-checkbox.svg'
import deleteListButton from '../../../icons/delete-button.svg'
import restoreListButton from '../../../icons/restore-button.svg'
import addButton from '../../../icons/add-button.svg'
import {IconButton} from "../../../components/IconButton/IconButton";
import {ItemForm} from "./ItemForm/ItemForm";
import axios from "axios";
import {IP} from "../../../App";
import {getListItems, createListItem, updateList, deleteList} from "../../../utils/axiosRequests.js";

export const ListForm = (props) => {
    const [titleValue, setTitleValue] = useState(props.children)
    const [isChecked, setIsChecked] = useState(props.listChecked)
    const [isDeleted, setIsDeleted] = useState(false)
    const [items, setItems] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)

    const LISTS_URL = `${IP}/api/lists`;

    const requestProps = [LISTS_URL, props.listId, props.config]

    useEffect(() => {
        changeItems()

        return (() => {
                // console.log(isDeleted)
                // // deleteList(...requestProps)
                // alert('Лавочка закрывается')
        })
    }, [])

    useEffect(() => {
        updateList(titleValue, isChecked, ...requestProps)
    }, [titleValue, isChecked])

    const changeItems = async () => {
        const newItems = await getListItems(...requestProps)
        if (newItems){
            await newItems.sort((a,b) =>
                a.id - b.id
            )
            setItems(newItems)
        } else setItems([])
    }

    const handleCheckButtonClick = () => {
        setIsChecked(prevState => !prevState)
    }

    const handleTitleChange = (event) => {
        setTitleValue(event.target.value)
    }

    const handleAddItemButtonClick = async () => {
        try {
            await createListItem(...requestProps, ' ')
            // getListItems(LISTS_URL, props.listId, props.config)
        } catch (err) {
            console.log(err)
        } finally {
            changeItems()
        }
    }

    const handleDeleteButtonClick = async () => {
        // setIsDeleted(prevState => !prevState)
        await deleteList(...requestProps)
        props.getAllLists()
    }

        return (
            <div className='list-form'
                 style={{
                     backgroundColor: isChecked || isDeleted ? "#E1E1E1" : "white",
                     opacity: isDeleted ? 0.3 : 1,
                 }}
            >
                <div
                    className='list-form__header'
                    style={{
                        marginBottom: (items.length === 0) ? '0px' : "12px"
                    }}
                >
                    <div
                        className='list-form__title-wrapper'>
                        <IconButton
                            className={'checkbox ' + props.listId}
                            src={isChecked ? filledCheckbox : emptyCheckbox}
                            alt={isChecked ? 'Сделано' : 'Не сделано'}
                            onClick={handleCheckButtonClick}
                        />
                        <input
                            className='list-form__title'
                            type="text"
                            onChange={handleTitleChange}
                            value={titleValue}
                            placeholder='Новая задача...'
                            style={{textDecoration: isChecked ? 'line-through' : 'none',
                                backgroundColor:'inherit'
                            }}
                        />

                    </div>
                    <IconButton
                        className={'list-form-button__add-list-item ' + props.listId}
                        src={addButton}
                        onClick={handleAddItemButtonClick}
                    />
                    <IconButton
                        className='delete-list'
                        src={isDeleted ? restoreListButton : deleteListButton}
                        onClick={handleDeleteButtonClick}
                        alt='Удалить лист'
                    />
                </div>
                <div
                    className='list-form__item-wrapper'
                >
                    {items.map(item => (
                        <ItemForm
                            key={item.id}
                            itemId={item.id}
                            config={props.config}
                            listChecked={isChecked}
                            itemChecked={item.done}
                            changeItems={changeItems}
                        >
                            {item.title}
                        </ItemForm>
                        ))}
                </div>
            </div>
        )
    }