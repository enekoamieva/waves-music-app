import LibrarySong from './LibrarySong';

function Library({ songs, setCurrentSong, isPlaying, audioRef, showLibrary, setShowLibrary, setSongs }) {
    return (
        <div className={`library-component ${showLibrary}`}>
            <h2 className="library-title">Temas</h2>
            <div className="library-songs">

                {
                    songs.map(song => (
                        <LibrarySong
                            song={song}
                            songs={songs}
                            key={song.id}
                            setCurrentSong={setCurrentSong}
                            isPlaying={isPlaying}
                            audioRef={audioRef}
                            setShowLibrary={setShowLibrary}
                            setSongs={setSongs}
                        />
                    ))
                }

            </div>
        </div>
    );
}

export default Library;