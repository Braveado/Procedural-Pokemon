import { assertDebuggerStatement } from '@babel/types';
import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilder';
import PokemonSprite from './PokemonSprite'

export default function SelectedPokemon({ moveset }) {
    const context = React.useContext(TeamBuilderContext);   
    const selectedPokemon = context.pokemonOptions.filter(p => p.selected);      

    const getAssigned = () => {
        if(moveset != null)            
            return selectedPokemon.find(p => p.moveset === moveset)
    }

    let assignedPokemon = getAssigned();

    const callAssign = (pokemon) => {
        if(moveset != null)
            context.assignMoveset(moveset, pokemon);
    }    

    const getSelectedPokemons = () => {        
        if(selectedPokemon.length > 0 && !assignedPokemon) {
            return selectedPokemon.map((p, i) => {
                return (
                    <PokemonSprite key={i} pokemon={p} assign={() => callAssign(p)} />
                )
            })            
        }
        else if(selectedPokemon.length > 0 && assignedPokemon) {
            return <PokemonSprite pokemon={assignedPokemon} assign={() => callAssign(assignedPokemon)} />            
        }
        else {
            return (
                <div className="p-4 text-gray-300">
                    No selected pokemon
                </div> 
            );
        }
    }

    return (
        <div className={`flex flex-wrap gap-2 justify-center items-center bg-white rounded-md p-2 w-full h-auto border-2 border-gray-200 transition duration-150 ease-in-out 
            ${assignedPokemon ? 'bg-green-100 border-green-200 ring ring-green-100' : ''}`}>
            {getSelectedPokemons()}
        </div>
    )
}
