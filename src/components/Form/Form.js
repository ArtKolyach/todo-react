import React from "react";
import './Form.css'

export const Form = ({ children, title, description }) => {
    return (
        <div className="form">
            <h1 className="form__title">{title}</h1>
            <h2 className="form__descriptive-text">{description}</h2>
            {children}
        </div>
    )
}

