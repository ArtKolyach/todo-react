import React from "react";
import './Button.css'


export const Button = ({ onClick, text }) => {
    return (
        <input
            className="form__button"
            type="button"
            value={text}
            onClick={onClick}
        />
    )
}