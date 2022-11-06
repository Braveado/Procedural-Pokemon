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
            case 'aurora-veil':
                formattedEffect = formattedEffect.replace('damage', 'damage received for');
                break;    
            case 'attract':
                formattedEffect = "Infatuates target if it has the opposite gender.";
                break;  
            case 'dynamax-cannon':
                formattedEffect = "If the target is Dynamaxed or Gigantamaxed, its damage is doubled.";
                break;
            case 'corrosive-gas':
                formattedEffect = "Removes the targets' held items for the rest of the battle.";
                break;
            case 'scale-shot':
                formattedEffect = "Hits 2-5 times in one turn. Raises the user's Speed and lowers its Defense by one stage.";
                break;
            case 'triple-axel':
                formattedEffect = "Hits three times, increasing power by 100% with each successful hit.";
                break;
            case 'zippy-zap':
                formattedEffect = "Always scores a critical hit.";
                break;
            case 'baddy-bad':
                formattedEffect = "Sets the effects of Reflect on the user's side of the field.";
                break;
            case 'glitzy-glow':
                formattedEffect = "Sets the effects of Light Screen on the user's side of the field.";
                break;
            case 'sappy-seed':
                formattedEffect = "Sets the effects of Leech Seed on its target.";
                break;
            case 'bouncy-bubble':
                formattedEffect = "Drains half the damage inflicted to heal the user.";
                break;
            case 'floaty-fall':
                formattedEffect = "Has a $effect_chance% chance to make the target flinch.";
                break; 
            case 'splishy-splash':
                formattedEffect = "Has a $effect_chance% chance to paralyze the target.";
                break;
            case 'buzzy-buzz':
                formattedEffect = "Paralyzes the target.";
                break;
            case 'sizzly-slide':
                formattedEffect = "Burns the target.";
                break;                                                    
            case 'sparkly-swirl':
                formattedEffect = "Cures the entire party of major status effects.";
                break;
            case 'freezy-frost':
                formattedEffect = "Resets all Pokémon's stats stages.";
                break; 
            case 'razor-wind':
                formattedEffect = formattedEffect + " Has an increased chance for a critical hit.";
                break;   
            case 'weather-ball':
                formattedEffect = formattedEffect.replace('there be weather', 'there is an active weather effect');
                break;    
            case 'double-iron-bash':
                formattedEffect = formattedEffect + " Has a $effect_chance% chance to make the target flinch.";
                break;
            case 'pluck':
            case 'bug-bite':
                formattedEffect = formattedEffect.replace('inflicts double damage and uses the berry.', 'the user eats it and gains its effect.');
                break;    
            case 'curse':
                formattedEffect = formattedEffect.replace('every turn.', 'every turn by 1/4 max HP.');
                formattedEffect = formattedEffect.replace('Defense.', 'Defense by one stage.');
                break;  
            case 'lunar-dance':
                formattedEffect = "User faints. Its replacement's HP and PP are fully restored, and any major status effect is removed.";
                break;
            case 'sheer-cold':
                formattedEffect = formattedEffect.replace('KO.', 'KO to non-Ice targets. Base accuracy is 20 for non-Ice users.');
                break;  
            case 'plasma-fists':
                formattedEffect = "Normal moves become Electric type this turn.";
                break; 
            case 'photon-geyser':
                formattedEffect = "Cannot be disrupted by abilities.";
                break; 
            case 'psychic-terrain':
                formattedEffect = formattedEffect.replace('50%', '30%');
                break;
            case 'grassy-terrain':
            case 'electric-terrain':
                formattedEffect = formattedEffect.replace('1.5x', '1.3x');
                break;
            case 'rapid-spin':
                formattedEffect = formattedEffect + " Raises the user's Speed by one stage.";
                break;
            case 'teleport':
                formattedEffect = "Switches the user out.";
                break; 
            default:
                break;
        }           
        // Adjust general moves.
        formattedEffect = formattedEffect.replace(/\$effect_chance/g, move.effect_chance);
        if(move.meta && move.meta.crit_rate > 0)
            formattedEffect = formattedEffect.replace("Has an increased chance for a critical hit.", `Move's critical hit rate is increased by ${move.meta.crit_rate} ${move.meta.crit_rate > 1 ? 'stages' : 'stage'}.`);
        if(move.priority !== 0)
            formattedEffect = formattedEffect.concat(' Priority '+ move.priority + '.');
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
