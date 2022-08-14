import React, { useState, useEffect } from "react"; //using both state and effect hook

/*
Aplication CSS styling
Bootstrap/custom CSS
*/
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/*
Components 
Import first.
 */
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddNomination from "./components/AddNomination";
import RemoveNomination from "./components/RemoveNomination";
import Alert from "./components/Alert";

/*
Import from config.
-URL key. Postman-Initialixation value
 */
//const { POSTMANURL } = require("./config.js");

const App = () => {
  /*
  State variables
  movies- List 
  searchValue-Stores the value from search bar.
  */
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  /*Function makes a request a connection to api */
  const getMovieRequest = async (searchValue) => {
    //cannot access HTTP content from a HTTPS Page
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=e726b676`;
    const response = await fetch(url); //fetch api is used to make a request
    const responseJson = await response.json(); // turn the request into json data

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  /*
  Hook Function takes user input and calls getMovieRequest function
  User input is stored then stored value makes a call to API.
  UseEffect is being used to ensure api call only happens when app
  loads for the first time.
  No need to change jsx because movie state value has been passed to the MovieList as
  props.
  */
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  /*
  String type needs to be extracted, loaded, and transformed into a object 
  */
  useEffect(() => {
    const movieNominations = JSON.parse(
      localStorage.getItem("react-movie-app-Nominations")
    );
    if (movieNominations) {
      setNominations(movieNominations);
    }
  }, []);

  /*
  Save resultsToLocalStorage 
  */
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-Nominations", JSON.stringify(items));
  };

  const addNominatedMovie = (movie) => {
    const newNominatedList = [...nominations, movie];
    if (!nominations.includes(movie)) {
      setNominations(newNominatedList);
      saveToLocalStorage(newNominatedList);
    }
  };

  /*
  Remove from nomination list
  */
  const removeNominatedMovie = (movie) => {
    const newNominatedList = nominations.filter(
      (nominations) => nominations.imdbID !== movie.imdbID
    );
    setNominations(newNominatedList);
    saveToLocalStorage(newNominatedList);
  };

  /*
   Banner displayed after five nominations have been made
   */
  useEffect(() => {
    if (nominations.length === 5) {
      document.getElementById("alert").style.setProperty("display", "flex");
    } else if (nominations.length < 5) {
      document.getElementById("alert").style.setProperty("display", "none");
    }
  }, [nominations]);

  /**
   Render APP
   */
  return (
    <div className="container movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Nominate upto 5 Movies for Awards" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleNominationClick={addNominatedMovie}
          nominationComponent={AddNomination}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Your Nomination List" />
        <Alert />
      </div>
      <div className="row">
        <MovieList
          movies={nominations}
          handleNominationClick={removeNominatedMovie}
          nominationComponent={RemoveNomination}
        />
      </div>
    </div>
  );
};

export default App;


/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
