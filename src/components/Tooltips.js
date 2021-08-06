import React, {useEffect} from 'react'
import ReactTooltip from 'react-tooltip';

export default function Tooltips() {
    // Rebind tooltips when component mounts/update.
    useEffect(() => {
        ReactTooltip.rebuild()
    });

    return (
        <div>
            <ReactTooltip id="stat-0" delayShow={200}>
                <p className="text-center">Hit Points</p><p>Determines the total damage a Pokémon can receive before fainting.</p>
            </ReactTooltip>   
            <ReactTooltip id="stat-1" delayShow={200}>
                <p className="text-center">Attack</p><p>Determines damage dealt when using a physical move.</p>               
            </ReactTooltip>    
            <ReactTooltip id="stat-2" delayShow={200}>
                <p className="text-center">Defense</p><p>Determines damage received when hit by a physical move.</p>               
            </ReactTooltip>   
            <ReactTooltip id="stat-3" delayShow={200}>
                <p className="text-center">Special Attack</p><p>Determines damage dealt when using a special move.</p>               
            </ReactTooltip>
            <ReactTooltip id="stat-4" delayShow={200}>
                <p className="text-center">Special Defense</p><p>Determines damage received when hit by a special move.</p>               
            </ReactTooltip> 
            <ReactTooltip id="stat-5" delayShow={200}>
                <p className="text-center">Speed</p><p>Determines the turn order in battle.</p>               
            </ReactTooltip>
            <ReactTooltip id="height" delayShow={200}>
                <p className="text-center">Height</p><p>How tall the Pokémon is.</p>
            </ReactTooltip>
            <ReactTooltip id="weight" delayShow={200}>
                <p className="text-center">Height</p><p>How heavy the Pokémon is.</p>               
            </ReactTooltip>
            <ReactTooltip id="gender" delayShow={200}>
                <p className="text-center">Genders</p><p>Possible genders for the Pokémon.</p>              
            </ReactTooltip>
            <ReactTooltip id="pp" delayShow={200}>
                <p className="text-center">Power Points</p><p>How many times the move can be used.</p>              
            </ReactTooltip>
            <ReactTooltip id="power" delayShow={200}>
                <p className="text-center">Power</p><p>Determines damage dealt by the move.</p>
            </ReactTooltip>
            <ReactTooltip id="accuracy" delayShow={200}>
                <p className="text-center">Accuracy</p><p>Determines how likely the move is to hit.</p>              
            </ReactTooltip>
        </div>
    )
}
