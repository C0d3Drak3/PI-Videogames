import "./Form.css"
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getGenres,createVideogame } from '../Redux/actions/index.js'
import { useHistory } from "react-router"

export default function Form() {
    const history= useHistory()
    const dispatch = useDispatch()
    const {genres} = useSelector(state => state)
    const [formulario,setFormulario] = useState({
        name:"", 
        description:"",
        released:"", 
        rating:"", 
        platforms:[], 
        genre:[]
    })
    useEffect(()=>{
        dispatch(getGenres())
    },[dispatch])

    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(createVideogame(formulario))
        setFormulario({
            name:"", 
            description:"",
            released:"", 
            rating:"", 
            platforms:[], 
            genre:[]
        })
        history.push("/home")
    }

    const handleOnChange = (e)=>{
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    /* const handleGenresAndPlat = (e) => {

        if (e.target.name === 'genres') {
            setFormulario({
                ...formulario,
                genre: [...formulario.genre, e.target.value],
            });
        } else if (e.target.name === 'platforms') {
            setFormulario({
                ...formulario,
                platforms: [...formulario.platforms, e.target.value],
            });
        } else {
            setFormulario({
                ...formulario,
                [e.target.name]: e.target.value
            });
        }
    }; */
    const handleGenres = (g)=>{
        if(formulario.genre.includes(g.target.value)){
           let tempGen = formulario.genre.filter(vg => vg !== g.target.value)
            setFormulario({
                ...formulario,
               genre: tempGen
            })
        }else{
            setFormulario({
                ...formulario,
                genre: [...formulario.genre, g.target.value]
            })
        }
    }
    const handlePlatforms = (p)=>{
        if(formulario.platforms.includes(p.target.value)){
           let temPlat = formulario.platforms.filter(vg => vg !== p.target.value)
            setFormulario({
                ...formulario,
               platforms: temPlat
            })
        }else{
            setFormulario({
                ...formulario,
                platforms: [...formulario.platforms, p.target.value]
            })
        }
    }

    const goToBack = ()=>{
        history.goBack()
    }
    
    const platformsList = [
        { name: "PC" },
        { name: "PlayStation 1" },
        { name: "PlayStation 2" },
        { name: "PlayStation 3" },
        { name: "PlayStation 4" },
        { name: "PlayStation 5" },
        { name: "XBox" },
        { name: "XBox 360" },
        { name: "XBox One" },
        { name: "XBox Series X" },
        { name: "Wii" },
        { name: "Wii U" },
        { name: "Nintendo Swich" },
        { name: "Web" },
        { name: "Sega" },
        { name: "iOS" },
    ]


    return (
        <div className="creation">
            <div className="form">
                <form className="form1" onSubmit={onSubmit}>
                    <div className="newName">
                        <label >Name </label>
                        <input value={formulario.name} placeholder="Name..." onChange={handleOnChange} name="name" type="text" required />
                    </div>

                    <div className="newDesc">
                        <label >Description </label>
                        <input value={formulario.description} placeholder="Description..." onChange={handleOnChange} name="description" type="text" required/>                  
                    </div>

                    <div className="newLaunch">         
                        <label >Launched </label>
                        <input value={formulario.released} placeholder="2000-12-30" onChange={handleOnChange} name="released" type="text" required />
                    </div>

                    <div className="newRating">
                        <label >Rating ⭐ </label>
                        <input value={formulario.rating} placeholder="0.00 to 5.00" onChange={handleOnChange} name="rating" type="text" />
                    </div>

                    <div className="newPlatforms">
                        <label >Platforms 🎮 </label>
                        <select name='platforms' onChange={handlePlatforms} required >
                            {platformsList.map((p, i) => {return <option key={i} value={p.name}>{p.name}</option>})}
                        </select>
                        {formulario?.platforms.length > 0 && formulario.platforms.map(e =>(
                            <label>🕹{e}</label>
                        ))}
                    </div>

                    <div className="newGenre">
                        <label >Genre </label>
                        <select name='genres' onChange={handleGenres}  required >
                            <optgroup label="Genres"/>
                            {genres.map((g) => { return <option key={g.id} value={g.id}>{g.name}</option>})}
                        </select>
                        
                        {formulario?.genre.length > 0 && formulario.genre.map(e =>(
                            <label>-{e}</label>
                        ))}
                        
                    </div>
                    
                    
                    <button className="newButton" type='submit' disabled={formulario.genre.length === 0}>
                        <span>ADD GAME</span>
                    </button>
                </form>
            </div>
            <div>
                <button className="backButton" onClick={goToBack}>Go Back</button>
            </div>
        </div>

    )
}


