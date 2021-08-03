import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import SelectedPokemon from '../pokemon/SelectedPokemon';

export default function Item({item, index}) {
    const context = React.useContext(TeamBuilderContext);
    const selected = context.pokemonOptions.find(p => p.item === index);

    const getEffects = () => {
        const effect = item.effect_entries.find(e => e.language.name === 'en');
        if(effect) {                
            return (
                <p className="text-center">
                    {formatEffect(effect.short_effect)}  
                </p>
            )            
        }
        else {
            return (
                <p className="text-center flex flex-col">
                    No available effect entries from PokeAPI.
                    {/* <a onClick={(e) => e.stopPropagation()} href={`https://bulbapedia.bulbagarden.net/wiki/${ability.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()).replace(/ /g, "_")}_(Ability)`} target="_blank" rel="noreferrer"
                        className="text-blue-400 hover:text-blue-500">
                        Check the item in Bulbapedia.
                    </a> */}
                </p>
            )
        }
    }

    const formatEffect = (effect) => {
        let formattedEffect = effect.split(".").filter(e => {
            return !e.includes("Breeding:") && !e.includes("Traded on") && !e.includes("Held by")
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
            default:
                break;
        }        
        // Adjust group items.
        if(item.name.split("-").includes('plate'))
            formattedEffect = formattedEffect.replace("Arceus's and ", "");
        if(item.name.split("-").includes('drive'))
            formattedEffect = formattedEffect.replace(" Techno Blast", "").replace("Grants Genesect", "Changes the holder's Techno Blast").replace("a yellow,", "to");
        return formattedEffect;
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
                    <div className="flex flex-col justify-start items-center text-sm w-full">
                        {getEffects()}
                    </div>            
                </div>
            </div>
        </div>
    )
}
