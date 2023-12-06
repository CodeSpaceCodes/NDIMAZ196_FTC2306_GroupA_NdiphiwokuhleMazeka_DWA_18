import React from 'react';

function FavoritesPage({ favorites }) {
  console.log(favorites)
  return (
    <div>
      <h2>Check your favorite Episodes</h2>
      { favorites && favorites.map((favShow) => (
        <div key={favShow.showId}>
          <h3>{favShow.showTitle}</h3>
          {favShow.episodes.map((favEpisode) => (
            <div key={favEpisode.title}>
              <p>{favEpisode.title}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
