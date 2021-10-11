import "./Home.css"
import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {getGames ,setPage} from "../Redux/actions/index.js";
import Card from "./Card.js"



const Home = () => {
    const dispatch = useDispatch()
    const { videogames, name, order, page} = useSelector(state=> state)
    //Me traigo lo que uso del estado
   
    
    useEffect(()=>{
       dispatch(getGames({page,name,order})) //no se como ni porque, pero funciona y deja de cargar el estado 0
    },[dispatch])
    //Para cambiar de pagina
    const changePage = (page)=>{
        dispatch(getGames({page,name,order}))
        dispatch(setPage(page))
    }
    
    return (
        <div>
            <div className="cards">
            {
                videogames?.result?.length>0 && videogames.result.map((e)=>{
                   return <Card genre={e.genres.map(g=>g.name+" - ")} image={e.background_image} name={e.name} id={e.id} key={e.id}/>
                })
            }
            
            </div>
            <div className="paginas">
                <button className="botonesP" disabled={page -1 === 0} onClick={()=> {changePage(page -1)}}>previous</button>
                    <label className="numeroP">{page}</label>
                <button className="botonesP" disabled={videogames?.count <= (page * 5)} onClick={()=>{changePage(page +1)}}>next</button>

            </div>
        </div>
    )
}

export default Home
