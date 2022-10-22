import React from 'react'
import {GiSparkles} from 'react-icons/gi';
import {BiSearchAlt} from 'react-icons/bi';
import {topPokemonTotalStatsThreshold} from '../../constants/team';
import PokemonType from './PokemonType';
import {getStatColor, getStatName} from './PokemonStats';

export default function PokemonSprite({pokemon, assign, opacity, types = false, stats = false}) {
    const getRarity = () => {
        if(pokemon.is_legendary)
            return "bg-yellow-100 border-2 border-yellow-200 ring ring-yellow-100 animate-pulse"
        else if(pokemon.is_mythical)
            return "bg-purple-100 border-2 border-purple-200 ring ring-purple-100 animate-pulse"
        else if(pokemon.stats[6].base_stat >= topPokemonTotalStatsThreshold)
            return "bg-blue-100 border-2 border-blue-200 ring ring-blue-100 animate-pulse"
        else
            return 'animate-none'
    }

    return ( 
        <div onClick={assign} 
            className={`relative w-24 h-24 flex items-center justify-center ${opacity ? 'opacity-20' : ''} transition duration-150 ease-in-out`}>
            <span className={`absolute w-24 h-24 absolute rounded-full opacity-100 ${getRarity()}`} />
            {pokemon.shiny ? <GiSparkles className={`absolute w-24 h-24 absolute opacity-100 text-yellow-200 animate-pulse`} /> : null}            
            {pokemon.sprites.front_default ?                
                <img 
                    src={pokemon.shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default} alt="" width="96px" height="96px"
                    className="absolute animate-wiggle"
                />
            :
                <p className="absolute text-sm">                    
                    <a onClick={(e) => e.stopPropagation()} href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.species.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()).replace(/ /g, "_")}_(Pokémon)`} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-500">
                        <BiSearchAlt /> Bulbapedia
                    </a>
                </p>
            }
            {stats ?
                <div className="absolute inset-x-0 top-0 w-full">                    
                    <div className="relative w-full flex justify-center items-center text-xs">
                        {
                            pokemon.highestStats.map((e, i) => {
                                if(i < 3){
                                return(
                                    <div className="flex items-center justify-center" key={i}>
                                        <div 
                                            className={`h-3 rounded-md w-8
                                            ${getStatColor(pokemon.highestStats[i].statIndex)} 
                                            ${pokemon.highestStats[i].percentage > 100 ? 'animate-pulse' : ''}`} 
                                        />                                                                                    
                                        <p 
                                            style={{marginTop: "-2px"}}
                                            className="absolute"
                                        >{getStatName(pokemon.highestStats[i].statIndex)}</p>
                                    </div>
                                )}
                                else return null;
                            })
                        }       
                    </div>                                                                 
                </div>
            : null}
            {types &&
                <div className="absolute inset-x-0 bottom-0 flex justify-center items-center">
                    {pokemon.types.map((t, i) => {
                        return (                                    
                            <PokemonType key={i} type={t.type.name} size="sm" />
                        )
                    })}                           
                </div>
            }
        </div>
    )
}
