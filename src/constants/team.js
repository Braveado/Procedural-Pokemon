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

const topPokemonBalance = 1; // Number of top pokemon generated. 
const moveStatusLimit = 3; // Max number of status moves in a moveset.

export {
    randomOptions, selectionsNeeded,
    topPokemonBalance, moveStatusLimit
}