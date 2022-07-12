import {pick,createArray,formated} from './generators.tools'; 
import QUESTS from '@/assets/json/quests.json';
import {monster} from './generators.monster';
import MONSTERS from '@/assets/json/monsters.json';

export class Quest{
    constructor (giver,lvl="default",lvl_max=30,nameQuest="default",description="default",reward="default",objectif=["default",-1],difficulty="default",type_quest="default") {
        
        this.giver = giver

        //type of quete
        if (type_quest == "default") {
            this.type_quest = pick(["kill"]); //"collect","talk" pas encore fait
        } else {
            this.type_quest = type_quest;
        }
    
        //Level
        if (lvl == "default") {
            this.lvl = pick(createArray(1, lvl_max));
        } else {
            this.lvl = lvl;
        }
    
        //difficulty
        if (difficulty == "default") {
            if (this.lvl <= lvl_max / 4) {
                this.difficulty = pick(["easy", "normal"]);
            } else if (this.lvl <= (3 * lvl_max) / 4) {
                this.difficulty = pick(["normal","hard"]);
            } else {
                this.difficulty = pick(["hard"]);
            }
        } else {
            this.difficulty = difficulty;
        }
    
        //making data
        this.objectif=[null,null]
        if (objectif[0] == "default") {
            if (this.type_quest == "kill") {
                var obj = monster(this.lvl);
                this.objectif[0] = obj;
            } else if (this.type_quest == "collect") {
                console.log("------------- TO CODE -------------"); //TODO
            } else if (this.type_quest == "talk") {
                console.log("------------- TO CODE -------------"); //TODO
            }
        } else {
            this.objectif[0] = objectif[0];
        }
        
        //status
        if(objectif[1]==-1){
            this.objectif[1]=pick(createArray(QUESTS.difficulty_range[this.difficulty][0],QUESTS.difficulty_range[this.difficulty][1]));
            this.objectif_statut=0;
        }else{
            this.objectif[1]=objectif[1];
        }
    
        //name
        var infos={
            "type_quest": type_quest,
            "tag": pick(MONSTERS.bestiaire_agressif[this.objectif[0].name].tag),
            "giver": giver.name,
            "objectif": this.objectif[0].name,
            "location": this.objectif[0].place,
            "nb": this.objectif[1]
        }
        if (nameQuest == "default") {
            this.name = formated(pick(QUESTS[this.type_quest][infos.tag].names),infos);
        }
        else {
            this.name = nameQuest;
        }
    
        //description
        if (description == "default") {
            this.description = formated(pick(QUESTS[this.type_quest][infos.tag].descriptions),infos);
        }else{
            this.description = description;
        }
    
    
        //reward
        this.reward={}
        if (reward == "default") {
            var gold = Math.ceil(QUESTS.price_range[this.difficulty] ** this.lvl, 4);
            this.reward["gold"] = gold;
            //TODO add item to rewards
        }
    }

    /**
     * update the quest (increment if type is kill or collect or check player position)
     * @param [pos=null] - the position of the player
     * @returns boolean - true if the quest is completed, false otherwise
     */
    update(pos=null){
        if(this.type_quest == "kill" || this.type_quest == "collect"){
            if(this.objectif_statut==this.objectif[1]){
                this.completed =true
            }
            else{
                this.objectif_statut+=1
            }
        }
        else if(this.type_quest == "escort"){
            if(this.objectif==pos){
                this.completed =true
            }
        }
        return this.completed
    }

    /**
     * It returns the reward
     * @returns The reward
     */
    getReward(){
        return this.reward
    }

    /**
     * It returns an object with the properties of the quest.
     * @returns An object with the following properties:
     */
    info(){
        return {
            "name":this.name,
            "type":this.type_quest,
            "description":this.description,
            "reward":this.reward,
            "objectif":this.objectif,
            "objectif_statut":this.objectif_statut,
            "difficulty":this.difficulty,
            "lvl":this.lvl,
            "completed":this.completed,
            "giver":this.giver
        }
    }
}
