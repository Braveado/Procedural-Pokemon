import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { TeamBuilderContext } from './context/TeamBuilderContext';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import TeamBuilder from './containers/TeamBuilder';
import About from './containers/About';
//import { HiOutlineX } from 'react-icons/hi';

export default function App() {
  // Constants.
  const apiUrl = 'https://pokeapi.co/api/v2/';
  const pokemonCount = 898;
  const moveCount = 826;
  const abilityCount = 267;
  const itemCount = 115;
  const itemOffset = 189;
  const randomRolls = {
    pokemons: 9,
    movesets: 6,
    moves: 6,
    abilities: 9,
    items: 9
  };

  // Filters
  const pokemonFilter = [ // Exclude pokemons with this keywords.
    // Legendaries: forms above 720 total stats.
    'eternamax', 'primal', 'ultra',
    // General: forms as strong as legendaries, weaker than a fully evolved pokemon.
    'mega', 'gmax', 'eternal', 'ash', 'solo',
    // Others.
    'totem'
  ];
  const moveFilter = [ // Exclude moves with this keywords.
    // General: max and z moves.
    'max', 'physical', 'special',
    // Specific z moves.
    'catastropika', 'moonsault', 'raid', '000', 'sparksurfer', 'evoboost', 'pancake', 'genesis', 'operetta', 'stormshards',
    'forever', 'soulblaze', 'guardian', 'sunraze', 'moonraze', 'burns', 'stealing'
  ];
  const moveStatusLimit = 3; // Max number of status moves in a moveset.
  const abilityFilter = [ // Exclude abilities with this keywords.
    // Unusable abilities.
    'run', 'stance', 'sweet', 'one', 'telepathy', 'harvest', 'honey', 'forecast', 'battle', 'rks',
    'gulp', 'receiver', 'gift', 'zen', 'aroma', 'illuminate', 'klutz', 'construct', 'face', 'hunger',
    'alchemy', 'battery', 'ball', 'plus', 'minus', 'shields', 'star', 'schooling', 'truant'
  ];
  const abilityAllow = [ // Include abilities with this keywords even when excluded by filter.    
    'armor', 
  ];
  const itemFilter = [ // Exclude items with this keywords.
    // Group items.
    'power', 'deep', 'scale', 'scarf', 'ball', 'powder', 'orb',
    // Specific items.
    'heat', 'smooth', 'icy', 'damp', 'protector', 'clay', 'destiny', 'punch', 'stick', 'reaper',
    'luck', 'egg', 'pure', 'coin', 'everstone', 'disc', 'magmarizer', 'electirizer', 'macho', 'exp',
    'cleanse', 'grip', 'sludge', 'thick', 'dew', 'soothe', 'grade', 'sticky'
  ];
  const itemAllow = [ // Include items with this keywords even when excluded by filter.    
    'herb', 'choice', 'bright', 'silver', 'life'
  ];

  // State.
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [moveList, setMoveList] = useState([]);
  const [abilityList, setAbilityList] = useState([]);  
  const [itemList, setItemList] = useState([]);  
  const [generating, setGenerating] = useState(false);
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [movesetOptions, setMovesetOptions] = useState([]);
  const [abilityOptions, setAbilityOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
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

  // Fetch lists from api on mount.
  useEffect (() => {
    let cancel = false;
    setLoading(true);  

    async function fetchData() {      
      const pokemonResults = await axios.get(`${apiUrl}pokemon?limit=${pokemonCount}`);
      const moveResults = await axios.get(`${apiUrl}move?limit=${moveCount}`);
      const abilityResults = await axios.get(`${apiUrl}ability?limit=${abilityCount}`);
      const itemResults = await axios.get(`${apiUrl}item?limit=${itemCount}&offset=${itemOffset}`);
      if(!cancel) {
        setPokemonList(pokemonResults.data.results);
        setMoveList(moveResults.data.results);
        setAbilityList(abilityResults.data.results);
        setItemList(itemResults.data.results);
        setLoading(false);              
      }
    };
    fetchData();
    
    return () => cancel = true;
  }, []);

  // Get a new set of options.
  async function generateOptions() {
    setGenerating(true);
    setPokemonOptions([]);
    setMovesetOptions([]); 
    setAbilityOptions([]);
    setItemOptions([]);

    await getPokemonOptions();
    await getMovesetOptions();
    await getAbilityOptions();
    await getItemOptions();

    setGenerating(false);   
    setToast('Team Builder', 'Options generated, build your team!', {success: true});
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
        pokemon.ability = null;
        pokemon.item = null;

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

    } while (checkDuplicatedName(currentPokemons, finalPokemon))    
    newPokemon = await axios.get(`${apiUrl}pokemon/${finalPokemon}`);
    return newPokemon.data
  };    

  // Get total stats for a pokemon.
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

  // Get a set of ability options.
  async function getAbilityOptions() {
    if(abilityList.length) {           
      let abilities = [];            

      for (let index = 0; index < randomRolls.abilities; index++) {
        const ability = await getNewAbility(abilities);
        abilities.push(ability);
        setAbilityOptions([...abilities]); 
      }                 
    }
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

  // Get a set of item options.
  async function getItemOptions() {
    if(itemList.length) {           
      let items = [];            

      for (let index = 0; index < randomRolls.items; index++) {
        const item = await getNewItem(items);
        items.push(item);
        setItemOptions([...items]); 
      }                 
    }
  }

  // Get a new ability option.
  async function getNewItem(currentItems) {    
    let newItem = '';       
   
    do{        
      let item = itemList[Math.floor(Math.random()*itemList.length)];      
      newItem = await axios.get(`${apiUrl}item/${item.name}`);            
    } while (checkDuplicatedName(currentItems, newItem.data.name) || FindKeywords(newItem.data.name, '-', itemFilter, itemAllow))
    //console.log(newItem.data.name);

    return newItem.data;
  }

  // Check for duplicate names in an array of objects.
  const checkDuplicatedName = (currentObjects, newObjectName) => {
    return currentObjects.find(co => co.name === newObjectName)
  }

  // Filter.
  const FindKeywords = (string, separator, filter, allow) => {
    let found = false;
    found = string.split(separator).some(keyword => filter.includes(keyword))
    if(found && allow)
      found = !string.split(separator).some(keyword => allow.includes(keyword))
    return found;
  }

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
    if(change)
      setPokemonOptions(options); 
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
    if(change)
      setMovesetOptions([...msOptions]);
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
    if(change)    
      setPokemonOptions(pokemons);
  }  

  const upperCaseWords = (string) => {
    return string.replace(/\b\w/g, l => l.toUpperCase())
  }

  // Clear all selections and assignments.
  const clearChoices = () => {
    const choicesMade = Object.values(selectionsMade).some(val => val.length ? val.some(i => i) : val);
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

  // Manage completed sections.
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

  // Show a toast notification.
  const setToast = (title, content, type) => {    
    toast.custom((t) => (
      <div onClick={() => toast.dismiss(t.id)}
        className={`cursor-pointer max-w-md w-full flex flex-col gap-2 bg-white p-2 rounded-md pointer-events-auto flex border-2 border-gray-200 hover:bg-gray-200 transition duration-150 ease-in-out 
        ${t.visible ? 'animate-enter' : 'animate-leave'}
        ${type.success ? 'bg-green-100 border-green-200 ring ring-green-100' : ''}
        ${type.warning ? 'bg-yellow-100 border-yellow-200 ring ring-yellow-100' : ''}
        ${type.error ? 'bg-red-100 border-red-200 ring ring-red-100' : ''}`}
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
        <Router>
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
              />
            </Route>
            <Route path="/">
              <Home />
            </Route>          
          </Switch>
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
