import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFavMovie } from "../store/slices/loginSlice";
import { showAlert } from "../store/slices/interfaceSlice";
const FavMovies = () => {
    const movies = useSelector((state) => state.loggedIn.fav_movies);
    const username = useSelector((state) => state.loggedIn.user.username);
    const password = useSelector((state) => state.loggedIn.user.password);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Backendorigin = import.meta.env.VITE_origin;

    const handleMovieClick = (imdbID) => {
        navigate(`/movie/${imdbID}`, { state: { imdbID } });
    };

    const handleRemoveClick = (movie) => {
        console.log('Remove movie:', movie);
        const url = `${Backendorigin}movie/fav_movies/`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            },
            body: JSON.stringify({ Title: movie.Title }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Removed from fav:', data);
            dispatch(removeFavMovie(movie));
            dispatch(showAlert({ message: `Removed ${movie.Title} from favourites`, severity: 'success' }));
        })
        .catch(err => {
            console.error('Error removing from fav:', err);
        });
    };
    if (movies.length === 0) {
        return (
            <div className="fav-movies container mx-auto py-10">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Favourite Movies</h2>
                <p className="text-center text-gray-600">You have not added any movies to your favourites yet.</p>
            </div>
        );
    } else {
        return (
            <div className="fav-movies container mx-auto py-10">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Favourite Movies</h2>
        
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                    {
                        movies.map((movie, index) => {
                            return (
                                <div key={index} 
                                    className="movie-card relative transition-transform duration-300 transform hover:scale-105 w-48 h-72"
                                >
                                    <img src={movie.Poster} alt={movie.Title} className="w-48 h-72 object-cover rounded-lg shadow-lg" />
                                    <div className="movie-info absolute inset-0 bg-gray-800 bg-opacity-50 rounded-lg flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-xl font-bold text-white mb-2">{movie.Title}</h3>
                                        <p className="text-sm text-gray-200">{movie.Year}</p>
                                        <button 
                                            className="bg-red-500 text-white py-1 px-2 rounded-md mt-2"
                                            onClick={() => handleRemoveClick(movie)}
                                        >
                                            Remove
                                        </button>
                                        <button 
                                            className="bg-blue-500 text-white py-1 px-2 rounded-md mt-2"
                                            onClick={() => handleMovieClick(movie.imdbID)}
                                        >
                                            Details
                                        </button>
                                    </div>
                                </div>

                            );
                        })
                    }
                </div>
        
            </div>
        );
        
    }
};

export default FavMovies;
