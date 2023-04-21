import React from "react";
import './WarningText.css'

export const WarningText = ({ text, id }) => {
    return (
        <p
            className='warning-text'
            id={id}
        >
            {text}
        </p>
    )
}