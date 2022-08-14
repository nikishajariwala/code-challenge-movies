import React from "react";
/**  
 Accepts a heading prop. This is will be used for header functionality of
 the other components. Bootstrap will render results.
*/

const MovieListHeading = (props) => {
    return (
        <div className="col">
            <h1>{props.heading}</h1>
        </div>
    );
};

export default MovieListHeading;
