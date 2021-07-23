import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import PokemonSprite from './PokemonSprite'

export default function SelectedPokemon({ assignable }) {
    const context = React.useContext(TeamBuilderContext);   
    const selectedPokemon = context.pokemonOptions.filter(p => p.selected);      

    const getAssigned = () => {
        if(assignable.moveset != null)            
            return selectedPokemon.find(p => p.moveset === assignable.moveset)
        else if(assignable.ability != null)            
            return selectedPokemon.find(p => p.ability === assignable.ability)
        else if(assignable.item != null)            
            return selectedPokemon.find(p => p.item === assignable.item)
        else
            return null;
    }
    let assignedPokemon = getAssigned();

    const getAssignedOutside = (pokemon) => {
        if(assignable.moveset != null)
            return pokemon.moveset !== null;
        else if (assignable.ability != null)
            return pokemon.ability !== null;
        else if (assignable.item != null)
            return pokemon.item !== null;
        else
            return null;
    }

    /* const callAssign = (pokemon) => {
        
        if(moveset != null)
            context.assignMoveset(moveset, pokemon);
        else if(ability != null)
            context.assignAbility(ability, pokemon);
        else if (item != null)
            context.assignItem(item, pokemon);        
    }  */   

    const getSelectedPokemons = () => {        
        if(selectedPokemon.length > 0 ) {
            return selectedPokemon.map((p, i) => {
                return (
                    <PokemonSprite key={i} pokemon={p} assign={() => context.assignPokemon(p, assignable)}
                        opacity={(assignedPokemon && p.name !== assignedPokemon.name) ||
                        (!assignedPokemon && getAssignedOutside(p))}
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
