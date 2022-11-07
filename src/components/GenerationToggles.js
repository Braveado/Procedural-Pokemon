import React from 'react';
import { TeamBuilderContext } from '../context/TeamBuilderContext';
import {toggle as toggleTooltips} from '../constants/tooltips';

export default function GenerationToggles() {
    const context = React.useContext(TeamBuilderContext);

    return (
        <div id="toggles" className="flex flex-col w-full">
            <div className="flex justify-between items-center gap-4 text-center">
                <span className="flex gap-4 items-center">
                    <p className="text-lg">Toggles</p>
                    <p className="text-base text-gray-400">Customize the generation process.</p>
                </span>                
            </div>            
            <div className="flex flex-wrap justify-center items-center gap-4 p-4 w-full border-2 rounded-md border-gray-200">
                <div
                    className="flex gap-2 items-center justify-center p-4 rounded-md  border-2 w-48 border-gray-200">
                    <p className="border-b border-dashed border-gray-600 text-gray-600" data-tip={toggleTooltips[0]} data-for={'toggle'}>
                        Blind
                    </p>
                </div>
                <div
                    className="flex gap-2 items-center justify-center p-4 rounded-md  border-2 w-48 border-gray-200">
                    <p className="border-b border-dashed border-gray-600 text-gray-600" data-tip={toggleTooltips[1]} data-for={'toggle'}>
                        Doubles
                    </p>
                </div>
                <button type="button" onClick={() => context.toggleGeneration({megas: !context.generationToggles.megas})}
                    className={`flex gap-2 items-center justify-center p-4 rounded-md hover:bg-gray-200 border-2 w-48 transition duration-150 ease-in-out
                    ${context.generationToggles.megas ? 'bg-green-100 border-green-200 ring ring-green-100' : 'bg-white  border-gray-200 '}`}>
                    <p className="border-b border-dashed border-gray-600 text-gray-600" data-tip={toggleTooltips[2]} data-for={'toggle'}>
                        Stoneless Megas
                    </p>
                </button>
                <div
                    className="flex gap-2 items-center justify-center p-4 rounded-md  border-2 w-48 border-gray-200">
                    <p className="border-b border-dashed border-gray-600 text-gray-600" data-tip={toggleTooltips[3]} data-for={'toggle'}>
                        Z-Crystals
                    </p>
                </div>
            </div>            
        </div>
    );    
}
