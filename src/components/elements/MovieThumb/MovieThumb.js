import React from 'react';
import { Link } from "react-router-dom";
import './MovieThumb.css';

const MovieThumb = (props) => {

    return(
        <div className="rmdb-moviethumb">
            {props.clickable ?
                <Link exact to={{
                                    pathname : `/${props.movieId}`,
                                    movieName : `${props.movieName}`
                                }}
                >
                    <img src={props.image} alt="movie-thumb"/>
                    <div className="rmdb-moviethumb-middle">
                        <div className="rmdb-moviethumb-middle-text">{props.movieName}</div>
                    </div>
                </Link>
            :
                <>
                    <img src={props.image} alt="movie-thumb"/>
                    <div className="rmdb-moviethumb-middle">
                        <div className="rmdb-moviethumb-middle-text">{props.movieName}</div>
                    </div>
                </>
            }
        </div>
    )
};

export default MovieThumb;