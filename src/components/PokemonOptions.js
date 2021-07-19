import React from 'react'

export default function PokemonOptions({ options }) {
    if (options.length) {
        return (
            <div>
                {options.map(p => (
                    <div key={p.id}>{p.name}</div>
                ))}
            </div>
        )
    }
    else {
        return (
            <div>
                No pokemon options
            </div>
        )
    }
    
}
