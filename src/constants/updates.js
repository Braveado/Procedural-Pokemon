/*                                                                                                    
<li>  - XenonHero126</li>                                    
<li>Fixed incorrect descriptions for  - XenonHero126</li>
<li>Fixed incorrect descriptions for  - XenonHero126</li>                                    
<li>Fixed incorrect descriptions for  - XenonHero126</li>
 */

const updates = [
    {
        version: '1.1 Notable options',
        contributors: [
            'Braveado',
            'XenonHero126',
        ],
        changes: [
            ['Legendary and mythical pokémon below 540 total base stats can now spawn without counting as "top" pokémon.'],
            ['Added new backgrounds for notable pokémon.', [
                'Legendary and mythical pokémon below 540 total base stats.',
                'Pokémon with a total base stats range of 540 to 600.'
            ]],
            ['Fixed filtered pokémon being able to spawn.', [
                'In-battle activation forms (Mimikyu Busted).',                
            ]],            
            ['Fixed pokémon exporting incorrectly.', [
                'Male and female forms (Indeedee, Meowstic).',
                'Starting forms for in-battle activation forms (Darmanitan Galar Standard, Eiscue Ice, Minior Meteor, Morpeko Full Belly, Zygarde 50).',
            ]],
            ['Added filtered moves.', [
                'Unusable in single battles (After You, Ally Switch, Follow Me, Heal Pulse).',
            ]],
            ['Added tooltip information for moves.', [
                'One-hit knockout moves (new tooltip).',
                'Fixed multi-strike moves (now include the multi-strike tooltip).',
                'Sound moves (now include their Substitute interaction on tooltip).',
                'Recoil or Crash moves (separated into 2 different tooltips).',
            ]],
            ['Fixed incorrect descriptions for moves.', [
                "Let's Go signature moves (Baddy Bad, Bouncy Bubble, Buzzy Buzz, Floaty Fall, Freezy Frost, Glitzy Glow, Sappy Seed, Sizzly Slide, Sparkly Swirl, Splishy Splash, Zippy Zap).",
                "Terrain moves (Electric Terrain, Grassy Terrain, Psychic Terrain).",
                "Berry moves (Bug Bite, Pluck).",
                "Crash moves (Jump Kick, High Jump Kick).",
                "Miscellaneous moves (Double Iron Bash, Lunar Dance, Photon Geyser, Plasma Fists, Rapid Spin, Razor Wind, Scale Shot, Teleport, Triple Axel, Weather Ball)."
            ]],
            ['Fixed usability checks for abilities.', [
                'Recoil moves related (Rock Head)',
            ]],
            ['Fixed incorrect descriptions for abilities.', [
                'Crash moves related (Reckless)',
            ]],
        ],        
    },
    {
        version: '1.0 Release',
        contributors: [
            'Braveado',
        ],
        changes: [
            ['Initial release on LINK.'],
        ],
        link: {
            text: 'Smogon',
            url: 'https://www.smogon.com/forums/threads/procedural-pok%C3%A9mon.3710227/',
        },
    },
];

export default updates;