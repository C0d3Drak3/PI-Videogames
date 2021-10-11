import "./LandingPage.css"
import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./pngaaa.png"

const LandingPage = () => {
    return (
        <div className="landing">
            <NavLink to="/home" > <img className="logo" src={Logo} alt="to home"/> </NavLink>
        </div>
    )
}

export default LandingPage;
