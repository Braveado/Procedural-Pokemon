import React, {useEffect} from 'react'

export default function Tools() {
    // Change title.
    useEffect (() => {
        document.title = 'About - Procedural Pokémon';
    }, []);

    return (
        <div className="flex flex-col gap-8 justify-start items-center p-8 w-full">              
            <div id="sectionName" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">About</p>
                    <p className="text-base text-gray-400">General information.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    Place holder.                   
                </div>                                                            
            </div>
        </div>
    )
}
