import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PokemonOptions from './components/PokemonOptions';

function App() {
  // Constants.
  const apiUrl = 'https://pokeapi.co/api/v2/';
  const pokemonCount = 15;
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

    return () => cancel = true;
  }, []);

  // Get pokemonOptions on pokemonList change.
  useEffect(() => {
    let cancel = false;

    if(pokemonList.length) {           
      let pokemons = [];

      async function fetchData() {
        for (let index = 0; index < randomRolls.pokemons; index++) {
          const pokemon = await getNewPokemon(pokemons)
          pokemons.push(pokemon);
        }
        if (!cancel)          
          setPokemonOptions(pokemons);
      }   
      fetchData();                    
    }
    
    return () => cancel = true;
  }, [pokemonList, randomRolls.pokemons]);

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

  // Set loading on pokemonOptions change.
  useEffect(() => {
    if(pokemonOptions.length)
      setLoading(false);    
  }, [pokemonOptions]);

  if(loading) return 'Loading...'

  return (       
    <PokemonOptions options={pokemonOptions} />
  );
}

export default App;
