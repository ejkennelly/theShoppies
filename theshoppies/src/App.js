import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddNominee from "./components/AddNominee";
import RemoveNominee from "./components/RemoveNominee";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=trilogy`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieNominees = JSON.parse(
      localStorage.getItem("the-shoppies-nominees")
    );

    if (movieNominees) {
      setNominees(movieNominees);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("the-shoppies-nominees", JSON.stringify(items));
  };

  const addNominee = (movie) => {
    const newNomineeList = [...nominees, movie];
    setNominees(newNomineeList);
    saveToLocalStorage(newNomineeList);
  };

  const removeNominee = (movie) => {
    const newNomineeList = nominees.filter(
      (nominee) => nominee.imdbID !== movie.imdbID
    );

    setNominees(newNomineeList);
    saveToLocalStorage(newNomineeList)
  };

  return (
    <div className="container-fluid movie-app">
      <div  className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading= "Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleNomineesClick={addNominee}
          nomineeComponent={RemoveNominee}
          />
      </div>
    </div>
  );
};

export default App;
