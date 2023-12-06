import React, {useState, useEffect} from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';

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

function ShowList(){

    const navigate = useNavigate();
    const [shows, setShows] = useState([]);
    const [filteredShows, setFilteredShows] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');

    useEffect(() => {
        try {
            fetch('https://podcast-api.netlify.app/shows')
            .then(response => response.json())
            .then(data => setShows(data))
        } catch (error) {
            console.error(error)
        }
    }, []);

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
    
      const handleSortChange = (event) => {
        setSortOption(event.target.value);
      };
    
      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
      const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
      };

    const top = {
        backgroundColor: '#161010',
        width: '100%',
        padding: '10px',
        position: 'sticky',
        top: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
    const displayStyles = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
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
      const imageStyle = {
        marginBottom: '1px',
        borderRadius: '4px',
        width: '240px',
        height: '200px'
      };

      const titleStyle = {
        maxWidth: '240px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom: '1px',
      }

      const pStyle = {
        margin: '1px',
        padding: '0'
      }

      const filters = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '1rem',
      }

      const favs = {
        cursor: 'pointer',
        marginRight: '50px',
        padding: '5px'
      }

      function formatDate(inputDateString) {
        const dateObject = new Date(inputDateString);
        const day = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
      }
      function mapGenreIndexesToStrings(genreIndexes) {
        return genreIndexes.map(index => genresArray[index]);
      }

      function handleShow(id) {
        navigate(`/showpreview/${id}`)
      }

    //console.log(shows)
    return (
        <div style={{backgroundColor: 'black', width: '100%'}}>
        <div style={top}>
            <h2>Podcast App</h2>
            <button style={favs} onClick={()=> navigate('/favorites')}>Favorites</button>
        </div>
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
export default ShowList;