import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FcLikePlaceholder, FcLike} from "react-icons/fc";
import { useSelector } from "react-redux";
import { addFavMovie } from "../store/slices/loginSlice";
import { useDispatch } from "react-redux";
import { FcDislike } from "react-icons/fc";
import { showAlert } from "../store/slices/interfaceSlice";
import AlertMsg from "../components/alertMsg";
const MoviePage = () => {
    const location = useLocation();
    const { imdbID } = location.state || {};
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const Backendorigin = import.meta.env.VITE_origin;
    const fav_movies = useSelector((state) => state.loggedIn.fav_movies);
    const username = useSelector((state) => state.loggedIn.user.username);
    const password = useSelector((state) => state.loggedIn.user.password);
    const isLoggedIn = useSelector((state) => state.loggedIn.value);
    const dispatch = useDispatch();
    const handleAddFav = () => {
        console.log('Add to fav');
        
        const url = `${Backendorigin}/movie/fav_movies/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${username}:${password}`),

            },
            body: JSON.stringify({ movie: movie}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Added to fav:', data);
            console.log(movie);
            dispatch(addFavMovie(movie));
            dispatch(showAlert({ message: `Added to ${movie.Title} to favourites`, severity: 'success' }));
        })
        .catch(err => {
            console.error('Error adding to fav:', err);
        });

    }
    useEffect(() => {
        if (imdbID) {
            fetch(`${Backendorigin}movie/search_movie_id/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imdb_id: imdbID })
            })
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    console.log("Fetched movie details:", data);
                    setMovie(data); 
                } else {
                    console.error("Failed to fetch movie details:", data.Error);
                }
            })
            .catch(err => console.error("Error fetching movie details:", err));
        }
    }, [imdbID, Backendorigin]);

    if (!movie) {
        return <p>Loading movie details...</p>; 
    }
    const handleTooMuchFav = () => {
        dispatch(showAlert({ message: 'You can not have more than 5 favourite movies', severity: 'warning' }));
    }

    return (    
        <div className="container mx-auto mt-24 px-4 overflow-x-hidden">
            {isLoggedIn && (
                fav_movies.some(fav_movie => fav_movie.imdbID === movie.imdbID || fav_movie.imdb_id === movie.imdbID) ? (
                    <FcLike
                        className="text-4xl absolute top-20 right-10"
                    />
                ):( fav_movies.length >= 5 ? (
                    <FcDislike
                        className="text-4xl absolute top-20 right-10 hover:cursor-pointer"
                        onClick={handleTooMuchFav}
                    />
                ) : (
                    <FcLikePlaceholder
                        className="text-4xl absolute top-20 right-10 hover:cursor-pointer"
                        onClick={handleAddFav}
                    />

                )
            )
            )}
            <IoArrowBackOutline 
                className="text-4xl hover:cursor-pointer absolute top-20 left-10"
                onClick={() => navigate('/')}
            />

            <div className="flex flex-col md:flex-row items-start justify-center md:justify-between mb-12 space-y-8 md:space-y-0 md:space-x-8 w-full">
                <img
                    src={movie.Poster}
                    alt={`Poster of ${movie.Title}`}
                    className="w-full md:w-1/3 max-w-full rounded-lg shadow-lg object-cover"
                />

                <div className={`w-full md:w-2/3 text-left ${showMore ? 'space-y-2' : 'space-y-6'}`}>
                    <h1 className="text-3xl font-bold">{movie.Title}</h1>
                    <p className="text-sm text-gray-600">
                        <strong>Released:</strong> {movie.Released}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Runtime:</strong> {movie.Runtime}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Genre:</strong> {movie.Genre}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Director:</strong> {movie.Director}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Writer:</strong> {movie.Writer}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Actors:</strong> {movie.Actors}
                    </p>

                    {showMore && (
                        <>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600"><strong>Language:</strong> {movie.Language}</p>
                                <p className="text-sm text-gray-600"><strong>Country:</strong> {movie.Country}</p>
                                <p className="text-sm text-gray-600"><strong>Awards:</strong> {movie.Awards}</p>
                                <p className="text-sm text-gray-600"><strong>Metascore:</strong> {movie.Metascore}</p>
                                <p className="text-sm text-gray-600"><strong>IMDb ID:</strong> {movie.imdbID}</p>
                                <p className="text-sm text-gray-600"><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                                <p className="text-sm text-gray-600"><strong>IMDb Votes:</strong> {movie.imdbVotes.toLocaleString()}</p>
                                <p className="text-sm text-gray-600"><strong>Box Office:</strong> {movie.BoxOffice?movie.BoxOffice: "N/A"}</p>
                                <p className="text-sm text-gray-600"><strong>Production:</strong> {movie.Production? movie.Production:"N/A"}</p>
                                <p className="text-sm text-gray-600"><strong>Website: </strong> 
                                
                                {movie.Website ==="N/A" || !movie.Website ? 
                                    (<p className="break-all inline">N/A</p>)
                                
                                 : (<a href={movie.Website} className="text-blue-500 hover:underline break-all">{movie.Website}</a>)}</p> 
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Plot</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {movie.Plot}
                                </p>
                            </div>
                        </>
                    )}

                    <a
                        onClick={() => setShowMore(!showMore)}
                        className="hover:underline text-blue-500 hover:cursor-pointer"
                    >
                        {showMore ? 'Less Info' : 'More Info'}
                    </a>
                </div>
            </div>
            <AlertMsg />
        </div>
    );
};

export default MoviePage;
