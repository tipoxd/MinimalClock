import React, { useState, useEffect } from 'react';
import { Buttom } from "../components/Buttom.jsx";
import { Footer } from './Footer_Clock.jsx';






export const Clock = () => {
    const [hora, setHora] = useState('00');
    const [minutos, setMinutos] = useState('00');
    const [segundos, setSegundos] = useState('00');
    const [formato24h, setFormato24h] = useState(true);
    const [ampm, setAmPm] = useState('');



    useEffect(() => {
        const interval = setInterval(() => {
            let fecha = new Date();
            let horas = fecha.getHours();
            let minutos = fecha.getMinutes();
            let segundos = fecha.getSeconds();

            // Convertir a formato de 12 horas si el estado formato24h es falso
            if (!formato24h) {
                setAmPm(horas >= 13 ? 'PM' : 'AM');
                horas = horas % 12;
                horas = horas ? horas : 12;

            } else {
                setAmPm('');
            }

            let horaFormateada = horas.toString().padStart(2, '0');
            let minutosFormateados = minutos.toString().padStart(2, '0');
            let segundosFormateados = segundos.toString().padStart(2, '0');

            setHora(horaFormateada);
            setMinutos(minutosFormateados);
            setSegundos(segundosFormateados);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [formato24h]);

    const cambiarFormato = () => {
        setFormato24h(!formato24h);
    };

    const onClickWorking = () => {
        const container = document.getElementById('root');
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    const onClickNotWorking = () => {
        player.maximize()
    }



    const Buttom_arr = [{
        Content: 'Formato',
        OnClick: cambiarFormato
    }, {
        Content: "Pantalla Completa",
        OnClick: onClickWorking
    }];
    return (<>
        <div className='[ static  h-screen w-full  ]'>
            <div className='[ flex justify-center items-center w-full h-full ]'>
                <div
                    style={{ fontFamily: "'Montserrat', sans-serif, 'Orbitron', sans-serif" }}
                    className='[ text-4xl flex gap-3 items-center ] [ md:text-5xl ] [ lg:text-9xl ] '
                >
                    <div>{hora}</div>
                    <div>:</div>
                    <div>{minutos}</div>
                    <div>:</div>
                    <div>{segundos}</div>
                    <div className='[ text-lg ]'>{ampm} </div>
                </div>
            </div>

            <Footer Buttoms={Buttom_arr} Class="[ footer flex justify-center bg-base-200 text-base-content absolute bottom-0 left-0 ]" />
        </div>

    </>
    );
};