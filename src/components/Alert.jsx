import React from 'react'

export const Alert = (props) => {
    const { Content, onClick, Class, Svg_icon } = props;

    return (
        <div className={Class}>
            {Svg_icon}
            <span>{Content}</span>
        </div>

    )
}
