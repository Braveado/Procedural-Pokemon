import React from 'react'
import * as tooltips from '../constants/tooltips';

export default function TooltipTags({effect}){

    const getTooltips = () => {
        if(effect){

            let formattedEffect = effect.toLowerCase().replace(/[.,]/g, "");
            let tooltipData=[];
            
            tooltips.data.forEach(data => {                
                data[0].forEach(key => {
                    if(!tooltipData.includes(data[1]) && formattedEffect.match(new RegExp('\\s'+key, 'g'))){
                        tooltipData.push(data[1])
                    }
                });            
            });

            return (tooltipData.map((d, i) => {
                return (
                    <p className="border-b border-dashed border-gray-600" key={i} data-tip={[d]} data-for={'dynamic'}>
                        {d.split("|")[0]}
                    </p>
                )
            }));
        }
        else return null;
    }

    return(
        <div className="text-sm w-full flex flex-wrap justify-center items-center gap-2 text-gray-600">
            {getTooltips()}
        </div>
    )
}