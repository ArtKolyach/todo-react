import React from "react";
import {ListForm} from "../ListForm/ListForm";

export const ListsWrapper = ({children}) => {
    return (
        <div>
            {
                children.map(list =>
                    (<ListForm>{list}</ListForm>)
                )
            }
        </div>
    )
}