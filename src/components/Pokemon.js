import React from 'react'
import PokemonType from './PokemonType';
import PokemonStats from './PokemonStats';

export default function Pokemon({pokemon}) {
    return (
        <div className="flex flex-col gap-2 justify-start items-center bg-white rounded-md p-4 w-48 h-auto">
            <img 
                src={pokemon.sprites.front_default} alt="sprite" width="96px" height="96px"
                className="align-center"
            />

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
