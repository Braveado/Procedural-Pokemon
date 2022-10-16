import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
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
            return <div className="flex"><CgGenderMale /><CgGenderFemale /></div>
    }    

    return (
        <div onClick={() => context.selectPokemon(pokemon)} 
            className={`animate-enter cursor-pointer flex flex-col gap-2 justify-start items-center bg-white rounded-md p-2 w-64 h-auto border-2 border-gray-200 hover:bg-gray-200 transition duration-150 ease-in-out
            ${pokemon.selected ? 'bg-green-100 border-green-200 ring ring-green-100' : ''}`}>                        

            <PokemonSprite pokemon={pokemon} />            

            <div className="capitalize text-center">{pokemon.name.replace(/-/g, " ")} {`Lv${pokemon.level}`}</div>
            <div className="flex justify-center items-center gap-2">
                {pokemon.types.map((t, i) => {
                    return (                                    
                        <PokemonType key={i} type={t.type.name} />
                    )
                })}                           
            </div>
            <PokemonStats stats={pokemon.stats} nature={pokemon.nature}/> 
            <div className="flex w-full justify-between items-center text-xs text-gray-600">
                <p className="w-1/3 capitalize" data-tip data-for={'nature'}>{pokemon.nature.name}</p>
                {/* <p className="w-1/3" data-tip data-for={'height'}>{pokemon.height/10}m</p> */}
                <div className="w-1/3 text-base flex justify-center items-center" data-tip data-for={'gender'}>{getGenders()}</div>
                {/* <p className="w-1/3 text-right" data-tip data-for={'weight'}>{pokemon.weight/10}kg</p> */}
                <p className="w-1/3 text-right" data-tip data-for={'height_weight'}>{pokemon.height/10}m / {pokemon.weight/10}kg</p>
            </div>                       
        </div>
    )
}
