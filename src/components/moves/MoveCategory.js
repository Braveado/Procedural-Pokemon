import React from 'react'

export default function MoveCategory({category, size = 'md'}) {
    const getColor = () => {
        switch(category){
            case 'physical': return 'bg-red-600';
            case 'special': return 'bg-blue-600';
            case 'status': return 'bg-gray-400';
            default: break;
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
            {category}
        </p>
    )
}
