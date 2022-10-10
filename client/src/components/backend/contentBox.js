import React from "react";

const ContentBox = ({children, className, ...attributes}) => {
    return(
        <div className={`content-box ${className ? className : ''}`} {...attributes}>
            {children}
        </div>
    )
}
export default ContentBox;