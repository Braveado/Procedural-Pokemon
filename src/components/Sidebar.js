import React from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo.png';
import { FaCheck, FaCopy } from "react-icons/fa";

export default function Sidebar({ sectionsCompleted }) {
    const location = useLocation();

    return (
        <div className="min-w-max h-screen sticky top-0 bg-white">
            <div className="w-48 flex justify-center items-center py-8">
                <Link to='/'>
                    <img src={logo} alt="logo" width="160px" style={{minWidth: '160px'}} />
                </Link> 
            </div>
            <div className="flex flex-col w-full justify-start items-center">
                <NavLink exact to='/'
                    className="inline-flex items-center justify-left text-lg w-full pl-8 py-2 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out"
                    activeClassName="bg-gray-300 border-gray-600">
                    <p>Home</p>
                </NavLink>
                <div className="flex flex-col items-left justify-center w-full">
                    <NavLink to='/format'
                        className="inline-flex items-center justify-left text-lg w-full pl-8 py-2 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out"
                        activeClassName="bg-gray-300 border-gray-600">
                        <p>Format</p>
                    </NavLink>
                    {location.pathname === "/format" ? <div className="flex flex-col">
                        <HashLink smooth to="/format#basics"
                            className="w-full pl-12 py-1 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out">
                            <p>Basics</p>
                        </HashLink>
                        <HashLink smooth to="/format#pokemon"
                            className="w-full pl-12 py-1 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out">
                            <p>Pokemon</p>
                        </HashLink>
                        <HashLink smooth to="/format#movesets"
                            className="w-full pl-12 py-1 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out">
                            <p>Movesets</p>
                        </HashLink>
                        <HashLink smooth to="/format#abilities"
                            className="w-full pl-12 py-1 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out">
                            <p>Abilities</p>
                        </HashLink>
                        <HashLink smooth to="/format#items"
                            className="w-full pl-12 py-1 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out">
                            <p>Items</p>
                        </HashLink>
                    </div> : null}
                </div>
                <div className="flex flex-col items-left justify-center w-full">
                    <NavLink to='/builder'
                        className="w-full text-lg pl-8 py-2 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out"
                        activeClassName="bg-gray-300 border-gray-600">
                        <p>Team Builder</p>
                    </NavLink>
                    {location.pathname === "/builder" ? <div className="flex flex-col">
                        <HashLink smooth to="/builder#controls"
                            className="w-full flex justify-between items-center pr-4 pl-12 py-1 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out">
                            <p>Controls</p>
                            {Object.values(sectionsCompleted).every(val => val) ? <FaCopy className="text-green-400 animate-enter" /> : null}
                        </HashLink>
                        <HashLink smooth to="/builder#pokemon"
                            className="w-full flex justify-between items-center pr-4 pl-12 py-1 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out">
                            <p>Pokemon</p>
                            {sectionsCompleted.pokemons ? <FaCheck className="text-green-400 animate-enter" /> : null}
                        </HashLink>
                        <HashLink smooth to="/builder#movesets"
                            className="w-full flex justify-between items-center pr-4 pl-12 py-1 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out">
                            <p>Movesets</p>
                            {sectionsCompleted.movesets && sectionsCompleted.moves ? <FaCheck className="text-green-400 animate-enter" /> : null}
                        </HashLink>
                        <HashLink smooth to="/builder#abilities"
                            className="w-full flex justify-between items-center pr-4 pl-12 py-1 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out">
                            <p>Abilities</p>
                            {sectionsCompleted.abilities ? <FaCheck className="text-green-400 animate-enter" /> : null}
                        </HashLink>
                        <HashLink smooth to="/builder#items"
                            className="w-full flex justify-between items-center pr-4 pl-12 py-1 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out">
                            <p>Items</p>
                            {sectionsCompleted.items ? <FaCheck className="text-green-400 animate-enter" /> : null}
                        </HashLink>
                    </div> : null}
                </div>                
                <NavLink to='/about'
                    className="inline-flex items-center justify-left text-lg w-full pl-8 py-2 border-r-4 border-transparent hover:bg-gray-300 transition duration-150 ease-in-out"
                    activeClassName="bg-gray-300 border-gray-600">
                    <p>About</p>
                </NavLink>
            </div>        
        </div>
    )
}
