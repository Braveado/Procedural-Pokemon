import React, {useEffect} from 'react'
import ReactTooltip from 'react-tooltip';
//import * as tooltips from '../constants/tooltips';

export default function Tooltips() {
    // Rebind tooltips when component mounts/update.
    useEffect(() => {
        ReactTooltip.rebuild()
    });

    // Format dynamic tooltip.
    const formatTooltipData = (data) => {   
        if(!data)
            return null;        
        data = data.split("|");
        if(data.length === 2){
            let header = data[0];
            let content = data[1].split("*");
            return(
                <div className="text-center">
                    <p>{header}</p>
                    {content.map((c, i) => {return <p key={i}>{c}</p>})}
                </div>
            );            
        }
        else return null;
    }

    return (
        <div>
            <ReactTooltip id="stat-0" delayShow={200}>
                <div className="text-center">
                    <p>Hit Points</p>
                    <p>Determines the total damage a pokemon can receive before fainting.</p>
                </div>
            </ReactTooltip>   
            <ReactTooltip id="stat-1" delayShow={200}>
                <div className="text-center">
                    <p>Attack</p>
                    <p>Determines damage dealt when using a physical move.</p> 
                </div>              
            </ReactTooltip>    
            <ReactTooltip id="stat-2" delayShow={200}>
                <div className="text-center">
                    <p>Defense</p>
                    <p>Mitigates damage received when hit by a physical move.</p>               
                </div>
            </ReactTooltip>   
            <ReactTooltip id="stat-3" delayShow={200}>
                <div className="text-center">
                    <p>Special Attack</p>
                    <p>Determines damage dealt when using a special move.</p>               
                </div>
            </ReactTooltip>
            <ReactTooltip id="stat-4" delayShow={200}>
                <div className="text-center">
                    <p>Special Defense</p>
                    <p>Mitigates damage received when hit by a special move.</p>               
                </div>
            </ReactTooltip> 
            <ReactTooltip id="stat-5" delayShow={200}>
                <div className="text-center">
                    <p>Speed</p>
                    <p>Determines the turn order in battle.</p>               
                </div>
            </ReactTooltip>
            <ReactTooltip id="nature" delayShow={200}>
                <div className="text-center">
                    <p>Nature</p>
                    <p>Usually affects two stats excluding HP, increasing one by 10% and decreasing another by 10%.</p>
                </div>
            </ReactTooltip>
            <ReactTooltip id="gender" delayShow={200}>
                <div className="text-center">
                    <p>Gender</p>
                    <p>Selected from the possible genders of the pokemon.</p>              
                </div>
            </ReactTooltip>
            <ReactTooltip id="height_weight" delayShow={200}>
                <div className="text-center">
                    <p>Height and Weight</p>
                    <p>How tall and heavy is the pokemon.</p>
                </div>
            </ReactTooltip>
            <ReactTooltip id="pp" delayShow={200}>
                <div className="text-center">
                    <p>Power Points</p>
                    <p>How many times the move can be used.</p>              
                </div>
            </ReactTooltip>
            <ReactTooltip id="power" delayShow={200}>
                <div className="text-center">
                    <p>Power</p>
                    <p>Determines damage dealt by the move.</p>
                </div>
            </ReactTooltip>
            <ReactTooltip id="accuracy" delayShow={200}>
                <div className="text-center">
                    <p>Accuracy</p>
                    <p>Determines how likely the move is to hit.</p>              
                </div>
            </ReactTooltip>
            <ReactTooltip id="dynamic" delayShow={200} getContent={(dataTip) => formatTooltipData(dataTip)}/>
        </div>
    )
}
