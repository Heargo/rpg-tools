import {pickWeight,pick,gauss,createArray} from './generators.tools';

export const stats={
    //wealth
    wealth: {
        name: 'wealth',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
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
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(0,max),9)).item);
        }
    },
    //hear
    hear: {
        name: 'hear',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(0,max),9)).item);
        }
    },
    //luck
    luck: {
        name: 'luck',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(0,max),5)).item);
        }
    },
    //generosity
    generosity: {
        name: 'generosity',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
        }
    },
    //compassion
    compassion: {
        name: 'compassion',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
        }
    },
    //agility
    agility: {
        name: 'agility',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
        }
    },
    //endurance
    endurance: {
        name: 'endurance',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
        }
    },
    //coldResistance
    coldResistance: {
        name: 'coldResistance',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
        }
    },
    //heatResistance
    heatResistance: {
        name: 'heatResistance',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
        }
    },
    //beauty
    beauty: {
        name: 'beauty',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
        }
    },
    //memory
    memory: {
        name: 'memory',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
        }
    },
    //will
    will: {
        name: 'will',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
        }
    },
    //autonomy
    autonomy: {
        name: 'autonomy',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
        }
    },
    //creativity
    creativity: {
        name: 'creativity',
        args:["max"],
        generate:function(max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
        }
    },
    //communication
    communication: {
        name: 'communication',
        args:["beauty","vision","hear","max"],
        generate:function(beauty,vision,hear,max=10)
        {
            var mean = Math.floor([beauty,beauty,vision,hear].reduce((a, b) => a + b, 0) / 4);
            return parseInt(pickWeight(gauss(createArray(1,max),mean)).item);
        }
    },
    //intelligence
    intelligence: {
        name: 'intelligence',
        args:["wealth","max"],
        generate:function(wealth,max=10)
        {
            var value = parseInt(pickWeight(gauss(createArray(1,max),5)).item);
            var bonus =Math.floor(wealth/3);
            value += bonus;
            return Math.min(Math.max(value, 1), max);
        }
    },
    //strength
    strength: {
        name: 'strength',
        args:["intelligence","max"],
        generate:function(intelligence,max=10)
        {
            return parseInt(pickWeight(gauss(createArray(1,max),max-intelligence)).item);
        }
    },
    //health
    health: {
        name: 'health',
        args:["strength","max"],
        generate:function(strength,max=10)
        {
            var value = parseInt(pickWeight(gauss(createArray(1,max),5)).item);
            var bonus =Math.floor(strength/3);
            value += bonus;
            return Math.min(Math.max(value, 1), max);
        }
    },
    // //newstat
    // newstat: {
    //     name: 'newstat',
    //     args:["max"],
    //     generate:function(max=10)
    //     {
    //         return parseInt(pickWeight(gauss(createArray(1,max),5)).item);
    //     }
    // }

    
}
