import React from 'react'
import {GiSparkles} from 'react-icons/gi';

export default function PokemonSprite({pokemon, assign, opacity}) {
    const getRarity = () => {
        if(pokemon.is_legendary)
            return "bg-yellow-100 border-2 border-yellow-200 ring ring-yellow-100 animate-pulse"
        else if(pokemon.is_mythical)
            return "bg-purple-100 border-2 border-purple-200 ring ring-purple-100 animate-pulse"
        else if(pokemon.stats[6].base_stat >= 600)
            return "bg-blue-100 border-2 border-blue-200 ring ring-blue-100 animate-pulse"
        else
            return 'animate-none'
    }

    return (                 
        <div onClick={assign} 
            className={`relative w-24 h-24 ${opacity ? 'opacity-20' : ''} transition duration-150 ease-in-out`}>
            <span className={`absolute w-24 h-24 absolute rounded-full opacity-100 ${getRarity()}`} />
            {pokemon.shiny ? <GiSparkles className={`absolute right-0 w-24 h-24 absolute opacity-100 text-yellow-200 animate-pulse`} /> : null}
            <img 
                src={pokemon.shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default} alt="" width="96px" height="96px"
                className="absolute animate-wiggle"
            />            
        </div>        
    )
}
