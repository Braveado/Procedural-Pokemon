import React from 'react'

export default function PokemonType({type, size = 'md'}) {
    const getColor = () => {
        switch(type) {
            case 'normal': return 'bg-normal';
            case 'fire': return 'bg-fire';
            case 'water': return 'bg-water';
            case 'grass': return 'bg-grass';
            case 'electric': return 'bg-electric';
            case 'ice': return 'bg-ice';
            case 'fighting': return 'bg-fighting';
            case 'poison': return 'bg-poison';
            case 'ground': return 'bg-ground';
            case 'flying': return 'bg-flying';
            case 'psychic': return 'bg-psychic';
            case 'bug': return 'bg-bug';
            case 'rock': return 'bg-rock';
            case 'ghost': return 'bg-ghost';
            case 'dark': return 'bg-dark';
            case 'dragon': return 'bg-dragon';
            case 'steel': return 'bg-steel';
            case 'fairy': return 'bg-fairy';
            default: return '';
        }
    }    

    const getSize = () => {
        switch(size){
            case 'sm':
                return 'w-auto text-xs px-1 py-0.5'
            default:
                return 'w-16 text-sm px-1.5 py-0.5';
        }
    }

    return (
        <p className={`flex items-center justify-center ${getSize()} capitalize rounded-md text-white font-semibold ${getColor()}`}>
            {type}
        </p>
    )
}
