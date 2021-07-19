import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PokemonOptions from '../components/PokemonOptions';

export default function OptionsGenerator() {
  // Constants.
  const apiUrl = 'https://pokeapi.co/api/v2/';
  const pokemonCount = 1118;
  const randomRolls = {
    pokemons: 9,
    movesets: 6,
    moves: 6,
    abilities: 9,
    items: 9
  };

  // State.
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pokemonList from api on mount.
  useEffect(() => {
    let cancel = false;
    setLoading(true);  

    async function fetchData() {      
      const result = await axios.get(`${apiUrl}pokemon?limit=${pokemonCount}`);
      if(!cancel)
        setPokemonList(result.data.results);
    };
    fetchData();

    setLoading(false);
    return () => cancel = true;
  }, []);

  // Get a new set of options.
  async function generateOptions() {
    await getPokemonOptions();
  }

  // Geta set of pokemon options.  
  async function getPokemonOptions() {
    setLoading(true);

    if(pokemonList.length) {           
      let pokemons = [];
      for (let index = 0; index < randomRolls.pokemons; index++) {
        const pokemon = await getNewPokemon(pokemons)
        pokemons.push(pokemon);
      }        
      setPokemonOptions(pokemons);    
    }   
     
    setLoading(false);
  }

  // Get a new pokemon option.
  async function getNewPokemon(currentPokemons) {    
    let done = false;
    let newPokemonName = '';

    do {
      let pokemon = pokemonList[Math.floor(Math.random()*pokemonList.length)];
      if(!currentPokemons.find(p => p.name === pokemon.name)) {
        newPokemonName = pokemon.name;
        done = true;      
      }
    } while (!done)

    const newPokemon = await axios.get(`${apiUrl}pokemon/${newPokemonName}`);
    return newPokemon.data
  };  

  // Render.
  return (  
    <div className="flex flex-col justify-start items-center bg-gray-100 h-screen w-screen p-8">
        <button 
            type="button" disabled={loading} onClick={generateOptions}
            className="bg-gray-900 text-white w-48 p-4 rounded-md hover:bg-gray-600"
        >
            Generate Options
        </button>
        <div className="flex flex-col justify-center items-center m-8">
            {loading ?
                <div className="bg-white rounded-md p-8">Loading...</div>
            :
                <PokemonOptions options={pokemonOptions} />
            }
        </div>      
    </div>     
  );
}
