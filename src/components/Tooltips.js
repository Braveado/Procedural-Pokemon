import React, {useEffect} from 'react'
import ReactTooltip from 'react-tooltip';

export default function Tooltips() {
    // Rebind tooltips when component mounts/update.
    useEffect(() => {
        ReactTooltip.rebuild()
    });

    // Format dynamic tooltip.
    const formatTooltipData = (data) => {   
        ReactTooltip.rebuild();     
        if(data){
            let dataArray = data.split('+').map(d => {return {header: d.split('|')[0], content: d.split('|')[1]}})            
            return (dataArray.map((d, i) => {
                return(
                    <div className="text-center" key={i}>
                        <p>{d.header}</p>
                        <p>{d.content}</p>
                    </div>
                );
            }))
        }
        else {
            return null;
        }
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
                    <p>Determines damage received when hit by a physical move.</p>               
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
                    <p>Determines damage received when hit by a special move.</p>               
                </div>
            </ReactTooltip> 
            <ReactTooltip id="stat-5" delayShow={200}>
                <div className="text-center">
                    <p>Speed</p>
                    <p>Determines the turn order in battle.</p>               
                </div>
            </ReactTooltip>
            <ReactTooltip id="height" delayShow={200}>
                <div className="text-center">
                    <p>Height</p>
                    <p>How tall the pokemon is.</p>
                </div>
            </ReactTooltip>
            <ReactTooltip id="weight" delayShow={200}>
                <div className="text-center">
                    <p>Weight</p>
                    <p>How heavy the pokemon is.</p>               
                </div>
            </ReactTooltip>
            <ReactTooltip id="gender" delayShow={200}>
                <div className="text-center">
                    <p>Genders</p>
                    <p>Possible genders for the pokemon.</p>              
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
