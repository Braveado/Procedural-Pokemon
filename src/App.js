import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { TeamBuilderContext } from './context/TeamBuilderContext';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import TeamBuilder from './containers/TeamBuilder';
import About from './containers/About';

export default function App() {
  // ----- CONSTANTS -----
  // API
  const apiUrl = 'https://pokeapi.co/api/v2/';
  const pokemonCount = 898;
  const moveCount = 826;
  const abilityCount = 267;
  const itemCount = [115, 9, 9, 6];
  const itemOffset = [189, 581, 678, 844];
  const typeCount = 18; 

  // ----- STATE -----
  // API
  const [loading, setLoading] = useState(true);  
  const [pokemonList, setPokemonList] = useState([]);
  const [moveList, setMoveList] = useState([]);
  const [abilityList, setAbilityList] = useState([]);  
  const [itemList, setItemList] = useState([]);  
  const [typeList, setTypeList] = useState([]);  

  // Options.
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [randomRolls] = useState({
    pokemons: 9,
    movesets: 6,
    moves: 6,
    abilities: 9,
    items: 9
  });
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [movesetOptions, setMovesetOptions] = useState([]);
  const [abilityOptions, setAbilityOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [optionsData, setOptionsData] = useState({
    movesetsPerType: [],
    usableTypes: [],
  });    

  // Filters.  
  const [pokemonFilter] = useState([ // Exclude pokemons with this keywords.
    // Legendaries: forms above 720 total stats.
    'eternamax', 'primal', 'ultra',
    // General: forms as strong as legendaries, weaker than a fully evolved pokemon.
    'mega', 'gmax', 'eternal', 'ash', 'solo',
    // Others.
    'totem'
  ]);
  const [moveFilter] = useState ([ // Exclude moves with this keywords.
    // General: max and z moves.
    'max', 'physical', 'special',
    // Specific z moves.
    'catastropika', 'moonsault', 'raid', '000', 'sparksurfer', 'evoboost', 'pancake', 'genesis', 'operetta', 'stormshards',
    'forever', 'soulblaze', 'guardian', 'sunraze', 'moonraze', 'burns', 'stealing'
  ]);
  const [moveStatusLimit] = useState(3); // Max number of status moves in a moveset.
  const [abilityFilter] = useState([ // Exclude abilities with this keywords.
    // Unusable in format.
    'illuminate', 'run', 'plus', 'minus', 'gluttony', 'honey', 'unnerve', 'healer', 'friend', 'harvest',
    'telepathy', 'star', 'cheek', 'dancer', 'battery', 'receiver', 'alchemy', 'ball', 'ripen', 'spot',
    'medicine', 'one',
    // Pokemon forms specific.
    'zen', 'stance', 'shields', 'schooling', 'bond', 'construct', 'face', 'hunger', 
    // Item related, very few use cases.
    'pickup', 'sticky', 'unburden', 'pickpocket', 'magician', 'symbiosis', 'compound',
    // Harmful to owner.
    'truant', 'stall', 'klutz', 'slow', 'defeatist', 
    // Unusable in tournaments.
    'anticipation', 'forewarn', 'frisk', 
    // Would require branch logic, possibly not worth it.
    'multitype', 'rks', 'gulp', 
  ]);
  const [abilityAllow] = useState([ // Include abilities with this keywords even when excluded by filter.
    'parental', 
  ]);
  const [itemFilter] = useState([ // Exclude items with this keywords.
    // Unusable in format.
    'power', 'scarf', 'ball', 'macho', 'exp', 'soothe', 'coin', 'cleanse', 'egg', 'luck',
    'pure', 'ability', 
    // Evolution related or pokemon specific.    
    'deep', 'scale', 'powder', 'dew', 'everstone', 'grade', 'punch', 'thick', 'stick', 'protector',
    'disc', 'magmarizer', 'electirizer', 'reaper', 'whipped', 'sachet', 
    // Harmful to user.
    'full', 'lagging', 'sticky', 'target',
    // Would require branch logic. All accounted for.
    //'heat', 'smooth', 'icy', 'damp', 'sludge', 'clay', 'orb' 
  ]);
  const [itemAllow] = useState([ // Include items with this keywords even when excluded by filter.    
    'herb', 'choice', 'bright', 'silver', 'silk'
  ]);

  // Usability.  
  // Moves.
  const [chargeMoves] = useState([ // Power herb.
    'bounce', 'dig', 'dive', 'fly', 'freeze-shock', 'geomancy', 'ice-burn', 'meteor-beam', 'phantom-force', 'razor-wind',
    'shadow-force', 'skull-bash', 'sky-attack', 'solar-beam', 'solar-blade'
  ]);
  const [bindMoves] = useState([ // Grip claw, binding band.
    'bind', 'clamp', 'fire-spin', 'infestation', 'magma-storm', 'sand-tomb', 'snap-trap', 'thunder-cage', 'whirlpool', 'wrap'
  ]);
  const [drainMoves] = useState([ // Big root.
    'absorb', 'bouncy-bubble', 'drain-punch', 'draining-kiss', 'dream-eater', 'giga-drain', 'horn-leech', 'leech-life', 'leech-seed', 'mega-drain',
    'oblivion-wing', 'parabolic-charge', 'strength-sap', 'ingrain', 'aqua-ring'
  ]);
  const [terrainMoves] = useState([ // Terrain extender.
    'electric-terrain', 'grassy-terrain', 'misty-terrain', 'psychic-terrain'
  ]);
  const [weatherMoves] = useState([ // Heat, smooth, icy and damp rock.
    'sunny-day', 'rain-dance', 'sandstorm', 'hail'
  ]);
  const [barrierMoves] = useState([ // Light clay.
    'light-screen', 'reflect', 'aurora-veil'
  ]);  
  const [orbMoves] = useState([ // Toxic and flame orb.
    'facade', 'psycho-shift', 'switcheroo', 'trick'
  ]);
  // Abilities.
  const [terrainAbilities] = useState([ // Terrain extender.
    'electric-surge', 'grassy-surge', 'misty-surge', 'psychic-surge'
  ]);
  const [weatherAbilities] = useState([ // Heat, smooth, icy and damp rock.
    'drought', 'drizzle', 'sand-stream', 'sand-spit', 'snow-warning'
  ]);
  const [orbAbilities] = useState([ // Toxic and flame orb.
    'guts', 'magic-guard', 'quick-feet', 'marvel-scale'
  ]);

  // Selections.
  const [selectionsNeeded] = useState({
    pokemons: 6,    
    movesets: 6,
    moves: 4,
    abilities: 6,
    items: 6
  });
  const [selectionsMade, setSelectionsMade] = useState({
    pokemons: 0,
    movesets: 0,
    moves: [0, 0, 0, 0, 0, 0],
    abilities: 0,
    items: 0
  });
  const [sectionsCompleted, setSectionsCompleted] = useState({
    pokemons: false,
    movesets: false,
    moves: false,
    abilities: false,
    items: false
  });  

  // ----- GENERATION -----
  // Fetch lists from api on mount.
  useEffect (() => {
    let cancel = false;
    setLoading(true);  

    async function fetchData() {      
      const pokemonResults = await axios.get(`${apiUrl}pokemon?limit=${pokemonCount}`);
      const moveResults = await axios.get(`${apiUrl}move?limit=${moveCount}`);
      const abilityResults = await axios.get(`${apiUrl}ability?limit=${abilityCount}`);
      let itemResults = [];
      for(let i = 0; i < itemCount.length; i++){
        itemResults.push(await (await axios.get(`${apiUrl}item?limit=${itemCount[i]}&offset=${itemOffset[i]}`)).data.results);
      };      
      itemResults = [].concat.apply([], itemResults);
      const typeResults = await axios.get(`${apiUrl}type?limit=${typeCount}`);
      if(!cancel) {
        setPokemonList(pokemonResults.data.results);
        setMoveList(moveResults.data.results);
        setAbilityList(abilityResults.data.results);
        setItemList(itemResults);
        setTypeList(typeResults.data.results);
        setLoading(false);              
      }
    };
    fetchData();
    
    return () => cancel = true;
    // Disable dependency warning, itemCount and itemOffset will never change.
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, []);

  function generateOptions() {        
    setPokemonOptions([]);
    setMovesetOptions([]); 
    setAbilityOptions([]);
    setItemOptions([]);
    setOptionsData({
      movesetsPerType: [],
      usableTypes: [],
    });
    setGenerationStep(0);
    setGenerating(true);    
  }

  useEffect(() => {
    let cancel = false;

    // Get a new set of pokemon options.
    async function getPokemonOptions() {
      let pokemons = [];                           
      let shinyIndex = Math.round((Math.random()*100 / 12.5));

      for (let index = 0; index < randomRolls.pokemons; index++) {
        const pokemon = await getNewPokemon(pokemons)
        const species = await axios.get(pokemon.species.url);
        pokemon.gender_rate = species.data.gender_rate;
        pokemon.is_mythical = species.data.is_mythical;
        pokemon.is_legendary = species.data.is_legendary;        
        pokemon.stats.push({name: 'total', base_stat: getTotalStats(pokemon.stats)});
        pokemon.shiny = (index === shinyIndex);
        pokemon.selected = false;
        pokemon.moveset = null;
        pokemon.ability = null;
        pokemon.item = null;

        pokemons.push(pokemon);
        if(!cancel)
          setPokemonOptions([...pokemons]); 
      }
      if(!cancel)
        setGenerationStep(1);
    }

    // Get a new single pokemon option.
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
  
      } while (checkDuplicatedName(currentPokemons, finalPokemon))    
      newPokemon = await axios.get(`${apiUrl}pokemon/${finalPokemon}`);
      return newPokemon.data
    };

    if(generating && generationStep === 0 && pokemonList.length > 0){      
      getPokemonOptions();      
    }
    return () => cancel = true;
  }, [generating, generationStep, pokemonList, randomRolls, pokemonFilter])

  useEffect(() => {
    let cancel = false;

    // Get a set of moveset options.  
    async function getMovesetOptions() {              
      let movesets = [];            

      for (let index = 0; index < randomRolls.movesets; index++) {
        const moveset = await getNewMoveset()
        movesets.push(moveset);
        if(!cancel)
          setMovesetOptions([...movesets]); 
      }  
      if(!cancel)
        setGenerationStep(2);
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
        } while (checkDuplicatedName(newMoveset, move.data.name) || FindKeywords(move.data.name, '-', moveFilter) ||
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

    if(generating && generationStep === 1 && moveList.length > 0){      
      getMovesetOptions();
    }
    return () => cancel = true;
  }, [generating, generationStep, moveList, randomRolls, moveFilter, moveStatusLimit])

  // Respond to moveset options generated completely.
  useEffect (() => {  
    let cancel = false;

    if(generating && generationStep === 2 && movesetOptions.length >= randomRolls.movesets){
      let msPerType = [];

      typeList.forEach(type => {
        let msInType = {name: type.name, movesets: 0};
        movesetOptions.forEach(ms => {      
          if(ms.find(m => m.type.name === type.name && m.damage_class.name !== 'status')){
            msInType.movesets += 1;          
          }
        });
        msPerType.push(msInType);        
      });       
      let uTypes = msPerType.filter(t => t.movesets !== 0).map(t => {return t.name});     
      if(!cancel){
        setOptionsData(s => {return {...s, movesetsPerType: msPerType, usableTypes: uTypes} });       
        setGenerationStep(3);
      }
    }    
    return () => cancel = true;
  }, [generating, generationStep, movesetOptions, randomRolls, typeList]);

  // Helper functions for usability checks.
  const getPokemonTypeUsability = useCallback((type) => {
    return pokemonOptions.find(p => p.types.find(t => t.type.name === type));
  }, [pokemonOptions])

  const getTypeFromEffect = useCallback((effect) => {
    return effect.replace(/-/g, " ").split(" ").find(keyword => optionsData.usableTypes.includes(keyword));
  }, [optionsData]);

  const getMovesetTypeUsability = useCallback((object, currentObjects) => {
    let usable = false;
    let type = getTypeFromEffect(object.effect_entries.find(e => e.language.name === 'en').effect.toLowerCase());
    if(type){            
      let objectsOfType = 0;
      currentObjects.forEach(co => {
        if(getTypeFromEffect(co.effect_entries.find(e => e.language.name === 'en').effect.toLowerCase()) === type)                
          objectsOfType += 1;              
      });                      
      usable = optionsData.movesetsPerType.find(mt => mt.name === type && objectsOfType < mt.movesets);
    }
    return usable;
  }, [optionsData, getTypeFromEffect]);

  const getMoveMechanicUsability = useCallback((mechanic, exactMoves) => {
    let moveNames = movesetOptions.map(ms => { return ms.map(m => { return m.name } ) });
    moveNames = [].concat.apply([], moveNames);
    
    if(exactMoves && exactMoves.length > 0){      
      return moveNames.find(name => exactMoves.includes(name));
    }
    else {
      switch(mechanic){
        case 'charge':
          return moveNames.find(name => chargeMoves.includes(name));
        case 'bind':
          return moveNames.find(name => bindMoves.includes(name));
        case 'drain':
          return moveNames.find(name => drainMoves.includes(name));
        case 'terrain':
          return moveNames.find(name => terrainMoves.includes(name));
        case 'weather':        
          return moveNames.find(name => weatherMoves.includes(name));
        case 'barrier':        
          return moveNames.find(name => barrierMoves.includes(name));
        case 'orb':        
          return moveNames.find(name => orbMoves.includes(name));
        default:
          return false;
      }    
    }
  }, [movesetOptions, chargeMoves, bindMoves, drainMoves, terrainMoves, weatherMoves, barrierMoves, orbMoves])

  const getAbilityMechanicUsability = useCallback((mechanic, exactAbilities) => {
    let abilityNames = abilityOptions.map(a => { return a.name } );

    if(exactAbilities && exactAbilities.length > 0){     
      return abilityNames.find(name => exactAbilities.includes(name));
    }
    else {
      switch(mechanic){
        case 'terrain':
          return abilityNames.find(name => terrainAbilities.includes(name));      
        case 'weather':
          return abilityNames.find(name => weatherAbilities.includes(name));
        case 'orb':
          return abilityNames.find(name => orbAbilities.includes(name));
        default:
          return false;
      }    
    }
  }, [abilityOptions, terrainAbilities, weatherAbilities, orbAbilities])

  useEffect(() => {
    let cancel = false;

    // Get a set of ability options.
    async function getAbilityOptions() {      
      let abilities = [];            

      for (let index = 0; index < randomRolls.abilities; index++) {
        const ability = await getNewAbility(abilities);
        abilities.push(ability);
        if(!cancel)
          setAbilityOptions([...abilities]); 
      }                 
      if(!cancel)
        setGenerationStep(4);
    }

    // Get a new ability option.
    async function getNewAbility(currentAbilities) {    
      let newAbility = '';       
    
      do{        
        let ability = abilityList[Math.floor(Math.random()*abilityList.length)];      
        newAbility = await axios.get(`${apiUrl}ability/${ability.name}`);            
      } while (checkDuplicatedName(currentAbilities, newAbility.data.name) || FindKeywords(newAbility.data.name, '-', abilityFilter, abilityAllow))
      //console.log(newAbility.data.name);

      return newAbility.data;
    }

    if(generating && generationStep === 3 && abilityList.length > 0){      
      getAbilityOptions();
    }
    return () => cancel = true;
  }, [generating, generationStep, abilityList, randomRolls, abilityFilter, abilityAllow])

  useEffect(() => {
    let cancel = false;

    // Get a set of item options.
    async function getItemOptions() {          
      let items = [];            
      for (let index = 0; index < randomRolls.items; index++) {
        const item = await getNewItem(items);
        items.push(item);
        if(!cancel)
          setItemOptions([...items]); 
      }                 
      if(!cancel)
        setGenerationStep(5); 
    }

    // Get a new item option.
    async function getNewItem(currentItems) {    
      let newItem = '';    
      let usable = true; 
            
      do{        
        let item = itemList[Math.floor(Math.random()*itemList.length)];      
        newItem = await axios.get(`${apiUrl}item/${item.name}`);   
        usable = true;    
                               
        switch(newItem.data.category.name){
          case 'held-items':
            switch(newItem.data.name){
              case 'power-herb': 
                // Check for charge moves.               
                usable = getMoveMechanicUsability('charge');                
                break;
              case 'grip-claw':
                // Check for bind moves.
                usable = getMoveMechanicUsability('bind');               
                break;
              case 'binding-band':
                // Check for bind moves.
                usable = getMoveMechanicUsability('bind');
                break;
              case 'big-root':
                // Check for drain moves.
                usable = getMoveMechanicUsability('drain');                
                break;
              case 'terrain-extender':
                // Check for terrain moves or abilities.
                usable = (getMoveMechanicUsability('terrain') || getAbilityMechanicUsability('terrain'));
                break;
              case 'heat-rock':                
                // Check for harsh sunlight weather moves or abilities.
                usable = (getMoveMechanicUsability('', ['sunny-day']) || getAbilityMechanicUsability('', ['drought']));
                break;
              case 'damp-rock':                
                // Check for rain weather moves or abilities.
                usable = (getMoveMechanicUsability('', ['rain-dance']) || getAbilityMechanicUsability('', ['drizzle']));
                break;
              case 'icy-rock':                
                // Check for hail weather moves or abilities.
                usable = (getMoveMechanicUsability('', ['hail']) || getAbilityMechanicUsability('', ['snow-warning']));
                break;
              case 'smooth-rock':                
                // Check for sandstorm weather moves or abilities.
                usable = (getMoveMechanicUsability('', ['sandstorm']) || getAbilityMechanicUsability('', ['sand-stream', 'sand-spit']));
                break;
              case 'black-sludge':                
                // Check for poison pokemons.
                usable = getPokemonTypeUsability('poison');                
                break;
              case 'light-clay':                
                // Check for barrier moves.
                usable = getMoveMechanicUsability('barrier');                
                break;              
              default:
                break;
            }
            break;
          case 'bad-held-items':
            switch(newItem.data.name){
              case 'toxic-orb':                   
                // Check for orb moves or abilities.
                usable = (getMoveMechanicUsability('orb') || getAbilityMechanicUsability('orb') || getAbilityMechanicUsability('', ['poison-heal', 'toxic-boost']));                                          
                break;
              case 'flame-orb':                                               
                // Check for orb moves or abilities.
                usable = (getMoveMechanicUsability('orb') || getAbilityMechanicUsability('orb') || getAbilityMechanicUsability('', ['flare-boost']));                
                break;
              default:
                break;
            }
            break;
          case 'plates':
            // Check for movesets with that type.
            usable = getMovesetTypeUsability(newItem.data, currentItems);
            break;
          case 'type-enhancement':
            // Check for movesets with that type.
            usable = getMovesetTypeUsability(newItem.data, currentItems);
            break;
          default:
            break;
        }            
          
      } while (checkDuplicatedName(currentItems, newItem.data.name) || FindKeywords(newItem.data.name, '-', itemFilter, itemAllow) || !usable)
      //console.log(newItem.data.name);

      return newItem.data;
    } 

    if(generating && generationStep === 4 && itemList.length > 0){      
      getItemOptions();
    }
    return () => cancel = true;
  }, [generating, generationStep, itemList, randomRolls, itemFilter, itemAllow,
      getMovesetTypeUsability, getMoveMechanicUsability, getAbilityMechanicUsability, getPokemonTypeUsability])

  useEffect(() => {
    let cancel = false;

    if(generating && generationStep === 5){
      setToast('Controls', 'Options generated, build your team!', {success: true});
      if(!cancel)
        setGenerating(false);   
    }
    return () => cancel = true;
  }, [generating, generationStep])  

  // ----- SELECTIONS & ASSIGNMENTS -----
  // Select a pokemon.
  const selectPokemon = (pokemon) => {
    let change = false;
    let options = pokemonOptions;
    options = options.map(p => {
      if(p.name === pokemon.name){
        if(p.selected) {      
          p.selected = false;
          p.moveset = null;
          p.ability = null;
          p.item = null;          
          change = true;
        }
        else if(!p.selected && selectionsMade.pokemons < selectionsNeeded.pokemons) {
          p.selected = true;
          change = true;
        }
        else {
          setToast('Pokemon Options', `Only ${selectionsNeeded.pokemons} pokemons can be selected.`, {warning: true});
        }
      }
      return p;
    })
    if(change){
      setPokemonOptions(options); 
    }
  }   

  // Select a move.
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
        else {
          setToast('Moveset Options', `Only ${selectionsNeeded.moves} moves can be selected in a moveset.`, {warning: true});
        }
      }
      return m;
    });
    if(change){
      setMovesetOptions([...msOptions]);
    }
  }

  // Assign a pokemon to a moveset, ability or item.
  const assignPokemon = (pokemon, assignable) => {
    let change = false;
    let pokemons = pokemonOptions;
    pokemons = pokemons.map(p => {
      if(p.name === pokemon.name){
        if(assignable.moveset != null){
          if(p.moveset !== assignable.moveset)
            p.moveset = assignable.moveset;
          else
            p.moveset = null;
          change = true;
        }
        else if(assignable.ability != null){
          if(p.ability !== assignable.ability)
            p.ability = assignable.ability;
          else
            p.ability = null;
          change = true;
        }
        else if(assignable.item != null){
          if(p.item !== assignable.item)
            p.item = assignable.item;
          else
            p.item = null;
          change = true;
        }
      }
      else{
        if(assignable.moveset != null){
          if(p.moveset === assignable.moveset) {
            p.moveset = null;
            change = true;
            setToast('Moveset Options',
            `Assigned ${upperCaseWords(pokemon.name)} instead of ${upperCaseWords(p.name)} to moveset ${assignable.moveset+1}.`,
            {warning: true});
          }
        }
        if(assignable.ability != null){
          if(p.ability === assignable.ability) {
            p.ability = null;
            change = true;
            setToast('Ability Options',
            `Assigned ${upperCaseWords(pokemon.name)} instead of ${upperCaseWords(p.name)} to ability ${upperCaseWords(abilityOptions[assignable.ability].name)}.`,
            {warning: true});
          }
        }
        if(assignable.item != null){
          if(p.item === assignable.item) {
            p.item = null;
            change = true;
            setToast('Item Options',
            `Assigned ${upperCaseWords(pokemon.name)} instead of ${upperCaseWords(p.name)} to item ${upperCaseWords(itemOptions[assignable.item].name)}.`,
            {warning: true});
          }
        }
      }
      return p;
    })
    if(change){   
      setPokemonOptions(pokemons);
    }
  }    

  // Clear all selections and assignments.
  const clearChoices = () => {
    const choicesMade = Object.values(selectionsMade).some(val => Array.isArray(val) ? val.some(i => i) : val);
    if(choicesMade){
      let options = pokemonOptions;
      options = options.map(p => {      
        p.selected = false;
        p.moveset = null;
        p.ability = null;
        p.item = null;                  
        return p;
      });
      setPokemonOptions(options);
 
      let msOptions = movesetOptions;    
      msOptions.forEach(ms => {
        ms = ms.map(m => {   
          m.selected = false;
          return m;
        });
      });          
      setMovesetOptions([...msOptions]);

      setToast('Controls', 'Choices cleared, start again!', {success: true});
    }
    else {
      setToast('Controls', 'There are no choices to clear.', {warning: true});
    }
  }

  // ----- RESPONSES -----
  // Respond to completed sections.
  const checkSectionCompleted = useCallback((string, val) => {
    let sCompleted = sectionsCompleted;
    let change = false;
    switch(string){
      case 'pokemons':
        if(!sCompleted.pokemons && val >= selectionsNeeded.pokemons){
          sCompleted.pokemons = true;
          change = true;
          setToast('Pokemon Options', `All ${selectionsNeeded.pokemons} pokemons have been selected.`, {success: true});
        }
        else if(sCompleted.pokemons && val < selectionsNeeded.pokemons){
          sCompleted.pokemons = false;
          change = true;
          setToast('Pokemon Options', `There must be ${selectionsNeeded.pokemons} pokemons selected.`, {warning: true});
        }
        break;
      case 'movesets':
        if(!sCompleted.movesets && val >= selectionsNeeded.movesets){
          sCompleted.movesets = true;
          change = true;
          setToast('Moveset Options', `All ${selectionsNeeded.movesets} pokemons have been assigned to a moveset.`, {success: true});
        }
        else if(sCompleted.movesets && val < selectionsNeeded.movesets){
          sCompleted.movesets = false;
          change = true;
          setToast('Moveset Options', `There must be ${selectionsNeeded.movesets} pokemons assigned to a moveset.`, {warning: true});
        }
        break;
      case 'moves':
        if(!sCompleted.moves && val >= selectionsNeeded.movesets * selectionsNeeded.moves){
          sCompleted.moves = true;
          change = true;
          setToast('Moveset Options', `All ${selectionsNeeded.movesets * selectionsNeeded.moves} moves have been selected.`, {success: true});    
        }
        else if(sCompleted.moves && val < selectionsNeeded.movesets * selectionsNeeded.moves){
          sCompleted.moves = false;
          change = true;
          setToast('Moveset Options', `There must be ${selectionsNeeded.movesets * selectionsNeeded.moves} moves selected.`, {warning: true});    
        }
        break;
      case 'abilities':
        if(!sCompleted.abilities && val >= selectionsNeeded.abilities){
          sCompleted.abilities = true;
          change = true;
          setToast('Ability Options', `All ${selectionsNeeded.abilities} pokemons have been assigned to an ability.`, {success: true});
        }
        else if(sCompleted.abilities && val < selectionsNeeded.abilities){
          sCompleted.abilities = false;
          change = true;
          setToast('Ability Options', `There must be ${selectionsNeeded.abilities} pokemons assigned to an ability.`, {warning: true});
        }
        break;
      case 'items':
        if(!sCompleted.items && val >= selectionsNeeded.items){
          sCompleted.items = true;
          change = true;
          setToast('Item Options', `All ${selectionsNeeded.items} pokemons have been assigned to an item.`, {success: true});
        }
        else if(sCompleted.items && val < selectionsNeeded.items){
          sCompleted.items = false;
          change = true;
          setToast('Item Options', `There must be ${selectionsNeeded.items} pokemons assigned to an item.`, {warning: true});
        }
        break;
      default:
        break;
    }
    if(change){
      setSectionsCompleted(sCompleted);
      if(Object.values(sCompleted).every(val => val))
        setToast('Team Builder', `Team completely built, export your team!`, {success: true});
    }
  }, [sectionsCompleted, selectionsNeeded]);

  // Respond to changes in slections/assignments for pokemon, movesets, abilities and items.
  useEffect (() => {
    let pSelected = 0;
    let msAssigned = 0;    
    let aAssigned = 0;
    let iAssigned = 0;

    pokemonOptions.forEach(p => {
      if(p.selected)
        pSelected = pSelected + 1;
      if(p.moveset != null)
        msAssigned = msAssigned + 1;
      if(p.ability != null)
        aAssigned = aAssigned + 1;
      if(p.item != null)
        iAssigned = iAssigned + 1;
    });    
    
    checkSectionCompleted('pokemons', pSelected);
    checkSectionCompleted('movesets', msAssigned);
    checkSectionCompleted('abilities', aAssigned);
    checkSectionCompleted('items', iAssigned);

    setSelectionsMade(s => { return {
      ...s,
      pokemons: pSelected,
      movesets: msAssigned,
      abilities: aAssigned,
      items: iAssigned
    }});
  }, [pokemonOptions, checkSectionCompleted]); 

  // Respond to changes in selections for moves.
  useEffect (() => {
    let mSelected = [];
    let mSelectedAmount = 0;

    movesetOptions.forEach(ms => {
      let msSelected = ms.filter(m => m.selected).length;
      mSelected.push(msSelected);
      mSelectedAmount = mSelectedAmount + msSelected;
    });

    checkSectionCompleted('moves', mSelectedAmount);

    setSelectionsMade(s => {return {...s, moves: mSelected}});
  }, [movesetOptions, checkSectionCompleted]);    

  // ----- HELPER FUNCTIONS -----  
  // Get total stats for a pokemon.
  const getTotalStats = (stats) => {
    let total = 0;
    stats.forEach(s => {
        total = total + s.base_stat; 
    });        
    return total;
  }   

  const checkDuplicatedName = (currentObjects, newObjectName) => {
    return currentObjects.find(co => co.name === newObjectName)
  }

  // Filter by keywords.
  const FindKeywords = (string, separator, filter, allow) => {
    let found = false;
    found = string.split(separator).some(keyword => filter.includes(keyword))
    if(found && allow)
      found = !string.split(separator).some(keyword => allow.includes(keyword))
    return found;
  }

  const capitalizeWords = (text, separator) => {
    return text.split(separator).map((word) => {return word[0].toUpperCase() + word.substring(1)}).join(" ");
  }

  const upperCaseWords = (string) => {
    return string.replace(/\b\w/g, l => l.toUpperCase())
  }      

  // ----- OTHERS -----
  // Show a toast notification.
  const setToast = (title, content, type) => {    
    toast.custom((t) => (
      <div onClick={() => toast.dismiss(t.id)}
        className={`cursor-pointer max-w-md w-full flex flex-col gap-2 bg-white p-2 rounded-md pointer-events-auto flex border-2 border-gray-200 hover:bg-gray-200 transition duration-150 ease-in-out 
        ${t.visible ? 'animate-enter' : 'animate-leave'}
        ${type.success ? 'bg-green-100 border-green-200 ring ring-green-100' : ''}
        ${type.warning ? 'bg-yellow-100 border-yellow-200 ring ring-yellow-100' : ''}
        ${type.error ? 'bg-red-200 border-red-300 ring ring-red-200' : ''}`}
      >
        <div className="flex justify-between items-center w-full">
          <p className="text-base capitalize">{title}</p>
          {/* <HiOutlineX className="cursor-pointer text-2xl hover:text-gray-600" onClick={() => toast.dismiss(t.id)}/> */}
        </div>          
        <div className="flex text-sm">
          <p>{content}</p>
        </div>
      </div>
    ));
  }

  // Create an export of the team.
  const exportTeam = () => {
    if(Object.values(sectionsCompleted).every(val => val)) {
      let exportText = "";         
      pokemonOptions.forEach(p => {
        if(p.selected){
          let moveset = movesetOptions[p.moveset].filter(m => m.selected).map(m => {return m.name});
          exportText += capitalizeWords(p.name, "-");
          exportText += " @ " + capitalizeWords(itemOptions[p.item].name, "-");
          exportText += "\r\nAbility: " + capitalizeWords(abilityOptions[p.ability].name, "-");
          exportText += "\r\n" + (p.shiny ? "Level: 60\r\nShiny: Yes" : "Level: 50");
          exportText += "\r\n- " + capitalizeWords(moveset[0], "-");
          exportText += "\r\n- " + capitalizeWords(moveset[1], "-");
          exportText += "\r\n- " + capitalizeWords(moveset[2], "-");
          exportText += "\r\n- " + capitalizeWords(moveset[3], "-");    
          exportText += "\r\n\r\n";                             
        }
      });
      copyTextToClipboard(exportText);      
    }
    else {
      setToast('Controls', 'The team is not completely built!', {warning: true});      
    }
  }  

  // Copy the exported team to clipboard.
  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();  
    try {
      var successful = document.execCommand("copy");
      if(successful)
        setToast('Controls', 'Team copied to clipboard!', {success: true});      
      else
        setToast('Controls', 'Error copying the team to clipboard!', {error: true});
    } catch (err) {
      setToast('Controls', 'Unable to copy the team to clipboard!', {error: true});
    }  
    document.body.removeChild(textArea);
  }
  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function() {
        setToast('Controls', 'Team copied to clipboard!', {success: true});
      },
      function(err) {
        setToast('Controls', 'Error copying the team to clipboard!', {error: true});
      }
    );
  }

  // Render.
  return (        
    <TeamBuilderContext.Provider value={{
      pokemonOptions: pokemonOptions,
      selectionsNeeded: selectionsNeeded,
      selectionsMade: selectionsMade,
      selectPokemon: selectPokemon,
      selectMove: selectMove,
      assignPokemon: assignPokemon
    }}>
      <div className="bg-gray-100 min-h-screen">
        <Router basename="/React-Procedural-Pokemon">           
          <div className="flex flex-col">
            <Navbar />             
            <Switch>          
              <Route path="/about">
                <About />
              </Route>
              <Route path="/builder">        
                <TeamBuilder
                  loading={loading}
                  randomRolls={randomRolls}
                  pokemonOptions={pokemonOptions}
                  movesetOptions={movesetOptions}
                  abilityOptions={abilityOptions}
                  itemOptions={itemOptions}
                  generating={generating}
                  generateOptions={generateOptions}                
                  clearChoices={clearChoices}
                  exportTeam={exportTeam}
                />
              </Route>
              <Route path="/">
                <Home />
              </Route>          
            </Switch>
          </div> 
        </Router>      
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
      />
    </TeamBuilderContext.Provider>
  );
}
