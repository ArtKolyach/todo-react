import React from "react";
import './ListWrapper.css'
import {ListForm} from "../ListForm/ListForm";

export const ListsWrapper = ({children, listCommands, config, getAllLists}) => {


    return (
        <div className='list-wrapper'>
            {
                children.map(list =>
                    (<ListForm
                        key={list.id}
                        listId={list.id}
                        listCommands={listCommands}
                        listChecked={list.done}
                        config = {config}
                        getAllLists={getAllLists}
                    >
                        {list.title}
                    </ListForm>)
                )
            }
        </div>
    )
}