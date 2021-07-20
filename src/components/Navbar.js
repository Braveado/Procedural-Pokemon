import React from 'react';
import {    
    NavLink,
    useRouteMatch
  } from "react-router-dom";
import logo from '../assets/logo.png';

function Navbar() {
    let { path, url } = useRouteMatch();

    return (
        <div className="flex justify-between items-center w-full h-16 px-32 bg-white" >
            <img src={logo} alt="logo" width="150px" />
            <div className="flex h-full">
                <NavLink exact to='/'
                    className="inline-flex items-center justify-center h-full w-24 px-4 border-b-4 border-transparent hover:bg-gray-300"
                    activeClassName="bg-gray-300 border-gray-600">
                    <p>Home</p>
                </NavLink>
                <NavLink to='/generator' 
                    className="inline-flex items-center justify-center h-full w-24 px-4 border-b-4 border-transparent hover:bg-gray-300"
                    activeClassName="bg-gray-300 border-gray-600">
                    <p>Generator</p>
                </NavLink>
                <NavLink to='/about'
                    className="inline-flex items-center justify-center h-full w-24 px-4 border-b-4 border-transparent hover:bg-gray-300"
                    activeClassName="bg-gray-300 border-gray-600">
                    <p>About</p>
                </NavLink>                
            </div>
        </div>
    )
}

export default Navbar
