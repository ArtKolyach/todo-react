import React, {useState} from "react";
import './TextInput.css'
import * as events from "events";

export const TextInput = (props) => {

    return (
        <input
            className={'text-input ' + props.className}
            type={props.type}
            id={props.id}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            // ref={props.ref}
        />
    )
}