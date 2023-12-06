import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';


/**
 * React state management object
 * @component
 * @returns {JSX.Element} JSX representation of the ShowPreview component.
 */
function ShowPreview() {
    const {id} = useParams();
    const [showPreview, setShowPreview] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [audioRef, setAudioRef] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [favorites, setFavorites] = useState([]);

/**
 * Fetches detailed information about the podcast show based on the provided ID.
 * @function
 * @async
 * @param {string} id - The unique identifier of the podcast show.
 * @returns {Promise<void>} A Promise that resolves after fetching and updating the showPreview state.
 */
    useEffect(()=>{
        try {
            fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then(response => response.json())
            .then(data => setShowPreview(data))
        } catch (error) {
            console.error(error.message)
        }
    },[id]);

/**
 * Retrieves the list of episodes for the selected season.
 * @function
 * @param {number} season - The selected season.
 * @returns {Object[]} An array of episodes for the selected season.
 */    
  const getEpisodesBySeason = season => {
    if (!showPreview.seasons) {
      return [];
    }
    const selectedSeasonData = showPreview.seasons.find(
      seasonData => seasonData.season === season
    );
    return selectedSeasonData ? selectedSeasonData.episodes : [];
  };

/**
 * Handles the selection of a different season.
 * @function
 * @param {number} season - The selected season.
 * @returns {void}
 */
  const handleSeasonSelect = season => {
    setSelectedSeason(season);
  };

/**
 * Updates the progress bar and current time as the audio plays.
 * @function
 * @returns {void}
 */
   const handleTimeUpdate = () => {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar && audioRef) {
      const progress = (audioRef.currentTime / audioRef.duration) * 100;
      progressBar.style.width = `${progress}%`;
        setCurrentTime(audioRef.currentTime);
    }
  };

/**
 * Handles the play/pause functionality of the audio player.
 * @function
 * @returns {void}
 */  
  const handlePlayPause = () => {
    if (audioRef) {
      if (audioRef.paused) {
        audioRef.play();
      } else {
        audioRef.pause();
      }
    }
  };

/**
 * Adds the selected episode to the list of favorites.
 * @function
 * @param {Object} episode - The selected episode.
 * @returns {void}
 */
  const handleAddToFavorites = (episode) => {
    setFavorites((prevFavorites) => {
      const existingShow = prevFavorites.find(
        (fav) => fav.showId === showPreview.id
      );

      if (existingShow) {
        existingShow.episodes.push(episode);
        return [...prevFavorites];
      } else {
        return [
          ...prevFavorites,
          {
            showId: showPreview.id,
            showTitle: showPreview.title,
            episodes: [episode],
          },
        ];
      }
    });
  };

  /**
   * Formats the given time in seconds to a readable time format (MM:SS).
   * @function
   * @param {number} seconds - The time in seconds.
   * @returns {string} The formatted time string.
   */
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
    return formattedTime;
  };

/* styling of components*/

  const image = {
    width: '300px',
    margin: '10px'
  }
  const heading = {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px',
    padding: '5px',
    borderRadius: '20px',
    backgroundColor: 'black',
  }
  const preview = {
    display: 'flex',
    flexDirection: 'row',
  }
  const seasonStyles = {
    width: '50%',
    paddingTop: '20px',
    padding: '5px',
    margin: '10px',
    borderRadius: '20px',
    backgroundColor: 'black',
  }
  const label ={
    padding: '5px',
    margin: '2px',
    fontSize: 'large'
  }
 const select = {
    padding: '5px',
    fontSize: 'large'
 }
  const episodeStyles = {
    padding: '5px',
    margin: '5px',
  }
  const episodeItem = {
    margin: '5px',
    padding: '15px',
    borderRadius: '20px',
    backgroundColor: 'black',
  }

  const progressBarContainer = {
    width: '100%',
    height: '10px',
    backgroundColor: '#ddd',

  }
  const progressBar = {
    height: '100%',
    backgroundColor: '#4caf50',
    width: '0%',
  }

  const favorite = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
 const favButton = {
    padding: '5px',
    margin: '0px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px'
 }


  return (
    <div>
        <div style={heading}>
            <div>
                < img src={showPreview.image} alt="" style={image}/>
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
                onChange={e => handleSeasonSelect(Number(e.target.value))}
                style={select}
            >
                {showPreview.seasons &&
                showPreview.seasons.map(seasonData => (
                    <option key={seasonData.season} value={seasonData.season}>
                    Season {seasonData.season}
                    </option>
                ))}
            </select>
            </label>
            </div>
            <div style={episodeStyles}>
                {getEpisodesBySeason(selectedSeason).map(episode => (
                 <div key={episode.title} style={episodeItem}>
                    <div style={favorite}>
                    <h3>Episode {episode.episode}: {episode.title}</h3>
                    <button
                    style={favButton}
                    onClick={() => handleAddToFavorites(episode)}
                    >
                    Add To Favorites
                    </button>
                    </div>
                 <p>{episode.description}</p>
                 <audio
                    ref={ref => setAudioRef(ref)}
                    src={episode.file}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => {
                        setCurrentTime(0);
                        const progressBar = document.getElementById('progress-bar');
                        if (progressBar) {
                        progressBar.style.width = '0%';
                        }
                    }}
                    ></audio>
                 <div>
                   <button onClick={() => handlePlayPause()}>
                     {audioRef && !audioRef.paused ? 'Pause' : 'Play'}
                   </button>
                   <div style={progressBarContainer}>
                     <div style={progressBar}></div>
                   </div>
                   <p>
                    {audioRef
                        ? `Current: ${formatTime(currentTime)} / Duration: ${formatTime(
                            audioRef.duration
                        )}`
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
export default ShowPreview;