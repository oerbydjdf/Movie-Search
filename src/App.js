import './App.css';
import Header from './UI/Header/Header';
import Search from './UI/Search/Search';
import ListFilms from './UI/ListFilms/ListFilms';
import { useEffect, useReducer } from 'react';
import Preloader from './UI/Preloader/Preloader';
import Error from './UI/Error/Error';


let initialState = {
  movies: [],
  loading: true,
  error: '',
  searchable: '',
  urlApi: "https://www.omdbapi.com/?apikey=4a3b711b&s=man&",
  yearRelize: '',
  totalMovies: 0, 
};

let reducer = (state, action) => {
  switch(action.type) {
    case 'MOVIE_SEARCH_COMPLETED':
      return {
        ...state,
        movies: action.arrFilvs,
        loading: false,
        searchable: action.desiredMovie,
        yearRelize: action.year,
        error: '',
        totalMovies: action.totalResults,
      };
    case 'MOVIE_SEARCH_FUL_COMPLETED':
      return {
      ...state,
      movies: (state.searchable === action.desiredMovie)?
      [...state.movies, ...action.arrFilvs]: action.arrFilvs,
      loading: false,
      searchable: action.desiredMovie,
      error: '',
      
      };
    case 'MOVIE_SEARCH':
      return {
        ...state,
        loading: true,
      };
    case 'MOVIE_ERROR':      
      return {
        ...state,
        movies: action.arrFilvs,
        error: action.textError,
      };
      default: return state;
  }
};

let appFilm = async (urlApi) => {
  let response = await fetch(urlApi);
  if(response.ok) return response.json();
  if(!response.ok) return false;
}; 



function App() {
  let [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    (async () => {
      let movies = await appFilm(initialState.urlApi);
      dispatch({
        type: 'MOVIE_SEARCH_COMPLETED',
        arrFilvs: movies.Search,
      });
      if (!movies) dispatch({
        type: 'MOVIE_ERROR',
        textError: 'Error',
        arrFilvs: []
      });
    })();
  }, []);

  let apiSearch = (film, page = 1, year, TYPE) => {
    (async () => {
      dispatch({
        type: 'MOVIE_SEARCH'
      });
      let movies = await appFilm(`https://www.omdbapi.com/?apikey=4a3b711b&s=${film}&page=${page}&y=${year}`);
      if (movies.Response === "True") dispatch({
        type: TYPE,
        arrFilvs: movies.Search,
        desiredMovie: film,
        year,
        totalResults: movies.totalResults
      });
      if (movies.Response === "False") dispatch({
        type: 'MOVIE_ERROR',
        textError: movies.Error,
        arrFilvs: []
      });
      if (!movies) dispatch({
        type: 'MOVIE_ERROR',
        textError: 'Error',
        arrFilvs: []
      });
    })();
  };


  let getSearchFilms = (film, page = 1, year) => {
    let TYPE = 'MOVIE_SEARCH_COMPLETED';
    apiSearch(film, page, year, TYPE);
  };

  let getAddFilms = (film, page = 1, year) => {
    let TYPE = 'MOVIE_SEARCH_FUL_COMPLETED';
    apiSearch(film, page, year, TYPE);
  };  

  return (
    <div className="App">
      <Header/>
      <Search state={state} searchMov={getSearchFilms}/>
      <Error text={state.error}/>
      <h2>Найденые фильмы</h2>
      <Preloader preload={state.loading}/>
      <ListFilms state={state} addPage={getAddFilms}/>
    </div>
  );
}

export default App;
