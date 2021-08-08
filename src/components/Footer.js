import React from 'react'

export default function Footer() {
    var braveado = <a href="https://github.com/Braveado" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">Nelson Martinez</a>
    var pokeapi = <a href="https://pokeapi.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">PokéAPI</a>
    return (
        <div className="mt-auto flex justify-center items-center w-full bg-white p-4">
            Created by&nbsp;{braveado}&nbsp;and powered by&nbsp;{pokeapi}. Pokémon and Pokémon character names are trademarks of Nintendo.
        </div>
    )
}
