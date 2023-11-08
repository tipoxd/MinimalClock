import React from 'react'

export const Buttom = (props) => {
     
    const { Content, onClick } = props;



    return (
        <>
            <button onClick={onClick} className="btn">{Content}</button>
        </>
    )
}
