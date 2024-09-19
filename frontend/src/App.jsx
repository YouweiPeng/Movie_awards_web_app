import './App.css';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import MoviePage from './pages/MoviePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  const showLoginModal = useSelector(state => state.interfaceSlice.loginModal);
  const showSignUpModal = useSelector(state => state.interfaceSlice.signUpModal);

  return (
    <BrowserRouter>
      <div className="bg-lime-200 h-screen flex flex-col items-center justify-center">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={<HomePage />} 
          />
          <Route path="/movie/:imdbID" element={<MoviePage />} />
        </Routes>
        {showLoginModal && <LoginModal />}
        {showSignUpModal && <SignUpModal />}
      </div>
    </BrowserRouter>
  );
}

export default App;
