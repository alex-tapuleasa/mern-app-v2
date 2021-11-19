import React from "react";


function Restaurant (props) {
   
    const {id, title, location } = props;
    return(
        <div>
            <h1>{title}</h1>
            <h2>{location}</h2>
            <h2>{id}</h2>
        </div>
        )
}

export default Restaurant;