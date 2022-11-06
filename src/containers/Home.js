import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import updates from '../constants/updates';
import Update from '../components/Update';

export default function Home() {
    // Change title.
    useEffect (() => {
        document.title = 'Procedural Pokémon';
    }, []);
  
    var showdown = <a href="https://pokemonshowdown.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">Pokémon Showdown</a>
       
    return (
        <div className="flex flex-col gap-8 justify-start items-center p-8 w-full">  
            <div className="flex flex-col items-center">
                <img src={logo} alt="logo" />                
            </div>             
            <div className="flex justify-center items-center text-center">                    
                <p className="text-xl">Procedurally generated pokémon teams to use in {showdown}.</p>                                        
            </div>            
            <div className="flex justify-center items-start w-full">
                <div className="flex flex-wrap justify-center items-center gap-8">
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
                            Check how to use the format and the the rules behind the generation process.
                        </p>                          
                    </div>                                                                      
                </div>                                                                       
            </div>
            <div className="flex flex-col gap-8 justify-start items-center w-full">              
                <div id="links" className="flex flex-col w-full">
                    <div className="flex justify-start items-center gap-4 text-center">                    
                        <p className="text-lg">Useful Links</p>
                        <p className="text-base text-gray-400">General resources.</p>
                    </div>            
                    <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                        <ul className="space-y-2">
                            <li>
                                <a href="https://bulbapedia.bulbagarden.net/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                    Bulbapedia
                                </a>
                            </li>
                            <li>
                                <a href="https://img.pokemondb.net/images/typechart.png" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                    Pokémon Type Chart
                                </a>
                            </li>
                            <li>
                                <a href="https://www.pkmn.help/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                    Pokémon Type Calculator
                                </a> 
                            </li>
                            <li>
                                <a href="https://pokepast.es/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                    PokePaste
                                </a>
                            </li>
                        </ul>             
                    </div>                                                            
                </div>  
                <div id="updates" className="flex flex-col w-full">
                    <div className="flex justify-start items-center gap-4 text-center">                    
                        <p className="text-lg">Patch Notes</p>
                        <p className="text-base text-gray-400">History of changes.</p>
                    </div>            
                    <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                        <ul className="space-y-2">                            
                            {updates.map((u, i) => {
                                return (
                                    <li key={i}>
                                        <Update update={u} showDefault={i === 0 ? true : false} />
                                    </li>
                                )
                            })}
                        </ul>                
                    </div>                                                            
                </div>                  
            </div>
        </div>
    )
}
