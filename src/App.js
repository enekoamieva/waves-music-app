import { useState, useRef, useEffect } from 'react';
//Components
import Header from './components/Header';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
//Styles
import './styles/App.scss';
//Data
import data from './data/data';

function App() {

    //State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationRangePercentage: 0
    });
    const [showLibrary, setShowLibrary] = useState('');
    const [audioVolume, setAudioVolume] = useState(0.6);

    //Ref
    const audioRef = useRef(null);

    //Use Effect para que cuando se cambie el estado (setAudioVolume) se actualize el nivel de volumen
    useEffect(() => {
        document.getElementById('play-audio').volume = audioVolume;
    }, [audioVolume])

    //Función para setear el tiempo actual y de duración del audio
    const timeUpdateHandler = (event) => {
        //Calcular el % para la barra de input range y poder animarla
        const roundedCurrent = Math.round(event.target.currentTime);
        const roundedDuration = Math.round(event.target.duration);
        const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);

        setSongInfo({
            ...songInfo,
            currentTime: event.target.currentTime,
            duration: event.target.duration,
            animationRangePercentage: animationPercentage
        });
    }

    //Función para pasar de audio automaticamente cuando llege a su final de la reproducción
    const songEndHandler = async () => {
        //Conseguir el index de la canción actual
        let currentSongIndex = songs.findIndex(item => {
            return item.id === currentSong.id;
        });

        //Actualizamos la canción con la que tiene un index más que la actual
        await setCurrentSong(songs[currentSongIndex + 1]);

        if (isPlaying) {
            audioRef.current.play();
        }
    }

    return (
        <div className={`App ${showLibrary ? "library-active" : ""}`}>

            <Header
                showLibrary={showLibrary}
                setShowLibrary={setShowLibrary}
            />

            <Song
                currentSong={currentSong}
                isPlaying={isPlaying}
            />

            <Player
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                songs={songs}
                setSongs={setSongs}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                audioVolume={audioVolume}
                setAudioVolume={setAudioVolume}
            />

            <Library
                songs={songs}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                showLibrary={showLibrary}
                setShowLibrary={setShowLibrary}
                setSongs={setSongs}
            />

            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
                id="play-audio"
            >
            </audio>

        </div>
    );
}

export default App;
