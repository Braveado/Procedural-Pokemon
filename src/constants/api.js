const url = 'https://pokeapi.co/api/v2/';
const storageData = {
    version: 1.0
};
const pokemonCount = 898;
const topPokemonCountOffset = [
    [8, 143], [9, 242], [3, 286], [16, 370], [3, 442], 
    [15, 479], [3, 632], [11, 637], [3, 703], [6, 715], 
    [2, 771], [11, 781], [3, 799], [3, 806], [14, 884]    
];
const moveCount = 826;
const abilityCount = 267;
const itemCountOffset = [
    [2, 111], [115, 189], [4, 256], [1, 441], [24, 581], 
    [2, 666], [9, 678], [1, 727], [1, 831], [23, 844], 
    [2, 1109], [6, 1124],
    // Berries 
    [15, 125], [29, 160], [3, 719]
];
const typeCount = 18;
const natureCount = 25;

export {
    url, 
    storageData,
    pokemonCount, topPokemonCountOffset,
    moveCount, 
    abilityCount, 
    itemCountOffset,
    typeCount, 
    natureCount
}