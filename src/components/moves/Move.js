import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import PokemonType from '../pokemon/PokemonType';
import MoveCategory from './MoveCategory';

export default function Move({move, moveset}) {
    const context = React.useContext(TeamBuilderContext);

    const getEffects = () => {
        if(move.effect_entries.length > 0) {
            return move.effect_entries.map((e, i) => {
                return (
                    <p key={i} className="text-center">
                        {e.short_effect.replace(/\$effect_chance/g, move.effect_chance)} {move.priority !== 0 ? 'Priority '+move.priority : ''}
                    </p>
                )
            })
        }
        else {
            return (
                <p className="text-center flex flex-col">
                    No available effect entries from PokeAPI.
                    <a onClick={(e) => e.stopPropagation()} href={`https://bulbapedia.bulbagarden.net/wiki/${move.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()).replace(/ /g, "_")}_(move)`} target="_blank" rel="noreferrer"
                        className="text-blue-400 hover:text-blue-500">
                        Check the move in Bulbapedia.
                    </a>
                </p>
            )
        }
    }

    return (
        <div onClick={() => context.selectMove(move, moveset)}
            className={`cursor-pointer flex flex-col gap-2 justify-start items-center bg-white rounded-md p-2 w-full h-auto border-2 border-gray-200 hover:bg-gray-200 transition duration-150 ease-in-out 
            ${move.selected ? 'bg-green-100 border-green-200 ring ring-green-100' : ''}`}>            
            <div className="flex justify-between items-center w-full gap-2">
                <p className="capitalize">{move.name.replace(/-/g, " ")}</p>
                <div className="flex justify-center gap-2">
                    <PokemonType type={move.type.name} />
                    {move.damage_class ? <MoveCategory category={move.damage_class.name} /> : ''}
                </div>                                
            </div>
            <div className="flex w-full gap-2 justify-between text-sm">
                <p>PP: {move.pp}</p>
                <p>Pwr: {move.power ? move.power : '-'}</p>
                <p>Acc: {move.accuracy ? move.accuracy : '-'}</p>                
            </div>
            <div className="flex flex-col justify-start items-center text-sm w-full">
                {getEffects()}
            </div>
            {/* <div className="flex justify-center items-center text-xs w-full gap-2">
                {move.priority !== 0 ? 'Priority: '+move.priority : ''}
                {move.meta && move.meta.crit_rate !== 0 ? 'CR: '+move.meta.crit_rate : ''}
            </div> */}
        </div>
    )
}
