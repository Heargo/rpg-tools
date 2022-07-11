import {pickWeight,pick,gauss,createArray} from './generators.tools';

/**
 * It takes a max value and a statistics object, and returns a statistics object with all the stats
 * generated.
 * @param [max=MAX_STAT_POINTS] - the maximum value of the generated statistics
 * @param [statistics] - an object containing the statistics of the character.
 * @returns An object with the following properties:
 */
export function newStats(max=MAX_STAT_POINTS,statistics={})
{
    for(let s in stats){
        var stat = stats[s];
        if(!statistics[stat.name]){
            var paramsValues = [];
            //get needeed args values from statistics
            for(let i in stat.args){
                var arg = stat.args[i];
                if(arg == "max") paramsValues.push(max);
                else paramsValues.push(statistics[arg]);
            }
            //update statistics with the generated value
            statistics[stat.name] = stat.generate.apply(this,paramsValues);
        }
    }
    return statistics;
}

//the maximum value of the generated statistics
export const MAX_STAT_POINTS = 20;
export const MEAN_STAT_POINTS = 10;

export const stats={
    //wealth
    wealth: {
        name: 'wealth',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        },
    },
    //education
    education: {
        name: 'education',
        args:[],
        generate:function()
        {
            return pick(['Autoritaire','Démocratique','Permissif ','Désengagé']);
        }
    },
    // vision
    vision: {
        name: 'vision',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(0,max),max-Math.floor(max/10))).item);
        }
    },
    //hear
    hear: {
        name: 'hear',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(0,max),max-Math.floor(max/10))).item);
        }
    },
    //luck
    luck: {
        name: 'luck',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(0,max),MEAN_STAT_POINTS)).item);
        }
    },
    //generosity
    generosity: {
        name: 'generosity',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        }
    },
    //compassion
    compassion: {
        name: 'compassion',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        }
    },
    //agility
    agility: {
        name: 'agility',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        }
    },
    //endurance
    endurance: {
        name: 'endurance',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        }
    },
    //coldResistance
    coldResistance: {
        name: 'coldResistance',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        }
    },
    //heatResistance
    heatResistance: {
        name: 'heatResistance',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        }
    },
    //beauty
    beauty: {
        name: 'beauty',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        }
    },
    //memory
    memory: {
        name: 'memory',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        }
    },
    //will
    will: {
        name: 'will',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        }
    },
    //autonomy
    autonomy: {
        name: 'autonomy',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        }
    },
    //creativity
    creativity: {
        name: 'creativity',
        args:["max"],
        generate:function(max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
        }
    },
    //communication
    communication: {
        name: 'communication',
        args:["beauty","vision","hear","max"],
        generate:function(beauty,vision,hear,max=MAX_STAT_POINTS)
        {
            var mean = Math.floor([beauty,beauty,vision,hear].reduce((a, b) => a + b, 0) / 4);
            return parseInt(pickWeight(gauss(createArray(1,max),mean)).item);
        }
    },
    //intelligence
    intelligence: {
        name: 'intelligence',
        args:["wealth","max"],
        generate:function(wealth,max=MAX_STAT_POINTS)
        {
            var value = parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
            var bonus =Math.floor(wealth/3);
            value += bonus;
            return Math.min(Math.max(value, 1), max);
        }
    },
    //strength
    strength: {
        name: 'strength',
        args:["intelligence","max"],
        generate:function(intelligence,max=MAX_STAT_POINTS)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),max-intelligence)).item);
        }
    },
    //health
    health: {
        name: 'health',
        args:["strength","max"],
        generate:function(strength,max=MAX_STAT_POINTS)
        {
            var value = parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
            var bonus =Math.floor(strength/3);
            value += bonus;
            return Math.min(Math.max(value, 1), max);
        }
    },
    // //newstat
    // newstat: {
    //     name: 'newstat',
    //     args:["max"],
    //     generate:function(max=MAX_STAT_POINTS)
    //     {
    //         return parseInt(pickWeight(gauss(createArray(1,max),MEAN_STAT_POINTS)).item);
    //     }
    // }

    
}
