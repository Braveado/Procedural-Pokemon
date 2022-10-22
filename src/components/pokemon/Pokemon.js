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
        switch(pokemon.gender){
            case "male": 
                return <CgGenderMale />
            case "female": 
                return <CgGenderFemale />
            default:
               return <FaGenderless />
        }            
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
            <div className="w-full grid grid-cols-3 text-xs text-gray-600">
                <p className="capitalize border-b border-dashed border-gray-600 justify-self-start" data-tip data-for={'nature'}>
                    {pokemon.nature.name}
                </p>               
                <p className="text-base border-b border-dashed border-gray-600 justify-self-center" data-tip data-for={'gender'}>
                    {getGenders()}
                </p>                               
                <p className="border-b border-dashed border-gray-600 justify-self-end" data-tip data-for={'height_weight'}>
                    {pokemon.height/10}m / {pokemon.weight/10}kg
                </p>               
            </div>                       
        </div>
    )
}
