import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilder';
import PokemonSprite from './PokemonSprite'

export default function SelectedPokemon({ moveset, ability }) {
    const context = React.useContext(TeamBuilderContext);   
    const selectedPokemon = context.pokemonOptions.filter(p => p.selected);      

    const getAssigned = () => {
        if(moveset != null)            
            return selectedPokemon.find(p => p.moveset === moveset)
        else if(ability != null)            
            return selectedPokemon.find(p => p.ability === ability)
    }
    let assignedPokemon = getAssigned();

    const getNotAvailable = (pokemon) => {
        if(moveset != null)
            return pokemon.moveset !== null;
        else if (ability != null)
            return pokemon.ability !== null;
    }

    const callAssign = (pokemon) => {
        if(moveset != null)
            context.assignMoveset(moveset, pokemon);
        else if(ability != null)
            context.assignAbility(ability, pokemon);
    }    

    const getSelectedPokemons = () => {        
        if(selectedPokemon.length > 0 ) {//&& !assignedPokemon) {
            return selectedPokemon.map((p, i) => {
                return (
                    <PokemonSprite key={i} pokemon={p} assign={() => callAssign(p)}
                        opacity={(assignedPokemon && p.name !== assignedPokemon.name) ||
                                (!assignedPokemon && getNotAvailable(p))}
                    />
                )
            })            
        }
        /* else if(selectedPokemon.length > 0 && assignedPokemon) {
            return <PokemonSprite pokemon={assignedPokemon} assign={() => callAssign(assignedPokemon)} />            
        } */
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
