import { useDispatch } from 'react-redux';
import { setLoginModal } from '../store/slices/interfaceSlice';
import { IoCloseOutline } from "react-icons/io5";
import { showAlert } from "../store/slices/interfaceSlice";
import { setTrue, setUser} from '../store/slices/loginSlice';
import { setFavMovies } from '../store/slices/loginSlice';
function LoginModal() {
  const dispatch = useDispatch();
  const Backendorigin = import.meta.env.VITE_origin;
  const handleLogin = (e) =>{
    e.preventDefault();
    console.log('Login');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const url = `${Backendorigin}user/login/`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then(response => response.json()).then(data => {
      dispatch(setLoginModal());
      if (data.error) {
        dispatch(showAlert({ message: data.error, severity: 'error' }));
        return;
      }
      dispatch(showAlert({ message: 'Login successful', severity: 'success' }));
      dispatch(setTrue());
      dispatch(setUser({username:username, password:password, uuid:data.uuid}));
      const fetchFavMovies = async () => {
        const url = `${Backendorigin}movie/fav_movies/`;
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
          },
        });
        const data = await response.json();
        console.log('Fetched fav movies:', data);
        dispatch(setFavMovies(data));
      }
      fetchFavMovies();
      
    }).catch(err =>{
      console.error('Error logging in:', err);
      dispatch(showAlert({ message: 'Error logging in. Please try again.', severity: 'error' }));
    })
    ;

  }

  return (
    <aside className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <div className="modal-content">
          <h4 className="text-2xl font-bold mb-6 text-gray-800">Login</h4>

          <form className="space-y-4">  
            <div className="form-group">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input 
                type="text" 
                id="username" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                id="password" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>

          <p 
            className="absolute top-4 right-4 text-1xl hover:cursor-pointer"
            onClick={() => dispatch(setLoginModal())}
          >
            <IoCloseOutline />
          </p>
        </div>
      </div>
    </aside>
  );
}

export default LoginModal;
