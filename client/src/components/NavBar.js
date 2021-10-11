import "./NavBar.css"
import React from "react"
import { NavLink } from "react-router-dom"
import Search from "./Search"
import Order from "./Order"
import Filters from "./Filters"

const NavBar = () => {
    return (
        <div className="nav">

            <NavLink to="/home" name="" order="">
                Home
            </NavLink>
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
