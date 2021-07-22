import React from 'react'

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
            className={`cursor-pointer relative ${opacity ? 'opacity-10' : ''} transition duration-150 ease-in-out`}
            style={{width: '96px', height:'96px'}}>
            <span className={`absolute h-24 w-24 absolute inline-flex rounded-full opacity-100 ${getRarity()} mix-blend-none`} />
            <img 
                src={pokemon.sprites.front_default} alt="" width="96px" height="96px"
                className="absolute animate-wiggle"
            />
        </div>        
    )
}
