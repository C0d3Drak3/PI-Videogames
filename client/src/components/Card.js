import "./Card.css"
import React from "react"
import { Link } from "react-router-dom";

const Card = ({image, name,id,genre}) => {
    return (
        <Link to ={`/videogame/${id}`}>
            <div className="card">
                <img className="image" src={image} alt={name}/>
                <div className="info">
                    <h1 className="name" >{name}</h1>
                    <p className="genre" >- {genre}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card;
