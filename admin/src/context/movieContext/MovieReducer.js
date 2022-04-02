export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'GET_MOVIES_START':
      return {
        isFetching: true,
        movies: [],
        err: null,
      };
    case 'GET_MOVIES_SUCCESS':
      return {
        isFetching: false,
        movies: action.payload,
        err: null,
      };
    case 'GET_MOVIES_FAIL':
      return {
        isFetching: false,
        movies: [],
        err: true,
      };
    case 'DELETE_MOVIES_START':
      return {
        isFetching: true,
        ...state,
        err: null,
      };
    case 'DELETE_MOVIES_SUCCESS':
      return {
        isFetching: false,
        movies: state.movies.filter(movie => movie._id !== action.payload),
        err: null,
      };
    case 'DELETE_MOVIES_FAIL':
      return {
        isFetching: false,
        ...state,
        err: true,
      };
    default:
      return state;
  }
};
