import React from "react";
import './FormWrapper.css'

export const FormWrapper = ({ children }) => {
    return (
        <div className='form-wrapper'>
            {children}
        </div>
    )
}