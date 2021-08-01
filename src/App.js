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
    // Legendary forms above 720 total stats.
    'eternamax', 'primal', 'ultra',
    // General forms as strong as legendaries.
    'mega', 'gmax', 'eternal', 'ash',
    // Pokemons and forms below 360 total stats.
    'solo', 'shedinja', 'smeargle', 'ditto', 'delibird', 'luvdisc', 'unown',
    // Others.
    'totem'
  ]);
  const [moveFilter] = useState ([ // Exclude moves with this keywords.
    // General max and z moves.
    'max', 'physical', 'special',
    // Specific z moves.
    'catastropika', 'moonsault', 'raid', '000', 'sparksurfer', 'evoboost', 'pancake', 'genesis', 'operetta', 'stormshards',
    'forever', 'soulblaze', 'guardian', 'sunraze', 'moonraze', 'burns', 'stealing',
    // Unusable in format.
    'natural', 'stuff', 'teatime', 
    // No effect.
    'splash', 'celebrate', 'hands', 'struggle',
    // BRANCH LOGIC. All accounted for.
    // Combo moves.
    //'stockpile', 'swallow', 'spit',     
    // REVERSE BRANCH LOGIC.
    // Held items.
    'techno',
    // Lost or consumed held items.
    'recycle',    
  ]);
  const [moveAllow] = useState([ // Include moves with this keywords even when excluded by filter.
    'bug', 
  ]);
  const [moveStatusLimit] = useState(3); // Max number of status moves in a moveset.
  const [abilityFilter] = useState([ // Exclude abilities with this keywords.
    // Unusable in format.
    'illuminate', 'run', 'plus', 'minus', 'gluttony', 'honey', 'unnerve', 'healer', 'friend', 'harvest',
    'telepathy', 'star', 'cheek', 'battery', 'receiver', 'alchemy', 'ball', 'ripen', 'spot',
    'medicine', 'one', 'symbiosis',
    // Pokemon forms specific.
    'zen', 'stance', 'shields', 'schooling', 'bond', 'construct', 'face', 'hunger', 'gulp',
    // Harmful to owner.
    'truant', 'stall', 'klutz', 'slow', 'defeatist', 
    // Unusable in tournaments.
    'anticipation', 'forewarn', 'frisk', 
    // BRANCH LOGIC. All accounted for.
    // Move mechanic. 
    // 'iron-fist', 'skill-link', 'reckless', 'strong-jaw', 'mega-launcher', 'liquid-voice', 'punk-rock', 'triage',
    // 'tough-claws', 'unseen-fist',    
    // Move type.
    // 'flash-fire', 'overgrow', 'blaze', 'torrent', 'swarm', 'scrappy', 'sand-force', 'gale-wings', 
    // 'dark-aura', 'fairy-aura', 'steelworker', 'transistor', 'dragons-maw',
    // Move type changes.
    // 'normalize', 'refrigerate', 'pixilate', 'galvanize', 'aerilate',
    // REVERSE BRANCH LOGIC.
    // Held items.
    'multitype', 'rks', 
    // Lost or consumed held items.
    'pickup', 'unburden', 'pickpocket', 'magician',
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
    // BRANCH LOGIC. All accounted for.
    // Move or ability mechanic.
    //'heat', 'smooth', 'icy', 'damp', 'sludge', 'clay', 'orb', 
    // REVERSE BRANCH LOGIC.
    // Held items.
    // 'memory', 'drive', 
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
    'absorb', 'bouncy-bubble', 'drain-punch', 'draining-kiss', 'dream-eater', 'giga-drain', 'horn-leech', 'leech-life', 'leech-seed',
    'mega-drain', 'oblivion-wing', 'parabolic-charge', 'strength-sap', 'ingrain', 'aqua-ring'
  ]);
  const [terrainMoves] = useState([ // Terrain extender.
    'electric-terrain', 'grassy-terrain', 'misty-terrain', 'psychic-terrain'
  ]);
  const [barrierMoves] = useState([ // Light clay.
    'light-screen', 'reflect', 'aurora-veil'
  ]);  
  const [orbMoves] = useState([ // Toxic and flame orb.
    'facade', 'psycho-shift', 'switcheroo', 'trick', 'fling'
  ]);
  const [punchMoves] = useState([ // Iron fist.
    'bullet-punch', 'comet-punch', 'dizzy-punch', 'double-iron-bash', 'drain-punch', 'dynamic-punch', 'fire-punch', 'focus-punch',
    'hammer-arm', 'ice-hammer', 'ice-punch', 'mach-punch', 'mega-punch', 'meteor-mash', 'plasma-fists', 'power-up-punch',
    'shadow-punch', 'sky-uppercut', 'thunder-punch'
  ]);
  const [multistrikeMoves] = useState([ // Skill link.
    'arm-thrust', 'barrage', 'bone-rush', 'bullet-seed', 'comet-punch', 'double-slap', 'fury-attack', 'fury-swipes', 'icicle-spear',
    'pin-missile', 'rock-blast', 'scale-shot', 'spike-cannon', 'tail-slap', 'triple-axel', 'triple-kick', 'water-shuriken'
  ]);
  const [recoilMoves] = useState([ // Reckless.
    'brave-bird', 'double-edge', 'flare-blitz', 'head-charge', 'head-smash', 'high-jump-kick', 'jump-kick', 'submission', 'take-down',
    'wild-charge', 'light-of-ruin', 'volt-tackle', 'wood-hammer'
  ]);
  const [biteMoves] = useState([ // Strong jaw.
    'bite', 'crunch', 'fire-fang', 'fishious-rend', 'hyper-fang', 'ice-fang', 'jaw-lock', 'poison-fang', 'psychic-fangs', 'thunder-fang'
  ]);
  const [pulseMoves] = useState([ // Mega launcher.
    'aura-sphere', 'dark-pulse', 'dragon-pulse', 'heal-pulse', 'origin-pulse', 'terrain-pulse', 'water-pulse'
  ]);
  const [soundMoves] = useState([ // Liquid voice.
    'boomburst', 'bug-buzz', 'chatter', 'clanging-scales', 'disarming-voice', 'echoed-voice', 'eerie-spell', 'hyper-voice',
    'overdrive', 'relic-song', 'round', 'snarl', 'snore', 'uproar'
  ]);
  const [healMoves] = useState([ // Triage.
    'draining-kiss', 'floral-healing', 'giga-drain', 'rest', 'synthesis', 'absorb', 'drain-punch', 'dream-eater', 'heal-order',
    'heal-pulse', 'healing-wish', 'horn-leech', 'leech-life', 'lunar-dance', 'mega-drain', 'milk-drink', 'moonlight', 'morning-sun',
    'oblivion-wing', 'parabolic-charge', 'purify', 'recover', 'roost', 'shore-up', 'slack-off', 'soft-boiled', 'strength-sap',
    'swallow', 'wish'
  ]);
  const [contactMoves] = useState([ // Tough claws, unseen fist.
    'accelerock', 'acrobatics', 'aerial-ace', 'anchor-shot', 'aqua-jet', 'aqua-tail', 'arm-thrust', 'assurance', 'astonish', 'avalanche', 
    'behemoth-bash', 'behemoth-blade', 'bide', 'bind', 'bite', 'blaze-kick', 'body-press', 'body-slam', 'bolt-beak', 'bolt-strike', 'bounce', 'branch-poke', 'brave-bird', 'breaking-swipe', 'brick-break', 'brutal-swing', 'bug-bite', 'bullet-punch',
    'chip-away', 'circle-throw', 'clamp', 'close-combat', 'comet-punch', 'constrict', 'counter', 'covet', 'crabhammer', 'cross-chop', 'cross-poison', 'crunch', 'crush-claw', 'crush-grip', 'cut',
    'darkest-lariat', 'dig', 'dive', 'dizzy-punch', 'double-edge', 'double-hit', 'double-iron-bash', 'double-kick', 'double-slap', 'dragon-ascent', 'dragon-claw', 'dragon-hammer', 'dragon-rush', 'dragon-tail', 'draining-kiss', 'drain-punch', 'drill-peck', 'drill-run', 'dual-chop', 'dual-wingbeat', 'dynamic-punch',
    'endeavor', 'extreme-speed',
    'facade', 'fake-out', 'false-surrender', 'false-swipe', 'feint-attack', 'fell-stinger', 'fire-fang', 'fire-lash', 'fire-punch', 'first-impression', 'fishious-rend', 'flail', 'flame-charge', 'flame-wheel', 'flare-blitz', 'flip-turn', 'floaty-fall', 'fly', 'flying-press', 'focus-punch', 'force-palm', 'foul-play', 'frustration', 'fury-attack', 'fury-cutter', 'fury-swipes',
    'gear-grind', 'giga-impact', 'grass-knot', 'grassy-glide', 'guillotine', 'gyro-ball',
    'hammer-arm', 'headbutt', 'head-charge', 'head-smash', 'heart-stamp', 'heat-crash', 'heavy-slam', 'high-horsepower', 'high-jump-kick', 'hold-back', 'horn-attack', 'horn-drill', 'horn-leech', 'hyper-fang',
    'ice-ball', 'ice-fang', 'ice-hammer', 'ice-punch', 'infestation', 'iron-head', 'iron-tail',
    'jaw-lock', 'jump-kick', 
    'karate-chop', 'knock-off', 
    'lash-out', 'last-resort', 'leaf-blade', 'leech-life', 'lick', 'liquidation', 'low-kick', 'low-sweep', 'lunge',
    'mach-punch', 'megahorn', 'mega-kick', 'mega-punch', 'metal-claw', 'meteor-mash', 'multi-attack', 
    'needle-arm', 'night-slash', 'nuzzle', 
    'outrage', 
    'payback', 'peck', 'petal-dance', 'phantom-force', 'plasma-fists', 'play-rough', 'pluck', 'poison-fang', 'poison-jab', 'poison-tail', 'pound', 'power-trip', 'power-up-punch', 'power-whip', 'psychic-fangs', 'punishment', 'pursuit', 
    'quick-attack', 
    'rage', 'rapid-spin', 'razor-shell', 'retaliate', 'return', 'revenge', 'reversal', 'rock-climb', 'rock-smash', 'rolling-kick', 'rollout', 
    'sacred-sword', 'scratch', 'seismic-toss', 'shadow-claw', 'shadow-force', 'shadow-punch', 'shadow-sneak', 'shadow-strike', 'sizzly-slide', 'skitter-smack', 'skull-bash', 'sky-drop', 'sky-uppercut', 'slam', 'slash', 'smart-strike', 'smelling-salts', 'snap-trap', 'solar-blade', 'spark', 'spectral-thief', 'spirit-break', 'steamroller', 'steel-roller', 'steel-wing', 'stomp', 'stomping-tantrum', 'storm-throw', 'strength', 'struggle', 'submission', 'sucker-punch', 'sunsteel-strike', 'super-fang', 'superpower', 'surging-strikes', 
    'tackle', 'tail-slap', 'take-down', 'thief', 'thrash', 'throat-chop', 'thunder-fang', 'thunderous-kick', 'thunder-punch', 'triple-axel', 'triple-kick', 'trop-kick', 'trump-card', 
    'u-turn', 
    'v-create',
    'veevee-volley', 'vine-whip', 'vise-grip', 'vital-throw', 'volt-tackle',
    'wake-up-slap', 'waterfall', 'wicked-blow', 'wild-charge', 'wing-attack', 'wood-hammer', 'wrap', 'wring-out', 
    'x-scissor',
    'zen-headbutt', 'zing-zap', 'zippy-zap'
  ]);
  // Abilities.
  const [terrainAbilities] = useState([ // Terrain extender.
    'electric-surge', 'grassy-surge', 'misty-surge', 'psychic-surge'
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
  
      } while (!finalPokemon || checkDuplicatedName(currentPokemons, finalPokemon))   
      //console.log(finalPokemon); 
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
      let usable = true;  
      let combo = '';
      
      for (let index = 0; index < randomRolls.moves; index++) {            
        do{        
          if(combo){
            move = {name: combo};
            combo = '';
          }
          else
            move = moveList[Math.floor(Math.random()*moveList.length)];
          move = await axios.get(`${apiUrl}move/${move.name}`);
          status = move.data.damage_class && move.data.damage_class.name === 'status'; 
          usable = true;       

          switch(move.data.name){            
            case 'swallow':
            case 'spit-up':
              // Check space for combo moves.
              if(!newMoveset.find(m => m.name === 'stockpile')){
                usable = (randomRolls.moves - newMoveset.length) >= 2;
                if(usable){
                  if(move.data.name === 'swallow' && (moveStatusLimit - statusMoves) >= 2)
                    combo = 'stockpile';
                  else if(move.data.name === 'spit-up' && (moveStatusLimit - statusMoves) >= 1)
                    combo = 'stockpile';
                  else if((moveStatusLimit - statusMoves) <= 0)
                    usable = false;
                }                                  
              }                          
              //console.log(move.data.name+": "+usable);
              break;              
            case 'stockpile':
              // Check space for combo moves.
              if(!newMoveset.find(m => m.name === 'swallow') && !newMoveset.find(m => m.name === 'spit-up')){
                usable = (randomRolls.moves - newMoveset.length) >= 2;
                if(usable){
                  if((moveStatusLimit - statusMoves) >= 2)
                    combo = Math.random() < 0.5 ? 'swallow' : 'spit-up';
                  else if((moveStatusLimit - statusMoves) >= 1)
                    combo = 'spit-up';
                  else if((moveStatusLimit - statusMoves) <= 0)
                    usable = false;
                }
              }
              //console.log(move.data.name+": "+usable);
              break;
            default:
              break;
          }
        } while (checkDuplicatedName(newMoveset, move.data.name) || FindKeywords(move.data.name, '-', moveFilter, moveAllow) ||
                (status && statusMoves >= moveStatusLimit) || !usable)
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
  }, [generating, generationStep, moveList, randomRolls, moveFilter, moveAllow, moveStatusLimit]);

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

  const getMovesetTypeUsability = useCallback((types) => {
    //console.log(types);
    let usable = types.find(t => optionsData.usableTypes.includes(t));
    //console.log(usable);
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
        case 'barrier':        
          return moveNames.find(name => barrierMoves.includes(name));
        case 'orb':        
          return moveNames.find(name => orbMoves.includes(name));
        case 'punch':        
          return moveNames.find(name => punchMoves.includes(name));
        case 'multistrike':        
          return moveNames.find(name => multistrikeMoves.includes(name));
        case 'recoil':        
          return moveNames.find(name => recoilMoves.includes(name));
        case 'bite':        
          return moveNames.find(name => biteMoves.includes(name));
        case 'pulse':        
          return moveNames.find(name => pulseMoves.includes(name));
        case 'sound':        
          return moveNames.find(name => soundMoves.includes(name));
        case 'heal':        
          return moveNames.find(name => healMoves.includes(name));
        case 'contact':        
          return moveNames.find(name => contactMoves.includes(name));
        default:
          return false;
      }    
    }
  }, [movesetOptions, chargeMoves, bindMoves, drainMoves, terrainMoves, barrierMoves, orbMoves, punchMoves, 
      multistrikeMoves, recoilMoves, biteMoves, pulseMoves, soundMoves, healMoves, contactMoves]);

  const getAbilityMechanicUsability = useCallback((mechanic, exactAbilities) => {
    let abilityNames = abilityOptions.map(a => { return a.name } );

    if(exactAbilities && exactAbilities.length > 0){     
      return abilityNames.find(name => exactAbilities.includes(name));
    }
    else {
      switch(mechanic){
        case 'terrain':
          return abilityNames.find(name => terrainAbilities.includes(name));      
        case 'orb':
          return abilityNames.find(name => orbAbilities.includes(name));
        default:
          return false;
      }    
    }
  }, [abilityOptions, terrainAbilities, orbAbilities])

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
      let usable = true;      
    
      do{        
        let ability = abilityList[Math.floor(Math.random()*abilityList.length)];      
        newAbility = await axios.get(`${apiUrl}ability/${ability.name}`);     
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
            usable = getMoveMechanicUsability('sound');
            break;
          case 'punk-rock':
            // Check for sound moves.
            usable = (getMoveMechanicUsability('sound') || getMoveMechanicUsability('', ['sparkling-aria']));
            break;
          case 'triage':
            // Check for heal moves.
            usable = getMoveMechanicUsability('heal');
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
          case 'sand-force':
            // Check for rock, ground and steel moves.
            usable = getMovesetTypeUsability(['rock', 'ground', 'steel']);
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
          case 'tough-claws':
          case 'unseen-fist':
            // Check for contact moves.
            usable = getMoveMechanicUsability('contact');
            break; 
          default:
            break;
        }                  
      } while (checkDuplicatedName(currentAbilities, newAbility.data.name) || FindKeywords(newAbility.data.name, '-', abilityFilter, abilityAllow) || !usable)
      //console.log(newAbility.data.name);

      return newAbility.data;
    }

    if(generating && generationStep === 3 && abilityList.length > 0){      
      getAbilityOptions();
    }
    return () => cancel = true;
  }, [generating, generationStep, abilityList, randomRolls, abilityFilter, abilityAllow, 
      getMoveMechanicUsability, getMovesetTypeUsability]);

  // Respond to ability options generated completely.
  useEffect (() => {  
    let cancel = false;

    if(generating && generationStep === 4 && abilityOptions.length >= randomRolls.abilities){
      let msPerType = optionsData.movesetsPerType;
      
      // Check abilities that change move types.
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
      if(!cancel){
        setOptionsData(s => {return {...s, movesetsPerType: msPerType, usableTypes: uTypes} });     
        setGenerationStep(5);
      }
    }    
    return () => cancel = true;
  }, [generating, generationStep, abilityOptions, randomRolls, optionsData]);

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
        setGenerationStep(6); 
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
            usable = getMovesetTypeUsabilityForItems(newItem.data, currentItems);            
            break;
          case 'type-enhancement':
            // Check for movesets with that type.
            usable = getMovesetTypeUsabilityForItems(newItem.data, currentItems);
            break;
          default:
            break;
        }                      
      } while (checkDuplicatedName(currentItems, newItem.data.name) || FindKeywords(newItem.data.name, '-', itemFilter, itemAllow) || !usable)
      //console.log(newItem.data.name);

      return newItem.data;
    } 

    if(generating && generationStep === 5 && itemList.length > 0){      
      getItemOptions();
    }
    return () => cancel = true;
  }, [generating, generationStep, itemList, randomRolls, itemFilter, itemAllow,
      getMovesetTypeUsabilityForItems, getMoveMechanicUsability, getAbilityMechanicUsability, getPokemonTypeUsability])

  useEffect(() => {
    let cancel = false;

    if(generating && generationStep === 6){
      setToast('Controls', 'Options generated, build your team!', {success: true});
      if(!cancel)
        setGenerating(false);   
    }
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
    else
      setToast('Team Builder', 'Your options are still being generated.', {warning: true});
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
    else
      setToast('Team Builder', 'Your options are still being generated.', {warning: true});
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
      setToast('Team Builder', 'Your options are still being generated.', {warning: true});
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
