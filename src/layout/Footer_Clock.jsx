import React from 'react'
import { Buttom } from '../components/Buttom'

export const Footer = (props) => {

    const { Class, Buttoms } = props
    return (
        <footer className={Class}>
            <nav className='[ flex justify-center flex-row p-10 ]'>
                {Buttoms.map((child, index) => (

                    <Buttom Content={child.Content} onClick={child.OnClick} key={index} />

                ))}
            </nav>


        </footer >
    )
}
