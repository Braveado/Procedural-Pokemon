import React from 'react';
import logo from '../assets/logo.png';

function Navbar() {
    return (
        <div className="flex justify-between items-center w-full h-16 px-32 bg-white" >
            <img src={logo} alt="logo" width="150px" />
            <div className="flex h-full">
                <button type="button" className="px-4 hover:bg-gray-300">
                    Home
                </button>
                <button type="button" className="px-4 bg-gray-300">
                    Generator
                </button>
                <button type="button" className="px-4 hover:bg-gray-300">
                    About
                </button>
            </div>
        </div>
    )
}

export default Navbar
