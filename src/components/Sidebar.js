import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo.png';

export default function Sidebar() {
    return (
        <div className="min-w-max h-screen sticky top-0 bg-white">
            <div className="w-48 flex justify-center items-center py-8">
                <Link to='/'>
                    <img src={logo} alt="logo" width="160px" style={{minWidth: '160px'}} />
                </Link> 
            </div>
            <div className="flex flex-col w-full justify-start items-center">
                <NavLink exact to='/'
                    className="inline-flex items-center justify-center text-lg w-full py-2 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out"
                    activeClassName="bg-gray-300 border-gray-600">
                    <p>Home</p>
                </NavLink>
                <NavLink to='/builder'
                    className="inline-flex items-center justify-center text-lg w-full py-2 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out"
                    activeClassName="bg-gray-300 border-gray-600">
                    <p>Team Builder</p>
                </NavLink>
                <NavLink to='/about'
                    className="inline-flex items-center justify-center text-lg w-full py-2 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out"
                    activeClassName="bg-gray-300 border-gray-600">
                    <p>About</p>
                </NavLink>

            </div>
            
            <HashLink smooth to="/builder#controls">Controls</HashLink>
            <HashLink smooth to="/builder#pokemons">Pokemons</HashLink>
            <HashLink smooth to="/builder#movesets">Movesets</HashLink>
            <HashLink smooth to="/builder#abilities">Abilities</HashLink>
            <HashLink smooth to="/builder#items">Items</HashLink>
        </div>
    )
}
