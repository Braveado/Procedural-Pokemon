import React from 'react'
import {effects as effectTooltips} from '../constants/tooltips';

export default function TooltipTags({effect}){

    const validateTags = (currentData, incomingKey) => {
        return !(
            (currentData.includes(effectTooltips[2][1]) && effectTooltips[4][0].includes(incomingKey)) ||       // crit rate / stages
            ((currentData.includes(effectTooltips[19][1]) ||
                currentData.includes(effectTooltips[20][1]) ||
                currentData.includes(effectTooltips[21][1]) ||
                currentData.includes(effectTooltips[22][1])) && effectTooltips[23][0].includes(incomingKey)) || // 4x terrains / terrain
            (currentData.includes(effectTooltips[6][1]) && effectTooltips[7][0].includes(incomingKey))          // bad posion / poison
        )
    }

    const getTooltips = () => {
        if(effect){

            let formattedEffect = effect.toLowerCase().replace(/[.,]/g, "");
            let tooltipData=[];
            
            effectTooltips.forEach(data => {                                
                data[0].forEach(key => {
                    if(!tooltipData.includes(data[1]) && formattedEffect.match(new RegExp('\\b'+key, 'g'))){
                        if(validateTags(tooltipData, key))
                            tooltipData.push(data[1])
                    }
                });                            
            });

            return (tooltipData.map((d, i) => {
                return (
                    <p className="border-b border-dashed border-gray-600" key={i} data-tip={[d]} data-for={'effects'}>
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