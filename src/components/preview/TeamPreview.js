import React from 'react';
import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import PokemonPreview from './PokemonPreview';
import invalid from '../../assets/unown-question.png';

export default function TeamPreview({ previews }) {
    const context = React.useContext(TeamBuilderContext);

    const getValidPreviews = () => {
        let count = 0;
        previews.forEach(p => { 
            if(p != null)
                count += 1;            
        });
        return count;
    }
    
    const setPreviews = () => {
        return (
            previews.map((p, i) => {
                if(p){
                    return <PokemonPreview key={i} preview={p} />
                }
                else{
                    return (
                        <div key={i} className="relative w-24 h-24 animate-enter" >
                            <div className="absolute w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-200 ring ring-gray-100 animate-pulse" />
                            <img src={invalid}
                                alt="" width="96px" height="96px"
                                className="absolute w-24 h-24 animate-wiggle"
                            />
                        </div>
                    )
                }
            })
        );
    }    

    return (
        <div id="preview" className="flex flex-col w-full">
            <div className="flex justify-between items-center gap-4 text-center">
                <span className="flex gap-4 items-center">
                    <p className="text-lg">Team Preview</p>
                    <p className="text-base text-gray-400">See your current team.</p>
                </span>
                <p className="text-lg">{getValidPreviews()}/{context.selectionsNeeded.pokemons} Pokémon Ready</p>
            </div>            
            <div className={`flex flex-wrap justify-center items-center gap-4 p-4 w-full border-2 rounded-md border-gray-200 transition duration-150 ease-in-out
                ${getValidPreviews() >= context.selectionsNeeded.pokemons ? 'border-green-200 ring ring-green-100' : ''}`}>
                { setPreviews() }
            </div>            
        </div>
    );    
}
