import React from "react";
import './TextInput.css'

export const TextInput = (props) => {
    return (
        <input
            className={'text-input ' + props.className}
            type={props.type}
            id={props.id}
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    )
}