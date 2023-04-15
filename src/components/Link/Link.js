import React from "react";
import './Link.css'
import { Link as RouterLink } from "react-router-dom";

export const Link = ({ to, text}) => {
    return (
        <RouterLink
            to={to}
            className="link"
        >
            {text}
        </RouterLink>
    )
}