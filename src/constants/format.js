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
    columns: ['Pokémon', 'Top Condition'],
    rows: [
        ['Arceus', 'Mythical.'],
        ['Eternatus', 'Legendary.'],
        ['Mewtwo', 'Legendary.'],
        ['Lugia', 'Legendary.'],
        ['Ho Oh', 'Legendary.'],
        ['Dialga', 'Legendary.'],
        ['Palkia', 'Legendary.'],
        ['Giratina', 'Legendary.'],
        ['Reshiram', 'Legendary.'],
        ['Zekrom', 'Legendary.'],
        ['Xerneas', 'Legendary.'],
        ['Yveltal', 'Legendary.'],        
        ['Solgaleo', 'Legendary.'],
        ['Lunala', 'Legendary.'],
        ['Necrozma (Dusk Mane & Dawn Wings)', 'Legendary.'],
        ['Calyrex (Shadow Raider & Ice Raider)', 'Legendary.'],
        ['Hoopa Unbound', 'Mythical.'],
        ['Slaking', 'Above 600 total base stats.'],
        ['Kyogre', 'Legendary.'],
        ['Groudon', 'Legendary.'],
        ['Regigigas', 'Legendary.'],
        ['Zacian', 'Legendary.'],
        ['Zamazenta', 'Legendary.'],
        ['Kyurem', 'Legendary.'],  
        ['Latias', 'Legendary.'],
        ['Latios', 'Legendary.'],
        ['Heatran', 'Legendary.'],
        ['Cresselia', 'Legendary.'],
        ['Landorus (Incarnate & Therian)', 'Legendary.'],
        ['Zygarde 50%', 'Legendary.'],
        ['Necrozma', 'Legendary.'],
        ['Mew', 'Mythical.'],
        ['Celebi', 'Mythical.'],                
        ['Jirachi', 'Mythical.'],
        ['Deoxys (Normal, Attack, Defense & Speed)', 'Mythical.'],                
        ['Manaphy', 'Mythical.'],
        ['Darkrai', 'Mythical.'],
        ['Shaymin (Land & Sky)', 'Mythical.'],
        ['Victini', 'Mythical.'],
        ['Meloetta Aria', 'Mythical.'],
        ['Genesect', 'Mythical.'],
        ['Diancie', 'Mythical.'],
        ['Hoopa Confined', 'Mythical.'],
        ['Volcanion', 'Mythical.'],
        ['Magearna', 'Mythical.'],
        ['Marshadow', 'Mythical.'],
        ['Zeraora', 'Mythical.'],
        ['Melmetal', 'Mythical.'],
        ['Zarude', 'Mythical.'],
        ['Dragonite', 'Above 600 total base stats.'],
        ['Tyranitar', 'Above 600 total base stats.'],
        ['Salamence', 'Above 600 total base stats.'],
        ['Metagross', 'Above 600 total base stats.'],
        ['Garchomp', 'Above 600 total base stats.'],
        ['Hydreigon', 'Above 600 total base stats.'],
        ['Goodra', 'Above 600 total base stats.'],
        ['Kommo O', 'Above 600 total base stats.'],             
        ['Articuno', 'Legendary.'],
        ['Zapdos', 'Legendary.'],
        ['Moltres', 'Legendary.'],
        ['Raikou', 'Legendary.'],
        ['Entei', 'Legendary.'],
        ['Suicune', 'Legendary.'],
        ['Regirock', 'Legendary.'],
        ['Regice', 'Legendary.'],
        ['Registeel', 'Legendary.'],
        ['Uxie', 'Legendary.'],
        ['Mesprit', 'Legendary.'],
        ['Azelf', 'Legendary.'],
        ['Cobalion', 'Legendary.'],
        ['Terrakion', 'Legendary.'],
        ['Virizion', 'Legendary.'],
        ['Tornadus (Incarnate & Therian)', 'Legendary.'],
        ['Thundurus (Incarnate & Therian)', 'Legendary.'],
        ['Regieleki', 'Legendary.'],
        ['Regidrago', 'Legendary.'],
        ['Glastrier', 'Legendary.'],
        ['Spectrier', 'Legendary.'],
        ['Keldeo', 'Mythical.'],
        ['Silvally', 'Legendary.'],
        ['Tapu Koko', 'Legendary.'],
        ['Tapu Lele', 'Legendary.'],
        ['Tapu Bulu', 'Legendary.'],
        ['Tapu Fini', 'Legendary.'],
        ['Urshifu (Single Strike & Rapid Strike)', 'Legendary.'],        
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