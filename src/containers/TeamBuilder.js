import React, {useState, useEffect} from 'react';
import { TeamBuilderContext } from '../context/TeamBuilder';
import axios from 'axios';
import PokemonOptions from '../components/pokemon/PokemonOptions';
import MovesetOptions from '../components/moves/MovesetOptions';
import { BiLoaderAlt } from 'react-icons/bi';

export default function TeamBuilder() {
  // Constants.
  const apiUrl = 'https://pokeapi.co/api/v2/';
  const pokemonCount = 898;
  const moveCount = 826;
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

  // Filters
  const pokemonFilter = [ // Exclude pokemons with this keywords.
    // Legendaries: forms above the 720 total stats.
    'primal', 'ultra', 'eternamax',
    // Normal: stronger/weaker forms.
    'mega', 'gmax', 'eternal', 'ash', 'solo', 'totem'
  ];
  const moveFilter = [ // Exclude moves with this keywords.
    // Stronger moves: max and z moves.
    'max', 'physical', 'special',
    'catastropika', 'moonsault', 'raid', '000', 'sparksurfer', 'evoboost', 'pancake', 'genesis', 'operetta', 'stormshards',
    'forever', 'soulblaze', 'guardian', 'sunraze', 'moonraze', 'burns', 'stealing'
  ];
  const moveStatusLimit = 3; // Max number of status moves in a moveset.

  // State.
  const [pokemonList, setPokemonList] = useState([]);
  const [moveList, setMoveList] = useState([]);
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [movesetOptions, setMovesetOptions] = useState([]);
  const [selectionsMade, setSelectionsMade] = useState({
    pokemons: 0,
    movesets: 0,
    moves: [0, 0, 0, 0, 0, 0],
    abilities: 0,
    items: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch lists from api on mount.
  useEffect (() => {
    let cancel = false;
    setLoading(true);  

    async function fetchData() {      
      const pokemonResults = await axios.get(`${apiUrl}pokemon?limit=${pokemonCount}`);
      const moveResults = await axios.get(`${apiUrl}move?limit=${moveCount}`);
      if(!cancel) {
        setPokemonList(pokemonResults.data.results);
        setMoveList(moveResults.data.results);
      }
    };
    fetchData();

    setLoading(false);
    return () => cancel = true;
  }, []);

  // Get a new set of options.
  async function generateOptions() {
    setLoading(true);
    setPokemonOptions([]);
    setMovesetOptions([]); 

    await getPokemonOptions();
    await getMovesetOptions();

    setLoading(false);
  }

  // Get a set of pokemon options.  
  async function getPokemonOptions() {    
    if(pokemonList.length) {           
      let pokemons = [];            

      for (let index = 0; index < randomRolls.pokemons; index++) {
        const pokemon = await getNewPokemon(pokemons)
        const species = await axios.get(pokemon.species.url);
        pokemon.gender_rate = species.data.gender_rate;
        pokemon.is_mythical = species.data.is_mythical;
        pokemon.is_legendary = species.data.is_legendary;        
        pokemon.stats.push({name: 'total', base_stat: getTotalStats(pokemon.stats)})        
        pokemon.selected = false;
        pokemon.moveset = null;

        pokemons.push(pokemon);
        setPokemonOptions([...pokemons]); 
      }                 
    }   
  }

  // Get a new pokemon option.
  async function getNewPokemon(currentPokemons) {    
    let newPokemon = '';
    let finalPokemon = '';

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
        finalPokemon = varieties[Math.floor(Math.random()*varieties.length)];
        //console.log('final pokemon: '+finalPokemon);
        
        newPokemon = finalPokemon; 
    } while (currentPokemons.find(p => p.name === finalPokemon))    
    newPokemon = await axios.get(`${apiUrl}pokemon/${newPokemon}`);
    return newPokemon.data
  };  

  const getTotalStats = (stats) => {
    let total = 0;
    stats.forEach(s => {
        total = total + s.base_stat; 
    });        
    return total;
  }   

  // Get a set of moveset options.  
  async function getMovesetOptions() {    
    if(moveList.length) {           
      let movesets = [];            

      for (let index = 0; index < randomRolls.movesets; index++) {
        const moveset = await getNewMoveset()
        movesets.push(moveset);
        setMovesetOptions([...movesets]); 
      }                 
    }   
  }

  // Get a new moveset option.
  async function getNewMoveset() {    
    let newMoveset = [];
    let move = '';
    let status = false;
    let statusMoves = 0;    
    
    for (let index = 0; index < randomRolls.moves; index++) {            
      do{        
        move = moveList[Math.floor(Math.random()*moveList.length)];
        move = await axios.get(`${apiUrl}move/${move.name}`);
        status = move.data.damage_class && move.data.damage_class.name === 'status';        
      } while (newMoveset.find(m => m.name === move.data.name) || 
              move.data.name.split('-').some(keyword => moveFilter.includes(keyword)) ||
              (status && statusMoves >= moveStatusLimit))
      move.data.selected = false;
      newMoveset.push(move.data);      
      if(status){
        statusMoves = statusMoves + 1;
        status = false;
      }
      //console.log(move.data.name);
      //console.log(statusMoves);
    }
    //console.log('----- done -----');
    return newMoveset;
  }

  const selectPokemon = (pokemon) => {
    let change = false;
    let options = pokemonOptions;
    options = options.map(p => {
      if(p.name === pokemon.name){
        if(p.selected) {      
          p.selected = false;
          p.moveset = null;
          change = true;
        }
        else if(!p.selected && selectionsMade.pokemons < selectionsNeeded.pokemons) {
          p.selected = true;
          change = true;
        }
      }
      return p;
    })
    if(change)
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

  const selectMove = (move, moveset) => {  
    let change = false;  
    let msOptions = movesetOptions;    
    msOptions[moveset] = msOptions[moveset].map(m => {
      if(m.name === move.name){
        if(m.selected){      
          m.selected = false;
          change = true;
        }
        else if(!m.selected && selectionsMade.moves[moveset] < selectionsNeeded.moves){
          m.selected = true;
          change = true;
        }
      }
      return m;
    });
    if(change)
      setMovesetOptions([...msOptions]);
  }

  useEffect (() => {
    let msOptions = [];
    movesetOptions.forEach(ms => {
      msOptions.push(ms.filter(m => m.selected).length)
    });
    setSelectionsMade(s => {return {...s, moves: msOptions}});
  }, [movesetOptions]);

  const assignMoveset = (moveset, pokemon) => {
    //console.log(moveset + ' ' + pokemon.name);
    let change = false;
    let pokemons = pokemonOptions;
    pokemons = pokemons.map(p => {
      if(p.name === pokemon.name){
        if(p.moveset !== moveset)
          p.moveset = moveset;
        else
          p.moveset = null;
        change = true;
      }
      if(p.moveset === moveset && p.name !== pokemon.name){
        p.moveset = null;
        change = true;
      }
      return p;
    })
    if(change)    
      setPokemonOptions(pokemons);
  }

  useEffect (() => {
    let msAssigned = 0;
    pokemonOptions.forEach(p => {
      if(p.moveset != null)
        msAssigned = msAssigned + 1;
    });
    setSelectionsMade(s => {return {...s, movesets: msAssigned}});
  }, [pokemonOptions]);

  const generationProgress = () => {
    if(pokemonOptions.length < randomRolls.pokemons)
      return `Generating Pokemons (${pokemonOptions.length}/${randomRolls.pokemons})`;   
    else if(movesetOptions.length < randomRolls.movesets)
      return `Generating Movesets (${movesetOptions.length}/${randomRolls.movesets})`;
    else
      return 'Done!';
  }

  const optionsGenerator = () => {
    if(loading) {
      return (
        <p className="p-4 flex gap-4 items-center justify-center text-lg">
          <BiLoaderAlt className="animate-spin text-2xl" />
          {generationProgress()}
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
      pokemonOptions: pokemonOptions,
      selectionsNeeded: selectionsNeeded,
      selectionsMade: selectionsMade,
      selectPokemon: selectPokemon,
      selectMove: selectMove,
      assignMoveset: assignMoveset
    }}>
      <div className="flex flex-col gap-8 justify-start items-center w-full p-8">
          {optionsGenerator()}                   
          <PokemonOptions options={pokemonOptions} />
          <MovesetOptions options={movesetOptions} />             
      </div>     
    </TeamBuilderContext.Provider>
  );
}
