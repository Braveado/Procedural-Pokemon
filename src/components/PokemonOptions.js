import React from 'react'

export default function PokemonOptions({ options }) {
    // Set options.
    const renderOptions = () => {
        if (options.length) {
            return (
                options.map(p => (
                    <div 
                        key={p.id}
                        className="flex flex-col gap-4 justify-start items-center bg-white rounded-md p-4 w-48"
                    >
                        <img 
                            src={p.sprites.front_default} alt="sprite" width="96px" height="96px"
                            className="align-center"
                        />
                        {p.name}                        
                    </div>
                ))
            );
        } else {
            return (                
                <div className="bg-white rounded-md p-4">
                    No pokemon options
                </div>            
            );
        }
    }

    // Render.
    return (
        <div className="flex flex-wrap justify-center items-center gap-4">
            {renderOptions()}
        </div>
    );    
}
