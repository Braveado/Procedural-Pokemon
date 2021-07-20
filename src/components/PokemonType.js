import React from 'react'

export default function PokemonType({type}) {
    return (
        <p className={`flex items-center justify-center capitalize text-sm px-1.5 py-0.5 rounded-md text-white text-bold bg-${type}`}>
            {type}
        </p>
    )
}
