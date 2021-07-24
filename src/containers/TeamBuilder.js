import React from 'react';
import PokemonOptions from '../components/pokemon/PokemonOptions';
import MovesetOptions from '../components/moves/MovesetOptions';
import AbilityOptions from '../components/abilities/AbilityOptions';
import ItemOptions from '../components/items/ItemOptions';
import { BiLoaderAlt } from 'react-icons/bi';

export default function TeamBuilder({
    loading, randomRolls, pokemonOptions, movesetOptions, abilityOptions, itemOptions, generating, generateOptions, clearChoices, exportTeam
    }) {

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
                    <button type="button" disabled={true} onClick={() => clearChoices()}
                        className={`animate-enter flex items-center justify-center text-lg p-4 rounded-md border-2 border-gray-200 w-48 transition duration-150 ease-in-out
                        ${true ? 'text-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-200'}`}>
                        Clear Choices
                    </button>
                    <button type="button" disabled={loading || generating} onClick={() => generateOptions()}
                        className="animate-enter flex items-center justify-center text-lg p-4 rounded-md bg-white border-2 border-gray-200 w-48 hover:bg-gray-200 transition duration-150 ease-in-out">
                        Generate Options
                    </button>
                    <button type="button" disabled={true} onClick={() => exportTeam()}
                        className={`animate-enter flex items-center justify-center text-lg p-4 rounded-md border-2 border-gray-200 w-48 transition duration-150 ease-in-out
                        ${true ? 'text-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-200'}`}>
                        Export Team
                    </button>
                </>
            )
        }        
    }
    
    const generationProgress = () => {
        if(pokemonOptions.length < randomRolls.pokemons)
            return `Generating Pokemons (${pokemonOptions.length}/${randomRolls.pokemons})`;   
        else if(movesetOptions.length < randomRolls.movesets)
            return `Generating Movesets (${movesetOptions.length}/${randomRolls.movesets})`;
        else if(abilityOptions.length < randomRolls.abilities)
            return `Generating Abilities (${abilityOptions.length}/${randomRolls.abilities})`;
        else if(itemOptions.length < randomRolls.items)
            return `Generating Items (${itemOptions.length}/${randomRolls.items})`;
        else
            return 'Done!';
    }    

    return (
            <div className="flex flex-col gap-8 justify-start items-center w-full p-8">  
                <div className="flex flex-col w-full">
                    <div className="flex justify-start items-center gap-4 text-center">                    
                        <p className="text-lg">Controls</p>
                        <p className="text-base text-gray-300">Actions for building your team.</p>
                    </div>            
                    <div className="flex flex-wrap justify-center items-start gap-4 p-4 w-full border-2 rounded-md border-gray-200 transition duration-150 ease-in-out">
                        {getControls()}                        
                    </div>
                </div>                          
                <PokemonOptions id="pokemons" options={pokemonOptions} />
                <MovesetOptions options={movesetOptions} />  
                <AbilityOptions options={abilityOptions} />   
                <ItemOptions options={itemOptions} />        
            </div>
    )
}
