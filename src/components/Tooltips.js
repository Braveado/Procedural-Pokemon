import React, {useEffect} from 'react'
import ReactTooltip from 'react-tooltip';

export default function Tooltips() {
    // Rebind tooltips when component mounts/update.
    useEffect(() => {
        ReactTooltip.rebuild()
    });

    // Format dynamic tooltip.
    const formatTooltipData = (data) => {   
        if(!data)
            return null;

        let formattedEffect = data.toLowerCase().replace(/\./g, "").replace(/,/g, "");
        let tooltipData=[];   
        // Specific.
        if(formattedEffect.includes("critical hit rate") || formattedEffect.includes("critical hit ratio"))
            tooltipData.push("Critical Hit Rate|A base chance of 1/16 of dealing a critical hit, increases based on stages (1/8, 1/2, always).");
        else if(formattedEffect.includes("major status effect") || formattedEffect.includes("major status ailment"))
            tooltipData.push("Major Statuses|All the non-volatile status effects (Burn, Freeze, Paralysis, Poison, Badly Poison and Sleep).");
        else if(formattedEffect.includes("scatters spikes"))
            tooltipData.push("Spikes|Damages foes when they switch in based on layers placed (1/8, 1/6, 1/4 max HP).");
        else if(formattedEffect.includes("causes damage when opposing pokémon switch in"))
            tooltipData.push("Stealth Rock|Damages foes when they switch in based on the effectivenes of Rock-type against them (from 1/32 to 1/2 max HP)."); 
        else if(formattedEffect.includes("grassy terrain"))
            tooltipData.push("Grassy Terrain|"+
            "*Boosts the power of Grass-type moves by 30%."+
            "*Restores 1/16 max HP of pokemon at the end of their turn."+
            "*The power of Bulldoze, Earthquake, and Magnitude is halved."); 
        else if(formattedEffect.includes("misty terrain"))
            tooltipData.push("Misty Terrain|"+
            "*Halves the power of Dragon-type moves."+
            "*Prevents being afflicted by non-volatile status conditions."); 
        else if(formattedEffect.includes("strong sunlight"))
            tooltipData.push("Strong Sunlight|"+
            "*Increases the damage of Fire-type moves by 50%."+
            "*Decreases the damage of Water-type moves by 50%."+
            "*Allows Solar Beam and Solar Blade to be used instantly."+
            "*Causes Growth to raise Attack and Special Attack two stages each."+
            "*Prevents pokemon from becoming frozen."+
            "*Causes Moonlight, Synthesis, and Morning Sun to recover 2/3 of max HP."+
            "*Lowers accuracy of Thunder and Hurricane to 50%.");
        // General.
        formattedEffect.split(" ").forEach(e => {
            switch(e){
                case 'priority':
                    tooltipData.push("Priority|Higher priority moves are performed first.");
                    break;
                case 'critical':
                    if(!tooltipData.find(td => td.includes("Critical")))
                        tooltipData.push("Critical Hit|Deals 1.5x the damage. The attacker's negative stat stages and the defender's positive stat stages and screen-creating moves are ignored.");
                    break;
                case 'stage':
                case 'stages':
                    if(!tooltipData.find(td => td.includes("Critical")))
                        tooltipData.push("Stages|Modifies a stat by 50% each. Max 6 or -6 stages per stat.");
                    break;
                case 'flinch':
                case 'flinching':
                    tooltipData.push("Flinch|Unable to attack for that turn.");
                    break;
                case 'confuse':
                case 'confuses':
                    tooltipData.push("Confusion|33% chance of attacking itself instead of executing a move for 2-5 turns. Volatile status condition.");
                    break;
                case 'paralyzes':
                case 'paralyze':
                case 'paralyzed':
                    tooltipData.push("Paralysis|50% speed reduction and 25% chance of losing each turn. Non-volatile status condition.");
                    break;
                case 'freeze':
                case 'frozen':
                    tooltipData.push("Freeze|Unable to make a move and 20% chance of being thawed out each turn. Non-volatile status condition.");
                    break;
                case 'burn':
                case 'burns':
                case 'burned':
                    if(!tooltipData.find(td => td.includes("Burn")))
                        tooltipData.push("Burn|Takes 1/16 max HP as damage every turn and halves damage dealt with physical moves. Non-volatile status condition.");
                    break;
                case 'poisoned':
                case 'poisons':
                case 'poison':
                    if(!tooltipData.find(td => td.includes("Poison"))){
                        tooltipData.push("Poison|Takes 1/8 max HP as damage every turn. Non-volatile status condition.");            
                        tooltipData.push("Badly Poisoned|Takes increasing max HP damage every turn, increased by 1/16 each turn. Non-volatile status condition.");
                    }
                    break;
                case 'sleep':
                case 'sleeping':
                    tooltipData.push("Sleep|Unable to make a move for 1-3 turns. Non-volatile status condition.");
                    break;
                case 'traps':
                    tooltipData.push("Trap|Prevents the target from switching out if the user remains in battle.");
                    break;
                case 'infatuates':
                case 'infatuation':
                    if(!tooltipData.find(td => td.includes("Infatuation")))
                        tooltipData.push("Infatuation|Cannot attack 50% of the time.");
                    break;
                case 'rain':
                    tooltipData.push("Rain|"+
                    "*Increases the damage of Water-type moves by 50%."+
                    "*Decreases the damage of Fire-type moves by 50%."+
                    "*Halves the power of Solar Beam and Solar Blade."+
                    "*Causes Growth to raise Attack and Special Attack two stages each."+
                    "*Prevents pokemon from becoming frozen."+
                    "*Causes Moonlight, Synthesis, and Morning Sun to recover 1/4 of max HP."+
                    "*Allows Thunder and Hurricane to bypass the accuracy check.");
                    break;
                case 'hail':
                    if(!tooltipData.find(td => td.includes("Hail")))
                        tooltipData.push("Hail|"+
                        "*Deals 1/16 max HP as damage to pokemon at the end of each turn, unless they are Ice-type."+
                        "*Allows Blizzard to bypass accuracy check."+
                        "*Halves the power of Solar Beam and Solar Blade."+
                        "*Causes Moonlight, Synthesis, and Morning Sun to recover 1/4 of max HP."); 
                    break;
                default:
                    break;
            }
        });    

        //ReactTooltip.rebuild();
        if(tooltipData.length > 0){
            let dataArray = tooltipData.map(d => {return {header: d.split('|')[0], content: d.split('|')[1].split("*")}})            
            return (dataArray.map((d, i) => {
                return(
                    <div className={i+1 < dataArray.length ? "text-center border-b" : "text-center"} key={i}>
                        <p>{d.header}</p>
                        {d.content.map((c, i) => {return <p key={i}>{c}</p>})}
                    </div>
                );
            }))
        }
        else {
            return null;
        }
    }

    return (
        <div>
            <ReactTooltip id="stat-0" delayShow={200}>
                <div className="text-center">
                    <p>Hit Points</p>
                    <p>Determines the total damage a pokemon can receive before fainting.</p>
                </div>
            </ReactTooltip>   
            <ReactTooltip id="stat-1" delayShow={200}>
                <div className="text-center">
                    <p>Attack</p>
                    <p>Determines damage dealt when using a physical move.</p> 
                </div>              
            </ReactTooltip>    
            <ReactTooltip id="stat-2" delayShow={200}>
                <div className="text-center">
                    <p>Defense</p>
                    <p>Mitigates damage received when hit by a physical move.</p>               
                </div>
            </ReactTooltip>   
            <ReactTooltip id="stat-3" delayShow={200}>
                <div className="text-center">
                    <p>Special Attack</p>
                    <p>Determines damage dealt when using a special move.</p>               
                </div>
            </ReactTooltip>
            <ReactTooltip id="stat-4" delayShow={200}>
                <div className="text-center">
                    <p>Special Defense</p>
                    <p>Mitigated damage received when hit by a special move.</p>               
                </div>
            </ReactTooltip> 
            <ReactTooltip id="stat-5" delayShow={200}>
                <div className="text-center">
                    <p>Speed</p>
                    <p>Determines the turn order in battle.</p>               
                </div>
            </ReactTooltip>
            <ReactTooltip id="nature" delayShow={200}>
                <div className="text-center">
                    <p>Nature</p>
                    <p>Usually affects two stats excluding HP, increasing one by 10% and decreasing another by 10%.</p>
                </div>
            </ReactTooltip>
            <ReactTooltip id="gender" delayShow={200}>
                <div className="text-center">
                    <p>Gender</p>
                    <p>Selected from the possible genders of the pokemon.</p>              
                </div>
            </ReactTooltip>
            <ReactTooltip id="height_weight" delayShow={200}>
                <div className="text-center">
                    <p>Height and Weight</p>
                    <p>How tall and heavy is the pokemon.</p>
                </div>
            </ReactTooltip>
            <ReactTooltip id="pp" delayShow={200}>
                <div className="text-center">
                    <p>Power Points</p>
                    <p>How many times the move can be used.</p>              
                </div>
            </ReactTooltip>
            <ReactTooltip id="power" delayShow={200}>
                <div className="text-center">
                    <p>Power</p>
                    <p>Determines damage dealt by the move.</p>
                </div>
            </ReactTooltip>
            <ReactTooltip id="accuracy" delayShow={200}>
                <div className="text-center">
                    <p>Accuracy</p>
                    <p>Determines how likely the move is to hit.</p>              
                </div>
            </ReactTooltip>
            <ReactTooltip id="dynamic" delayShow={200} getContent={(dataTip) => formatTooltipData(dataTip)}/>
        </div>
    )
}
