import React, { useState, useEffect } from 'react';
import { Footer } from './Footer_Clock.jsx';






export const Clock = () => {


    const apiKey = import.meta.env.APY_KEY;


    const [weatherData, setWeatherData] = useState(null);
    const [hora, setHora] = useState('00');
    const [minutos, setMinutos] = useState('00');
    const [segundos, setSegundos] = useState('00');
    const [formato24h, setFormato24h] = useState(false);
    const [ampm, setAmPm] = useState('');
    const [Fecha, setFecha] = useState('Cargando');
    const [Country, setCountry] = useState("Cargando");
    // const [backgrounds, setbackgrounds] = useState({
    //     0: 'enero.jpg',
    //     1: 'febrero.jpg',
    //     2: 'marzo.jpg',
    //     3: 'abril.jpg',
    //     4: 'mayo.jpg',
    //     5: 'junio.jpg',
    //     6: 'julio.jpg',
    //     7: 'agosto.jpg',
    //     8: 'septiembre.jpg',
    //     9: 'octubre.jpg',
    //     10: 'noviembre.jpg',
    //     11: 'diciembre.jpg',
    //     active: true,
    //     default: "black"
    // });

    const [windSpeed, setWindSpeed] = useState('Cargando');
    const [BackgroundColor, setBackgroundColor] = useState(``);
    const [temperature, setTemperature] = useState('Cargando');
    const [feelsLike, setFeelsLike] = useState('Cargando');
    const [humidity, sethumidity] = useState('Cargando');
    const [weatherEmoji, setWeatherEmoji] = useState('https://placehold.jp/3d4070/ffffff/150x150.png?text=Cargando...');

    useEffect(() => {
        const apiKey = import.meta.env.VITE_APY_KEY;

        function ObtenerLocalizacion() {
            sethumidity("Cargando");
            setTemperature("Cargando");
            setFeelsLike("Cargando");
            setCountry("Cargando");
            setWeatherEmoji(`https://placehold.jp/3d4070/ffffff/150x150.png?text=Cargando...`);
            setWindSpeed("Cargando");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchData(latitude, longitude);



                }, function (error) {
                    console.error('Error al obtener la ubicación:', error);
                });
            } else {
                console.error('La geolocalización no es compatible con este navegador.');
            }

        }
        ObtenerLocalizacion();


        const fetchData = async (lat, lon) => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
                const data = await response.json();
                const temperatureKelvin = data.main.temp;

                const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2);

                const feelsLikeKelvin = data.main.feels_like;
                const feelsLikeCelsius = (feelsLikeKelvin - 273.15).toFixed(2);

                const humidity = data.main.humidity;
                sethumidity(humidity + "%");
                setTemperature(temperatureCelsius + "°C");
                setFeelsLike(feelsLikeCelsius + "°C");
                setCountry(data.name);
                const weatherCondition = data.weather[0].icon;
                setWeatherEmoji(`https://openweathermap.org/img/wn/${weatherCondition}@2x.png`);
                const windSpeed = data.wind.speed;
                setWindSpeed(windSpeed + " m/s");

            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };


        const getBackgroundColor = (time) => {
            const hour = time.getHours();

            if (hour >= 6 && hour < 18) {
                // Es de día, devuelve el color de fondo correspondiente

                setBackgroundColor(`black`);
            } else {
                // // Es de noche, devuelve el color de fondo correspondiente
                // // Puedes hacer que el fondo se vaya oscureciendo según se acerque la noche
                // const darkness = Math.abs(hour - 12) / 6; // Calcula la oscuridad según la hora
                // const colorValue = Math.round(255 - darkness * 255); // Calcula el valor del color
                // setBackgroundColor(`rgb(${colorValue}, ${colorValue}, ${colorValue})`);

                // Es de noche, devuelve el color de fondo correspondiente
                // Calcula la oscuridad según la hora
                const darkness = Math.abs(hour - 12) / 6;
                // Calcula los valores de los componentes de color
                const red = Math.round(255 - darkness * 255);
                const green = Math.round(165 - darkness * 165);
                const blue = Math.round(0 - darkness * 0);
                // Establece el color de fondo utilizando el degradado de anaranjado a oscuro
                setBackgroundColor(`rgb(${red}, ${green}, ${blue})`);
            }
        };

        setInterval(() => {
            ObtenerLocalizacion();
        }, 180000); //3 minutes  


        const interval = setInterval(() => {
            let fecha = new Date();
            let horas = fecha.getHours();
            let minutos = fecha.getMinutes();
            let segundos = fecha.getSeconds();

            const opciones = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
            getBackgroundColor(fecha);
            setFecha(fechaFormateada);

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
        <div className='[ static  h-screen w-full  ]' style={{ backgroundColor: BackgroundColor }}>
            <div className='[ flex justify-center flex-col  items-center w-full h-full   ]'>
                <div className='[ w-auto  ] [ md:w-auto ] [ lg:w-auto ] '>
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
                    <div className='[ flex flex-nowrap w-full justify-between flex-col ]'>
                        <div>{Country + " " + Fecha}</div>
                        <div className='[ font-light flex gap-3 justify- items-center ]'>
                            Temperatura: <span className='[ font-bold ]'>{temperature}</span>
                            <img className='[ w-10 h-10 ]' src={`${weatherEmoji}`} alt="" />
                        </div>
                        <div className='[ font-light ]'>
                            Sensacion Termica: <span className='[ font-bold ]'>{feelsLike}</span>
                        </div>
                        <div className='[ font-light ]'>
                            Humedad: <span className='[ font-bold ]'>{humidity}</span>
                        </div>

                        <div className='[ font-light ]'>
                            Velocidad del viento: <span className='[ font-bold ]'>{windSpeed}</span>
                        </div>
                    </div>
                </div>

            </div>

            <Footer Buttoms={Buttom_arr} Class="[ footer transition-all flex justify-center bg-base-200 text-base-content absolute bottom-0 left-0 ]" />
        </div>

    </>
    );
};