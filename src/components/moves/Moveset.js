import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import Move from './Move';
import SelectedPokemon from '../pokemon/SelectedPokemon';

export default function Moveset({ moveset, index }) {
    const context = React.useContext(TeamBuilderContext);

    const setMoves = () => {
        if (moveset.length) {
            return (
                moveset.map(m => (
                    <Move moveset={index} key={m.id} move={m} />
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

    return (
        <div className="animate-enter flex flex-col justify-start items-end">
            <div className="flex w-full justify-end items-center">
                {/* <p className="text-base">{!context.pokemonOptions.find(p => p.moveset === index) ? 'No ' : ''}Pokemon Assigned</p> */}
                <p className="text-base">{context.selectionsMade.moves[index]}/{context.selectionsNeeded.moves} Moves Selected</p>
            </div>
            <div className={`flex flex-col gap-2 justify-start items-center rounded-md p-4 w-96 h-auto border-2 border-gray-200 transition duration-150 ease-in-out 
                ${context.selectionsMade.moves[index] >= context.selectionsNeeded.moves &&
                context.pokemonOptions.find(p => p.moveset === index) ? 'border-green-200 ring ring-green-100' : ''}`}>
                <SelectedPokemon assignable={{moveset: index}} />
                {setMoves()}
            </div>
        </div>
    )
}
