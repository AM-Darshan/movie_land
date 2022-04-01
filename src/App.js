import {useState, useEffect} from 'react'

import MoiveCard from './movieCard'

import './App.css'
import SearchIcon from './search.svg'

//8b9076cd -> api key

const API_URL = 'http://www.omdbapi.com?apikey=8b9076cd'

// const movie1 = {
//     "Title": "The Avengers",
//     "Year": "2012",
//     "imdbID": "tt0848228",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
// }



const App = () => {
    const [movies,setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        
        const response = await fetch(`${API_URL}&s=${title}`)

        const data = await response.json();

        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies('avengers')
    },[])


    return (
       <div className="app">
           <h1>MovieLand</h1>

           <div className="search">
               <input placeholder='Search for movies' value={searchTerm}onChange={(e) => setSearchTerm(e.target.value)} />
            
            <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}></img>
           </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                    {movies.map((movie) => (
                     < MoiveCard movie = {
                         movie
                     }
                     />
                    ))}
                    </div>
                ) : 
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
           
       </div>
    )
}

export default App;