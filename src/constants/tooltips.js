const data = [ // Identifiers, descriptions
    [['priority'], "Priority|Higher priority moves are performed first."],
    [['critical'], "Critical Hit|Deals 1.5x the damage. The attacker's negative stat stages, the defender's positive stat stages and screen-creating moves are ignored."],
    [['stage', 'stages'], "Stages|Modifies a stat by 50% each. Max 6 or -6 stages per stat."],
    [['flinch', 'flinching'], "Flinch|Unable to attack for that turn."],
    [['confuse', 'confuses', 'confused'], "Confusion|33% chance of attacking itself instead of executing a move for 2-5 turns. Volatile status condition."],
    [['paralyze', 'paralyzes', 'paralyzed'], "Paralysis|50% speed reduction and 25% chance of losing each turn. Non-volatile status condition."],
    [['freeze', 'freezes', 'frozen'], "Freeze|Unable to make a move and 20% chance of being thawed out each turn. Non-volatile status condition."],
    [['burn', 'burns', 'burned'], "Burn|Takes 1/16 max HP as damage every turn and halves damage dealt with physical moves. Non-volatile status condition."],
    [['poison', 'poisons', 'poisoned'], "Poison|Takes 1/8 max HP as damage every turn. Non-volatile status condition."],
    [['sleep', 'sleeping'], "Sleep|Unable to make a move for 1-3 turns. Non-volatile status condition."],
    [['traps'], "Trap|Prevents the target from switching out if the user remains in battle."],
    [['infatuates', 'infatuation'], "Infatuation|Cannot attack 50% of the time."],
    [['badly poisons', 'badly poisoned'], "Poison|Takes 1/8 max HP as damage every turn. Non-volatile status condition."],
    [['critical hit rate', 'critical hit ratio'], "Critical Hit Rate|A base chance of 1/16 of dealing a critical hit, increases based on stages (1/8, 1/2, always)."],
    [['major status effect', 'major status ailment'], "Major Statuses|All the non-volatile status effects (Burn, Freeze, Paralysis, Poison, Badly Poison and Sleep)."],
    [['scatters spikes'], "Spikes|Damages foes when they switch in based on layers placed (1/8, 1/6, 1/4 max HP)."],
    [['causes damage when opposing pokémon switch in'], "Stealth Rock|Damages foes when they switch in based on the effectivenes of Rock-type against them (from 1/32 to 1/2 max HP)."],
    [['grassy terrain'], "Grassy Terrain|"+
        "*Boosts the power of Grass-type moves by 30%."+
        "*Restores 1/16 max HP of pokemon at the end of their turn."+
        "*The power of Bulldoze, Earthquake, and Magnitude is halved."],
    [['misty terrain'], "Misty Terrain|"+
        "*Halves the power of Dragon-type moves."+
        "*Prevents being afflicted by non-volatile status conditions."],
    [['strong sunlight'], "Strong Sunlight|"+
        "*Increases the damage of Fire-type moves by 50%."+
        "*Decreases the damage of Water-type moves by 50%."+
        "*Allows Solar Beam and Solar Blade to be used instantly."+
        "*Causes Growth to raise Attack and Special Attack two stages each."+
        "*Prevents pokemon from becoming frozen."+
        "*Causes Moonlight, Synthesis, and Morning Sun to recover 2/3 of max HP."+
        "*Lowers accuracy of Thunder and Hurricane to 50%."],
    [['rain'], "Rain|"+
        "*Increases the damage of Water-type moves by 50%."+
        "*Decreases the damage of Fire-type moves by 50%."+
        "*Halves the power of Solar Beam and Solar Blade."+
        "*Causes Growth to raise Attack and Special Attack two stages each."+
        "*Prevents pokemon from becoming frozen."+
        "*Causes Moonlight, Synthesis, and Morning Sun to recover 1/4 of max HP."+
        "*Allows Thunder and Hurricane to bypass the accuracy check."],
    [['hail'], "Hail|"+
        "*Deals 1/16 max HP as damage to pokemon at the end of each turn, unless they are Ice-type."+
        "*Allows Blizzard to bypass accuracy check."+
        "*Halves the power of Solar Beam and Solar Blade."+
        "*Causes Moonlight, Synthesis, and Morning Sun to recover 1/4 of max HP."], 
];

export {
    data
}