import Search from "./components/Search.jsx";
import {useState, useEffect} from "react";
import {useDebounce} from "react-use";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([]);
    const API_BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = import.meta.env.VITE_TMBD_API_KEY;
    const API_OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    }
    // Debounce the serach term to prevent making too many API requests
    // by waiting for the user to stop typing for 500ms
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 1500, [searchTerm])

    const fetchMovies = async (query = '') =>{
        try{
            setIsLoading(true);
            setErrorMessage('');
            const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`  :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            //alert(response);
            if(!response.ok){
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();
            if(data.Response === 'False'){
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);
                return;
            }

        setMovieList(data.results);
            if(query && data.results.length > 0){
                await updateSearchCount(query, data.results[0]);
            }


        }catch (error){
            console.error(`Error fetching movies: ${error.message}`);
            setErrorMessage('Error fetching movies. Please try again later');
        }finally{
            setIsLoading(false);
        }
    }

    const loadTrendingMovies = async () =>{
        try{
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);

        }catch(error){
            console.log(`Error fetching trending movies: ${error.message}`);
            setErrorMessage('Error fetching trending movies');

        }

    }
    useEffect( ()=> {
          fetchMovies(debouncedSearchTerm);


    }, [debouncedSearchTerm]);

    useEffect( ()=>{
         loadTrendingMovies();
    }, [])
    return (
        <main>
            <div className="pattern"/>
            <div className="wrapper">
                <img src="./hero.png" alt="Hero Banner "/>
                <header>
                    <h1>Find <span className="text-gradient">Movies</span>You'll Enjoy Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </header>
                {trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2 className="mt-[40px]">Trending Movies</h2>
                        <ul>
                            {trendingMovies.map((trendingMovie, index) => (
                                <li key={trendingMovie.$id}>
                                    <p>{index +1}</p>
                                    <img src={trendingMovie.poster_url} alt={trendingMovie.title}/>

                                </li>

                            ))}
                        </ul>
                    </section>
                )}
                <section>

                </section>

                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>
                    {isLoading ? (
                        <Spinner />
                    ): errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ):(
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}



                </section>


            </div>

        </main>
    )
}
export default App
