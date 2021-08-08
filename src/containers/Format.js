import React, {useEffect} from 'react'

export default function Format() {
    // Change title.
    useEffect (() => {
        document.title = 'Format - Procedural Pokemon';
    }, []);

    return (
        <div className="flex flex-col gap-8 justify-start items-center p-8 w-full">  
            <div id="basics" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Basics</p>
                    <p className="text-base text-gray-300">General points about the format.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    This format facilitates making random pokemon teams using procedural generation for battles via custom games in Pokémon Showdown.<br />
                    Randomly generated numbers are used to get pokemon, moves, abilities and items options across all 8 generations of the main Pokémon games, these are then put through filters to prevent unusable options.<br />
                    Once all options have been generated, a complete pokemon team must be built with them to then export it.
                </div>                                                            
            </div>
            <div id="pokemon" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Pokemon Options</p>
                    <p className="text-base text-gray-300">Process for generating pokemon options.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    When generating pokemon options, the steps to generate each one are the following:
                    <ul className="pl-4">
                        <li>Get a random pokemon.</li>
                        <li>Get a random final evolution from its available ones.</li>
                        <li>Get a random form from its available ones.</li>
                        <li>Check filters and reroll if filtered out.</li>
                    </ul>
                    The filtered out pokemon options are the following:
                    <ul className="pl-4">
                        <li>Legendary pokemon forms above 720 total stats.</li>
                        <li>Pokemon forms as strong as legendaries.</li>
                        <li>Pokemon and pokemon forms below 360 total stats.</li>
                    </ul>
                </div>                                                            
            </div>
            <div id="movesets" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Moveset Options</p>
                    <p className="text-base text-gray-300">Process for generating moveset options.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    text.                    
                </div>                                                            
            </div>
            <div id="abilities" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Ability Options</p>
                    <p className="text-base text-gray-300">Process for generating ability options.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    text.                    
                </div>                                                            
            </div>
            <div id="items" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Item Options</p>
                    <p className="text-base text-gray-300">Process for generating item options.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    text.                    
                </div>                                                            
            </div>
        </div>
    )
}
