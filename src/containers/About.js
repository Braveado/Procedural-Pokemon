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
                        So... I like games about decisions, opportunity cost, and variables.
                        Pokémon should be a natural fit, but I find the mainline games too easy to keep me engaged.
                        I found out the Nuzlocke challenge long ago, but it was until the randomness factor was added with the Randomlocke challenge that It caught my attention.
                        I watched people doing them first to see if I wanted to try something like that, but since the things I liked most was the team drafting and random battles, I decided to instead search for a way of doing just that.
                    </p>
                    <p>
                        Enter Pokémon Showdown with their random battle formats.
                        I tried them out and at first it was a good fix for what I wanted, but the more games I played the more I started to see limitations in their random team generation that left me wanting more.
                        You also don't get to draft your team in those formats, so the other big thing I was looking for wasn't there.
                    </p>
                    <p>
                        I kept looking and found PokéApi.
                        I immediately began thinking about the possibilities and made a bare bones web app that only gave you 9 random pokémon upon loading...
                        Evidently, I kept going.
                    </p>                
                </div>                                                            
            </div>
            <div id="sectionName" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Design Philosophy</p>
                    <p className="text-base text-gray-400">Reasoning behind the format rules.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">   
                    <p>
                        The Pokémon battle system as a baseline offers a lot of options to play with, those can be easily multiplied by allowing unnatural combinations, but this creates a lot of unbalanced and unusable combinations as well. With the goal of maximizing options while maintaining balance, the generation process was made with the following design pillars in mind:
                    </p>                                     
                    <ul className="space-y-2 list-disc">   
                        <li>
                            Healthy normal distribution of pokémon.
                            <ul className="pl-4 text-gray-600 text-sm">
                                <li>Comparing possible pokémon on a normal distribution, extremes had to be trimmed to help the average team remain competitive.</li>
                                <li>A total base stats range of 360 to 720 makes it so that most fully evolved pokémon are taken into account and the high end remains populated mostly by iconic pokémon.</li>
                            </ul>
                        </li>                     
                        <li>
                            Maximize team choices.
                            <ul className="pl-4 text-gray-600 text-sm">
                                <li>Options that allow the use of powerful but restrictive combinations hurt the drafting process by forcing choices, filters had to be used to minimize this.</li>
                                <li>A "top" pokémon balance and "shiny bonus" of 1 per team each, helps the average team remain competitive while supporting the drafting process by being consistent.</li>
                            </ul>
                        </li>
                        <li>
                            Self team usability.
                            <ul className="pl-4 text-gray-600 text-sm">                                
                                <li>A team should be able to benefit from their own generated options regardless of any opposing team.</li>
                                <li>Prevent the generation of options unusable by themselves.</li>
                                <li>Allow options unusable by themselves to appear if they would count as usable in combination with a current option.</li>                                
                            </ul>
                        </li>
                        <li>
                            Imperfect teams.
                            <ul className="pl-4 text-gray-600 text-sm">
                                <li>Multiple layers of randomness helps the average team remain competitive.</li>
                                <li>Enough space is left for high and low rolls to keep things intresting and exciting without breaking team balance.</li>                                
                            </ul>
                        </li>
                        <li>
                            Limited draft.
                            <ul className="pl-4 text-gray-600 text-sm">                                
                                <li>Having a large amount of options hurts the drafting process by causing analysis paralysis to unfamiliar players and increases the chances of reliable combinations for experienced players.</li>
                                <li>A healthy amount of options is presented so that luck and knowledge both play a part in drafting good teams.</li>
                            </ul>
                        </li>             
                    </ul>
                </div>                                                            
            </div>
            <div id="sectionName" className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-4 text-center">                    
                    <p className="text-lg">Organized Play</p>
                    <p className="text-base text-gray-400">A few ways of playing.</p>
                </div>            
                <div className="flex flex-col justify-start items-start gap-4 p-4 w-full border-t-2 border-gray-200">
                    <ul className="">
                        <li>
                            Blind match.
                            <ul className="pl-4 text-gray-600 text-sm">                                                                
                                <li>2 players create their teams and start a match without knowledge of the opposing team.</li>
                                <li>Single matches provide a similar feel to trainer battles on a Randomlocke challenge.</li>
                                <li>Best of 3 provides a mix between a blind match and a preview match, as players improvise and adapt.</li>
                            </ul>
                        </li>                        
                        <li>
                            Preview match.
                            <ul className="pl-4 text-gray-600 text-sm">                                                                
                                <li>2 players create their teams and start a match with knowledge of the opposing team (pokepaste is recommended).</li>
                                <li>Single matches provide a way to plan a strategy ahead of time and then put it in practice.</li>
                                <li>Best of 3 provides the feeling of a classic tournament bracket.</li>
                            </ul>
                        </li>                        
                        <li>
                            Community tournament.
                            <ul className="pl-4 text-gray-600 text-sm">
                                <li>An amount of players create their teams, are organized in tournament brackets, and knowledge of all created teams is provided to every player.</li>
                                <li>Single match brackets provide a way to advance a tournament quickly.</li>
                                <li>Best of 3 brackets are the classic tournament bracket.</li>
                            </ul>
                        </li>                        
                    </ul>
                </div>                                                            
            </div>
        </div>
    )
}
