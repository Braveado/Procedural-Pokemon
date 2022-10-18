import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import Moveset from './Moveset';

export default function MovesetOptions({ options }) {
    const context = React.useContext(TeamBuilderContext);

    const selectedMoves  = () => {
        let sm = 0;        
        context.selectionsMade.moves.forEach(m => {
            sm = sm + m
        });
        return sm;
    }

    const setOptions = () => {
        if (options.length) {
            return (
                options.map((m, i) => (
                    <Moveset key={i} index={i} moveset={m} />
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
        <div id="movesets" className="flex flex-col w-full">
            <div className="flex justify-between items-center gap-4 text-center">
                <span className="flex gap-4 items-center">
                    <p className="text-lg">Moveset Options</p>
                    <p className="text-base text-gray-300">Assign your selected pokémon to a moveset and select their moves.</p>
                </span>
                <span className="flex gap-4 items-center">
                    <p className="text-lg">{context.selectionsMade.movesets}/{context.selectionsNeeded.movesets} Pokémon Assigned</p>                    
                </span>
            </div>            
            <div className={`flex flex-wrap justify-center items-start gap-4 p-4 w-full border-2 rounded-md border-gray-200 transition duration-150 ease-in-out
                ${context.selectionsMade.movesets >= context.selectionsNeeded.movesets && 
                selectedMoves() >= context.selectionsNeeded.movesets * context.selectionsNeeded.moves ? 'border-green-200 ring ring-green-100' : ''}`}>
                {setOptions()}
            </div>
        </div>
    )
}
