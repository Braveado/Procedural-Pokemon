import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

export default function Home() {
    // Change title.
    useEffect (() => {
        document.title = 'Procedural Pokémon';
    }, []);
  
    var showdown = <a href="https://pokemonshowdown.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">Pokémon Showdown</a>
    
    return (
        <div className="flex flex-col gap-8 justify-start items-center p-8 w-full">  
            <div className="flex flex-col gap-4 items-center">
                <img src={logo} alt="logo" />                
            </div>
            <div id="" className="flex flex-col w-full">                
                <div className="flex justify-center items-center gap-4 text-center">                    
                    <p className="text-xl">Procedurally generated pokémon teams to use in &nbsp;{showdown}.</p>                                        
                </div>            
                <div className="flex flex-col justify-start items-center gap-4 p-4 w-full">
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-md bg-white border-2 border-gray-200 w-96">
                            <Link to='/builder' className="text-2xl text-blue-400 hover:text-blue-500">
                                Try it now!
                            </Link>   
                            <p className="text-center">
                                Generate random options, create a team and export it to Pokémon Showdown.
                            </p>                          
                        </div>  
                        <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-md bg-white border-2 border-gray-200 w-96">
                            <Link to='/format' className="text-2xl text-blue-400 hover:text-blue-500">
                                How does it works?
                            </Link>   
                            <p className="text-center">                                
                                Check how the options are generated and the rules behind the format.
                            </p>                          
                        </div>                                                                      
                    </div>                                                                       
                </div>
                <div className="flex flex-col gap-8 justify-start items-center p-8 w-full">              
                    <div id="links" className="flex flex-col w-full">
                        <div className="flex justify-start items-center gap-4 text-center">                    
                            <p className="text-lg">Useful Links</p>
                            <p className="text-base text-gray-300">General resources.</p>
                        </div>            
                        <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                            <a href="https://bulbapedia.bulbagarden.net/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                Bulbapedia
                            </a>
                            <a href="https://img.pokemondb.net/images/typechart.png" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                Pokémon Type Chart
                            </a>
                            <a href="https://www.pkmn.help/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                Pokémon Type Calculator
                            </a>                   
                        </div>                                                            
                    </div>                    
                </div>                                                            
            </div>
        </div>
    )
}
