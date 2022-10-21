import React from 'react';
import { HiOutlineArrowUp, HiOutlineArrowDown } from 'react-icons/hi';
import {statRanges} from '../../constants/team';

const getStatName = (stat) => {
    switch (stat) {
        case 0: return 'HP';
        case 1: return 'Atk';
        case 2: return 'Def';
        case 3: return 'SpA';
        case 4: return 'SpD';
        case 5: return 'Spe';
        case 6: return 'Total';
        default: break;
    }
}

const getStatColor = (stat) => {
    switch (stat) {
        case 0: return 'bg-red-400';
        case 1: return 'bg-yellow-500';
        case 2: return 'bg-yellow-300';
        case 3: return 'bg-green-400';
        case 4: return 'bg-blue-400';
        case 5: return 'bg-purple-400';
        case 6: return 'bg-gray-300';
        default: break;
    }
}

const getStatPercentage = (range, input) => {
    return ((input - range[0]) * 100) / (range[1] - range[0]); // 12.34
}

export default function PokemonStats({stats, nature}) {        

    const statStep = 100 / 12; // 8.33

    const getStatStep = (stat, statRange) => {
        const statPercent = getStatPercentage(statRange, stat);
        if(statPercent <= statStep * 1)
            return 'w-1/12';
        else if(statPercent <= statStep * 2)
            return 'w-2/12';
        else if(statPercent <= statStep * 3)
            return 'w-3/12';
        else if(statPercent <= statStep * 4)
            return 'w-4/12';
        else if(statPercent <= statStep * 5)
            return 'w-5/12';
        else if(statPercent <= statStep * 6)
            return 'w-6/12';
        else if(statPercent <= statStep * 7)
            return 'w-7/12';
        else if(statPercent <= statStep * 8)
            return 'w-8/12';
        else if(statPercent <= statStep * 9)
            return 'w-9/12';
        else if(statPercent <= statStep * 10)
            return 'w-10/12';
        else if(statPercent <= statStep * 11)
            return 'w-11/12';
        else if(statPercent <= statStep * 12)
            return 'w-full';
        else if(statPercent > statStep * 12)
            return 'w-full animate-pulse';
    }

    return (
        <div className="flex flex-col justify-center items-start w-full text-sm">
            {stats.map((s, i) => {
                return (
                    <div key={i} className="flex w-full gap-2">
                        <div className="flex w-1/3 justify-between items-center">                            
                            <div className={`flex items-center 
                                ${s.stat && nature.increased && s.stat.name === nature.increased.name ? 'text-blue-600' : ''}
                                ${s.stat && nature.decreased && s.stat.name === nature.decreased.name ? 'text-red-600' : ''}`}>
                                <p className="border-b border-dashed border-gray-600" data-tip data-for={'stat-'+i.toString()}>
                                    {getStatName(i)}
                                </p>
                                {s.stat && nature.increased && s.stat.name === nature.increased.name ? <HiOutlineArrowUp /> : null}
                                {s.stat && nature.decreased && s.stat.name === nature.decreased.name ? <HiOutlineArrowDown /> : null}
                            </div>
                            <p className="">{s.base_stat}</p>                                        
                        </div>
                        <div className="flex w-2/3 relative items-center">
                            <div
                                style={{marginTop: "2px"}}
                                className={`${getStatColor(i)} rounded-md h-3
                                    ${i === 0 ? getStatStep(s.calculated_stat, statRanges.hp) : ''}
                                    ${i > 0 && i < stats.length - 1 ? getStatStep(s.calculated_stat, statRanges.general) : ''}
                                    ${i === stats.length - 1 ? getStatStep(s.base_stat, statRanges.total) : ''}
                                `}
                            />
                            <div className="absolute w-full h-full">
                                {i < stats.length - 1 ? 
                                    <div
                                        style={{marginTop: "1px"}} 
                                        className="px-2 flex items-center justify-between text-xs text-gray-600 w-full h-full">
                                        <p>{s.ev} / {s.iv}</p>
                                        <p>{s.calculated_stat}</p>
                                    </div>
                                : null}                                
                            </div>
                        </div>
                    </div>
                )
            })}                                        
        </div>
    )
}

export {
    getStatName, getStatColor, getStatPercentage
}
