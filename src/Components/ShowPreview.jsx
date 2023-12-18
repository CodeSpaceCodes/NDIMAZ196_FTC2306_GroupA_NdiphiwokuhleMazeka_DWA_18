import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';

function ShowPreview() {
  const audioRef = useRef(null);

  const { id } = useParams();
  const [showPreview, setShowPreview] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [progressBarWidth, setProgressBarWidth] = useState('0%');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    try {
      fetch(`https://podcast-api.netlify.app/id/${id}`)
        .then((response) => response.json())
        .then((data) => setShowPreview(data));
    } catch (error) {
      console.error(error.message);
    }
  }, [id]);

  const getEpisodesBySeason = (season) => {
    if (!showPreview.seasons) {
      return [];
    }
    const selectedSeasonData = showPreview.seasons.find(
      (seasonData) => seasonData.season === season
    );
    return selectedSeasonData ? selectedSeasonData.episodes : [];
  };

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgressBarWidth(`${progress}%`);
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused || audioRef.current.ended) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleAddToFavorites = (episode) => {
    const formattedTime = new Date().toLocaleString();
    const newFavorite = {
      key: uuidv4(),
      season: selectedSeason,
      episodeNumber: episode.episode,
      showName: showPreview.title,
      showUpdatedDate: showPreview.updated,
      timeAdded: formattedTime,
      isFavorite: true,
      ...episode,
    };

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const existingFavoriteIndex = storedFavorites.findIndex((fav) => fav.key === newFavorite.key);

    if (existingFavoriteIndex !== -1) {
      storedFavorites[existingFavoriteIndex] = newFavorite;
    } else {
      storedFavorites.push(newFavorite);
    }

    localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    setFavorites(storedFavorites);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const image = {
    width: '300px',
    margin: '10px',
  };

  const heading = {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px',
    padding: '5px',
    borderRadius: '20px',
    backgroundColor: 'black',
  };

  const preview = {
    display: 'flex',
    flexDirection: 'row',
  };

  const seasonStyles = {
    width: '50%',
    paddingTop: '20px',
    padding: '5px',
    margin: '10px',
    borderRadius: '20px',
    backgroundColor: 'black',
  };

  const label = {
    padding: '5px',
    margin: '2px',
    fontSize: 'large',
  };

  const select = {
    padding: '5px',
    fontSize: 'large',
  };

  const episodeStyles = {
    padding: '5px',
    margin: '5px',
  };

  const episodeItem = {
    margin: '5px',
    padding: '15px',
    borderRadius: '20px',
    backgroundColor: 'black',
  };

  const progressBarContainer = {
    width: '100%',
    height: '10px',
    backgroundColor: '#ddd',
  };

  const progressBar = {
    height: '100%',
    backgroundColor: '#4caf50',
    width: progressBarWidth,
  };

  const favorite = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };

  const favButton = {
    padding: '5px',
    margin: '0px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
  };

  useEffect(() => {
    // Set up audio properties when the component mounts
    if (audioRef.current) {
      audioRef.current.src = getEpisodesBySeason(selectedSeason)[0]?.file || ''; // Set the initial source
      audioRef.current.onTimeUpdate = handleTimeUpdate;
      audioRef.current.onEnded = () => {
        setCurrentTime(0);
        setProgressBarWidth('0%');
      };
    }
  }, [selectedSeason]);

  return (
    <div>
      <div style={heading}>
        <div>
          <img src={showPreview.image} alt="" style={image} />
        </div>
        <div>
          <h1>{showPreview.title}</h1>
          <p>{showPreview.description}</p>
        </div>
      </div>
      <div style={preview}>
        <div style={seasonStyles}>
          <label style={label}>
            Season:
            <select
              value={selectedSeason}
              onChange={(e) => handleSeasonSelect(Number(e.target.value))}
              style={select}
            >
              {showPreview.seasons &&
                showPreview.seasons.map((seasonData) => (
                  <option key={seasonData.season} value={seasonData.season}>
                    Season {seasonData.season}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div style={episodeStyles}>
          {getEpisodesBySeason(selectedSeason).map((episode) => (
            <div key={uuidv4()} style={episodeItem}>
              <div style={favorite}>
                <h3>
                  Episode {episode.episode}: {episode.title}
                </h3>
                <button
                  style={{
                    ...favButton,
                    backgroundColor: episode.isFavorite ? 'red' : 'initial',
                  }}
                  onClick={() => handleAddToFavorites(episode)}
                >
                  {episode.isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
                </button>
              </div>
              <p>{episode.description}</p>
              {episode.file && (
                <audio
                  ref={audioRef}
                  src={episode.file}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => {
                    setCurrentTime(0);
                    setProgressBarWidth('0%');
                    setIsPlaying(false);
                  }}
                ></audio>
              )}
              <div>
                <button onClick={() => handlePlayPause()}>
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <div style={progressBarContainer}>
                  <div style={progressBar}></div>
                </div>
                <p>
                  {audioRef.current
                    ? `Current: ${formatTime(currentTime)} / Duration: ${audioRef.current.duration && formatTime(audioRef.current.duration)}`
                    : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loading(ShowPreview);
