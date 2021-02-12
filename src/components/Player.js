import { useEffect } from 'react';
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

function Player({ isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, setSongs, currentSong, setCurrentSong, audioVolume, setAudioVolume }) {

    //UseEffect para que cada vez que se actualize el state de CURRENTSONG, se ejecute esta funcion que aplica el atributo ACTIVE a current Song
    useEffect(() => {
        //Actualizar el estado de la canción actual en su atributo active
        const changeActiveSongs = songs.map(item => {
            if (item.id === currentSong.id) {
                return {
                    ...item,
                    active: true
                }
            } else {
                return {
                    ...item,
                    active: false
                }
            }
        });

        //Guardamos el listado de canciones una vez modificado el atributo active
        setSongs(changeActiveSongs);

    }, [currentSong])

    //Función para pausar y dar al play al audio
    function playSongHandler() {

        //Pausar y despausar la canción
        if (isPlaying) {
            setIsPlaying(false);
            audioRef.current.pause();
        } else {
            setIsPlaying(true);
            audioRef.current.play();
        }
    }

    //Función para pasarle el tiempo en segundos y obtener el tiempo en minutos
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        );
    }

    //Función para mover el rango de audio al segundo que deseemos
    const dragAudioHandler = (event) => {
        audioRef.current.currentTime = event.target.value;

        setSongInfo({
            ...songInfo,
            currentTime: event.target.value
        })
    }

    //Función para que cuando se arrastre el input range establecido del volumen se cambie el valor del volumen
    const dragVolumeHandler = (event) => {

        //Dividimos entre 100 porque el input range hemos establecido valores entre 0-100 y el parametro volume del audio solo acepta valores entre 0-1
        setAudioVolume(event.target.value / 100);
        //document.getElementById('play-audio').volume = audioVolume;
    }

    //Funcion para pasar de una cancion a otra
    const skipSongHandler = async (direction) => {
        //Conseguir el index de la canción actual
        let currentSongIndex = songs.findIndex(item => {
            return item.id === currentSong.id;
        });

        //Comprobamos que boton hemos pulsado recuperando el valor del parametro que trae la funcion
        if (direction === 'back') {

            //Si el index es 0 no hacemos nada
            if (currentSongIndex === 0) {
                return;
            }

            //Actualizamos la canción con la que tiene un index menos que la actual
            await setCurrentSong(songs[currentSongIndex - 1]);

        } else {
            //Comprobamos que la siguiente canción no devuelve cero al compararla con el número total
            //Si devuelve 0 es que la siguiente canción no existe porque
            //Al operar con el modulo % entre dos mismos numeros devuelve 0
            /*Esto quiere decir que si tenemos un array con 10 elementos, los index de los elementos iran comprendidos entre 0-9 y cuando llegue a 10 no existe ya ese elemento*/
            if ((currentSongIndex + 1) % songs.length === 0) {
                //Actualizamos el index para que vaya a la primera cancion cuando no exista una siguiente
                await setCurrentSong(songs[0]);

            } else {
                //Actualizamos la canción con la que tiene un index más que la actual
                await setCurrentSong(songs[currentSongIndex + 1]);
            }

        }

        //Promesa para que se termine de cargar el audio y poder reproducir auto
        if (isPlaying) {
            audioRef.current.play();
        }

    }

    //Estilos para la barra de input del tiempo de audio
    const trackAnimation = {
        transform: `translateX(${songInfo.animationRangePercentage}%)`,
        /* background: `${currentSong.color[1]}` */
    }

    return (
        <div className="player-component">

            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>

                <div className="track" style={{ background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})` }}>
                    <input
                        type="range"
                        min={0}
                        max={songInfo.duration || 0}
                        value={audioVolume}
                        onChange={dragAudioHandler}
                    />
                    <div className="animate-track" style={trackAnimation}></div>
                </div>

                <p>{songInfo.duration ? getTime(songInfo.duration) : ''}</p>
            </div>

            <div className="volume-control">
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={audioVolume * 100}
                    onChange={dragVolumeHandler}
                />

                <FontAwesomeIcon
                    className="volume-icon"
                    size="2x"
                    icon={faVolumeUp}
                />
            </div>

            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipSongHandler('back')}
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    onClick={() => skipSongHandler('forward')}
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                />
            </div>

        </div>
    );
}

export default Player;