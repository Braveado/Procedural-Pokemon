import React from 'react'

export default function PokemonStats({stats}) {
    const getStatName = (stat) => {
        switch (stat) {
            case 0: return 'HP';
            case 1: return 'Atk';
            case 2: return 'Def';
            case 3: return 'SA';
            case 4: return 'SD';
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

    const getStatWidth = (stat, total = false) => { 
        if(stat <= 33 || (total && stat <= 300))
            return 'w-2/12';
        else if(stat <= 46 || (total && stat <= 340))
            return 'w-3/12';
        else if(stat <= 59 || (total && stat <= 380))
            return 'w-4/12';
        else if(stat <= 72 || (total && stat <= 420))
            return 'w-5/12';
        else if(stat <= 85 || (total && stat <= 460))
            return 'w-6/12';
        else if(stat <= 98 || (total && stat <= 500))
            return 'w-7/12';
        else if(stat <= 111 || (total && stat <= 540))
            return 'w-8/12';
        else if(stat <= 124 || (total && stat <= 580))
            return 'w-9/12';
        else if(stat <= 137 || (total && stat <= 620))
            return 'w-10/12';
        else if(stat <= 150 || (total && stat <= 660))
            return 'w-11/12';
        else
            return 'w-full';            
    }    

    return (
        <div className="flex flex-col justify-center items-start w-full text-sm">
            {stats.map((s, i) => {
                return (
                    <div key={i} className="flex w-full" data-tip data-for={'stat-'+i.toString()}>
                        <div className="flex w-1/2">
                            <p className="w-1/2">{getStatName(i)}:</p>
                            <p className="w-1/2">{s.base_stat}</p>                                        
                        </div>
                        <div className="flex w-1/2">
                            <div className={`flex ${getStatColor(i)} rounded-md my-1 ${getStatWidth(s.base_stat, (i === stats.length - 1))}`}/>
                        </div>
                    </div>
                )
            })}                                        
        </div>
    )
}
