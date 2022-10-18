import React, {useEffect} from 'react'

export default function Tools() {
    // Change title.
    useEffect (() => {
        document.title = 'Tools - Procedural Pokémon';
    }, []);

    return (
        <div className="flex flex-col gap-8 justify-start items-center p-8 w-full">              
            <div id="links" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Useful Links</p>
                    <p className="text-base text-gray-300">General resources.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    <a href="https://bulbapedia.bulbagarden.net/wiki/Main_Page" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                        Bulbapedia
                    </a>
                    <a href="https://pokemondb.net/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                        Pokémon Database
                    </a>                   
                </div>                                                            
            </div>
            <div id="types" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Type Chart</p>
                    <p className="text-base text-gray-300">Pokémon type interactions.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    <img
                        className="rounded-md border-2 border-gray-200" 
                        src="https://img.pokemondb.net/images/typechart.png" alt="chart"
                    />                    
                </div>                                                            
            </div>
        </div>
    )
}
