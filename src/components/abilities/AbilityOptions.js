import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import Ability from './Ability';

export default function AbilityOptions({options}) {
    const context = React.useContext(TeamBuilderContext);

    const setOptions = () => {
        if (options.length) {
            return (
                options.map((a, i) => (
                    <Ability key={i} index={i} ability={a} />
                ))                
            );
        } else {
            return (                
                <div className="p-4 text-gray-400">
                    Empty
                </div>            
            );
        }
    }

    return (
        <div id="abilities" className="flex flex-col w-full">
            <div className="flex justify-between items-center gap-4 text-center">
                <span className="flex gap-4 items-center">
                    <p className="text-lg">Ability Options</p>
                    <p className="text-base text-gray-400">Assign your selected pokémon to an ability.</p>
                </span>
                <span className="flex gap-4 items-center">
                    <p className="text-lg">{context.selectionsMade.abilities}/{context.selectionsNeeded.abilities} Pokémon Assigned</p>                    
                </span>
            </div>            
            <div className={`flex flex-wrap justify-center items-start gap-4 p-4 w-full border-2 rounded-md border-gray-200 transition duration-150 ease-in-out
                ${context.selectionsMade.abilities >= context.selectionsNeeded.abilities ? 'border-green-200 ring ring-green-100' : ''}`}>
                {setOptions()}
            </div>
        </div>
    )
}
