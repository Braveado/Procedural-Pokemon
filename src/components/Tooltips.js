import React, {useEffect} from 'react'
import ReactTooltip from 'react-tooltip';

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
            <ReactTooltip id="toggle" delayShow={200} getContent={(dataTip) => formatTooltipData(dataTip)}/>
            <ReactTooltip id="pokemon" delayShow={200} getContent={(dataTip) => formatTooltipData(dataTip)}/>
            <ReactTooltip id="moves" delayShow={200} getContent={(dataTip) => formatTooltipData(dataTip)}/>
            <ReactTooltip id="effects" delayShow={200} getContent={(dataTip) => formatTooltipData(dataTip)}/>
        </div>
    )
}
