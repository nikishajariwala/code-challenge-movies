import React from "react";

/** 
 Users input will be rendered here.
 A value from props is taken from user search value.
 The function call updates the value.
*/
const SearchBox = (props) => {
    return (
        <div className="col col-sm-4">
            <input
                className="form-control"
                value={props.value}
                onChange={(event) => props.setSearchValue(event.target.value)}
                placeholder="Type to search..."
            ></input>
        </div>
    );
};

export default SearchBox;
