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
                    <p className="text-base text-gray-400">Where does this come from?</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                <p>
                    So... I like games about decisions, opportunity cost, and variables. Pokémon should be a natural fit, but I find the mainline games too easy to keep me engaged. I found out the Nuzlocke challenge long ago, but it was until the randomness factor was added with the Randomlocke challenge that It caught my attention. I watched people doing them first to see if I wanted to try something like that, but since the thing I liked most was the team drafting and random battles, I decided to instead search for a way of doing just that.
                </p>
                <p>
                    Enter Pokémon Showdown with their random battle formats. I tried them out and at first it was a good fix for what I wanted, but the more games I played the more I started to see limitations in their random team generation that left me wanting more. You also don't get to draft your team in those formats, so the other big thing I was looking for wasn't there.
                </p>
                <p>
                    I kept looking and found PokéApi. I immediately began thinking about the possibilities and made a bare bones web app that only gave you 9 random pokémon upon loading... Evidently, I kept going.
                </p>                
                </div>                                                            
            </div>
            <div id="sectionName" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Design Philosophy</p>
                    <p className="text-base text-gray-400">Reasoning behind the format rules.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">                                        
                    <ul className="list-disc">
                        <li>Usability Line / Allow anything usable.</li>                        
                        <li>Imperfect Teams / Multiple axes of randomness.</li>
                        <li>Lucky Skill / Maintain the randomlocke spirit.</li>                        
                    </ul>
                </div>                                                            
            </div>
            <div id="sectionName" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Support</p>
                    <p className="text-base text-gray-400">Further development.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    <ul className="">
                        <li>Minimize wiki use</li>                        
                        <li>Add missing options</li>
                        <li>Ads / donations ?</li>                        
                    </ul>
                </div>                                                            
            </div>
        </div>
    )
}
