import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setLoginModal, setSignUpModal } from "../store/slices/interfaceSlice";
import { FaUserCircle } from "react-icons/fa";
import { setFalse } from "../store/slices/loginSlice";
import { showAlert } from "../store/slices/interfaceSlice";
import {setFavMovies} from '../store/slices/loginSlice';
const Header = () => {
    const isLoggedIn = useSelector((state) => state.loggedIn.value);
    const user = useSelector((state) => state.loggedIn.user);
    let dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setFalse());
        dispatch(showAlert({ message: 'Logout successful', severity: 'success' }));
        dispatch(setFavMovies([]));
    };
    if (!isLoggedIn) {
        return (
            <header className="fixed top-0 left-0 w-full bg-gray-100 py-4 shadow-lg z-50">
                <div className="container mx-auto text-center flex justify-between">
                    <p className="text-3xl font-bold text-gray-800 mb-2 inline-block">Welcome to Movie Awards web app</p>
                    <div>
                        <button className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => dispatch(setLoginModal())}
                        >
                            Login
                        </button>
                        <button className="bg-gray-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onClick={() => dispatch(setSignUpModal())}
                        >
                            Sign up
                        </button>
                        </div>
                </div>
            </header>
        );
    }else{
        return (
            <header className="fixed top-0 left-0 w-full bg-gray-100 py-4 shadow-lg z-50">
                <div className="container mx-auto text-center flex justify-between">
                    <p className="text-3xl font-bold text-gray-800 mb-2 inline-block">Welcome to Movie Awards web app</p>
                    <div className="flex min-w-[20%] justify-between items-center">
                        <FaUserCircle className="text-4xl text-blue-500 hover:cursor-pointer" />
                        <p className="text-gray-600">{user.username}</p>
                        <button 
                            className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={handleLogout}
                            >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
