export const getMoviesStart = () => ({
  type: 'GET_MOVIE_START',
});

export const getMoviesSuccess = movies => ({
  type: 'GET_MOVIE_SUCCESS',
  payload: movies,
});

export const getMovieFail = () => ({
  type: 'GET_MOVIE_FAIL',
});

export const deleteMovieStart = () => ({
  type: 'DELETE_MOVIE_START',
});

export const deleteMoviesSuccess = id => ({
  type: 'DELETE_MOVIE_SUCCESS',
  payload: id,
});

export const deleteMovieFail = () => ({
  type: 'DELETE_MOVIE_FAIL',
});
