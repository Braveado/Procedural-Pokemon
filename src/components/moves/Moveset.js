import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilder';
import Move from './Move';

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
        <div className="flex flex-col justify-start items-end">
            <p className="text-lg">{context.selectionsMade.moves[index]}/{context.selectionsNeeded.moves} Moves Selected</p>
            <div className={`flex flex-col gap-2 justify-start items-center rounded-md p-4 w-96 h-auto border-2 border-gray-200 transition duration-150 ease-in-out 
                ${context.selectionsMade.moves[index] >= context.selectionsNeeded.moves ? 'border-green-200 ring ring-green-100' : ''}`}>
                {setMoves()}
            </div>
        </div>
    )
}
