import React from 'react';
import {  
    Link,  
    NavLink
  } from "react-router-dom";
import logo from '../assets/logo.png';

function Navbar() {
    return (
        <div className="flex flex-wrap justify-between items-center h-16 w-full xs:px-0 sm:px-8 md:px-16 lg:px-32 bg-white transition duration-150 ease-in-out" >
            <Link to='/'
                className="inline-flex items-center justify-center h-full px-4">
                <img src={logo} alt="logo" width="150px" style={{minWidth: '150px'}} />
            </Link>            
            <div className="flex h-full">
                <NavLink exact to='/'
                    className="inline-flex items-center justify-center h-full w-24 px-4 border-b-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out"
                    activeClassName="bg-gray-300 border-gray-600">
                    <p>Home</p>
                </NavLink>
                <NavLink to='/builder' 
                    className="inline-flex items-center justify-center h-full w-32 px-4 border-b-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out"
                    activeClassName="bg-gray-300 border-gray-600">
                    <p>Team Builder</p>
                </NavLink>
                <NavLink to='/about'
                    className="inline-flex items-center justify-center h-full w-24 px-4 border-b-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out"
                    activeClassName="bg-gray-300 border-gray-600">
                    <p>About</p>
                </NavLink>                
            </div>
        </div>
    )
}

export default Navbar
