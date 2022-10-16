import React from 'react';
import { HiOutlineArrowUp, HiOutlineArrowDown } from 'react-icons/hi';

export default function PokemonStats({stats, nature}) {
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

    const getStatWidth = (stat, first = false, total = false) => { 
        if(stat <= 50 || (first && stat <= 120) || (total && stat <= 360))
            return 'w-1/12';
        else if(stat <= 65 || (first && stat <= 130) || (total && stat <= 390))
            return 'w-2/12';
        else if(stat <= 80 || (first && stat <= 140) || (total && stat <= 420))
            return 'w-3/12';
        else if(stat <= 95 || (first && stat <= 150) || (total && stat <= 450))
            return 'w-4/12';
        else if(stat <= 110 || (first && stat <= 160) || (total && stat <= 480))
            return 'w-5/12';
        else if(stat <= 125 || (first && stat <= 170) || (total && stat <= 510))
            return 'w-6/12';
        else if(stat <= 140 || (first && stat <= 180) || (total && stat <= 550))
            return 'w-7/12';
        else if(stat <= 155 || (first && stat <= 190) || (total && stat <= 590))
            return 'w-8/12';
        else if(stat <= 170 || (first && stat <= 200) || (total && stat <= 620))
            return 'w-9/12';
        else if(stat <= 185 || (first && stat <= 210) || (total && stat <= 650))
            return 'w-10/12';
        else if(stat <= 200 || (first && stat <= 220) || (total && stat <= 680))
            return 'w-11/12';
        else
            return 'w-full';            
    }

    return (
        <div className="flex flex-col justify-center items-start w-full text-sm">
            {stats.map((s, i) => {
                return (
                    <div key={i} className="flex w-full gap-2" data-tip data-for={'stat-'+i.toString()}>
                        <div className="flex w-1/3 justify-between items-center">                            
                            <div className={`flex items-center 
                                ${s.stat && nature.increased && s.stat.name === nature.increased.name ? 'text-blue-600' : ''}
                                ${s.stat && nature.decreased && s.stat.name === nature.decreased.name ? 'text-red-600' : ''}`}>
                                <p>{getStatName(i)}</p>
                                {s.stat && nature.increased && s.stat.name === nature.increased.name ? <HiOutlineArrowUp /> : null}
                                {s.stat && nature.decreased && s.stat.name === nature.decreased.name ? <HiOutlineArrowDown /> : null}
                            </div>
                            <p className="">{s.base_stat}</p>                                        
                        </div>
                        <div className="flex w-2/3 relative items-center">
                            <div
                                style={{marginTop: "2px"}}
                                className={`${getStatColor(i)} rounded-md h-3 
                                    ${getStatWidth(i < stats.length - 1 ? s.calculated_stat : s.base_stat, (i === 0), (i === stats.length - 1))}
                                `}
                            />
                            <div className="absolute w-full h-full">
                                {i < stats.length - 1 ? 
                                    <div className="px-2 flex items-center justify-between text-xs text-gray-600 w-full h-full">
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
