import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilder';
import PokemonType from './PokemonType';
import PokemonStats from './PokemonStats';
import PokemonSprite from './PokemonSprite';
import { FaGenderless } from 'react-icons/fa';
import { CgGenderMale, CgGenderFemale } from 'react-icons/cg';

export default function Pokemon({pokemon}) {
    const context = React.useContext(TeamBuilderContext);

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
        <div onClick={() => context.selectPokemon(pokemon)} 
            className={`cursor-pointer flex flex-col gap-2 justify-start items-center bg-white rounded-md p-4 w-48 h-auto border-2 border-gray-200 hover:bg-gray-200 transition duration-150 ease-in-out
            ${pokemon.selected ? 'bg-green-100 border-green-200 ring ring-green-100' : ''}`}>                        

            <PokemonSprite pokemon={pokemon} />            

            <div className="capitalize text-center">{pokemon.name.replace(/-/g, " ")}</div>
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
