import React from 'react';
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import Pokemon from './Pokemon';

export default function PokemonOptions({ options }) {
    const context = React.useContext(TeamBuilderContext);
    
    const setOptions = () => {
        if (options.length) {
            return (
                options.map(p => (
                    <Pokemon key={p.id} pokemon={p} />
                ))
            );
        } else {
            return (                
                <div className="p-4 text-gray-300">
                    Empty
                </div>            
            );
        }
    }

    // Render.
    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center gap-4 text-center">
                <span className="flex gap-4 items-center">
                    <p className="text-lg">Pokemon Options</p>
                    <p className="text-base text-gray-300">Select pokemons for your team.</p>
                </span>
                <p className="text-lg">{context.selectionsMade.pokemons}/{context.selectionsNeeded.pokemons} Pokemons Selected</p>
            </div>            
            <div className={`flex flex-wrap justify-center items-start gap-4 p-4 w-full border-2 rounded-md border-gray-200 transition duration-150 ease-in-out
                ${context.selectionsMade.pokemons >= context.selectionsNeeded.pokemons ? 'border-green-200 ring ring-green-100' : ''}`}>
                {setOptions()}
            </div>
        </div>
    );    
}
