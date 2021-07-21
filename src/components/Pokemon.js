import React from 'react'
import PokemonType from './PokemonType';
import PokemonStats from './PokemonStats';

export default function Pokemon({pokemon}) {
    const getRarity = () => {
        if(pokemon.is_legendary)
            return 'bg-yellow-400 animate-ping';
        else if(pokemon.is_mythical)
            return 'bg-purple-300 animate-ping';
        else if(pokemon.stats[6].base_stat >= 600)
        return 'bg-blue-300 animate-ping';
    }

    return (
        <div className="relative flex flex-col gap-2 justify-start items-center bg-white rounded-md p-4 w-48 h-auto">            

            <span className={`absolute h-12 w-12 top-10 absolute inline-flex rounded-full opacity-75 animate-ping ${getRarity()}`} />
            
            <img 
                src={pokemon.sprites.front_default} alt=" " width="96px" height="96px"
                className="absolute"
            />
            <div style={{width: '96px', height:'96px'}} />
            

            <div className="capitalize">{pokemon.name.replace(/-/g, " ")}</div>

            <div className="flex justify-center items-center gap-2">
                {pokemon.types.map((t, i) => {
                    return (                                    
                        <PokemonType key={i} type={t.type.name} />
                    )
                })}                           
            </div>

            <PokemonStats stats={pokemon.stats}/>                        
        </div>
    )
}
