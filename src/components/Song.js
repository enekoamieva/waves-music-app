

function Song({ currentSong, isPlaying }) {
    return (
        <div className="song-component">
            <img alt={currentSong.artist} src={currentSong.cover} className={isPlaying ? `rotate` : `rotate rotate-pause`} />
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.album}</h3>
        </div>
    );
}

export default Song;