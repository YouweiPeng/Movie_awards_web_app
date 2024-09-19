import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: false, 
    user: {},
    fav_movies: []

};

const loginSlice = createSlice({
    name: "loggedIn",
    initialState,
    reducers: {
        setTrue: (state) => {
            state.value =true;
        },
        setFalse: (state) => {
            state.value = false;
        },
        setUser(state, action){
            state.user = action.payload;
        },
        addFavMovie(state, action){
            state.fav_movies.push(action.payload);
        },
        removeFavMovie(state, action){
            state.fav_movies = state.fav_movies.filter(movie => movie.Title !== action.payload.Title);
        },
        setFavMovies(state, action){
            state.fav_movies = Array.isArray(action.payload) ? action.payload : [];
        }
    }
});

export const {setTrue, setFalse, setUser, setFavMovies, addFavMovie, removeFavMovie} = loginSlice.actions;
export default loginSlice.reducer; 
