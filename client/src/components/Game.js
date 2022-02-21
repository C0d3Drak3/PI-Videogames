import "./Game.css"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getGame, removeGame } from '../Redux/actions/index.js'


function Game(props) {
    
    const { id } = props.match.params
    const { videogame } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch(getGame(id))
        return()=>{
            dispatch(removeGame())
        }
    },[dispatch,id])

    const goToBack = ()=>{
        history.goBack()
    }

    return (
        <div className="allInfo">
            {
                
                videogame?.name ? 
                <div className="gameInfo">
                    <img className="gameImage" src={videogame.background_image} alt="Imagen no encontrada" />
                    <div className="info">
                        <p className="infoTitle">{videogame.name}</p>
                        <p className="infoDescription">{videogame.description}</p>
                        <p>Genre: {videogame.genres.map(e=>e+" - ")}</p>
                        <p>Release Date: {videogame.released}</p>
                        <p>Rating: {videogame.rating}</p>
                        <p>Platforms: {videogame.platforms.map(e=>e + " - ")}</p>

                    </div>
                </div>
                :
                <div>Cargando Juego...</div>
            }
            
            <button className="backButton" onClick={goToBack}>Go Back</button>
            
        </div>
    )
}

export default Game
