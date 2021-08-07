import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import PokemonType from '../pokemon/PokemonType';
import MoveCategory from './MoveCategory';

export default function Move({move, moveset}) {
    const context = React.useContext(TeamBuilderContext);            

    const formatEffect = (effect) => {
        let formattedEffect = effect;
        // Adjust specific items.      
        switch(move.name){
            case 'techno-blast':
                formattedEffect = formattedEffect.replace('plate or ', '');
                break;
            case 'judgment':
                formattedEffect = formattedEffect.replace(' or drive', '');
                break;
            case 'multi-attack':
                formattedEffect = formattedEffect.replace('plate or drive', 'memory');
                break;
            case 'hidden-power':
                formattedEffect = "Inflicts regular damage with no additional effect.";
                break;
            default:
                break;
        }           
        // Adjust general moves.
        formattedEffect = formattedEffect.replace(/\$effect_chance/g, move.effect_chance);
        if(move.priority !== 0)
            formattedEffect = formattedEffect.concat(' Priority '+move.priority);
        return formattedEffect;
    }    

    const formattedEffect = move.effect_entries.length > 0 ? formatEffect(move.effect_entries.find(e => e.language.name === "en").short_effect) : null;

    const getEffect = () => {
        if(formattedEffect) {
            return(
                <p className="text-center">
                    {formattedEffect}
                </p>
            )
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
                <p data-tip data-for={'pp'}>PP: {move.pp}</p>
                <p data-tip data-for={'power'}>Pwr: {move.power ? move.power : '-'}</p>
                <p data-tip data-for={'accuracy'}>Acc: {move.accuracy ? move.accuracy : '-'}</p>                
            </div>
            <div className="flex flex-col justify-start items-center text-sm w-full" data-tip={context.getTooltipData(formattedEffect)} data-for={'dynamic'}>
                {getEffect()}
            </div>
        </div>
    )
}
