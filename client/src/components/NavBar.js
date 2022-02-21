import "./NavBar.css"
import React from "react"
import { NavLink } from "react-router-dom"
import Search from "./Search"
import Order from "./Order"
import Filters from "./Filters"
import { useSelector, useDispatch } from "react-redux";
import {getGames ,setPage} from "../Redux/actions/index.js";

const NavBar = () => {

    const dispatch = useDispatch()
    const { videogames, name, order, page} = useSelector(state=> state)
    //Me traigo lo que uso del estado
   
    
    //Para cambiar de pagina
    function handleClick(e){
        e.preventDefault();
        dispatch(getGames({page:1, name:"", order:""}))
        dispatch(setPage(1))
    }

    return (
        <div className="nav">
                  
            <div className="refresh">
                <button className="refreshB" onClick={e=>{handleClick(e)}}>Home</button>
            </div>
            <Search />
            <Order />
            <Filters />
            <NavLink to="/home/create">
                Create New Game
            </NavLink>

        </div>
    )
}

export default NavBar
