/*
MovieList component to display movie data that comes back in the ssearch request
*/

import React from "react";

//Pass in a list of movies as props
const MovieList = (props) => {
    const NominationComponent = props.nominationComponent;
    return (
        <>
            {/*
    Loop over the list using the map function. Each movie will display
    an image, title, year, nominate, remove nominate and icon using the Poster URL as 
    data source.
    */}
            {props.movies.map((movie, index) => (
                <div className="image-container d-inline-flex justify-content-start ">
                    <img
                        className="img-fluid rounded"
                        src={movie.Poster}
                        alt="movie"
                    ></img>
                    <div className="overlay d-inline-flex align-items-center justify-content-center">
                        <div onClick={() => props.handleNominationClick(movie)}>
                            <div className="row d-inline-flex ">
                                <br />
                                {movie.Title}&nbsp;
                                ({movie.Year})
                                <br />
                                <NominationComponent />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
//
export default MovieList;
