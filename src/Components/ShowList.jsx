import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Carousel from './Carousel'

/**
 * Array containing different podcast genres.
 * @type {string[]}
 */
const genresArray = [
  "All",
  "Personal Growth",
  "True Crime and Investigative Journalism",
  "History",
  "Comedy",
  "Entertainment",
  "Business",
  "Fiction",
  "News",
  "Kids and Family",
];

/**
 * Functional component representing the list of podcast shows.
 * @component
 * @returns {JSX.Element} JSX representation of the component.
 */
function ShowList() {

  /**
   * React Router's navigate function for programmatic navigation.
   * @type {function}
   */
  const navigate = useNavigate();

  /**
   * State hook to manage the list of all shows.
   * @type {[Object[], function]}
   */
  const [shows, setShows] = useState([]);

  /**
   * State hook to manage the list of shows after filtering.
   * @type {[Object[], function]}
   */
  const [filteredShows, setFilteredShows] = useState([]);

  /**
   * State hook to manage the selected sorting option.
   * @type {[string, function]}
   */
  const [sortOption, setSortOption] = useState('');

  /**
   * State hook to manage the search term for filtering shows.
   * @type {[string, function]}
   */
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * State hook to manage the selected genre for filtering shows.
   * @type {[string, function]}
   */
  const [selectedGenre, setSelectedGenre] = useState('All');

  /**
   * Fetches the list of shows from the API when the component mounts.
   * @function
   * @returns {void}
   */
  useEffect(() => {
    try {
      fetch('https://podcast-api.netlify.app/shows')
        .then(response => response.json())
        .then(data => setShows(data))
    } catch (error) {
      console.error(error)
    }
  }, []);

  /**
   * Handles filtering, searching, and sorting of the shows.
   * @function
   * @returns {void}
   */
  useEffect(() => {
    const filteredByGenre = selectedGenre === 'All' ? shows : shows.filter(show => show.genres.includes(genresArray.indexOf(selectedGenre)));

    const fuse = new Fuse(filteredByGenre, { keys: ['title'] });
    const fuzzyFiltered = searchTerm ? fuse.search(searchTerm) : filteredByGenre;

    const sorted = fuzzyFiltered.sort((a, b) => {
      switch (sortOption) {
        case 'A-Z':
          return a.title.localeCompare(b.title);
        case 'Z-A':
          return b.title.localeCompare(a.title);
        case 'Ascending':
          return new Date(a.updated) - new Date(b.updated);
        case 'Descending':
          return new Date(b.updated) - new Date(a.updated);
        default:
          return 0;
      }
    });

    setFilteredShows(sorted);
  }, [shows, selectedGenre, searchTerm, sortOption]);

  /**
   * Handles the change of sorting option.
   * @function
   * @param {Object} event - The event object.
   * @returns {void}
   */
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  /**
   * Handles the change of search term.
   * @function
   * @param {Object} event - The event object.
   * @returns {void}
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Handles the change of selected genre.
   * @function
   * @param {Object} event - The event object.
   * @returns {void}
   */
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  /**
   * Styles for the top header section.
   * @type {Object}
   */
  const top = {
    backgroundColor: '#ec6ead',
    width: '100%',
    padding: '10px',
    position: 'sticky',
    top: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: '1000'
  };

  /**
   * Styles for the main display section.
   * @type {Object}
   */
  const displayStyles = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'linear-gradient(to right, #'
  };

  /**
   * Styles for each show button.
   * @type {Object}
   */
  const buttonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '250px',
    height: '350px',
    margin: '10px',
    border: '2.5px solid white',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  /**
   * Styles for show image.
   * @type {Object}
   */
  const imageStyle = {
    marginBottom: '1px',
    borderRadius: '4px',
    width: '240px',
    height: '200px'
  };

  /**
   * Styles for show title.
   * @type {Object}
   */
  const titleStyle = {
    maxWidth: '240px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom: '1px',
      }

  /**
   * Styles for additional paragraphs.
   * @type {Object}
   */
      const pStyle = {
        margin: '1px',
        padding: '0'
      }


  /**
   * Styles for the filter section.
   * @type {Object}
   */
      const filters = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '1rem',
      }

    /**
    * Styles for the "Favorites" button.
    * @type {Object}
    */
      const favs = {
        cursor: 'pointer',
        marginRight: '50px',
        padding: '5px',
        borderRadius: '5px',
      }


    /**
    * Formats the input date string to a readable date format.
    * @function
    * @param {string} inputDateString - The input date string.
    * @returns {string} The formatted date string (MM/DD/YYYY).
    */
      function formatDate(inputDateString) {
        const dateObject = new Date(inputDateString);
        const day = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
      }

  /**
   * Maps an array of genre indexes to their corresponding genre strings.
   * @function
   * @param {number[]} genreIndexes - Array of genre indexes.
   * @returns {string[]} Array of genre strings.
   */    
      function mapGenreIndexesToStrings(genreIndexes) {
        return genreIndexes.map(index => genresArray[index]);
      }

   /**
   * Handles navigation to the detailed show preview page.
   * @function
   * @param {number} id - The unique identifier of the show.
   * @returns {void}
   */
      function handleShow(id) {
        navigate(`/showpreview/${id}`)
      }

   /**
   * JSX representation of the ShowList component.
   * @returns {JSX.Element} JSX representation of the component.
   */
    return (
        <div style={{backgroundColor: 'black', width: '100%'}}>
        <div style={top}>
            <h2>Podcast App</h2>
            <button style={favs} onClick={()=> navigate('/favorites')}>Favorites</button>
        </div>
        < Carousel />
        <div style={filters}>
        <label>
          Sort By:
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">--Select--</option>
            <option value="A-Z">Title A-Z</option>
            <option value="Z-A">Title Z-A</option>
            <option value="Ascending">Date Ascending</option>
            <option value="Descending">Date Descending</option>
          </select>
        </label>
        <label>
          Search:
          <input type="text" value={searchTerm} onChange={handleSearchChange} />
        </label>
        <label>
          Genres:
          <select value={selectedGenre} onChange={handleGenreChange}>
            {genresArray.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </label>
      </div>
        <div style={displayStyles}>
        {shows.length && filteredShows.map(eachShow => {
            return (
                <button key={eachShow.id} style={buttonStyle} onClick={()=> handleShow(eachShow.id)}>
                    <img src={eachShow.image} alt="" style={imageStyle}/>
                    <h3 style={titleStyle}>{eachShow.title}</h3>
                    <h4 style={pStyle}><span>Seasons: </span> {eachShow.seasons}</h4>
                    <h4 style={pStyle}><span>Seasons: </span>Updated: {formatDate(eachShow.updated)}</h4>
                    <h4 style={pStyle}><span>Genres</span></h4>
                    <h4 style={pStyle}>
                    {eachShow.genres && Array.isArray(eachShow.genres) ? (
                        mapGenreIndexesToStrings(eachShow.genres).map((genre, index) => (
                        <p style={pStyle} key={index}>{genre}</p>
                        ))
                    ) : null}
                    </h4>
                </button>
            )
        })}
        </div>
        </div>
    )
}
export default Loading(ShowList);