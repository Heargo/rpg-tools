
import {pick,createArray} from './generators.tools.js';
import monsters from '@/assets/json/monsters.json';
import { newStats, MAX_STAT_POINTS } from './generators.stats.js';

/**
 * It generates a random monster based on a level, biome, and stats
 * @param [level=null] - the level of the monster. If null, a random level will be generated.
 * @param [biome=null] - the biome of the monster.
 * @param [stats] - an object with the stats you want to set.
 * @param [max] - the maximum number of stat points you can have.
 * @returns An object with the following properties:
 */
export function monster(level=null,biome=null,stats={},max=MAX_STAT_POINTS) {

    //level
    if (level == null) level=pick(createArray(1,100));

    //biome
    if (biome == null) biome=pick(Object.keys(monsters.biome_correspondance));

    //generate monster_environnement base on biome
    var place = pick(monsters.biome_correspondance[biome])

    //get potential monster from place
    var potential_monster=[];
    for(var monster in monsters.bestiaire_agressif) {
        if (monsters.bestiaire_agressif[monster].places.includes(place)) {
            potential_monster.push(monster);
        }
    }

    //select monster
    var monster_name=pick(potential_monster);

    //select a random variant of the monster
    var variant;
    if(monsters.bestiaire_agressif[monster_name].variants.length>0){
        var variantCategorie=pick(monsters.bestiaire_agressif[monster_name].variants);
        variant=pick(monsters.variants[variantCategorie]);
    }else variant = null;

    //generate stats
    stats = newStats(max,stats);

    return {
        "name":monster_name,
        "variant":variant,
        "level":level,
        "biome":biome,
        "place":pick(monsters.places[place]),
        "stats":stats
    };
}