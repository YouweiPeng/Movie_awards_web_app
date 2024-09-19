
import SearchBar from '../components/SearchBar';
import FavMovies from '../components/FavMovies';
const HomePage = () => {
    return (
        <div className="space-y-12 w-full pt-36">
            <SearchBar />
            <FavMovies />
        </div>
    );
};

export default HomePage;
