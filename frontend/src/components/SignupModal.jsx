import { useDispatch } from 'react-redux';
import { setSignUpModal } from '../store/slices/interfaceSlice';
import { IoCloseOutline } from "react-icons/io5";
import { showAlert } from "../store/slices/interfaceSlice";
import { setTrue, setUser } from '../store/slices/loginSlice';
function SignUpModal() {
  const dispatch = useDispatch();
  const BackendOrigin = import.meta.env.VITE_origin;
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign Up');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const url = `${BackendOrigin}/user/signup/`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then(response => response.json()).then(data => {
      dispatch(setSignUpModal());
      if (data.error) {
        dispatch(showAlert({ message: data.error, severity: 'error' }));
        return;
      }
      dispatch(showAlert({ message: 'Sign Up successful', severity: 'success' }));
      dispatch(setTrue());
      dispatch(setUser({username:username, password:password, uuid:data.uuid}));
    }).catch(err => {
      console.error('Error signing up:', err);
      dispatch(showAlert({ message: 'Error signing up. Please try again.', severity: 'error' }));
    });
  }
  return (
    <aside className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <div className="modal-content">
          <h4 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h4>
          
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
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>

          <p 
            className="absolute top-4 right-4 text-1xl hover:cursor-pointer"
            onClick={() => dispatch(setSignUpModal())}
          >
            <IoCloseOutline />
          </p>
        </div>
      </div>
    </aside>
  );
}

export default SignUpModal;
