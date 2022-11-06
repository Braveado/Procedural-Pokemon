import {
    bindMoves, biteMoves, pulseMoves, punchMoves, soundMoves, chargeMoves, contactMoves, multistrikeMoves,
    barrierMoves, healMoves, drainMoves, recoilMoves, trapMoves, fixedMultistrikeMoves, ohkoMoves, crashMoves,
} from '../constants/usability';

const pokemon = [ // Content
    ["Hit Points|Determines the total damage a pokemon can receive before fainting."],
    ["Attack|Determines damage dealt when using a physical move."],
    ["Defense|Mitigates damage received when hit by a physical move."],
    ["Special Attack|Determines damage dealt when using a special move."],
    ["Special Defense|Mitigates damage received when hit by a special move."],
    ["Speed|Determines the turn order in battle."],
    ["Nature|Usually affects two stats excluding HP, increasing one by 10% and decreasing another by 10%."],
    ["Gender|Selected from the possible genders of the pokemon."],
    ["Height and Weight|How tall and heavy is the pokemon."],
];

const moves = [ // Content
    ["Power Points|How many times the move can be used."],
    ["Power|Determines damage dealt by the move."],
    ["Accuracy|Determines how likely the move is to hit."],
];

const effects = [ // Keys, content
    [['priority'], "Priority|"+
        "*Base value of 0."+
        "*Higher priority moves are performed first."],
    [['critical hit'], "Critical Hit|"+
        "*Deals 1.5x the damage."+
        "*The attacker's negative stat stages, the defender's positive stat stages and screen-creating moves are ignored."],
    [['critical hit rate', 'critical hit ratio'], "Critical Hit Rate|"+
        "*A base chance of 1/24 of dealing a critical hit."+
        "*Increases based on stages (1/8, 1/2, always)."],
    [['evasion', 'evasiveness'], "Evasion|"+
        "*Base value of 100%."+
        "*Determines the probability of avoiding other pokémon moves."],
    [['stages', 'stage'], "Stages|"+
        "*Modifies a stat by 50% each."+
        "*Maximum +6 or -6 stages per stat."],
    [['burned', 'burns', 'burn'], "Burn|"+
        "*Takes 1/16 max HP as damage every turn."+
        "*Halves damage dealt with physical moves."+
        "*Non-volatile status condition."],
    [['badly poisoned', 'badly poisons'], "Bad Poison|"+
        "*Takes 1/8 max HP as damage every turn."+
        "*Damage taken increases by 1/8 each time."+
        "*Non-volatile status condition."],
    [['poisoned', 'poisons', 'poisoning', 'poison'], "Poison|"+
        "*Takes 1/8 max HP as damage every turn."+
        "*Non-volatile status condition."],
    [['paralyzes', 'paralyzed', 'paralyze', 'paralysis'], "Paralysis|"+
        "*Speed reduced by 50%."+
        "*25% chance of being unable to make a move."+
        "*Non-volatile status condition."],
    [['freezes', 'freeze', 'freezing', 'frozen'], "Freeze|"+
        "*Unable to make a move."+
        "*20% chance of being thawed out each turn."+
        "*Non-volatile status condition."],        
    [['sleeping', 'asleep', 'sleep'], "Sleep|"+
        "*Unable to make a move for 1-3 turns."+
        "*Non-volatile status condition."],    
    [['major status effect', 'major status ailment'], "Major Statuses|All the non-volatile status effects (Burn, Freeze, Paralysis, Poison, Badly Poison and Sleep)."],
    [['confuses', 'confused', 'confuse', 'confusion'], "Confusion|"+
        "*33% chance of attacking itself instead of executing a move for 2-5 turns."+
        "*Volatile status condition."],    
    [['infatuates', 'infatuation'], "Infatuation|"+
        "*Cannot attack 50% of the time."+
        "*Volatile status condition."],        
    [['flinch', 'flinching'], "Flinch|Unable to make a move for that turn."],                
    [['scatters poisoned spikes'], "Poisoned Spikes|Affect foes when they switch in based on layers placed (poisons, badly poisons)."],
    [['scatters spikes'], "Spikes|Damages foes when they switch in based on layers placed (1/8, 1/6, 1/4 max HP)."],    
    [['causes damage when opposing pokémon switch in'], "Stealth Rock|Damages foes when they switch in based on the effectivenes of Rock-type against them (from 1/32 to 1/2 max HP)."],
    [['electric terrain'], "Electric Terrain|"+
        "*Boosts the power of Electric-type moves used by pokémon on the ground by 30%."+
        "*Prevents pokémon on the ground from falling asleep and being afflicted by Yawn."],
    [['grassy terrain'], "Grassy Terrain|"+
        "*Boosts the power of Grass-type moves used by pokémon on the ground by 30%."+
        "*Restores 1/16 max HP of pokémon on the ground at the end of their turn."+
        "*The power of Bulldoze, Earthquake, and Magnitude is halved."],
    [['misty terrain'], "Misty Terrain|"+
        "*Halves the damage taken by pokémon on the ground from Dragon-type moves."+
        "*Prevents pokémon on the ground from being afflicted with non-volatile status conditions and confusion."],
    [['psychic terrain'], "Psychic Terrain|"+
        "*Boosts the power of Psychic-type moves used by pokémon on the ground by 30%."+
        "*Prevents pokémon on the ground from being hit by moves with increased priority."],
    [['terrain'], "Terrain|All the field-type effects that affect pokémon on the ground (Electric, Grassy, Misty and Psychic)."],
    [['sunlight', 'sunny'], "Harsh Sunlight|"+
        "*Increases the damage of Fire-type moves by 50%."+
        "*Decreases the damage of Water-type moves by 50%."+
        "*Prevents pokémon from becoming frozen."+
        "*Allows Solar Beam and Solar Blade to be used instantly."+
        "*Causes Growth to raise Attack and Special Attack two stages each."+
        "*Changes Weather Ball to a Fire-type move and doubles its power."+        
        "*Causes Moonlight, Synthesis, and Morning Sun to recover 2/3 of max HP."+
        "*Lowers accuracy of Thunder and Hurricane to 50%."+
        "*Doubles stat increases from Growth."],
    [['rain', 'downpour'], "Rain|"+
        "*Increases the damage of Water-type moves by 50%."+
        "*Decreases the damage of Fire-type moves by 50%."+
        "*Halves the power of Solar Beam and Solar Blade."+
        "*Changes Weather Ball to a Water-type move and doubles its power."+
        "*Causes Moonlight, Synthesis, and Morning Sun to recover 1/4 of max HP."+
        "*Allows Thunder and Hurricane to bypass the accuracy check."],
    [['sandstorm'], "Sandstorm|"+
        "*Deals 1/16 max HP as damage to pokémon at the end of each turn, unless their types include Rock, Steel, or Ground."+
        "*Raises the Special Defense of all Rock-type pokémon by 50%."+
        "*Halves the power of Solar Beam and Solar Blade."+
        "*Changes Weather Ball to a Rock-type move and doubles its power."+
        "*Causes Moonlight, Synthesis, and Morning Sun to recover 1/4 of max HP."+
        "*Causes Shore Up to recover 2/3 of max HP instead of 1/2."],
    [['hail'], "Hail|"+
        "*Deals 1/16 max HP as damage to pokémon at the end of each turn, unless they are Ice-type."+        
        "*Halves the power of Solar Beam and Solar Blade."+
        "*Changes Weather Ball to an Ice-type move and doubles its power."+
        "*Causes Moonlight, Synthesis, and Morning Sun to recover 1/4 of max HP."+
        "*Allows Blizzard to bypass accuracy check."+
        "*Allows Aurora Veil to be used, the effect lingers even after Hail ends."],
    [['strong winds'], "Strong Winds|"+
        "*Super effective moves against pure Flying-type Pokémon count as normally effective."+
        "*Weather Ball remains a Normal-type move."+
        "*Moonlight, Morning Sun, and Synthesis continue to recover 1/2 of max HP."],
    [['weather'], "Weather|All the environment effects that affect pokémon in battle (Harsh Sunlight, Rain, Sandstorm, Hail and Strong Winds)."],         
];

const mechanics = [ // Keys, content
    [bindMoves, "Bind|"+
        "*Moves that partially trap the foe and deal a small amount of damage for multiple turns."],
    [biteMoves, "Bite|"+
        "*Moves based on biting."],
    [pulseMoves, "Aura or Pulse|"+
        "*Moves based on aura or pulses."],
    [punchMoves, "Punch|"+
        "*Moves based on punching."],
    [soundMoves, "Sound|"+
        "*Moves that use sound."+
        "*Can hit Pokémon behind a substitute."],
    [chargeMoves, "Charge|"+
        "*Moves that take two turns to complete."],    
    [contactMoves, "Contact|"+
        "*Moves that physically touches the target in battle."],
    [multistrikeMoves.concat(fixedMultistrikeMoves), "Multi-Strike|"+
        "*Moves that strike an opponent more than one time in the same turn."],
    [barrierMoves, "Barrier|"+
        "*Moves that create the effects of Reflect, Light Screen, and Aurora Veil."],
    [healMoves, "Healing|"+
        "*Moves that restore HP."],
    [drainMoves, "Drain|"+
        "*Moves that restore a portion of their user's HP after damaging an opponent."],
    [recoilMoves, "Recoil|"+
        "*Moves that deal damage to the user."],
    [crashMoves, "Crash|"+
        "*Moves that damage the user when they fail to be successfully used."],
    [trapMoves, "Trap|"+
        "*Moves that prevent an affected Pokémon from switching out."],
    [ohkoMoves, "One-Hit Knockout|"+
        "*Moves that cause the target to instantly faint when they hit."+
        "*Automatically fails if the target has a higher level than the user."+
        "*Accuracy increases by 1% for each level the user is above the target."],
]

export {
    pokemon,
    moves,
    effects,
    mechanics
}