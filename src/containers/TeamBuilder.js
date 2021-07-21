import React, {useState, useEffect} from 'react';
import { TeamBuilderContext } from '../context/TeamBuilder';
import axios from 'axios';
import PokemonOptions from '../components/PokemonOptions';
import { BiLoaderAlt } from 'react-icons/bi';

export default function TeamBuilder() {
  // Constants.
  const apiUrl = 'https://pokeapi.co/api/v2/';
  const pokemonCount = 898;
  const randomRolls = {
    pokemons: 9,
    movesets: 6,
    moves: 6,
    abilities: 9,
    items: 9
  };
  const selectionsNeeded = {
    pokemons: 6,    
    movesets: 6,
    moves: 4,
    abilities: 6,
    items: 6
  };
  const pokemonFilter = [ // Exclude pokemons with this keywords.
    // Legendaries: forms above the 720 total stats.
    'primal', 'ultra', 'eternamax',
    // Normal: stronger/weaker forms.
    'mega', 'gmax', 'eternal', 'ash', 'solo', 'totem'
  ];

  // State.
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [selectionsMade, setSelectionsMade] = useState({
    pokemons: 0,
    movesets: 0,
    moves: 0,
    abilities: 0,
    items: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch pokemonList from api on mount.
  useEffect (() => {
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

  // Get a set of pokemon options.  
  async function getPokemonOptions() {
    setLoading(true);
    
    if(pokemonList.length) {           
      let pokemons = [];      
      setPokemonOptions(pokemons); 

      for (let index = 0; index < randomRolls.pokemons; index++) {
        const pokemon = await getNewPokemon(pokemons)
        const species = await axios.get(pokemon.species.url);
        pokemon.gender_rate = species.data.gender_rate;
        pokemon.is_mythical = species.data.is_mythical;
        pokemon.is_legendary = species.data.is_legendary;
        pokemon.selected = false;
        pokemon.stats.push({name: 'total', base_stat: getTotalStats(pokemon.stats)})        

        pokemons.push(pokemon);
        setPokemonOptions([...pokemons]); 
      }                 
    }   
     
    setLoading(false);
  }

  // Get a new pokemon option.
  async function getNewPokemon(currentPokemons) {    
    let done = false;
    let newPokemonName = '';

    do {                
        let pokemon = pokemonList[Math.floor(Math.random()*pokemonList.length)];
        //console.log('initial: '+pokemon.name);

        const initialPokemon = await axios.get(`${apiUrl}pokemon/${pokemon.name}`);
        const species = await axios.get(initialPokemon.data.species.url);
        const evolutions = await axios.get(species.data.evolution_chain.url);
        
        // Get an array of evolutions.
        let evoChain = [];
        let evoData = evolutions.data.chain;
        do {                        
            // Current.
            evoChain.push(evoData.species.name);            
            let numberOfEvolutions = evoData['evolves_to'].length;  
                                  
            // Branching evolutions.
            if(numberOfEvolutions > 1) {
              let nextSpecies = [];
              let lastSpecies = [];
              for (let i = 0; i < numberOfEvolutions; i++) {                  
                nextSpecies.push(evoData.evolves_to[i].species.name);
                
                // Branch continuation.
                if(evoData.evolves_to[i].hasOwnProperty('evolves_to') && evoData.evolves_to[i].evolves_to.length > 0)
                  lastSpecies.push(evoData.evolves_to[i].evolves_to[0].species.name);
              }
              evoChain.push(nextSpecies);

              if(lastSpecies.length > 0)
              evoChain.push(lastSpecies);
              
              // Stop the chain, all branching evolutions are symmetrical.
              evoData = null;
            }
            else {                
              // Evolution.
              evoData = evoData['evolves_to'][0];
            }
                      
        } while (!!evoData && evoData.hasOwnProperty('evolves_to')); 
        //console.log('evolutions: '+evoChain);       
        
        // Get the/a final evolution.
        let finalEvolution = evoChain[evoChain.length - 1];
        if(Array.isArray(finalEvolution)){
          finalEvolution = finalEvolution[Math.floor(Math.random()*finalEvolution.length)];        
        }
        //console.log('final evolution: '+finalEvolution);

        // Get the varieties for the final evolution.
        const finalSpecies = await axios.get(`${apiUrl}pokemon-species/${finalEvolution}`);
        let varieties = [];
        finalSpecies.data.varieties.forEach((v, i) => {
          varieties.push(finalSpecies.data.varieties[i].pokemon.name)
        });                
        //console.log('final evolution varieties: '+varieties);

        // Filter varieties for more balance.
        varieties = varieties.filter(v => {          
          return !v.split('-').some(keyword => pokemonFilter.includes(keyword))
        });
        //console.log('filtered varieties: '+varieties);        

        // Get the final pokemon from the varieties.
        let finalPokemon = varieties[Math.floor(Math.random()*varieties.length)];
        //console.log('final pokemon: '+finalPokemon);

        if(!currentPokemons.find(p => p.name === finalPokemon)) {
          newPokemonName = finalPokemon;          
          done = true;      
          //console.log('-----not duplicated: next-----');
        }
        else {
          //console.log('-----DUPLICATED: REROLL-----');
        }
    } while (!done)    
    const newPokemon = await axios.get(`${apiUrl}pokemon/${newPokemonName}`);
    return newPokemon.data
  };  

  const getTotalStats = (stats) => {
    let total = 0;
    stats.forEach(s => {
        total = total + s.base_stat; 
    });        
    return total;
  }   

  const selectPokemon = (pokemon) => {
    let options = pokemonOptions;
    options = options.map(p => {
      if(p.name === pokemon.name){
        if(p.selected)      
          p.selected = false;
        else if(!p.selected && selectionsMade.pokemons < selectionsNeeded.pokemons)
          p.selected = true;
      }
      return p;
    })
    setPokemonOptions(options); 
  }

  useEffect (() => {
    let selected = 0;
    pokemonOptions.forEach(p => {
      if(p.selected)
        selected = selected + 1;
    });

    setSelectionsMade(s => { return {...s, pokemons: selected}});
  }, [pokemonOptions]);  

  const optionsGenerator = () => {
    if(loading) {
      return (
        <p className="p-4 flex gap-4 items-center justify-center text-lg">
          <BiLoaderAlt className="animate-spin text-3xl" />
          {pokemonOptions.length < randomRolls.pokemons ? `Generating Pokemons (${pokemonOptions.length}/${randomRolls.pokemons})` : 'Done'}
        </p>
      );
    }
    else {
      return (
        <button 
          type="button" disabled={loading} onClick={generateOptions}
          className="bg-gray-900 text-lg text-white w-48 p-4 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out"
        >
          Generate Options
        </button>
      );
    }
  }

  // Render.
  return (  
    <TeamBuilderContext.Provider value={{
      selectionsNeeded: selectionsNeeded,
      selectionsMade: selectionsMade,
      selectPokemon: selectPokemon
    }}>
      <div className="flex flex-col gap-8 justify-start items-center w-full p-8">
          {optionsGenerator()}                   
          <PokemonOptions options={pokemonOptions} />             
      </div>     
    </TeamBuilderContext.Provider>
  );
}
