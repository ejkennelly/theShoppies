import React from "react";

const MovieList = (props) => {
    const NomineeComponent = props.nomineeComponent;
    

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className="image-container d-flex justify-content-start m-3">
                    <figure>
                    <img src={movie.Poster} alt="movie"></img>
                    <figcaption>{movie.Title}
                    <br></br>
                    {movie.Year}
                    </figcaption>
                    </figure>
                    <div
                        onClick={() => props.handleNomineesClick(movie)}
                        className="overlay d-flex align-items-center justify-content-center"
                    >
                        <NomineeComponent />
                    
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;