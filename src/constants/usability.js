// Moves.
const chargeMoves = [ // Power herb.
'bounce', 'dig', 'dive', 'fly', 'freeze-shock', 'geomancy', 'ice-burn', 'meteor-beam', 'phantom-force', 'razor-wind',
'shadow-force', 'skull-bash', 'sky-attack', 'solar-beam', 'solar-blade'
];
const bindMoves = [ // Grip claw, binding band.
'bind', 'clamp', 'fire-spin', 'infestation', 'magma-storm', 'sand-tomb', 'snap-trap', 'thunder-cage', 'whirlpool', 'wrap'
];
const drainMoves = [ // Big root.
'absorb', 'bouncy-bubble', 'drain-punch', 'draining-kiss', 'dream-eater', 'giga-drain', 'horn-leech', 'leech-life', 'leech-seed',
'mega-drain', 'oblivion-wing', 'parabolic-charge', 'strength-sap', 'ingrain', 'aqua-ring'
];
const weatherMoves = [ // Weather moves and abilities.
'sunny-day', 'rain-dance', 'sandstorm', 'hail'
];
const terrainMoves = [ // Terrain items and abilities.
'electric-terrain', 'grassy-terrain', 'misty-terrain', 'psychic-terrain'
];
const barrierMoves = [ // Light clay.
'light-screen', 'reflect', 'aurora-veil'
];  
const orbMoves = [ // Toxic and flame orb.
'facade', 'psycho-shift'
];
const punchMoves = [ // Iron fist.
'bullet-punch', 'comet-punch', 'dizzy-punch', 'double-iron-bash', 'drain-punch', 'dynamic-punch', 'fire-punch', 'focus-punch',
'hammer-arm', 'ice-hammer', 'ice-punch', 'mach-punch', 'mega-punch', 'meteor-mash', 'plasma-fists', 'power-up-punch',
'shadow-punch', 'sky-uppercut', 'thunder-punch'
];
const multistrikeMoves = [ // Skill link.
'arm-thrust', 'barrage', 'bone-rush', 'bullet-seed', 'comet-punch', 'double-slap', 'fury-attack', 'fury-swipes', 'icicle-spear',
'pin-missile', 'rock-blast', 'scale-shot', 'spike-cannon', 'tail-slap', 'triple-axel', 'triple-kick', 'water-shuriken'
];
const recoilMoves = [ // Reckless.
'brave-bird', 'double-edge', 'flare-blitz', 'head-charge', 'head-smash', 'high-jump-kick', 'jump-kick', 'submission', 'take-down',
'wild-charge', 'light-of-ruin', 'volt-tackle', 'wood-hammer'
];
const biteMoves = [ // Strong jaw.
'bite', 'crunch', 'fire-fang', 'fishious-rend', 'hyper-fang', 'ice-fang', 'jaw-lock', 'poison-fang', 'psychic-fangs', 'thunder-fang'
];
const pulseMoves = [ // Mega launcher.
'aura-sphere', 'dark-pulse', 'dragon-pulse', 'heal-pulse', 'origin-pulse', 'terrain-pulse', 'water-pulse'
];
const soundMoves = [ // Liquid voice.
'boomburst', 'bug-buzz', 'chatter', 'clanging-scales', 'disarming-voice', 'echoed-voice', 'eerie-spell', 'hyper-voice',
'overdrive', 'relic-song', 'round', 'snarl', 'snore', 'uproar'
];
const healMoves = [ // Triage.
'draining-kiss', 'floral-healing', 'giga-drain', 'rest', 'synthesis', 'absorb', 'drain-punch', 'dream-eater', 'heal-order',
'heal-pulse', 'healing-wish', 'horn-leech', 'leech-life', 'lunar-dance', 'mega-drain', 'milk-drink', 'moonlight', 'morning-sun',
'oblivion-wing', 'parabolic-charge', 'purify', 'recover', 'roost', 'shore-up', 'slack-off', 'soft-boiled', 'strength-sap',
'swallow', 'wish'
];
const contactMoves = [ // Tough claws, unseen fist.
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
];
const consumableItemMoves = [ // Consumable items. Reverse branch logic trigger.
'recycle'
];
const badItemMoves = [ // Bad items.
'bestow', 'fling', 'switcheroo', 'trick'
];
const badAbilityMoves = [ // Bad abilities.
'entrainment', 'skill-swap'
];
const berryMoves = [ // Berries.
'natural-gift', 'stuff-cheeks', 'teatime', 'belch'
];

// Abilities.
const weatherAbilities = [ // Weather moves and abilities.
'drought', 'desolate-land', 'drizzle', 'primordial-sea', 'sand-stream', 'sand-spit', 'snow-warning', 'delta-stream'
];
const terrainAbilities = [ // Terrain moves and items.
'electric-surge', 'grassy-surge', 'misty-surge', 'psychic-surge'
];
const orbAbilities = [ // Toxic and flame orb.
'guts', 'magic-guard', 'quick-feet', 'marvel-scale'
];
const consumableItemAbilities = [ // Consumable items. Reverse branch logic trigger.
'pickup', 'unburden', 'pickpocket', 'magician'
];  
const berryAbilities = [ // Berries. Reverse branch logic trigger.
'cheek-pouch', 'gluttony', 'harvest', 'ripen',
];

// Items.
const consumableItems = [ // Consumable items. Reverse branch logic.
'absorb-bulb', 'air-balloon', 'cell-battery', 'eject-button' ,'electric-seed', 'focus-sash', 'grassy-seed',
'luminous-moss', 'mental-herb', 'misty-seed', 'power-herb', 'psychic-seed', 'red-card', 'white-herb', 'snowball', 'weakness-policy',
'bug-gem', 'dark-gem', 'dragon-gem', 'electric-gem', 'fairy-gem', 'fighting-gem', 'fire-gem', 'flying-gem',
'ghost-gem', 'grass-gem', 'ground-gem', 'ice-gem', 'poison-gem', 'psychic-gem', 'rock-gem', 'steel-gem', 'water-gem'
];  
const plateItems = [ // Plate items. Reverse branch logic.
'draco-plate', 'dread-plate', 'earth-plate', 'fist-plate', 'flame-plate', 'icicle-plate', 'insect-plate', 'iron-plate',
'meadow-plate', 'mind-plate', 'pixie-plate', 'sky-plate', 'splash-plate', 'spooky-plate', 'stone-plate', 'toxic-plate', 'zap-plate'
];  
const memoryItems = [ // Memory items. Reverse branch logic.
'bug-memory', 'dark-memory', 'dragon-memory', 'electric-memory', 'fairy-memory', 'fighting-memory', 'fire-memory', 'flying-memory',
'ghost-memory', 'grass-memory', 'ground-memory', 'ice-memory', 'poison-memory', 'psychic-memory', 'rock-memory', 'steel-memory', 'water-memory'
];
const berryItems = [ // Berry items. Reverse branch logic.
'cheri-berry', 'chesto-berry', 'pecha-berry', 'rawst-berry', 'aspear-berry', 'leppa-berry', 'persim-berry', 'lum-berry', 'sitrus-berry',
'figy-berry', 'wiki-berry', 'mago-berry', 'aguav-berry', 'iapapa-berry', 'occa-berry', 'passho-berry', 'wacan-berry', 'rindo-berry', 
'yache-berry', 'chople-berry', 'kebia-berry', 'shuca-berry', 'coba-berry', 'payapa-berry', 'tanga-berry', 'charti-berry', 'kasib-berry',
'haban-berry', 'colbur-berry', 'babiri-berry', 'chilan-berry', 'liechi-berry', 'ganlon-berry', 'salac-berry', 'petaya-berry', 
'apicot-berry', 'lansat-berry', 'starf-berry', 'enigma-berry', 'micle-berry', 'custap-berry', 'jaboca-berry', 'rowap-berry'
];

export {
    bindMoves, biteMoves, pulseMoves, punchMoves, soundMoves, chargeMoves, contactMoves, multistrikeMoves,
    barrierMoves, healMoves, drainMoves, recoilMoves, weatherMoves, terrainMoves,
    orbMoves, badAbilityMoves, badItemMoves, consumableItemMoves, berryMoves,
    weatherAbilities, terrainAbilities, orbAbilities, consumableItemAbilities, berryAbilities,
    plateItems, memoryItems, consumableItems, berryItems
}