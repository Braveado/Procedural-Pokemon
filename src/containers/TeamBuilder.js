import React from 'react';
import PokemonOptions from '../components/pokemon/PokemonOptions';
import MovesetOptions from '../components/moves/MovesetOptions';
import AbilityOptions from '../components/abilities/AbilityOptions';
import ItemOptions from '../components/items/ItemOptions';
import { BiLoaderAlt } from 'react-icons/bi';

export default function TeamBuilder({
    loading, randomRolls, pokemonOptions, movesetOptions, abilityOptions, itemOptions, generating, generateOptions 
    }) {
    
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
            <button 
                type="button" disabled={loading || generating} onClick={() => generateOptions()}
                className={`flex gap-4 items-center justify-center text-lg p-4 rounded-md transition duration-150 ease-in-out 
                ${!loading && !generating ? 'bg-gray-900 text-white w-48 hover:bg-gray-600' : ''}`}
            >
                {loading || generating ? <BiLoaderAlt className="animate-spin text-2xl" /> : null}
                {loading ? 'Fetching data from PokeAPI' : (generating ? generationProgress() : 'Generate Options')}
            </button>                  
            <PokemonOptions options={pokemonOptions} />
            <MovesetOptions options={movesetOptions} />  
            <AbilityOptions options={abilityOptions} />   
            <ItemOptions options={itemOptions} />        
        </div>
    )
}
