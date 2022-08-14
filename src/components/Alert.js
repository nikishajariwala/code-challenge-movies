import React from "react";
/**
 Notification banner
 */
const Alert = () => {
    return (
        <div
            className="col col-sm-4 smalert alert-success font "
            style={{ color: "black" }}
            id="alert"
            role="alert"
        >
            <strong>You have nominated 5 movies! You cannot nominate more...</strong>
        </div>
    );
};

export default Alert;
