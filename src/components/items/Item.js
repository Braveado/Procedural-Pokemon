import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import SelectedPokemon from '../pokemon/SelectedPokemon';
import {BiSearchAlt} from 'react-icons/bi';

export default function Item({item, index}) {
    const context = React.useContext(TeamBuilderContext);
    const selected = context.pokemonOptions.find(p => p.item === index);
    
    const formatEffect = (effect) => {
        let formattedEffect = effect.split(".").filter(e => {
            return !e.includes("Breeding:") && !e.includes("Traded on") && !e.includes("Held by") && !e.includes("begets") && !e.includes("Egg")
        }).map(e => {
            return e.replace("Held: ", "")
        }).join(".");  
        // Adjust specific items.      
        switch(item.name){
            case 'shell-bell':                                
                formattedEffect = formattedEffect.replace("receives", "heals");
                break;
            case 'bright-powder':                                
                formattedEffect = formattedEffect.replace("(11 1/9%)", "(11%)");
                break;
            case 'mental-herb':
                formattedEffect = formattedEffect.replace("infatuation. Gen V: Also removes", "Infatuation,");
                break;
            case 'light-clay':
                formattedEffect = formattedEffect.replace(" and Reflect", ", Reflect and Aurora Veil");
                break;
            case 'toxic-orb':
                formattedEffect = formattedEffect.replace("Inflicts Toxic on", "Badly poisons");
                break;
            case 'cell-battery':
            case 'absorb-bulb':
            case 'snowball':
            case 'eject-button':
                formattedEffect = formattedEffect.concat(" Consumed after use.");
                break;
            default:
                break;
        }        
        // Adjust group items.
        if(item.name.split("-").includes('plate'))
            formattedEffect = formattedEffect.replace("Arceus's and", "Arceus with multitype and");
        if(item.name.split("-").includes('memory'))
            formattedEffect = formattedEffect.replace("Silvally to", "Silvally with RKS System to");
        if(item.name.split("-").includes('drive'))
            formattedEffect = formattedEffect.replace(" Techno Blast", "").replace("Grants Genesect", "Changes the holder's Techno Blast").replace("a yellow,", "to");
        if(item.name.split("-").includes('gem'))
            formattedEffect = formattedEffect.replace("5", "3");
        return formattedEffect;
    }

    const formattedEffect = item.effect_entries.length > 0 ? formatEffect(item.effect_entries.find(e => e.language.name === 'en').short_effect) : null;

    const getEffect = () => {        
        if(formattedEffect) {                
            return (
                <p className="text-center">
                    {formattedEffect}  
                </p>
            )            
        }
        else {
            return (
                <p className="text-sm">                    
                    <a onClick={(e) => e.stopPropagation()} href={`https://bulbapedia.bulbagarden.net/wiki/${item.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()).replace(/ /g, "_")}`} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-500">
                        <BiSearchAlt /> Bulbapedia
                    </a>
                </p>
            )
        }
    }

    return (
        <div className="animate-enter flex flex-col justify-start items-end">
            {/* <div className="flex w-full justify-start items-center">
                <p className="text-base">{!selected ? 'No ' : ''}Pokemon Assigned</p>
            </div> */}
            <div className={`flex flex-col gap-2 justify-start items-center rounded-md p-2 w-96 h-auto border-2 border-gray-200 transition duration-150 ease-in-out  
                ${selected ? 'border-green-200 ring ring-green-100' : ''}`}>            
                <SelectedPokemon assignable={{item: index}} />
                <div className={`flex flex-col gap-2 justify-start items-center bg-white rounded-md p-2 w-full h-auto border-2 border-gray-200 transition duration-150 ease-in-out 
                    ${selected ? 'bg-green-100 border-green-200 ring ring-green-100' : ''}`}>                    
                    <div className="flex justify-center items-center w-full gap-2">
                        <img src={item.sprites.default} alt="" width="30px" height="30px"/>
                        <p className="capitalize">{item.name.replace(/-/g, " ")}</p>                
                    </div>            
                    <div className="flex flex-col justify-start items-center text-sm w-full" data-tip={formattedEffect} data-for={'dynamic'}>
                        {getEffect()}
                    </div>            
                </div>
            </div>
        </div>
    )
}
