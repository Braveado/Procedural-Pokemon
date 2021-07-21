import React from 'react'

export default function MoveCategory({category}) {
    const getColor = () => {
        switch(category){
            case 'physical': return 'bg-red-600';
            case 'special': return 'bg-blue-600';
            case 'status': return 'bg-gray-400';
            default: break;
        }
    }

    return (
        <p className={`flex items-center justify-center w-16 capitalize text-sm px-1.5 py-0.5 rounded-md text-white font-semibold ${getColor()}`}>
            {category}
        </p>
    )
}
