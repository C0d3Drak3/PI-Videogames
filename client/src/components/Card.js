import "./Card.css"
import React from "react"
import { NavLink } from "react-router-dom";

const Card = ({image, name,id,genre}) => {
    return (
        <div className="card">
            <img className="image" src={image} alt={name}/>
            <div className="info">
                <NavLink className="name" to={`/videogame/${id}`}>{name}</NavLink>
                <p className="genre" >- {genre}</p>
            </div>
        </div>
    )
}

export default Card;
