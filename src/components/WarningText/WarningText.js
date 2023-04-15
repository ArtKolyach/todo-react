import React from "react";
import './WarningText.css'

export const WarningText = ({ text }) => {
    return (
        <p
            className='warning-text'
        >
            {text}
        </p>
    )
}