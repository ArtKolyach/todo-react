import React from "react";
import './IconButton.css'

export const IconButton = (props) => {
    return (
        <img
            className={'icon-button ' + props.className}
            alt={props.alt}
            src={props.src}
            onClick={props.onClick}
        />
    )
}

