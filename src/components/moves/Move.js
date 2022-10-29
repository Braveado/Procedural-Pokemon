import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import PokemonType from '../pokemon/PokemonType';
import MoveCategory from './MoveCategory';
import {BiSearchAlt} from 'react-icons/bi';
import TooltipTags from '../TooltipTags';
import {moves as moveTooltips} from '../../constants/tooltips';

export default function Move({move, moveset}) {
    const context = React.useContext(TeamBuilderContext);            

    const formatEffect = (effect) => {
        let formattedEffect = effect;
        // Adjust specific moves.      
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
            case 'uproar':
                formattedEffect = formattedEffect.replace('several', '3');
                break;
            case 'sand-tomb':
            case 'magma-storm':
                formattedEffect = formattedEffect.replace('Prevents the target from fleeing', 'Traps the target');
                break;
            case 'thousand-waves':
            case 'mean-look':
                formattedEffect = "Traps the target.";
                break;
            case 'aurora-veil':
                formattedEffect = formattedEffect.replace('damage', 'damage received for');
                break;    
            case 'attract':
                formattedEffect = "Infatuates target if it has the opposite gender.";
                break;          
            default:
                break;
        }           
        // Adjust general moves.
        formattedEffect = formattedEffect.replace(/\$effect_chance/g, move.effect_chance);
        if(move.meta && move.meta.crit_rate > 0)
            formattedEffect = formattedEffect.replace("Has an increased chance for a critical hit.", `Move's critical hit rate is increased by ${move.meta.crit_rate} ${move.meta.crit_rate > 1 ? 'stages' : 'stage'}.`);
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
                <p className="text-sm">                    
                    <a onClick={(e) => e.stopPropagation()} href={`https://bulbapedia.bulbagarden.net/wiki/${move.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()).replace(/ /g, "_")}_(move)`} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-500">
                        <BiSearchAlt /> Bulbapedia
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
            <div className="w-full grid grid-cols-3 text-sm">
                <p className="border-b border-dashed border-gray-600 justify-self-start" data-tip={moveTooltips[0]} data-for={'moves'}>PP: {move.pp}</p>
                <p className="border-b border-dashed border-gray-600 justify-self-center" data-tip={moveTooltips[1]} data-for={'moves'}>Pwr: {move.power ? move.power : '-'}</p>
                <p className="border-b border-dashed border-gray-600 justify-self-end" data-tip={moveTooltips[2]} data-for={'moves'}>Acc: {move.accuracy ? move.accuracy : '-'}</p>                
            </div>
            <div className="flex flex-col justify-start items-center text-sm w-full">
                {getEffect()}
            </div>
            <TooltipTags effect={formattedEffect} name={move.name} />
        </div>
    )
}
