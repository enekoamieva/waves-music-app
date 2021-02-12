

function LibrarySong({ song, songs, setCurrentSong, isPlaying, audioRef, setShowLibrary, setSongs }) {

    //Functions
    const songSelectHandler = () => {
        const selectedSong = songs.filter(item => item.id === song.id);

        setCurrentSong(selectedSong[0]);

        //Actualizar el estado de la canción actual en su atributo active
        const changeActiveSongs = songs.map(item => {
            if (item.id === song.id) {
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

        //Promesa para que se termine de cargar el fichero y poder reproducir auto
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(audio => {
                    audioRef.current.play();
                })
            }
        }

        //Esconder libreria despues de seleccionar canción
        setShowLibrary('');

    }

    return (
        <div className="library-song-component">
            <div className={`library-songs ${song.active ? 'selected' : ''}`} onClick={songSelectHandler}>
                <img alt={song.artist} src={song.cover} />
                <div className="song-description">
                    <h3>{song.name}</h3>
                    <h4>{song.album}</h4>
                </div>
            </div>
        </div>
    );
}

export default LibrarySong;