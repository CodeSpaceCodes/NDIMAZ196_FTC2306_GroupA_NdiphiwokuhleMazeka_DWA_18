import React, {useState, useEffect} from 'react';
import Loading from './Loading';

function FavoritesPage() {

  const [favorites, setFavorites] = useState([]);
  const [sortOption, setSortOption] = useState('az');


  useEffect(() => {
    // Retrieve favorites from local storage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const organizeFavoritesByShow = (favorites) => {
    const organizedFavorites = {};
    favorites.forEach((favorite) => {
      const showName = favorite.showName;
      if (!organizedFavorites[showName]) {
        organizedFavorites[showName] = [];
      }
      organizedFavorites[showName].push(favorite);
    });
    return organizedFavorites;
  };

  const renderOrganizedFavorites = (organizedFavorites) => {
    // Sort the shows based on the selected sort option
    const sortedShows = Object.entries(organizedFavorites).sort((a, b) => {
      const aValue = a[0];
      const bValue = b[0];
      switch (sortOption) {
        case 'az':
          return aValue.localeCompare(bValue);
        case 'za':
          return bValue.localeCompare(aValue);
        case 'recentlyAdded':
          return new Date(b[1][0].showUpdatedDate) - new Date(a[1][0].showUpdatedDate);
        case 'leastAdded':
          return new Date(a[1][0].showUpdatedDate) - new Date(b[1][0].showUpdatedDate);
        default:
          return 0;
      }
    });

    const handleDeleteEpisode = (episodeKey) => {
      const updatedFavorites = favorites.filter((episode) => episode.key !== episodeKey);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };


    const formatDate = (inputDateString) => {
      const dateObject = new Date(inputDateString);
      const day = dateObject.getDate().toString().padStart(2, '0');
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObject.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    }

    return sortedShows.map(([showName, episodes]) => (
      <div key={showName}>
        <h2>{`${showName} - Updated: ${formatDate(episodes[0].showUpdatedDate)}`}</h2>
        <ul>
          {episodes.map((episode) => (
            <li key={episode.key}>
              <p>{`Episode ${episode.episodeNumber}: ${episode.title}`}</p>
              <p>{`Date Added: ${episode.timeAdded}`}</p>
              <button onClick={() => handleDeleteEpisode(episode.key)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);
  };

const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Organize favorites by show
const organizedFavorites = organizeFavoritesByShow(storedFavorites);

// Render organized favorites
const renderedOrganizedFavorites = renderOrganizedFavorites(organizedFavorites);

// Render the component
return (
  <div>
    {/* Other content */}
    <h1>Favorite Episodes</h1>
    <div>
        <label>Sort by:</label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="recentlyAdded">Recently Added</option>
          <option value="leastAdded">Least Added</option>
        </select>
      </div>
    {renderedOrganizedFavorites}
  </div>
);
}

export default Loading(FavoritesPage);
