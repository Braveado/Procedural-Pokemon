import React from 'react'
//import { TeamBuilderContext } from '../../context/TeamBuilderContext';
import PokemonSprite from '../pokemon/PokemonSprite';
import PokemonType from '../pokemon/PokemonType';
import MoveCategory from '../moves/MoveCategory';

export default function PokemonPreview({preview}) {
    //const context = React.useContext(TeamBuilderContext);

    return (
        <div className="animate-enter flex flex-col gap-2 justify-center items-center bg-white rounded-md p-2 w-96 h-auto border-2 border-gray-200 transition duration-150 ease-in-out">                                    
            <div className="grid grid-cols-2 grid-rows-1 w-full">
                <div className="flex items-center justify-center">
                    <PokemonSprite pokemon={preview.pokemon} types={true} stats={true} /> 
                </div>                
                <div className="flex flex-col items-center justify-between">
                    <div className="bg-white rounded-md p-0 w-full h-8 border-none border-gray-200 flex gap-1 px-1 items-center justify-center text-xs capitalize">
                        {/* <input type="text" placeholder="Nickname" value={preview.pokemon.nickname} onChange={(e) => context.setNickname(preview.pokemon.id, e.target.value)} 
                            className="w-full border-b-2 border-gray-200 text-center focus:outline-none"
                        /> */}
                        <p className="capitalize w-full truncate text-center">{preview.pokemon.name.replace(/-/g, " ")} {`Lv${preview.pokemon.level}`}</p>
                    </div>    
                    <div className="w-full flex flex-col">
                        <div className="bg-white rounded-md p-0 w-full h-8 border-2 border-gray-200 flex gap-1 px-1 items-center justify-center text-xs capitalize">
                            {preview.ability.name.replace(/-/g, " ")}
                        </div>    
                        <div className="bg-white rounded-md p-0 w-full h-8 border-2 border-gray-200 flex gap-1 px-1 items-center justify-center text-xs capitalize">
                            {preview.item.sprites.default ? <img src={preview.item.sprites.default} alt="" width="30px" height="30px"/> : null}
                            <p className="capitalize">{preview.item.name.replace(/-/g, " ")}</p> 
                        </div>
                    </div>                        
                </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 w-full">
                {
                    preview.moveset.map((m, i) => {
                        if(m.selected){
                            return (
                                <div key={i} className="bg-white rounded-md p-0 w-full h-8 border-2 border-gray-200 flex gap-1 px-1 items-center justify-between text-xs capitalize">
                                    <p className="truncate">{m.name.replace(/-/g, " ")}</p>
                                    <div className="flex">
                                        <PokemonType type={m.type.name} size="sm" />
                                        {m.damage_class ? <MoveCategory category={m.damage_class.name} size="sm" /> : null}
                                    </div>
                                </div> 
                            )
                        }
                        else    
                            return null;
                    })
                }
            </div>
        </div>
    )
}
