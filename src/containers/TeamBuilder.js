import React, {useEffect} from 'react';
import PokemonOptions from '../components/pokemon/PokemonOptions';
import MovesetOptions from '../components/moves/MovesetOptions';
import AbilityOptions from '../components/abilities/AbilityOptions';
import ItemOptions from '../components/items/ItemOptions';
import { TeamBuilderContext } from '../context/TeamBuilderContext';
import { BiLoaderAlt } from 'react-icons/bi';
import { FaEraser, FaCopy } from 'react-icons/fa';
import {GoPencil} from 'react-icons/go';
import { FiExternalLink } from 'react-icons/fi';

export default function TeamBuilder({
    loading, randomOptions, pokemonOptions, movesetOptions, abilityOptions, itemOptions, generating,
    generateOptions, clearChoices, exportTeam
    }) {   
    const context = React.useContext(TeamBuilderContext);

    // Change title.
    useEffect (() => {
        document.title = 'Team Builder - Procedural Pokémon';
    }, []);

    const getControls = () => {
        if(loading || generating){
            return (                
                <p className="flex gap-4 items-center justify-center text-lg p-4 border-2 border-transparent">
                    <BiLoaderAlt className="animate-spin text-2xl" />
                    {loading ? 'Fetching data from PokeAPI' : (generating ? generationProgress() : 'Generate Options')}
                </p>                
            )
        }
        else {
            return (
                <>
                    <button type="button" onClick={() => clearChoices()}
                        className={`flex gap-2 items-center justify-center p-4 rounded-md hover:bg-gray-200 border-2 w-48 transition duration-150 ease-in-out
                        ${Object.values(context.selectionsMade).find(val => val > 0) ? 'bg-red-100 border-red-200 ring ring-red-100' : 'bg-white  border-gray-200 '}`}>
                        <FaEraser /> Clear Choices
                    </button>
                    <button type="button" onClick={() => generateOptions()}
                        className={`flex gap-2 items-center justify-center p-4 rounded-md hover:bg-gray-200 border-2 w-48 transition duration-150 ease-in-out
                        ${pokemonOptions.length > 0 ? 'bg-yellow-100 border-yellow-200 ring ring-yellow-100' : 'bg-white  border-gray-200 '}`}>
                        <GoPencil /> Generate Options
                    </button>
                    <button type="button" onClick={() => exportTeam()}
                        className={`flex gap-2 items-center justify-center p-4 rounded-md hover:bg-gray-200 border-2 w-48 transition duration-150 ease-in-out
                        ${Object.values(context.sectionsCompleted).every(val => val) ? 'bg-green-100 border-green-200 ring ring-green-100' : 'bg-white  border-gray-200 '}`}>
                        <FaCopy /> Export Team
                    </button>
                    <a type="button" href="https://play.pokemonshowdown.com/teambuilder" target="_blank" rel="noreferrer"
                        className="flex gap-2 items-center justify-center p-4 rounded-md bg-blue-100 hover:bg-gray-200 border-2 border-blue-200 ring ring-blue-100 w-48 transition duration-150 ease-in-out">
                        <FiExternalLink /> Showdown Teams
                    </a>
                </>
            )
        }        
    }
    
    const generationProgress = () => {
        if(pokemonOptions.length < randomOptions.pokemons)
            return `Generating Pokémon (${pokemonOptions.length}/${randomOptions.pokemons})`;   
        else if(movesetOptions.length < randomOptions.movesets)
            return `Generating Movesets (${movesetOptions.length}/${randomOptions.movesets})`;
        else if(abilityOptions.length < randomOptions.abilities)
            return `Generating Abilities (${abilityOptions.length}/${randomOptions.abilities})`;
        else if(itemOptions.length < randomOptions.items)
            return `Generating Items (${itemOptions.length}/${randomOptions.items})`;
        else
            return 'Done!';
    }    

    return (           
        <div className="flex flex-col gap-8 justify-start items-center p-8 w-full">  
            <div id="controls" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Actions</p>
                    <p className="text-base text-gray-300">Actions for building your team.</p>
                </div>            
                <div className="flex flex-col justify-start items-center gap-4 p-4 w-full border-2 rounded-md border-gray-200">
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        {getControls()}
                    </div>                                                                       
                </div>                                                            
            </div>
            <PokemonOptions options={pokemonOptions} />
            <MovesetOptions options={movesetOptions} />  
            <AbilityOptions options={abilityOptions} />   
            <ItemOptions options={itemOptions} />        

        </div>                    
    )
}