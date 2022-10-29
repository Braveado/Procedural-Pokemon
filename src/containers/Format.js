import React, {useEffect, useState} from 'react';
import * as guide from '../constants/guide';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import Table from '../components/Table';
import * as format from '../constants/format';

export default function Format() {
    // Change title.
    useEffect (() => {
        document.title = 'Format - Procedural Pokémon';
    }, []);

    // Guides
    const [showCreate, setShowCreate] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [showPlay, setShowPlay] = useState(false);

    // Format
    const [showFilteredPokemon, setShowFilteredPokemon] = useState(false);
    const [showTopPokemon, setShowTopPokemon] = useState(false);
    const [showFilteredMoves, setShowFilteredMoves] = useState(false); 
    const [showUsabilityMoves, setShowUsabilityMoves] = useState(false); 
    const [showFilteredAbilities, setShowFilteredAbilities] = useState(false); 
    const [showUsabilityAbilities, setShowUsabilityAbilities] = useState(false); 
    const [showFilteredItems, setShowFilteredItems] = useState(false); 
    const [showUsabilityItems, setShowUsabilityItems] = useState(false); 

    return (
        <div className="flex flex-col gap-8 justify-start items-center p-8 w-full">  
            <div id="usage" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Usage</p>
                    <p className="text-base text-gray-400">How to use the format.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-2 border-gray-200 rounded-md">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-start items-center gap-4 text-center">                    
                            <p className="text-lg">Basics</p>
                            <p className="text-base text-gray-400">General points about the format.</p>
                        </div>            
                        <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">                               
                            <ul className="space-y-2">                                                          
                                <li>
                                    The format aims to generate random yet balanced pokémon teams using procedural generation.
                                    <ul className="pl-4 text-gray-600 text-sm">  
                                        <li>                                    
                                            Randomly generated numbers are used to get pokémon, moves, abilities and items across the first 8 generations of the main Pokémon games.                                    
                                        </li>
                                        <li>                                    
                                            Potential options are then put through filters to prevent unbalanced or unusable ones.
                                        </li>
                                        <li>
                                            Once all options have been generated, a complete pokémon team must be built with them to then export it.
                                        </li>                                                     
                                    </ul>
                                </li>                                
                                <li>                                    
                                    Teams can be imported to Pokémon Showdown for battles via custom games.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li>Created teams are intended for use in single battles on generation 8 custom games without the use of dynamax mechanics.                              </li>                                                        
                                    </ul>
                                </li>
                            </ul>                         
                        </div>                                                            
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-start items-center gap-4 text-center">                    
                            <p className="text-lg">Guide</p>
                            <p className="text-base text-gray-400">Steps for creating, importing and playing with a team.</p>
                        </div>            
                        <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">  
                            <div className="space-y-4">                          
                                <div >
                                    <button type="button" onClick={() => setShowCreate(!showCreate)}
                                        className={`text-center p-2 rounded-md hover:bg-gray-200 border-2 w-96 transition duration-150 ease-in-out border-gray-200
                                        ${showCreate ? 'bg-gray-200' : 'bg-white'}`}>
                                        Create team
                                    </button>
                                </div>
                                {showCreate ?
                                <ol className="list-decimal list-inside space-y-4 pl-4 border-l-2 border-dashed border-gray-400">                                
                                    <li>
                                        Generate options inside the Team Builder.
                                        <ul className="pl-4">
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.createTeam[0]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li>   
                                    <li>
                                        Select all required pokémon.
                                        <ul className="pl-4">
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md" 
                                                    src={guide.createTeam[1]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>                                    
                                    </li>    
                                    <li>
                                        Assign each selected pokémon to a moveset.
                                        <ul className="pl-4">
                                            <li className="text-gray-600 text-sm">
                                                Select all required moves for each moveset.
                                            </li>  
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.createTeam[2]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li>   
                                    <li>
                                        Assign each selected pokémon to an ability.
                                        <ul className="pl-4">
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.createTeam[3]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li>                
                                    <li>
                                        Assign each selected pokémon to an item.
                                        <ul className="pl-4">
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.createTeam[4]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li>  
                                    <li>
                                        Done! Export the team.
                                        <ul className="pl-4">                                        
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.createTeam[5]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li>                              
                                </ol> 
                                : null}   
                            </div> 
                            <div className="space-y-4">                          
                                <div >
                                    <button type="button" onClick={() => setShowImport(!showImport)}
                                        className={`text-center p-2 rounded-md hover:bg-gray-200 border-2 w-96 transition duration-150 ease-in-out border-gray-200
                                        ${showImport ? 'bg-gray-200' : 'bg-white'}`}>
                                        Import team
                                    </button>
                                </div>
                                {showImport ?
                                <ol className="list-decimal list-inside space-y-4 pl-4 border-l-2 border-dashed border-gray-400">
                                    <li>
                                        Go to Pokémon Showdown.
                                        <ul className="pl-4 text-gray-600 text-sm">
                                            <li><a href="https://play.pokemonshowdown.com/teambuilder" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                                Team builder
                                            </a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        Create a new team.
                                        <ul className="pl-4">                                        
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.importTeam[0]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li>                          
                                    <li>
                                        Import using text.
                                        <ul className="pl-4">                                        
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.importTeam[1]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li> 
                                    <li>
                                        Paste an exported team and save.
                                        <ul className="pl-4">
                                            <li className="text-gray-600 text-sm">
                                                Shortcut: Ctrl + V.
                                            </li>
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.importTeam[2]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li>                          
                                    <li>
                                        Done! Go back when ready.
                                        <ul className="pl-4">
                                            <li className="text-gray-600 text-sm">
                                                Tip: Rename the team and/or pokémon.
                                            </li>
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.importTeam[3]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li>                          
                                </ol>    
                                : null} 
                            </div>          
                            <div className="space-y-4">                               
                                <div >
                                    <button type="button" onClick={() => setShowPlay(!showPlay)}
                                        className={`text-center p-2 rounded-md hover:bg-gray-200 border-2 w-96 transition duration-150 ease-in-out border-gray-200
                                        ${showPlay ? 'bg-gray-200' : 'bg-white'}`}>
                                        Play game
                                    </button>
                                </div>
                                {showPlay ?
                                <ol className="list-decimal list-inside space-y-4 pl-4 border-l-2 border-dashed border-gray-400">
                                    <li>
                                        Go to Pokémon Showdown.
                                        <ul className="pl-4 text-gray-600 text-sm">
                                            <li><a href="https://play.pokemonshowdown.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                                Home
                                            </a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        Find a user.
                                        <ul className="pl-4">                                        
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.playTeam[0]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li>   
                                    <li>
                                        Start a challenge.
                                        <ul className="pl-4">                                        
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.playTeam[1]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li> 
                                    <li>
                                        Send the challenge.
                                        <ul className="pl-4"> 
                                            <li className="text-gray-600 text-sm">
                                                Set the format to "Custom Game" and select an imported team. 
                                            </li>                                       
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.playTeam[2]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li> 
                                    <li>
                                        Wait for the user to accept.
                                        <ul className="pl-4"> 
                                            <li className="text-gray-600 text-sm">
                                                They only need to select an imported team. 
                                            </li>                                         
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.playTeam[3]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li> 
                                    <li>
                                        Done! Choose a team order to start the battle.
                                        <ul className="pl-4">                                        
                                            <li>
                                                <img className="border-2 shadow-md border-gray-200 rounded-md"
                                                    src={guide.playTeam[4]} alt="guide_create_1" 
                                                />
                                            </li>
                                        </ul>
                                    </li>                      
                                </ol> 
                                : null} 
                            </div>                  
                        </div>                                                            
                    </div>
                </div>                                                            
            </div>
            <div id="generation" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Generation</p>
                    <p className="text-base text-gray-400">How options are generated.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-2 border-gray-200 rounded-md">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-start items-center gap-4 text-center">                    
                            <p className="text-lg">Pokémon Options</p>
                            <p className="text-base text-gray-400">Process for generating pokémon options.</p>
                        </div>            
                        <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">                            
                            <ul className="space-y-2">
                                <li>
                                    Get a random pokémon.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                            Pokédex #001-898.
                                        </a></li>                                                        
                                    </ul>
                                </li>                            
                                <li>
                                    Get a random final evolution from its available ones.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li>Longest branch if applicable on branching evolutions.</li>                                                        
                                    </ul>
                                </li>
                                <li>
                                    Get a random form from its available ones.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li>Exclude Gmax forms.</li>
                                    </ul>
                                </li>
                                <li>
                                    Check filters and reroll if filtered out.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li>Pokémon and pokémon forms outside the 360 to 720 total base stats range.</li>                        
                                        <li>Legendary and mythical pokémon below 540 total base stats.</li>
                                        <li>Pokémon forms that activate in-battle by a specific move, ability or held item.</li>
                                        <li className="space-y-2">
                                            <button type="button" onClick={() => setShowFilteredPokemon(!showFilteredPokemon)}
                                                className="text-blue-400 hover:text-blue-500 inline-flex gap-2 items-center">
                                                { showFilteredPokemon ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                                <p>{ showFilteredPokemon ? 'Hide' : 'Show' } filtered pokémon</p>
                                            </button>
                                            {showFilteredPokemon ?
                                                <ul className="px-4 border-l-2 border-gray-400 border-dashed">                                                
                                                    <li>                                                    
                                                        <Table data={format.filteredPokemon} />                                                
                                                    </li>
                                                </ul>
                                            : null}
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Check for "top pokémon" balance and reroll if needed.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li>Legendary, mythical and pokémon with at least 600 total stats.</li>
                                        <li>Exactly 1 included in options.</li>
                                        <li className="space-y-2">
                                            <button type="button" onClick={() => setShowTopPokemon(!showTopPokemon)}
                                                className="text-blue-400 hover:text-blue-500 inline-flex gap-2 items-center">
                                                { showTopPokemon ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                                <p>{ showTopPokemon ? 'Hide' : 'Show' } available top pokémon</p>
                                            </button>
                                            {showTopPokemon ?
                                                <ul className="px-4 border-l-2 border-gray-400 border-dashed">                                                
                                                    <li>                                                    
                                                        <Table data={format.topPokemon} />                                                
                                                    </li>                                                    
                                                </ul>
                                            : null}
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Roll for "shiny bonus" chance.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li>Shiny variant and increased level (+10).</li>
                                        <li>Exactly 1 included in options.</li>
                                    </ul>
                                </li>
                                <li>
                                    Roll attributes.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li>Random 252/252/4 spread for EVs.</li>
                                        <li>3 random and 3 maxed IVs.</li>
                                        <li>Random nature.</li>
                                        <li>Random gender from possible ones.</li>
                                    </ul>
                                </li>
                            </ul>                    
                        </div>                                                            
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-start items-center gap-4 text-center">                    
                            <p className="text-lg">Moveset Options</p>
                            <p className="text-base text-gray-400">Process for generating moveset options.</p>
                        </div>            
                        <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                            <ul className="space-y-2">
                                <li>
                                    Get a random move.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_moves" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                            Moves #001-826.
                                        </a></li>                                                         
                                    </ul>
                                </li>
                                <li>
                                    Check filters and reroll if filtered out.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li>Special type of moves.</li>     
                                        <li>Filtered ability or item requirement.</li>                   
                                        <li>Unusable in single battles.</li>
                                        <li>Friendship based moves.</li>
                                        <li>No effect moves.</li>  
                                        <li className="space-y-2">
                                            <button type="button" onClick={() => setShowFilteredMoves(!showFilteredMoves)}
                                                className="text-blue-400 hover:text-blue-500 inline-flex gap-2 items-center">
                                                { showFilteredMoves ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                                <p>{ showFilteredMoves ? 'Hide' : 'Show' } filtered moves</p>
                                            </button>
                                            {showFilteredMoves ?
                                                <ul className="px-4 border-l-2 border-gray-400 border-dashed">                                                
                                                    <li>                                                    
                                                        <Table data={format.filteredMoves} />                                                
                                                    </li>
                                                </ul>
                                            : null}
                                        </li>                              
                                    </ul>
                                </li>
                                <li>
                                    Check for "status limit" and reroll if needed.
                                    <ul className="pl-4 text-gray-600 text-sm">                                
                                        <li>Maximum of 3 status moves included in options.</li>
                                    </ul>
                                </li>
                                <li>
                                    Check for usability and reroll if needed.
                                    <ul className="pl-4 text-gray-600 text-sm">                                
                                        <li>Space for "combo" moves.</li>
                                        <li>Moves only usable by specific pokémon.</li>
                                        <li>Held item requirements.</li>
                                        <li>Unique cases coverage.</li>
                                        <li className="space-y-2">
                                            <button type="button" onClick={() => setShowUsabilityMoves(!showUsabilityMoves)}
                                                className="text-blue-400 hover:text-blue-500 inline-flex gap-2 items-center">
                                                { showUsabilityMoves ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                                <p>{ showUsabilityMoves ? 'Hide' : 'Show' } usability requirements for moves</p>
                                            </button>
                                            {showUsabilityMoves ?
                                                <ul className="px-4 border-l-2 border-gray-400 border-dashed">                                                
                                                    <li>                                                    
                                                        <Table data={format.usabilityMoves} />                                                
                                                    </li>
                                                </ul>
                                            : null}
                                        </li>  
                                    </ul>
                                </li>
                            </ul>                  
                        </div>                                                            
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-start items-center gap-4 text-center">                    
                            <p className="text-lg">Ability Options</p>
                            <p className="text-base text-gray-400">Process for generating ability options.</p>
                        </div>            
                        <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                            <ul className="space-y-2">
                                <li>
                                    Get a random ability.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li><a href="https://bulbapedia.bulbagarden.net/wiki/Ability#List_of_Abilities" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                            Abilities #001-267.
                                        </a></li>                                                         
                                    </ul>
                                </li>
                                <li>
                                    Check filters and reroll if filtered out.
                                    <ul className="pl-4 text-gray-600 text-sm">                      
                                        <li>No effect in custom battles.</li>      
                                        <li>Unusable in single battles.</li>
                                        <li>Unusable with opposing team information.</li>                           
                                        <li>Filtered out pokémon specific.</li>  
                                        <li className="space-y-2">
                                            <button type="button" onClick={() => setShowFilteredAbilities(!showFilteredAbilities)}
                                                className="text-blue-400 hover:text-blue-500 inline-flex gap-2 items-center">
                                                { showFilteredAbilities ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                                <p>{ showFilteredAbilities ? 'Hide' : 'Show' } filtered abilities</p>
                                            </button>
                                            {showFilteredAbilities ?
                                                <ul className="px-4 border-l-2 border-gray-400 border-dashed">                                                
                                                    <li>                                                    
                                                        <Table data={format.filteredAbilities} />                                                
                                                    </li>
                                                </ul>
                                            : null}
                                        </li>                               
                                    </ul>
                                </li>
                                <li>
                                    Check for usability and reroll if needed.
                                    <ul className="pl-4 text-gray-600 text-sm">                                
                                        <li>Pokémon or pokémon form specific.</li>
                                        <li>Move mechanic or type specific.</li>
                                        <li>Held item requirements.</li>
                                        <li className="space-y-2">
                                            <button type="button" onClick={() => setShowUsabilityAbilities(!showUsabilityAbilities)}
                                                className="text-blue-400 hover:text-blue-500 inline-flex gap-2 items-center">
                                                { showUsabilityAbilities ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                                <p>{ showUsabilityAbilities ? 'Hide' : 'Show' } usability requirements for abilities</p>
                                            </button>
                                            {showUsabilityAbilities ?
                                                <ul className="px-4 border-l-2 border-gray-400 border-dashed">                                                
                                                    <li>                                                    
                                                        <Table data={format.usabilityAbilities} />                                                
                                                    </li>
                                                </ul>
                                            : null}
                                        </li> 
                                    </ul>
                                </li>
                            </ul>                    
                        </div>                                                            
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-start items-center gap-4 text-center">                    
                            <p className="text-lg">Item Options</p>
                            <p className="text-base text-gray-400">Process for generating item options.</p>
                        </div>            
                        <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                            <ul className="space-y-2">
                                <li>
                                    Get a random item.
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        <li><a href="https://bulbapedia.bulbagarden.net/wiki/Category:In-battle_effect_items" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                                            In-battle effect items
                                        </a></li>
                                    </ul>
                                </li>
                                <li>
                                    Check filters and reroll if filtered out.
                                    <ul className="pl-4 text-gray-600 text-sm">                      
                                        <li>No effect in custom battles.</li>
                                        <li>Special type of move related.</li>                                
                                        <li>Evolution related or filtered out pokémon specific.</li>
                                        <li>Notably weaker berries.</li>
                                        <li className="space-y-2">
                                            <button type="button" onClick={() => setShowFilteredItems(!showFilteredItems)}
                                                className="text-blue-400 hover:text-blue-500 inline-flex gap-2 items-center">
                                                { showFilteredItems ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                                <p>{ showFilteredItems ? 'Hide' : 'Show' } filtered items</p>
                                            </button>
                                            {showFilteredItems ?
                                                <ul className="px-4 border-l-2 border-gray-400 border-dashed">                                                
                                                    <li>                                                    
                                                        <Table data={format.filteredItems} />                                                
                                                    </li>
                                                </ul>
                                            : null}
                                        </li>                                 
                                    </ul>
                                </li>
                                <li>
                                    Check for usability and reroll if needed.
                                    <ul className="pl-4 text-gray-600 text-sm">                                
                                        <li>Pokémon or pokémon form specific.</li>
                                        <li>Move mechanic or type specific.</li>
                                        <li>Ability mechanic specific.</li>
                                        <li className="space-y-2">
                                            <button type="button" onClick={() => setShowUsabilityItems(!showUsabilityItems)}
                                                className="text-blue-400 hover:text-blue-500 inline-flex gap-2 items-center">
                                                { showUsabilityItems ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                                <p>{ showUsabilityItems ? 'Hide' : 'Show' } usability requirements for items</p>
                                            </button>
                                            {showUsabilityItems ?
                                                <ul className="px-4 border-l-2 border-gray-400 border-dashed">                                                
                                                    <li>                                                    
                                                        <Table data={format.usabilityItems} />                                                
                                                    </li>
                                                </ul>
                                            : null}
                                        </li> 
                                    </ul>
                                </li>
                            </ul>                    
                        </div>                                                            
                    </div>
                </div>                                                            
            </div>
            
        </div>
    )
}
