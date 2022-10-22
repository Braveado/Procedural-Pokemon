import React from 'react'
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import Item from './Item';

export default function ItemOptions({options}) {
    const context = React.useContext(TeamBuilderContext);

    const setOptions = () => {
        if (options.length) {
            return (
                options.map((it, i) => (
                    <Item key={i} index={i} item={it} />
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
        <div id="items" className="flex flex-col w-full">
            <div className="flex justify-between items-center gap-4 text-center">
                <span className="flex gap-4 items-center">
                    <p className="text-lg">Item Options</p>
                    <p className="text-base text-gray-400">Assign your selected pokémon to an item.</p>
                </span>
                <span className="flex gap-4 items-center">
                    <p className="text-lg">{context.selectionsMade.items}/{context.selectionsNeeded.items} Pokémon Assigned</p>                    
                </span>
            </div>            
            <div className={`flex flex-wrap justify-center items-start gap-4 p-4 w-full border-2 rounded-md border-gray-200 transition duration-150 ease-in-out
                ${context.selectionsMade.items >= context.selectionsNeeded.items ? 'border-green-200 ring ring-green-100' : ''}`}>
                {setOptions()}
            </div>
        </div>
    )
}
