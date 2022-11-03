import React, {useEffect} from 'react'

export default function Tools() {
    // Change title.
    useEffect (() => {
        document.title = 'About - Procedural Pokémon';
    }, []);

    var showdown = <a href="https://pokemonshowdown.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">Pokémon Showdown</a>
    var api = <a href="https://pokeapi.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">PokéAPI</a>
    var repo = <a href="https://github.com/Braveado/React-Procedural-Pokemon" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">GitHub repository</a>
    var issues = <a href="https://github.com/Braveado/React-Procedural-Pokemon/issues/new" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">create an issue</a>
    var discussions = <a href="https://github.com/Braveado/Procedural-Pokemon/discussions/new" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">open a discussion</a>

    return (
        <div className="flex flex-col gap-8 justify-start items-center p-8 w-full">              
            <div className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">About</p>
                    <p className="text-base text-gray-400">Where does this come from?</p>
                </div>            
                    <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    <p>
                        So... I like games about decisions, opportunity cost, and variables.
                        Pokémon should be a natural fit, but I find the mainline games too easy to keep me engaged.
                        I found out the Nuzlocke challenge long ago, but it was until the randomness factor was added with the Randomlocke challenge that It caught my attention.
                        I watched people doing them first to see if I wanted to try something like that, but since the things I liked most was the team drafting and random battles, I decided to instead search for a way of doing just that.
                    </p>
                    <p>
                        Enter {showdown} with their random battle formats.
                        I tried them out and at first it was a good fix for what I wanted, but the more games I played the more I started to see limitations in their random team generation that left me wanting more.
                        You also don't get to draft your team in those formats, so the other big thing I was looking for wasn't there.
                    </p>
                    <p>
                        I kept looking and found {api}.
                        I immediately began thinking about the possibilities and made a bare bones web app that only gave you 9 random pokémon upon loading...
                        Evidently, I kept going.
                    </p>                
                </div>                                                            
            </div> 
            <div className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Development</p>
                    <p className="text-base text-gray-400">Maintenance and improvements.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    <ul className="">                        
                        <li>
                            Reach out.
                            <ul className="pl-4 text-gray-600 text-sm">                                                                
                                <li>You can {discussions} for questions, ideas, recommendations, etc.</li>                                
                            </ul>
                        </li>
                        <li>
                            Having problems?
                            <ul className="pl-4 text-gray-600 text-sm">                                                                
                                <li>Feel free to {issues} if you find a bug.</li>                                
                            </ul>
                        </li>                        
                        <li>
                            Want to help?
                            <ul className="pl-4 text-gray-600 text-sm">                                                                
                                <li>All contributions to the {repo} are welcomed.</li>
                                <li>Check open issues for a place to start.</li>
                            </ul>
                        </li>                                                                                                             
                    </ul>
                </div>                                                            
            </div>                       
        </div>
    )
}
