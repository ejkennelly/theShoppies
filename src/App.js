import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNominee from './components/AddNominee';
import RemoveNominee from './components/RemoveNominee';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [nominees, setNominees] = useState([]);
	const [searchValue, setSearchValue] = useState('');

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

	const addNominees = (movie) => {
		const newNomineeList = [...nominees, movie];
		setNominees(newNomineeList);
		saveToLocalStorage(newNomineeList);
		if (newNomineeList.length >= 6 ) {
			alert("Please remove a nominee before adding another one");
			
		};
	};

	const removeNominees = (movie) => {
		const newNomineeList = nominees.filter(
			(nominees) => nominees.imdbID !== movie.imdbID
		);

		setNominees(newNomineeList);
		saveToLocalStorage(newNomineeList);
	};


	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='The Shoppies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieList
					movies={movies}
					handleNomineesClick={addNominees}
					nomineeComponent={AddNominee}

				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Nominees' />
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieList
					movies={nominees}
					handleNomineesClick={removeNominees}
					nomineeComponent={RemoveNominee}
				/>
			</div>
		</div>
	);
};

export default App;