import { IoMdSearch } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import AlertMsg from "./alertMsg";
import { useDispatch } from "react-redux";
import { showAlert } from "../store/slices/interfaceSlice";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
    const Backendorigin = import.meta.env.VITE_origin;
    const [searchByTitle, setSearchByTitle] = useState(true);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearch = async () => {
        const query = document.querySelector('input').value.trim();
        console.log(query)
        if (!query) {
            dispatch(showAlert({ message: 'Please enter a search query.', severity: 'warning' }));
            return;
        }
        if (!searchByTitle && !/^tt\d+$/.test(query)) { // Regex to match IMDb ID format
            dispatch(showAlert({ message: 'Invalid IMDb ID format. Please enter a valid IMDb ID.', severity: 'error' }));
            return;
        }
        
        setLoading(true);
        setShowDropdown(false);
    
        const url = `${Backendorigin}movie/${searchByTitle ? 'search_movie_title/' : 'search_movie_id/'}`;
        const data = searchByTitle ? { title: query } : { imdb_id: query };
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.status === 404) {
                dispatch(showAlert({ message: 'Movie not found. Please try another search.', severity: 'error' }));
                throw new Error('Movie not found');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.Response === 'False');
            if (data.Response === 'False') {
                dispatch(showAlert({ message: data.Error, severity: 'error' }));
            } else {
                setResults(data.Search || [data]);
                setShowDropdown(true);
            }
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
        });
    };
    
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);
    const handleResultClick = (imdbID) => {
        navigate(`/movie/${imdbID}`, { state: { imdbID } });
    };
    return (
        <div ref={wrapperRef} className="input-wrapper w-4/5 m-auto flex flex-col items-center relative">
            <div className="flex items-center w-full justify-center">
                <input
                    type="text"
                    className="w-3/5 p-4 pl-10 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Search Movies by ${searchByTitle ? 'Title' : 'Imdb ID'}`}
                />
                <IoMdSearch 
                    className="text-4xl hover:cursor-pointer"
                    onClick={handleSearch}
                />
                <button
                    onClick={() => setSearchByTitle(!searchByTitle)}
                    className={`min-w-56 ml-4 ${searchByTitle ? 'bg-black text-white' : 'bg-white text-black'} transition ease-in-out delay-150 p-2 rounded`}
                >
                    {searchByTitle ? 'Search by Title' : 'Search by Imbd ID'}
                </button>
            </div>
            {loading && <p className="absolute top-14">Loading...</p>}
            {showDropdown && (
                <ul className="absolute top-16 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {results.length ? (
                        results.map((result, index) => (
                            <li key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleResultClick(result.imdbID)}
                            >
                                {result.Title} ({result.Year})
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-600">No results found</li>
                    )}
                </ul>
            )}
            <AlertMsg />
        </div>
    );
};

export default SearchBar;
