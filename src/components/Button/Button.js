import React from "react";
import './Button.css'


export const Button = ({ onClick, onKeyDown, text, id }) => {
    return (
        <input
            className="form__button"
            type="button"
            value={text}
            id={id}
            onClick={onClick}
        />
    )
}