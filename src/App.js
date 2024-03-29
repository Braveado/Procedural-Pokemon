import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as api from './constants/api';
import * as filters from './constants/filters';
import * as usability from './constants/usability';
import * as team from './constants/team';
import { TeamBuilderContext } from './context/TeamBuilderContext';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './containers/Home';
import Format from './containers/Format';
import TeamBuilder from './containers/TeamBuilder';
import About from './containers/About';
import toast, { Toaster } from 'react-hot-toast';
import Tooltips from './components/Tooltips';
import {getStatPercentage} from './components/pokemon/PokemonStats';

export default function App() {
  // ----- STATE -----
  // API
  const [loading, setLoading] = useState(false);  
  const [pokemonList, setPokemonList] = useState([]);
  const [topPokemonList, setTopPokemonList] = useState([]);
  const [moveList, setMoveList] = useState([]);
  const [abilityList, setAbilityList] = useState([]);  
  const [itemList, setItemList] = useState([]);  
  const [typeList, setTypeList] = useState([]);
  const [natureList, setNatureList] = useState([]);   

  // Team builder.
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  /* const [teamData, setTeamData] = useState({
    teamAuthor: '',
    teamName: '',
    teamNotes: '',
  }); */
  const [generationToggles, setGenerationToggles] = useState({
    blind: false,
    doubles: false,
    megas: false,
    crystals: false,
  });
  const [pokemonPreviews, setPokemonPreviews] = useState([]);
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [movesetOptions, setMovesetOptions] = useState([]);
  const [abilityOptions, setAbilityOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [optionsData, setOptionsData] = useState({
    movesetsPerType: [],
    usableTypes: [],
    reverseOptions: []
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
  // Get generation toggles on mount.
  useEffect (() => {
    const storageToggles = JSON.parse(localStorage.getItem("storageToggles"));
    if(storageToggles){      
      setGenerationToggles(storageToggles);
    }
  }, []);

  // Fetch lists from api on mount.
  useEffect (() => {
    let cancel = false;  
    setLoading(true);    

    async function fetchData() {
      const pokemonResults = await axios.get(`${api.url}pokemon?limit=${api.pokemonCount}`);
      let topPokemonResults = [];
      for(let i = 0; i < api.topPokemonCountOffset.length; i++){
        topPokemonResults.push(await 
          (await axios.get(`${api.url}pokemon?limit=${api.topPokemonCountOffset[i][0]}&offset=${api.topPokemonCountOffset[i][1]}`)
        ).data.results);
      };      
      topPokemonResults = [].concat.apply([], topPokemonResults);
      const moveResults = await axios.get(`${api.url}move?limit=${api.moveCount}`);
      const abilityResults = await axios.get(`${api.url}ability?limit=${api.abilityCount}`);
      let itemResults = [];
      for(let i = 0; i < api.itemCountOffset.length; i++){
        itemResults.push(await 
          (await axios.get(`${api.url}item?limit=${api.itemCountOffset[i][0]}&offset=${api.itemCountOffset[i][1]}`)
        ).data.results);
      };      
      itemResults = [].concat.apply([], itemResults);
      const typeResults = await axios.get(`${api.url}type?limit=${api.typeCount}`);
      const natureResults = await axios.get(`${api.url}nature?nature=${api.natureCount}`);
      if(!cancel) {
        setPokemonList(pokemonResults.data.results);
        localStorage.setItem("pokemonList", JSON.stringify(pokemonResults.data.results));
        setTopPokemonList(topPokemonResults);
        localStorage.setItem("topPokemonList", JSON.stringify(topPokemonResults))
        setMoveList(moveResults.data.results);
        localStorage.setItem("moveList", JSON.stringify(moveResults.data.results))
        setAbilityList(abilityResults.data.results);
        localStorage.setItem("abilityList", JSON.stringify(abilityResults.data.results));
        setItemList(itemResults);
        localStorage.setItem("itemList", JSON.stringify(itemResults));
        setTypeList(typeResults.data.results);
        localStorage.setItem("typeList", JSON.stringify(typeResults.data.results));
        setNatureList(natureResults.data.results);
        localStorage.setItem("natureList", JSON.stringify(natureResults.data.results));
        setLoading(false);              
        localStorage.setItem("storageData", JSON.stringify(api.storageData));
      }
    };    
    //fetchData();
    const storageData = JSON.parse(localStorage.getItem("storageData"));
    if(!storageData || storageData.version !== api.storageData.version){      
      fetchData();
    }
    else{
      setPokemonList(JSON.parse(localStorage.getItem("pokemonList")));
      setTopPokemonList(JSON.parse(localStorage.getItem("topPokemonList")));
      setMoveList(JSON.parse(localStorage.getItem("moveList")));
      setAbilityList(JSON.parse(localStorage.getItem("abilityList")));
      setItemList(JSON.parse(localStorage.getItem("itemList")));
      setTypeList(JSON.parse(localStorage.getItem("typeList")));
      setNatureList(JSON.parse(localStorage.getItem("natureList")));
      setLoading(false);    
    }
    
    return () => cancel = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, []);

  // Toggle generation.
  function toggleGeneration(toggle) { 
    const newToggles = {
      ...generationToggles,
      ...toggle,
    };     
    setGenerationToggles(newToggles); 
    localStorage.setItem("storageToggles", JSON.stringify(newToggles));   
  }

  // Start generation.
  function generateOptions() {        
    setPokemonOptions([]);
    setMovesetOptions([]); 
    setAbilityOptions([]);
    setItemOptions([]);
    setOptionsData({
      movesetsPerType: [],
      usableTypes: [],
      reverseOptions: []
    });
    setGenerationStep(0);
    setGenerating(true);    
  }

  // Generate pokemon 
  useEffect(() => {
    let cancel = false;

    // Get a new set of pokemon options.
    async function getPokemonOptions() {
      let pokemons = [];
      let shinyIndex = Math.floor(Math.random()*team.randomOptions.pokemons);  
      let topPokemon = 0;

      for (let index = 0; index < team.randomOptions.pokemons; index++) {
        const pokemon = await getNewPokemon(pokemons, topPokemon);
        const species = await axios.get(pokemon.species.url);
        // name        
        let tempName = pokemon.name.split('-');
        if(tempName.includes('minior')){
          pokemon.name = tempName.filter(key => {return key === 'minior' || key === 'meteor'}).join("-");
        }
        // gender
        pokemon.gender_rate = species.data.gender_rate;
        if(pokemon.gender_rate < 0)
          pokemon.gender = "genderless";
        else if(FindKeywords(pokemon.name, '-', ['male']))
          pokemon.gender = "male";
        else if(FindKeywords(pokemon.name, '-', ['female']))
          pokemon.gender = "female";
        else if(pokemon.gender_rate === 0)
          pokemon.gender = "male";
        else if(pokemon.gender_rate === 8)
          pokemon.gender = "female";
        else {
          pokemon.gender = (Math.random()*101) <= (pokemon.gender_rate * 12.5) ? "female" : "male";
        }        
        // balance             
        pokemon.is_mythical = species.data.is_mythical;
        pokemon.is_legendary = species.data.is_legendary;  
        pokemon.is_mega = pokemon.name.split('-').includes('mega');                 
        pokemon.shiny = (index === shinyIndex);
        pokemon.level = pokemon.shiny ? 60 : 50;
        pokemon.nickname = '';
        // stats        
        pokemon.stats.map(s => {          
          s.ev = 0;
          s.iv = -1;
          return s;
        });                       
        let stat = null;
        for(let i = 0; i < 3; i++){
          do{
            stat = pokemon.stats[Math.floor(Math.random()*pokemon.stats.length)];
          } while (stat.ev > 0)
          if (i <= 1)
            stat.ev = 252;
          else if (i === 2)
            stat.ev = 4;        
        }        
        for(let i = 0; i < 6; i++){
          do{
            stat = pokemon.stats[Math.floor(Math.random()*pokemon.stats.length)];
          } while (stat.iv >= 0)
          if (i <= 2)
            stat.iv = 31;
          else if (i >= 3)
            stat.iv = Math.floor(Math.random() * 32);                    
        }
        pokemon.nature = natureList[Math.floor(Math.random()*natureList.length)];
        const nature = await axios.get(pokemon.nature.url);
        pokemon.nature.increased = nature.data.increased_stat;
        pokemon.nature.decreased = nature.data.decreased_stat;
        pokemon.stats.map((s, i) => {
          if(i === 0)
            s.calculated_stat = Math.floor((s.base_stat * 2 + s.iv + (s.ev/4)) * pokemon.level / 100 + 10 + pokemon.level);
          else{
            s.calculated_stat = (s.base_stat * 2 + s.iv + (s.ev/4)) * pokemon.level / 100 + 5;
            if(pokemon.nature.increased && pokemon.nature.increased.name === s.stat.name)
              s.calculated_stat *= 1 + 0.1;
            else if(pokemon.nature.decreased && pokemon.nature.decreased.name === s.stat.name)
              s.calculated_stat *= 1 - 0.1;
            s.calculated_stat = Math.floor(s.calculated_stat);
          }
          return s;
        });
        pokemon.highestStats = pokemon.stats.map((s, i) => {
          return {statIndex: i, 
            percentage: getStatPercentage(i === 0 ? team.statRanges.hp : team.statRanges.general, s.calculated_stat)}
        });
        pokemon.highestStats.sort(function(a, b){return b.percentage-a.percentage});
        pokemon.highestStats = pokemon.highestStats.filter(s => s.percentage >= 50);
        pokemon.stats.push({name: 'total', base_stat: getTotalStats(pokemon.stats)});
        // Check for top pokemon balance
        if(topPokemon < team.topPokemonBalance && (
          (pokemon.stats[6].base_stat >= team.topPokemonTotalStatsThreshold) ||
          ((pokemon.is_mythical || pokemon.is_legendary) && pokemon.stats[6].base_stat >= team.normalPokemonTotalStatsThreshold) ||
          (pokemon.is_mega && pokemon.stats[6].base_stat >= team.normalPokemonTotalStatsThreshold)
        )){
          topPokemon += 1;
        }
        // selections
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
    async function getNewPokemon(currentPokemons, topPokemon) {    
      let newPokemon = '';
      let finalPokemon = '';
      let keepEvolving = true;
      let isTopPokemon = false;
      let pokemonTotalBaseStats = 0;

      do {          
          let pokemon = null;
          if(topPokemon < team.topPokemonBalance && currentPokemons.length + team.topPokemonBalance >= team.randomOptions.pokemons)
            pokemon = topPokemonList[Math.floor(Math.random()*topPokemonList.length)];
          else
            pokemon = pokemonList[Math.floor(Math.random()*pokemonList.length)];
          const initialPokemon = await axios.get(`${api.url}pokemon/${pokemon.name}`);
          const species = await axios.get(initialPokemon.data.species.url);
          const evolutions = await axios.get(species.data.evolution_chain.url);

          keepEvolving = !filters.pokemonPreventEvolution.includes(species.data.name);
          
          // Get an array of evolutions.
          let evoChain = [];
          let evoData = evolutions.data.chain;
          do {                        
              // Current.
              if(keepEvolving){
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
              }
              else
                evoChain.push(species.data.name);
                        
          } while (!!evoData && evoData.hasOwnProperty('evolves_to') && keepEvolving);   
          
          // Get the/a final evolution.
          let finalEvolution = evoChain[evoChain.length - 1];
          if(Array.isArray(finalEvolution)){
            finalEvolution = finalEvolution[Math.floor(Math.random()*finalEvolution.length)];        
          }
  
          // Get the varieties for the final evolution.
          const finalSpecies = await axios.get(`${api.url}pokemon-species/${finalEvolution}`);
          let varieties = [];
          finalSpecies.data.varieties.forEach((v, i) => {
            varieties.push(finalSpecies.data.varieties[i].pokemon.name)
          });                
  
          // Filter varieties for more balance.
          let finalPokemonFilters = filters.pokemonFilter;
          if(!generationToggles.megas)
            finalPokemonFilters = finalPokemonFilters.concat(filters.toggleMegaPokemon);
          varieties = varieties.filter(v => {          
            return !FindKeywords(v, '-', finalPokemonFilters, filters.pokemonAllow, filters.pokemonFilterSpecific);          
          });       
  
          // Get the final pokemon from the varieties.
          finalPokemon = varieties[Math.floor(Math.random()*varieties.length)];

          if(finalPokemon){
            newPokemon = await axios.get(`${api.url}pokemon/${finalPokemon}`);
            // Check for top pokemon balance
            pokemonTotalBaseStats = getTotalStats(newPokemon.data.stats);
            isTopPokemon = (
              (pokemonTotalBaseStats >= team.topPokemonTotalStatsThreshold) ||
              ((finalSpecies.data.is_mythical || finalSpecies.data.is_legendary) && pokemonTotalBaseStats >= team.normalPokemonTotalStatsThreshold) ||
              (finalPokemon.split('-').includes('mega') && pokemonTotalBaseStats >= team.normalPokemonTotalStatsThreshold)
            )            
          }
      } while (!finalPokemon || checkDuplicatedName(currentPokemons, finalPokemon) ||
              (isTopPokemon && topPokemon >= team.topPokemonBalance) ||
              (!isTopPokemon && topPokemon < team.topPokemonBalance && 
              currentPokemons.length + team.topPokemonBalance >= team.randomOptions.pokemons))
      return newPokemon.data
    };

    if(generating && generationStep === 0 && pokemonList.length > 0){      
      getPokemonOptions();      
    }
    return () => cancel = true;
  }, [generating, generationStep, generationToggles.megas, pokemonList, topPokemonList, natureList])

  // Helper functions for usability checks.
  const getPokemonUsability = useCallback((pokemons) => {    
    return pokemonOptions.find(p => pokemons.includes(p.name));
  }, [pokemonOptions]);

  const getRandomPokemonType = useCallback((exclude) => {   
    let types = typeList.filter(t => !exclude.includes(t.name)); 
    return types[Math.floor(Math.random()*types.length)].name;
  }, [typeList]);

  // Generate movesets
  useEffect(() => {
    let cancel = false;

    // Get a set of moveset options.  
    async function getMovesetOptions() {              
      let movesets = [];            

      for (let index = 0; index < team.randomOptions.movesets; index++) {
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
      let usable = true;  
      let combo = '';
      
      for (let index = 0; index < team.randomOptions.moves; index++) {            
        do{        
          if(combo){
            move = {name: combo};
            combo = '';
          }
          else
            move = moveList[Math.floor(Math.random()*moveList.length)];
          move = await axios.get(`${api.url}move/${move.name}`);
          status = move.data.damage_class && move.data.damage_class.name === 'status'; 
          usable = true;       

          switch(move.data.name){            
            case 'swallow':
            case 'spit-up':
              // Check space for combo moves.
              if(!newMoveset.find(m => m.name === 'stockpile')){
                usable = (team.randomOptions.moves - newMoveset.length) >= 2;
                if(usable){
                  if(move.data.name === 'swallow' && (team.moveStatusLimit - statusMoves) >= 2)
                    combo = 'stockpile';
                  else if(move.data.name === 'spit-up' && (team.moveStatusLimit - statusMoves) >= 1)
                    combo = 'stockpile';
                  else if((team.moveStatusLimit - statusMoves) <= 0)
                    usable = false;
                }                                  
              }                          
              break;              
            case 'stockpile':
              // Check space for combo moves.
              if(!newMoveset.find(m => m.name === 'swallow') && !newMoveset.find(m => m.name === 'spit-up')){
                usable = (team.randomOptions.moves - newMoveset.length) >= 2;
                if(usable){
                  if((team.moveStatusLimit - statusMoves) >= 2)
                    combo = Math.random() < 0.5 ? 'swallow' : 'spit-up';
                  else if((team.moveStatusLimit - statusMoves) >= 1)
                    combo = 'spit-up';
                  else if((team.moveStatusLimit - statusMoves) <= 0)
                    usable = false;
                }
              }
              break;
            case 'aurora-veil':
              // Check space for combo moves.
              if(!newMoveset.find(m => m.name === 'hail')){
                usable = (team.randomOptions.moves - newMoveset.length) >= 2;
                if(usable){
                  if((team.moveStatusLimit - statusMoves) >= 2)
                    combo = 'hail';
                  else if((team.moveStatusLimit - statusMoves) <= 1)
                    usable = false;
                }
              }
              break;             
            case 'hyperspace-fury':
              // Check for specific pokemon.
              usable = getPokemonUsability(['hoopa-unbound']);
              break;
            case 'dark-void':
              // Check for specific pokemon.
              usable = getPokemonUsability(['darkrai']);
              break;
            case 'aura-wheel':
              // Check for specific pokemon.
              usable = getPokemonUsability(['morpeko-full-belly']);
              break;
            case 'hidden-power':
              // Set a random type other than normal and fairy.
              move.data.type.name = getRandomPokemonType(['normal', 'fairy']);
              break;
            default:
              break;
          }
        } while (checkDuplicatedName(newMoveset, move.data.name) || 
                FindKeywords(move.data.name, '-', filters.moveFilter, filters.moveAllow) ||
                (status && statusMoves >= team.moveStatusLimit) || !usable)
        move.data.selected = false;
        newMoveset.push(move.data);      
        if(status){
          statusMoves = statusMoves + 1;
          status = false;
        }
      }
      return newMoveset;
    }

    if(generating && generationStep === 1 && moveList.length > 0){      
      getMovesetOptions();
    }
    return () => cancel = true;
  }, [generating, generationStep, moveList, getPokemonUsability, getRandomPokemonType]);

  // Respond to moveset options generated completely.
  useEffect (() => {  
    let cancel = false;

    if(generating && generationStep === 2 && movesetOptions.length >= team.randomOptions.movesets){
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
  }, [generating, generationStep, movesetOptions, typeList]);  

  // Helper functions for usability checks.
  const getPokemonTypeUsability = useCallback((type) => {
    return pokemonOptions.find(p => p.types.find(t => t.type.name === type));
  }, [pokemonOptions])  

  const getMovesetTypeUsability = useCallback((types) => {
    let usable = types.find(t => optionsData.usableTypes.includes(t));
    return usable;
  }, [optionsData]);

  const getTypeFromEffect = useCallback((effect) => {
    return effect.replace(/-/g, " ").split(" ").find(keyword => optionsData.usableTypes.includes(keyword));
  }, [optionsData]);

  const getMovesetTypeUsabilityForItems = useCallback((item, currentItems) => {
    let usable = false;
    let type = getTypeFromEffect(item.effect_entries.find(e => e.language.name === 'en').effect.toLowerCase());
    if(type){  
      // Check current items.          
      let itemsOfType = 0;
      currentItems.forEach(ci => {
        if((ci.category.name === 'type-enhancement' || ci.category.name === 'plates') && 
          getTypeFromEffect(ci.effect_entries.find(e => e.language.name === 'en').effect.toLowerCase()) === type)                
        itemsOfType += 1;              
      });    
      usable = optionsData.movesetsPerType.find(mt => mt.name === type && itemsOfType < mt.movesets);
    }
    return usable;
  }, [optionsData, getTypeFromEffect]);

  const getSpecificOptionsUsabilityForItems = useCallback((moves, abilities, items, currentItems) => {
    let usable = false;            
    let maxOptions = 0;
    let itemsOfType = 0;

    // Get max options.
    if(moves){      
      movesetOptions.forEach(mo => {
        if(mo.find(m => moves.includes(m.name)))
          maxOptions += 1
      });
    }    
    if(abilities){      
      if(abilityOptions.find(a => abilities.includes(a.name)))
        maxOptions += 1;
    }                    
    // Get current items.  
    if(items){    
      currentItems.forEach(ci => {                
        if(ci.name.split('-').find(keyword => items.includes(keyword)))
          itemsOfType += 1;
      });    
      usable = (itemsOfType < maxOptions);
    }    
    else{
      // Specific case for plates.
      // Get current items.
      currentItems.forEach(ci => {        
        if(ci.category.name === 'plates' &&
          !optionsData.usableTypes.includes(getTypeFromEffect(ci.effect_entries.find(e => e.language.name === 'en').effect.toLowerCase())))
          itemsOfType += 1;        
      });
      usable = (itemsOfType < maxOptions);
    }

    return usable;
  }, [optionsData, movesetOptions, abilityOptions, getTypeFromEffect]);

  const getMoveMechanicUsability = useCallback((mechanic, exactMoves, ignoreMoves) => {
    let moveNames = movesetOptions.map(ms => { return ms.map(m => { return m.name } ) });
    moveNames = [].concat.apply([], moveNames);

    if(ignoreMoves && ignoreMoves.length > 0){
      moveNames = moveNames.filter(name => {return !ignoreMoves.includes(name)})
    }
    
    if(exactMoves && exactMoves.length > 0){      
      return moveNames.find(name => exactMoves.includes(name));
    }
    else {
      switch(mechanic){
        case 'charge':
          return moveNames.find(name => usability.chargeMoves.includes(name));
        case 'bind':
          return moveNames.find(name => usability.bindMoves.includes(name));
        case 'drain':
          return moveNames.find(name => usability.drainMoves.includes(name));
        case 'terrain':
          return moveNames.find(name => usability.terrainMoves.includes(name));
        case 'weather':
          return moveNames.find(name => usability.weatherMoves.includes(name));
        case 'barrier':        
          return moveNames.find(name => usability.barrierMoves.includes(name));
        case 'orb':        
          return moveNames.find(name => usability.orbMoves.includes(name));
        case 'punch':        
          return moveNames.find(name => usability.punchMoves.includes(name));
        case 'multistrike':        
          return moveNames.find(name => usability.multistrikeMoves.includes(name));
        case 'recoil':        
          return moveNames.find(name => usability.recoilMoves.includes(name));
        case 'crash':        
          return moveNames.find(name => usability.crashMoves.includes(name));
        case 'bite':        
          return moveNames.find(name => usability.biteMoves.includes(name));
        case 'pulse':        
          return moveNames.find(name => usability.pulseMoves.includes(name));
        case 'sound':        
          return moveNames.find(name => usability.soundMoves.includes(name));
        case 'heal':        
          return moveNames.find(name => usability.healMoves.includes(name));
        case 'contact':        
          return moveNames.find(name => usability.contactMoves.includes(name));
        case 'bad-item':        
          return moveNames.find(name => usability.badItemMoves.includes(name));
        case 'bad-ability':        
          return moveNames.find(name => usability.badAbilityMoves.includes(name));
        default:
          return false;
      }    
    }
  }, [movesetOptions]);

  const getAbilityMechanicUsability = useCallback((mechanic, exactAbilities) => {
    let abilityNames = abilityOptions.map(a => { return a.name } );

    if(exactAbilities && exactAbilities.length > 0){     
      return abilityNames.find(name => exactAbilities.includes(name));
    }
    else {
      switch(mechanic){
        case 'terrain':
          return abilityNames.find(name => usability.terrainAbilities.includes(name));      
        case 'weather':
          return abilityNames.find(name => usability.weatherAbilities.includes(name)); 
        case 'orb':
          return abilityNames.find(name => usability.orbAbilities.includes(name));
        default:
          return false;
      }    
    }
  }, [abilityOptions])

  // Helper funciton for usability checks.
  const getReverseOption = useCallback((index) => {
    if(optionsData.reverseOptions[index])
      return optionsData.reverseOptions[index]
    else
      return null;      
  }, [optionsData])

  // Generate abilities
  useEffect(() => {
    let cancel = false;

    // Get a set of ability options.
    async function getAbilityOptions() {      
      let abilities = [];            

      for (let index = 0; index < team.randomOptions.abilities; index++) {
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
      let usable = true;      
    
      do{        
        let ability = abilityList[Math.floor(Math.random()*abilityList.length)];      
        newAbility = await axios.get(`${api.url}ability/${ability.name}`);     
        usable = true;    
                               
        switch(newAbility.data.name){
          case 'iron-fist':
            // Check for punch moves.
            usable = getMoveMechanicUsability('punch');            
            break;                       
          case 'skill-link':
            // Check for multistrike moves.
            usable = getMoveMechanicUsability('multistrike');            
            break;
          case 'reckless':
            // Check for recoil/crash moves.
            usable = (getMoveMechanicUsability('recoil') || getMoveMechanicUsability('crash'));  
            break;  
          case 'rock-head':
            // Check for recoil moves.
            usable = getMoveMechanicUsability('recoil');        
            break;
          case 'strong-jaw':
            // Check for bite moves.
            usable = getMoveMechanicUsability('bite');            
            break;
          case 'mega-launcher':
            // Check for pulse/aura moves.
            usable = getMoveMechanicUsability('pulse');            
            break;
          case 'liquid-voice':
            // Check for sound moves.
            usable = getMoveMechanicUsability('sound', null, ['sparkling-aria']);
            break;
          case 'punk-rock':
            // Check for sound moves.
            usable = (getMoveMechanicUsability('sound'));
            break;
          case 'triage':
            // Check for heal moves.
            usable = getMoveMechanicUsability('heal');
            break;      
          case 'tough-claws':
          case 'unseen-fist':
          case 'poison-touch':
          case 'long-reach':
            // Check for contact moves.
            usable = getMoveMechanicUsability('contact');
            break;    
          case 'flash-fire':
          case 'blaze':
            // Check for fire moves.
            usable = getMovesetTypeUsability(['fire']);
            break;
          case 'overgrow':
            // Check for grass moves.
            usable = getMovesetTypeUsability(['grass']);
            break;
          case 'torrent':
            // Check for water moves.
            usable = getMovesetTypeUsability(['water']);
            break;
          case 'swarm':
            // Check for bug moves.
            usable = getMovesetTypeUsability(['bug']);
            break;
          case 'scrappy':
            // Check for normal or fighting moves.
            usable = getMovesetTypeUsability(['normal', 'fighting']);
            break;          
          case 'gale-wings':
            // Check for flying moves.
            usable = getMovesetTypeUsability(['flying']);
            break;
          case 'dark-aura':
            // Check for dark moves.
            usable = getMovesetTypeUsability(['dark']);
            break;
          case 'fairy-aura':
            // Check for fairy moves.
            usable = getMovesetTypeUsability(['fairy']);
            break;
          case 'steelworker':
          case 'steely-spirit':
            // Check for steel moves.
            usable = getMovesetTypeUsability(['steel']);
            break;
          case 'transistor':
            // Check for electric moves.
            usable = getMovesetTypeUsability(['electric']);
            break;
          case 'dragons-maw':
            // Check for dragon moves.
            usable = getMovesetTypeUsability(['dragon']);
            break;            
          case 'refrigerate':
          case 'pixilate':
          case 'galvanize':
          case 'aerilate': 
            // Check for normal moves.
            usable = getMovesetTypeUsability(['normal']);
            break;           
          case 'flower-veil':
            // Check for grass pokemon.
            usable = getPokemonTypeUsability('grass');
            break;
          case 'multitype':
            // Check for specific pokemon.
            usable = getPokemonUsability(['arceus']);
            break;
          case 'rks-system':
            // Check for specific pokemon.
            usable = getPokemonUsability(['silvally']);
            break;
          case 'ice-face':
            // Check for specific pokemon.
            usable = getPokemonUsability(['eiscue-ice']);
            break;
          case 'hunger-switch':
            // Check for specific pokemon.
            usable = (getPokemonUsability(['morpeko-full-belly']) && getMoveMechanicUsability('', ['aura-wheel']));
            break;
          case 'forecast':
            // Check for specific pokemon.
            usable = (getPokemonUsability(['castform']) && 
              (getMoveMechanicUsability('', ['sunny-day', 'rain-dance', 'hail']) || 
              getAbilityMechanicUsability('', ['drought', 'desolate-land', 'drizzle', 'primordial-sea', 'snow-warning'])));
            break;
          case 'flower-gift':
            // Check for specific pokemon.
            usable = (getPokemonUsability(['cherrim']) && 
              (getMoveMechanicUsability('', ['sunny-day']) || getAbilityMechanicUsability('', ['drought', 'desolate-land'])));
            break;
          case 'zen-mode':
            // Check for specific pokemon.
            usable = getPokemonUsability(['darmanitan-standard', 'darmanitan-standard-galar']);
            break;
          case 'battle-bond':
            // Check for specific pokemon.
            usable = getPokemonUsability(['greninja']);
            break;
          case 'stance-change':
            // Check for specific pokemon.
            usable = (getPokemonUsability(['aegislash-shield']) && getMoveMechanicUsability('', ['kings-shield']));
            break;
          case 'power-construct':
            // Check for specific pokemon.
            usable = getPokemonUsability(['zygarde-50', 'zygarde-10']);
            break;
          case 'shields-down':
            // Check for specific pokemon.
            usable = getPokemonUsability(['minior-meteor']);
            break;
          case 'disguise':
            // Check for specific pokemon. No effect: 'mimikyu-busted'
            usable = getPokemonUsability(['mimikyu-disguised']);
            break;
          case 'gulp-missile':
            // Check for specific pokemon.
            usable = (getPokemonUsability(['cramorant']) && getMoveMechanicUsability('', ['surf', 'dive']));
            break;
          case 'truant':
          case 'stall':
          case 'klutz':
          case 'slow-start':
          case 'defeatist': 
            // Check for bad abilities.
            usable = getMoveMechanicUsability('bad-ability');
            break;
          case 'mimicry':
            // Check for terrain moves or abilities.
            usable = (getMoveMechanicUsability('terrain') || getAbilityMechanicUsability('terrain'));
            break;
          case 'grass-pelt':
            // Check for grassy terrain moves or abilities.
            usable = (getMoveMechanicUsability('', ['grassy-terrain']) || getAbilityMechanicUsability('', ['grassy-surge']));
            break;
          case 'surge-surfer':
            // Check for electric terrain moves or abilities.
            usable = (getMoveMechanicUsability('', ['electric-terrain']) || getAbilityMechanicUsability('', ['electric-surge']));
            break;
          case 'clorophyll':       
          case 'leaf-guard':
          case 'solar-power':                   
            // Check for harsh sunlight weather moves or abilities.
            usable = (getMoveMechanicUsability('', ['sunny-day']) || getAbilityMechanicUsability('', ['drought', 'desolate-land']));
            break;
          case 'hydration':
          case 'rain-dish':
          case 'swift-swim':                   
            // Check for rain weather moves or abilities.
            usable = (getMoveMechanicUsability('', ['rain-dance']) || getAbilityMechanicUsability('', ['drizzle', 'primordial-sea']));
            break;
          case 'sand-veil':   
          case 'sand-rush':              
            // Check for sandstorm weather moves or abilities.
            usable = (getMoveMechanicUsability('', ['sandstorm']) || getAbilityMechanicUsability('', ['sand-stream', 'sand-spit']));
            break;
          case 'sand-force':
            // Check for sandstorm weather moves or abilities and rock, ground or steel moves.
            usable = (getMoveMechanicUsability('', ['sandstorm']) || getAbilityMechanicUsability('', ['sand-stream', 'sand-spit'])) &&
              getMovesetTypeUsability(['rock', 'ground', 'steel']);
            break;
          case 'ice-body': 
          case 'snow-cloak':   
          case 'slush-rush':              
            // Check for hail weather moves or abilities.
            usable = (getMoveMechanicUsability('', ['hail']) || getAbilityMechanicUsability('', ['snow-warning']));
            break;
          default:
            break;
        }                  
      } while (checkDuplicatedName(currentAbilities, newAbility.data.name) || 
              FindKeywords(newAbility.data.name, '-', filters.abilityFilter, filters.abilityAllow) || !usable)      

      return newAbility.data;
    }

    if(generating && generationStep === 3 && abilityList.length > 0){      
      getAbilityOptions();
    }
    return () => cancel = true;

    // eslint-disable-next-line
  }, [generating, generationStep, abilityList, 
      getMoveMechanicUsability, getMovesetTypeUsability, getPokemonUsability]);

  // Respond to ability options generated completely.
  useEffect (() => {  
    let cancel = false;

    if(generating && generationStep === 4 && abilityOptions.length >= team.randomOptions.abilities){

      // Check abilities that change move types.
      let msPerType = optionsData.movesetsPerType;            
      msPerType.forEach(ms => {
        switch(ms.name){
          case 'normal':
            if (abilityOptions.find(a => a.name === 'normalize'))
              ms.movesets += 1;
            break;
          case 'ice':
            if (abilityOptions.find(a => a.name === 'refrigerate'))
              ms.movesets += 1;              
            break;
          case 'fairy':
            if (abilityOptions.find(a => a.name === 'pixilate'))
              ms.movesets += 1;              
            break;
          case 'electric':
            if (abilityOptions.find(a => a.name === 'galvanize'))
              ms.movesets += 1;              
            break;
          case 'flying':
            if (abilityOptions.find(a => a.name === 'aerilate'))
              ms.movesets += 1;              
            break;
          default:          
            break;
        }
      })                                   
      let uTypes = msPerType.filter(t => t.movesets !== 0).map(t => {return t.name});     

      // Prepare options for possible reverse branch logic.
      let rOptions = []; 
      let options =  movesetOptions.map(ms => ms.map(m => {return m.name}));
      options.push(abilityOptions.map(a => {return a.name}));
      options = [].concat.apply([], options);   

      // Check for reverse branch logic options. 
      options.forEach(opt => {
        if(!rOptions.includes('consumable') && [...usability.consumableItemMoves, ...usability.consumableItemAbilities].includes(opt))
          rOptions.push('consumable');
        else if(!rOptions.includes('plate') && opt === 'multitype')
          rOptions.push('plate');
        else if(!rOptions.includes('memory') && opt === 'rks-system')
          rOptions.push('memory');
        else if(!rOptions.includes('berry') && [...usability.berryMoves, ...usability.berryAbilities].includes(opt))
          rOptions.push('berry');
      });          

      if(!cancel){
        setOptionsData(s => {return {...s, movesetsPerType: msPerType, usableTypes: uTypes, reverseOptions: rOptions} });     
        setGenerationStep(5);
      }
    }    
    return () => cancel = true;
  }, [generating, generationStep, movesetOptions, abilityOptions, optionsData]);

  // Generate items
  useEffect(() => {
    let cancel = false;

    // Get a set of item options.
    async function getItemOptions() {          
      let items = [];                  
      for (let index = 0; index < team.randomOptions.items; index++) {
        let itemType = getReverseOption(index);
        let item = "";
        if(itemType)
          item = await getNewItem(items, itemType);
        else
          item = await getNewItem(items);
        items.push(item);
        if(!cancel)
          setItemOptions([...items]); 
      }                 
      if(!cancel)
        setGenerationStep(6); 
    }

    // Get a new item option.
    async function getNewItem(currentItems, itemType) {    
      let newItem = '';    
      let usable = true; 
            
      do{        
        let item = "";
        switch(itemType){
          case 'consumable':
            item = {name: usability.consumableItems[Math.floor(Math.random()*usability.consumableItems.length)]};
            break;
          case 'plate':
            item = {name: usability.plateItems[Math.floor(Math.random()*usability.plateItems.length)]};
            break;
          case 'memory':
            item = {name: usability.memoryItems[Math.floor(Math.random()*usability.memoryItems.length)]};
            break;
          case 'berry':
            item = {name: usability.berryItems[Math.floor(Math.random()*usability.berryItems.length)]};
            break;
          default:
            item = itemList[Math.floor(Math.random()*itemList.length)];      
            break;
        }        
        newItem = await axios.get(`${api.url}item/${item.name}`);   
        usable = true;    
                               
        switch(newItem.data.category.name){          
          case 'held-items':
            switch(newItem.data.name){
              case 'power-herb': 
                // Check for charge moves.               
                usable = getMoveMechanicUsability('charge', null, ['sky-drop']);                
                break;
              case 'grip-claw':
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
              case 'electric-seed':
                // Check for electric terrain moves or abilities.
                usable = (getMoveMechanicUsability('', ['electric-terrain']) || getAbilityMechanicUsability('', ['electric-surge']));
                break;
              case 'grassy-seed':
                // Check for grassy terrain moves or abilities.
                usable = (getMoveMechanicUsability('', ['grassy-terrain']) || getAbilityMechanicUsability('', ['grassy-surge']));
                break;
              case 'misty-seed':
                // Check for misty terrain moves or abilities.
                usable = (getMoveMechanicUsability('', ['misty-terrain']) || getAbilityMechanicUsability('', ['misty-surge']));
                break;
              case 'psychic-seed':
                // Check for psychic terrain moves or abilities.
                usable = (getMoveMechanicUsability('', ['psychic-terrain']) || getAbilityMechanicUsability('', ['psychic-surge']));
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
                usable = (getPokemonTypeUsability('poison') || getMoveMechanicUsability('bad-item'));                
                break;
              case 'light-clay':                
                // Check for barrier moves.
                usable = getMoveMechanicUsability('barrier');                
                break;    
              case 'ring-target':                
                // Check for bad item moves.
                usable = getMoveMechanicUsability('bad-item');
                break;  
              case 'throat-spray':
                // Check for sound moves.
                usable = getMoveMechanicUsability('sound');
                break;
              case 'room-service':
                // Check for specific move.
                usable = getMoveMechanicUsability('', ['trick-room']);
                break;
              default:
                break;
            }
            break;
          case 'bad-held-items':
            switch(newItem.data.name){
              case 'toxic-orb':                   
                // Check for orb moves or abilities.
                usable = (getMoveMechanicUsability('orb') || getMoveMechanicUsability('bad-item') || 
                          getAbilityMechanicUsability('orb') || getAbilityMechanicUsability('', ['poison-heal', 'toxic-boost']));                                          
                break;
              case 'flame-orb':                                               
                // Check for orb moves or abilities.
                usable = (getMoveMechanicUsability('orb') || getMoveMechanicUsability('bad-item') || 
                          getAbilityMechanicUsability('orb') || getAbilityMechanicUsability('', ['flare-boost']));                
                break;
              case 'iron-ball':
              case 'lagging-tail':
              case 'sticky-barb':
              case 'full-incense': 
                // Check for bad item moves.
                usable = getMoveMechanicUsability('bad-item');
                break; 
              default:
                break;
            }
            break;
          case 'plates':
            // Check for movesets with that type, a specific move or a specific ability.
            usable = (getMovesetTypeUsabilityForItems(newItem.data, currentItems) ||
                      getSpecificOptionsUsabilityForItems(['judgment'], ['multitype'], '', currentItems));
            break;
          case 'memories':                        
            // Check for a specific move or a specific ability.            
            usable = getSpecificOptionsUsabilityForItems(['multi-attack'], ['rks-system'], ['memory'], currentItems);
            break;
          case 'type-enhancement':
            // Check for movesets with that type.
            usable = getMovesetTypeUsabilityForItems(newItem.data, currentItems);
            break; 
          case 'jewels':                        
            // Check for a specific move type
            usable = getMovesetTypeUsabilityForItems(newItem.data, currentItems);
            break;           
          case 'species-specific':
              switch(newItem.data.name){
                case 'douse-drive':                                     
                case 'shock-drive':
                case 'burn-drive':
                case 'chill-drive':                                               
                  // Check for a specific move.
                  usable = getSpecificOptionsUsabilityForItems(['techno-blast'], '', ['drive'], currentItems);
                  break;
                case 'stick':
                  // Check for a specific pokemon.
                  usable = getPokemonUsability(['sirfetchd']);
                  break;
                case 'thick-club':
                  // Check for a specific pokemon.
                  usable = getPokemonUsability(['marowak', 'marowak-alola']);
                  break;
                case 'soul-dew':
                  // Check for a specific pokemon.
                  usable = (getPokemonUsability(['latios', 'latias']) && getMovesetTypeUsability(['dragon', 'psychic']));
                  break;
                case 'griseous-orb':
                  // Check for a specific pokemon and move types.
                  usable = (getPokemonUsability(['giratina-altered']) && getMovesetTypeUsability(['dragon', 'ghost']));
                  break;
                case 'adamant-orb':
                  // Check for a specific pokemon and move types.
                  usable = (getPokemonUsability(['dialga']) && getMovesetTypeUsability(['dragon', 'steel']));
                  break;
                case 'lustrous-orb':
                  // Check for a specific pokemon and move types.
                  usable = (getPokemonUsability(['palkia']) && getMovesetTypeUsability(['dragon', 'water']));
                  break;
                case 'rusted-sword':
                  // Check for a specific pokemon.
                  usable = getPokemonUsability(['zacian']);
                  break;
                case 'rusted-shield':
                  // Check for a specific pokemon.
                  usable = getPokemonUsability(['zamazenta']);
                  break;
                default:
                  break;
              }
            break;
          default:
            break;
        }                      
      } while (checkDuplicatedName(currentItems, newItem.data.name) || 
              FindKeywords(newItem.data.name, '-', filters.itemFilter, filters.itemAllow) || !usable)
      
      return newItem.data;
    } 

    if(generating && generationStep === 5 && itemList.length > 0){      
      getItemOptions();
    }
    return () => cancel = true;
  }, [generating, generationStep, itemList,
      getMovesetTypeUsabilityForItems, getMoveMechanicUsability, getAbilityMechanicUsability, getPokemonTypeUsability,
      getReverseOption, getSpecificOptionsUsabilityForItems, getPokemonUsability, getMovesetTypeUsability])

  useEffect(() => {
    let cancel = false;

    setTimeout(()=>{
      if(generating && generationStep === 6){
        setToast('Actions', 'Options generated, build your team!', {success: true});
        if(!cancel)
          setGenerating(false);   
      }
     }, 500);
    
    return () => cancel = true;
  }, [generating, generationStep])  

  // ----- SELECTIONS & ASSIGNMENTS -----
  // Select a pokemon.
  const selectPokemon = (pokemon) => {
    if(!generating){
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
          else if(!p.selected && selectionsMade.pokemons < team.selectionsNeeded.pokemons) {
            p.selected = true;
            change = true;
          }
          else {
            setToast('Pokémon Options', `Only ${team.selectionsNeeded.pokemons} pokémon can be selected.`, {warning: true});
          }
        }
        return p;
      })
      if(change){
        setPokemonOptions(options); 
      }
    }
    else
      setToast('Actions', 'Your options are still being generated.', {warning: true});
  }   

  // Select a move.
  const selectMove = (move, moveset) => {  
    if(!generating){
      let change = false;  
      let msOptions = movesetOptions;    
      msOptions[moveset] = msOptions[moveset].map(m => {
        if(m.name === move.name){
          if(m.selected){      
            m.selected = false;
            change = true;
          }
          else if(!m.selected && selectionsMade.moves[moveset] < team.selectionsNeeded.moves){
            m.selected = true;
            change = true;
          }
          else {
            setToast('Moveset Options', `Only ${team.selectionsNeeded.moves} moves can be selected in a moveset.`, {warning: true});
          }
        }
        return m;
      });
      if(change){
        setMovesetOptions([...msOptions]);
      }
    }
    else
      setToast('Actions', 'Your options are still being generated.', {warning: true});
  }

  // Assign a pokemon to a moveset, ability or item.
  const assignPokemon = (pokemon, assignable) => {
    if(!generating){
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
    else
      setToast('Actions', 'Your options are still being generated.', {warning: true});
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

      setToast('Actions', 'Choices cleared, start again!', {success: true});
    }
    else {
      setToast('Actions', 'There are no choices to clear.', {warning: true});
    }
  }

  // ----- RESPONSES -----
  // Respond to completed sections.
  const checkSectionCompleted = useCallback((string, val) => {
    let sCompleted = sectionsCompleted;
    let change = false;
    switch(string){
      case 'pokemons':
        if(!sCompleted.pokemons && val >= team.selectionsNeeded.pokemons){
          sCompleted.pokemons = true;
          change = true;
          setToast('Pokémon Options', `All ${team.selectionsNeeded.pokemons} pokémon have been selected.`, {success: true});
        }
        else if(sCompleted.pokemons && val < team.selectionsNeeded.pokemons){
          sCompleted.pokemons = false;
          change = true;
          setToast('Pokémon Options', `There must be ${team.selectionsNeeded.pokemons} pokémon selected.`, {warning: true});
        }
        break;
      case 'movesets':
        if(!sCompleted.movesets && val >= team.selectionsNeeded.movesets){
          sCompleted.movesets = true;
          change = true;
          setToast('Moveset Options', `All ${team.selectionsNeeded.movesets} pokémon have been assigned to a moveset.`, {success: true});
        }
        else if(sCompleted.movesets && val < team.selectionsNeeded.movesets){
          sCompleted.movesets = false;
          change = true;
          setToast('Moveset Options', `There must be ${team.selectionsNeeded.movesets} pokémon assigned to a moveset.`, {warning: true});
        }
        break;
      case 'moves':
        if(!sCompleted.moves && val >= team.selectionsNeeded.movesets * team.selectionsNeeded.moves){
          sCompleted.moves = true;
          change = true;
          setToast('Moveset Options', `All ${team.selectionsNeeded.movesets * team.selectionsNeeded.moves} moves have been selected.`, {success: true});    
        }
        else if(sCompleted.moves && val < team.selectionsNeeded.movesets * team.selectionsNeeded.moves){
          sCompleted.moves = false;
          change = true;
          setToast('Moveset Options', `There must be ${team.selectionsNeeded.movesets * team.selectionsNeeded.moves} moves selected.`, {warning: true});    
        }
        break;
      case 'abilities':
        if(!sCompleted.abilities && val >= team.selectionsNeeded.abilities){
          sCompleted.abilities = true;
          change = true;
          setToast('Ability Options', `All ${team.selectionsNeeded.abilities} pokémon have been assigned to an ability.`, {success: true});
        }
        else if(sCompleted.abilities && val < team.selectionsNeeded.abilities){
          sCompleted.abilities = false;
          change = true;
          setToast('Ability Options', `There must be ${team.selectionsNeeded.abilities} pokémon assigned to an ability.`, {warning: true});
        }
        break;
      case 'items':
        if(!sCompleted.items && val >= team.selectionsNeeded.items){
          sCompleted.items = true;
          change = true;
          setToast('Item Options', `All ${team.selectionsNeeded.items} pokémon have been assigned to an item.`, {success: true});
        }
        else if(sCompleted.items && val < team.selectionsNeeded.items){
          sCompleted.items = false;
          change = true;
          setToast('Item Options', `There must be ${team.selectionsNeeded.items} pokémon assigned to an item.`, {warning: true});
        }
        break;
      default:
        break;
    }
    if(change){
      setSectionsCompleted(sCompleted);
      if(Object.values(sCompleted).every(val => val))
        setToast('Actions', `Team completely built, export it!`, {success: true});
    }
  }, [sectionsCompleted]);

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

  // Respond to changes in slections/assignments for team preview.
  useEffect (() => {
    let tPreview = [];
    let pPreview = null;

    pokemonOptions.forEach((po, i) => {
      pPreview = null;

      if(po.selected && 
        po.moveset != null && selectionsMade.moves[po.moveset] >= team.selectionsNeeded.moves &&
        po.ability != null && 
        po.item != null){

          pPreview = {
            pokemon: po,
            moveset: movesetOptions[po.moveset],
            ability: abilityOptions[po.ability],
            item: itemOptions[po.item]
          }

          tPreview.push(pPreview);
      }
    })

    while(tPreview.length < team.selectionsNeeded.pokemons)
      tPreview.push(null);

    setPokemonPreviews(tPreview)
  }, [pokemonOptions, movesetOptions, abilityOptions, itemOptions, selectionsMade]);

  // ----- HELPER FUNCTIONS -----  
  // Get total stats for a pokemon.
  const getTotalStats = (stats) => {
    let total = 0;
    stats.forEach(s => {
        total = total + s.base_stat; 
    });        
    return total;
  }  

  const getStatDisplay = (name) => {
    switch(name){
      case "hp":
        return "HP";
      case "attack":
        return "Atk";
        case "defense":
          return "Def";
          case "special-attack":
          return "SpA";
          case "special-defense":
          return "SpD";
          case "speed":
          return "Spe";
      default:
        return "";
    }
  }

  const checkDuplicatedName = (currentObjects, newObjectName) => {
    return currentObjects.find(co => co.name === newObjectName)
  }

  // Filter by keywords.
  const FindKeywords = (string, separator, filter, allow, filterSpecific) => {
    let found = false;
    found = string.split(separator).some(keyword => filter.includes(keyword));
    if(found && allow)
      found = !string.split(separator).some(keyword => allow.includes(keyword));
    if(!found && filterSpecific)
      found = filterSpecific.some(fs => fs === string);    
    return found;
  }

  const capitalizeWords = (text, separator) => {
    return text.split(separator).map((word) => {return word[0].toUpperCase() + word.substring(1)}).join(" ");
  }

  const upperCaseWords = (string) => {
    return string.replace(/\b\w/g, l => l.toUpperCase())
  }      

  // ----- METADATA -----
  // Set pokemon nicknames.
  /* const setNickname = (pokemonId, nickname) => {    
    let options = pokemonOptions;
    options = options.map(p => {      
      if(p.id === pokemonId){
        p.nickname = nickname;
      }
      return p;
    });
    setPokemonOptions(options);
  } */

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

          // Format pass.
          let pokemonName = p.name.split('-');
          if(pokemonName.includes('morpeko')){
            pokemonName = pokemonName.filter(key => {return key === 'morpeko'});
          }
          else if(pokemonName.includes('eiscue')){
            pokemonName = pokemonName.filter(key => {return key === 'eiscue'});
          }
          else if(pokemonName.includes('darmanitan')){
            pokemonName = pokemonName.filter(key => {return key !== 'standard'});
          }
          else if(pokemonName.includes('male')){
            pokemonName = pokemonName.filter(key => {return key !== 'male'});
          }
          else if(pokemonName.includes('female')){
            pokemonName = pokemonName.map(key => {return key === 'female' ? 'f' : key});
          }
          pokemonName = pokemonName.join("-");

          let moveset = movesetOptions[p.moveset].filter(m => m.selected).map(m => {
            if(m.name === "hidden-power"){
              return m.name + " [" + capitalizeWords(m.type.name, "-") + "]";
            }
            else return m.name;
          });

          let ability = capitalizeWords(abilityOptions[p.ability].name, "-");
          if(abilityOptions[p.ability].name.includes("as-one")){
            let abilityKeywords = ability.split(" ");
            abilityKeywords[abilityKeywords.length - 1] = "(" + abilityKeywords[abilityKeywords.length - 1] + ")";
            ability = abilityKeywords.join(" ");
          };          

          // Prepare export.
          exportText += capitalizeWords(pokemonName, "-");
          if(p.gender !== "genderless"){
            exportText += " (" + (p.gender === "male" ? "M" : "F") + ")";
          }
          exportText += " @ " + capitalizeWords(itemOptions[p.item].name, "-");
          exportText += "\r\nAbility: " + ability;
          exportText += "\r\nLevel: " + p.level;
          if(p.shiny)
            exportText += "\r\nShiny: Yes";
          exportText += "\r\nEVs:";
          p.stats.forEach(s => {
            if(s.ev != null && s.ev > 0)
              exportText += " " + s.ev + " " + getStatDisplay(s.stat.name) + " /";
          });
          exportText = exportText.slice(0, -1);
          exportText += "\r\n" + capitalizeWords(p.nature.name, "-") + " Nature";
          exportText += "\r\nIVs:";
          p.stats.forEach(s => {
            if(s.iv != null && s.iv < 31)
              exportText += " " + s.iv + " " + getStatDisplay(s.stat.name) + " /";
          });
          exportText = exportText.slice(0, -1);
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
      setToast('Actions', 'The team is not completely built!', {warning: true});      
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
        setToast('Actions', 'Team copied to clipboard!', {success: true});      
      else
        setToast('Actions', 'Error copying the team to clipboard!', {error: true});
    } catch (err) {
      setToast('Actions', 'Unable to copy the team to clipboard!', {error: true});
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
        setToast('Actions', 'Team copied to clipboard!', {success: true});
      },
      function(err) {
        setToast('Actions', 'Error copying the team to clipboard!', {error: true});
      }
    );
  }

  // Render.
  return (        
    <TeamBuilderContext.Provider value={{
      generationToggles: generationToggles,
      pokemonOptions: pokemonOptions,
      selectionsNeeded: team.selectionsNeeded,
      selectionsMade: selectionsMade,
      sectionsCompleted: sectionsCompleted,
      toggleGeneration: toggleGeneration,
      selectPokemon: selectPokemon,
      selectMove: selectMove,
      assignPokemon: assignPokemon,
      //setNickname: setNickname
    }}>
      <div className="bg-gray-50 bg-unown-pattern-tiled min-h-screen">        
        <Router>
          <div className="flex w-full">
            <div className="h-screen sticky top-0">
              <Sidebar />
            </div>
            <div className="w-full flex flex-col">
              <Switch>          
                <Route path="/format">
                  <Format />
                </Route>
                <Route path="/builder">        
                  <TeamBuilder
                    loading={loading}                    
                    randomOptions={team.randomOptions}
                    pokemonPreviews={pokemonPreviews}
                    pokemonOptions={pokemonOptions}
                    movesetOptions={movesetOptions}
                    abilityOptions={abilityOptions}
                    itemOptions={itemOptions}
                    generating={generating}
                    generationStep={generationStep}                    
                    generateOptions={generateOptions}                                    
                    clearChoices={clearChoices}
                    exportTeam={exportTeam}                  
                  /> 
                  <Tooltips />                                  
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/">
                  <Home />
                </Route>          
              </Switch>
              <Footer />
            </div>
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
