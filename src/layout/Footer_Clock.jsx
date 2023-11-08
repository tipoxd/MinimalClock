import React, { useEffect, useState } from 'react'
import { Buttom } from '../components/Buttom'

export const Footer = (props) => {

    const { Class, Buttoms } = props

    const [visibleFooter, setvisibleFooter] = useState("");

    useEffect(() => {
        const handleMouseMove = () => {
            // Muestra la caja
            setvisibleFooter('visible');

            // Espera 3 segundos y luego oculta la caja
            setTimeout(() => {
                setvisibleFooter('invisible');
            }, 5000);
        };

        // Agrega un evento 'mousemove' al documento
        document.addEventListener('mousemove', handleMouseMove);

        // Limpia el evento cuando el componente se desmonta
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);


    return (
        <footer className={visibleFooter + " " + Class}>
            <nav className='[ flex justify-center flex-row p-10 ]'>
                {Buttoms.map((child, index) => (

                    <Buttom Content={child.Content} onClick={child.OnClick} key={index} />

                ))}
            </nav>


        </footer >
    )
}
