// Pokemon
const filteredPokemon = {
    columns: ['Pokémon', 'Applicable Filters'],
    rows: [
        ['Eternamax Eternatus', 'Above 720 total base stats.'],
        ['Mega Mewtwo (X & Y)', 'Above 720 total base stats. In-battle held item activation.'],
        ['Mega Rayquaza', 'Above 720 total base stats. In-battle move activation.'],
        ['Primal Kyogre', 'Above 720 total base stats. In-battle held item activation.'],
        ['Primal Groudon', 'Above 720 total base stats. In-battle held item activation.'],
        ['Ultra Necrozma', 'Above 720 total base stats. In-battle held item activation.'],
        ['Crowned Zacian', 'In-battle held item activation.'],
        ['Crowned Zamazenta', 'In-battle held item activation.'],
        ['Zygarde Complete', 'In-battle ability activation.'],
        ['Mega Evolutions', 'In-battle held item activation.'],
        ['Dialga Origin', 'In-battle held item activation.'],
        ['Palkia Origin', 'In-battle held item activation.'],        
        ['Giratina Origin', 'In-battle held item activation.'],        
        ['Meloetta Pirouette', 'In-battle move activation.'],
        ['Ash Greninja', 'In-battle ability activation.'],   
        ['Darmanitan Zen Mode', 'In-battle ability activation.'],
        ['Minior Core', 'In-battle ability activation.'],                        
        ['Calyrex', 'Legendary below 540 total base stats.'],
        ['Zygarde 10%', 'Legendary below 540 total base stats.'],
        ['Phione', 'Mythical below 540 total base stats.'],
        ['Busted Mimikyu', 'In-battle ability activation.'], 
        ['(Gulping & Gorging) Cramorant', 'In-battle ability activation.'],  
        ['Eiscue Noice Face', 'In-battle ability activation.'], 
        ['Hangry Morpeko', 'In-battle ability activation.'],        
        ['Sunshine Cherrim', 'In-battle ability activation.'],        
        ['(Sunny, Rainy & Snowy) Castform', 'In-battle ability activation.'],        
        ['Unown', 'Below 360 total base stats.'],
        ['Luvdisc', 'Below 360 total base stats.'],
        ['Delibird', 'Below 360 total base stats.'],
        ['Ditto', 'Below 360 total base stats.'],
        ['Smeargle', 'Below 360 total base stats.'],
        ['Shedinja', 'Below 360 total base stats.'],
        ['Wishiwashi', 'Below 360 total base stats.'],
    ]
}
const topPokemon = {
    columns: ['Pokémon', 'Top Conditions'],
    rows: [
        ['Arceus', 'Mythical.'],
        ['Arceus', 'Mythical.'],
    ]
}

// Moves
const filteredMoves = {
    columns: ['Move', 'Applicable Filters'],
    rows: [
        ['name', 'rule'],
        ['name', 'rule'],
    ]
}
const usabilityMoves = {
    columns: ['Move', 'Usability Conditions'],
    rows: [
        ['name', 'rule'],
        ['name', 'rule'],
    ]
}

// Abilities
const filteredAbilities = {
    columns: ['Ability', 'Applicable Filters'],
    rows: [
        ['name', 'rule'],
        ['name', 'rule'],
    ]
}
const usabilityAbilities = {
    columns: ['Ability', 'Usability Conditions'],
    rows: [
        ['name', 'rule'],
        ['name', 'rule'],
    ]
}

//Items
const filteredItems = {
    columns: ['Item', 'Applicable Filters'],
    rows: [
        ['name', 'rule'],
        ['name', 'rule'],
    ]
}
const usabilityItems = {
    columns: ['Item', 'Usability Conditions'],
    rows: [
        ['name', 'rule'],
        ['name', 'rule'],
    ]
}
    
export {
    filteredPokemon, topPokemon,
    filteredMoves, usabilityMoves,
    filteredAbilities, usabilityAbilities,
    filteredItems, usabilityItems
}