import React, {useEffect} from 'react';
import TeamPreview from '../components/preview/TeamPreview';
import PokemonOptions from '../components/pokemon/PokemonOptions';
import MovesetOptions from '../components/moves/MovesetOptions';
import AbilityOptions from '../components/abilities/AbilityOptions';
import ItemOptions from '../components/items/ItemOptions';
import { TeamBuilderContext } from '../context/TeamBuilderContext';
import { BiLoaderAlt } from 'react-icons/bi';
import { FaEraser, FaCopy } from 'react-icons/fa';
import {GoPencil} from 'react-icons/go';
import { FiExternalLink } from 'react-icons/fi';
import ProgressBar from '../components/ProgressBar';
import GenerationToggles from '../components/GenerationToggles';

export default function TeamBuilder({
    loading, randomOptions, pokemonPreviews, pokemonOptions, movesetOptions, abilityOptions, itemOptions, generating, generationStep,
    generateOptions, clearChoices, exportTeam,
    }) {   
    const context = React.useContext(TeamBuilderContext);

    // Change title.
    useEffect (() => {
        document.title = 'Team Builder - Procedural Pokémon';
    }, []);

    const generationPhase = () => {
        if(pokemonOptions.length < randomOptions.pokemons)
            return 'Generating Pokémon...';   
        else if(movesetOptions.length < randomOptions.movesets)
            return 'Generating Movesets...';
        else if(abilityOptions.length < randomOptions.abilities)
            return 'Generating Abilities...';
        else if(itemOptions.length < randomOptions.items)
            return 'Generating Items...';
        else
            return 'Generation Done!';
    }
    
    const generationProgress = () => {
        const total = randomOptions.pokemons + randomOptions.movesets + randomOptions.abilities + randomOptions.items;
        const current = pokemonOptions.length + movesetOptions.length + abilityOptions.length + itemOptions.length;        
        return Math.floor((current/total * 100));
    }

    const getControls = () => {
        if(loading){
            return (            
                <p className="flex gap-4 items-center justify-center text-lg p-4">
                    Fetching data from PokéAPI... <BiLoaderAlt className="animate-spin text-2xl" />                    
                </p>                                    
            )
        }
        else if(generating){
            return <ProgressBar progress={generationProgress()} label={generationPhase()} />
        }
        else {
            return (
                <>
                    <button type="button" onClick={() => clearChoices()}
                        className={`flex gap-2 items-center justify-center p-4 rounded-md hover:bg-gray-200 border-2 w-48 transition duration-150 ease-in-out
                        ${Object.values(context.selectionsMade).find(val => val > 0) ? 'bg-red-100 border-red-200 ring ring-red-100' : 'bg-white  border-gray-200 '}`}>
                        <FaEraser /> Clear Choices
                    </button>
                    <button type="button" onClick={() => generateOptions()}
                        className={`flex gap-2 items-center justify-center p-4 rounded-md hover:bg-gray-200 border-2 w-48 transition duration-150 ease-in-out
                        ${pokemonOptions.length > 0 ? 'bg-yellow-100 border-yellow-200 ring ring-yellow-100' : 'bg-white  border-gray-200 '}`}>
                        <GoPencil /> Generate Options
                    </button>
                    <button type="button" onClick={() => exportTeam()}
                        className={`flex gap-2 items-center justify-center p-4 rounded-md hover:bg-gray-200 border-2 w-48 transition duration-150 ease-in-out
                        ${Object.values(context.sectionsCompleted).every(val => val) ? 'bg-green-100 border-green-200 ring ring-green-100' : 'bg-white  border-gray-200 '}`}>
                        <FaCopy /> Copy Team
                    </button>
                    <a type="button" href="https://play.pokemonshowdown.com/teambuilder" target="_blank" rel="noreferrer"
                        className="flex gap-2 items-center justify-center p-4 rounded-md bg-blue-100 hover:bg-gray-200 border-2 border-blue-200 ring ring-blue-100 w-48 transition duration-150 ease-in-out">
                        <FiExternalLink /> Showdown Teams
                    </a>
                </>
            )
        }        
    }      

    return (           
        <div className="flex flex-col gap-8 justify-start items-center p-8 w-full">  
            {!generating ? <GenerationToggles /> : null}
            <div id="actions" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Actions</p>
                    <p className="text-base text-gray-400">Controls for building your team.</p>
                </div>            
                <div className="flex flex-col justify-start items-center gap-4 p-4 w-full border-2 rounded-md border-gray-200">
                    <div className="flex flex-wrap w-full justify-center items-center gap-4">
                        {getControls()}
                    </div>                                                                       
                </div>                                                            
            </div>
            {!generating && generationStep >= 6 ? <TeamPreview previews={pokemonPreviews} /> : null}
            <PokemonOptions options={pokemonOptions} />
            <MovesetOptions options={movesetOptions} />  
            <AbilityOptions options={abilityOptions} />   
            <ItemOptions options={itemOptions} />        

        </div>                    
    )
}