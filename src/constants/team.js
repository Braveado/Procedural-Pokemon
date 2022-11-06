const randomOptions = {
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

const topPokemonBalance = 1; // Number of top pokemon generated (legendary/mythical/high stats). 
const topPokemonTotalStatsThreshold = 600; // Total stats for a normal pokemon to count as top.
const normalPokemonTotalStatsThreshold = 540; // Total stats for a legendary/mythical pokemon to count as normal.
const moveStatusLimit = 3; // Max number of status moves in a moveset.

const statRanges = {
hp: [120, 280],
general: [40, 200],
total: [360, 680],
};

export {
    randomOptions, selectionsNeeded,
    topPokemonBalance, topPokemonTotalStatsThreshold, normalPokemonTotalStatsThreshold, moveStatusLimit,
    statRanges,
}