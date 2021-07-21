import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilder';
import Move from './Move';

export default function Moveset({ moveset }) {
    const context = React.useContext(TeamBuilderContext);
    const setMoves = () => {
        if (moveset.length) {
            return (
                moveset.map(m => (
                    <Move key={m.id} move={m} />
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
            <p className="text-lg">{context.selectionsMade.moves}/{context.selectionsNeeded.moves} Moves Selected</p>
            <div className="flex flex-col gap-2 justify-start items-center rounded-md p-4 w-96 h-auto border-2 border-gray-200 transition duration-150 ease-in-out">
                {setMoves()}
            </div>
        </div>
    )
}
