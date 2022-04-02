import { createContext, useReducer } from 'react';
import {
  deleteMovieFail,
  deleteMovieStart,
  getMovieFail,
  getMoviesStart,
  getMoviesSuccess,
} from './MovieActions';
import { movieReducer } from './MovieReducer';
import axios from 'axios';

const initialState = {
  movies: [],
  err: false,
  isFetching: false,
};
export const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  const getMovies = async () => {
    dispatch(getMoviesStart());
    try {
      const res = await axios.get('/movies', {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      });
      dispatch({ type: 'GET_MOVIES_SUCCESS', payload: res.data });
      //   console.log(state.movies);
    } catch (err) {
      dispatch(getMovieFail());
    }
  };

  const deleteMovie = async id => {
    dispatch(deleteMovieStart());
    try {
      await axios.delete('/movies/' + id, {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      });
      dispatch({ type: 'DELETE_MOVIES_SUCCESS', payload: id });
    } catch (err) {
      dispatch(deleteMovieFail());
    }
    console.log(state.movies);
  };

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        err: state.err,
        getMovies,
        deleteMovie,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
export default MovieContextProvider;
