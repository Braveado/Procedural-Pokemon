import React from 'react'
import PokemonType from './PokemonType';
import PokemonStats from './PokemonStats';
import { FaGenderless } from 'react-icons/fa';
import { CgGenderMale, CgGenderFemale } from 'react-icons/cg';

export default function Pokemon({pokemon}) {
    const getRarity = () => {
        if(pokemon.is_legendary)
            return "bg-yellow-100 border-2 border-yellow-200 ring ring-yellow-100 animate-pulse"
        else if(pokemon.is_mythical)
            return "bg-purple-100 border-2 border-purple-200 ring ring-purple-100 animate-pulse"
        else if(pokemon.stats[6].base_stat >= 600)
            return "bg-blue-100 border-2 border-blue-200 ring ring-blue-100 animate-pulse"
    }

    const getGenders = () => {
        if(pokemon.gender_rate < 0)
            return <FaGenderless />
        else if (pokemon.gender_rate === 0)
            return <CgGenderMale />
        else if (pokemon.gender_rate === 8)
            return <CgGenderFemale />
        else 
            return <span className="flex"><CgGenderMale /><CgGenderFemale /></span>
    }    

    return (
        <div className={`relative flex flex-col gap-2 justify-start items-center bg-white rounded-md p-4 w-48 h-auto border-2 border-gray-200 hover:bg-gray-200 transition duration-150 ease-in-out
            ${pokemon.selected ? 'border-green-200 ring ring-green-100' : ''}`}>            

            <span className={`absolute h-24 w-24 absolute inline-flex rounded-full opacity-100 ${getRarity()} mix-blend-multiply`} />
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
            <div className="flex w-full justify-between items-center text-xs">
                <p>{pokemon.height/10}m</p>
                <p>{pokemon.weight/10}kg</p>
                <p className="text-base">{getGenders()}</p>
            </div>                       
        </div>
    )
}
