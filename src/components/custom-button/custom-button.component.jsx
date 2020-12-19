import React from 'react';
import './custom-button.styles.sass';

const CustomButton = ({ children, vdid, isTrash, isHeart, isCollected, ...otherProps }) => (
    <button 
        className={
            `${isTrash ? "trash" : ""} ${isHeart ? isCollected ? "heart collected" : "heart" : ""}  custom-button`
        }
        data-id={vdid} 
        { ...otherProps }
    >
        { children }
    </button>
);

export default CustomButton;