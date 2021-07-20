import React from 'react';
import PokemonType from './PokemonType';

export default function PokemonOptions({ options }) {
    const getStatName = (stat) => {
        switch (stat) {
            case 0: return 'HP';
            case 1: return 'Atk';
            case 2: return 'Def';
            case 3: return 'SA';
            case 4: return 'SD';
            case 5: return 'Spe';
            default: break;
        }
    }

    const getTotalStats = (stats) => {
        let total = 0;
        stats.forEach(s => {
            total = total + s.base_stat; 
        });        
        return total;
    }
    
    const setOptions = () => {
        if (options.length) {
            return (
                options.map(p => (
                    <div 
                        key={p.id}
                        className="flex flex-col gap-2 justify-start items-center bg-white rounded-md p-4 w-48 h-auto"
                    >
                        <img 
                            src={p.sprites.front_default} alt="sprite" width="96px" height="96px"
                            className="align-center"
                        />
                        <div className="capitalize">{p.name.replace(/-/g, " ")}</div>
                        <div className="flex justify-center items-center gap-2">
                            {p.types.map((t, i) => {
                                return (                                    
                                    <PokemonType key={i} type={t.type.name} />
                                )
                            })}                           
                        </div>
                        <div className="flex flex-col justify-center items-start w-full text-sm">
                            {p.stats.map((s, i) => {
                                return (
                                    <div key={i} className="flex w-full">
                                        <p className="w-10">{getStatName(i)}:</p>
                                        <p>{s.base_stat}</p>                                        
                                    </div>
                                )
                            })}                            
                            <div className="flex w-full">
                                <p className="w-10">Total:</p>
                                <p>{getTotalStats(p.stats)}</p>
                            </div>
                        </div>                        
                    </div>
                ))
            );
        } else {
            return (                
                <div className="p-4 text-gray-300">
                    Empty
                </div>            
            );
        }
    }

    // Render.
    return (
        <div className="flex flex-col w-full">
            <p className="text-lg">Pokemon Options</p>
            <div className="flex flex-wrap justify-center items-center gap-4 p-4 w-full border-2 rounded-md border-gray-200">
                {setOptions()}
            </div>
        </div>
    );    
}
