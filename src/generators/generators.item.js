import ITEMS from '@/assets/json/items.json';
import { createArray, pick, pickWeight,check_orthographe } from './generators.tools';
import {newStats} from './generators.stats';
export class Item{

    constructor(type_of_item=null,category=null,name=null,lvl=null,lvl_max=null,grade=null,material=null,stats=null,price=null,durabilite=null,description=null,effect=null){
    
        //pick a random type of item
        this.type_of_item = type_of_item;
        if(type_of_item==null){
            type_of_item = pick(Object.keys(ITEMS.items));
        }
    
        //base name and category
        this.name = name;
        if (name==null){
            //pick a random category
            if(category==null){
                this.category = pick(Object.keys(ITEMS.items[type_of_item].categories));
            }
            else{
                this.category = category;
            }
            //pick an item from category
            this.name = pick(Object.keys(ITEMS.items[this.type_of_item].categories[this.category]));
        }
    
        //save item type
        this.item = this.name;
        //pick a link word
        var liaison = pick(Object.keys(ITEMS.dico_adjectif));
        //exception
        if(liaison=="en" && type_of_item=="armure"){
            liaison="des";
        }
        else if(liaison=="spé"){
            this.name+=" "+check_orthographe(pick(ITEMS.dico_adjectif[liaison][this.category]),this.item);
        }
        //standard
        else if(liaison==" " || liaison=="d'"){
            this.name+=" "+check_orthographe(pick(ITEMS.dico_adjectif[liaison]),this.item)
        }else
            this.name+=" "+liaison+" "+check_orthographe(pick(ITEMS.dico_adjectif[liaison]),this.item)
        
        //level max 
        if(lvl_max==null)
            lvl_max = ITEMS.levelMax;

        //level
        this.lvl = lvl
        if(lvl==null){
            if (grade in ["légendaire","mythique","unique"])
                this.lvl =lvl_max
            else
                this.lvl = pick(createArray(1,lvl_max));
        }
        

        //grade
        this.grade = grade;
        if(grade==null){
            if (lvl==lvl_max){
                var gradesList={}
                for(grade in ITEMS.grades){
                    gradesList[grade] = ITEMS.grades[grade].spawnPourcentage;
                }
                this.grade = pickWeight(gradesList).item;
            }
            else{
                this.grade = pick(Object.keys(ITEMS.grades));
            }
        }
        //material
        this.material = material;

        if(this.material==null)
            this.material = pick(Object.keys(ITEMS.items[this.type_of_item].categories[this.category][this.item].materials));
            
        //stats
        //TODO add random variations
        this.stats=stats;
        if(this.stats==null){
            this.stats= ITEMS.items[this.type_of_item].categories[this.category][this.item].materials[this.material];
        }

        //aditional stats
        // console.log(ITEMS.grades[this.grade])
        this.additionalStats = newStats(ITEMS.grades[this.grade].bonus.max,this.stats);

        //price
        this.price = price;
        if(price==null){
            this.price = ITEMS.grades[this.grade].price;
            //sum values from additional stats
            var sum = 0;
            for(var s in this.additionalStats){
                sum += this.additionalStats[s];
            }
            //calc mean of additional stats
            var mean = sum/Object.keys(this.additionalStats).length;
            this.price += mean*(price/100);
        }

        //TODO
        // // durability
        // this.durabilite = durabilite;
        // if(durabilite==null){
        //     var min_durabilite = ITEMS.grades[this.grade].durabilite.min;
        //     var max_durabilite = ITEMS.grades[this.grade].durabilite.max;
        //     this.durabilite = pick(createArray(min_durabilite,max_durabilite));
        // }
        this.durabilite = durabilite;




        //description
        this.description = description;


        //effect
        this.effect = effect;
        if(effect==null){
            if(this.level >= lvl_max/2)
                this.effect = pick(ITEMS.items[this.type_of_item].effects);
        }

        //GS
        this.fullGS = this.fullCalcGS();
        this.GS = this.calcGS();
    }

    calcGS(){
        var gs = 0;
        for (var s in this.stats){
            if (Number.isInteger(this.stats[s]))
                gs += this.stats[s];
        }
        return gs;
    }
    fullCalcGS(){
        var gs = this.calcGS();
        for (var s in this.additionalStats){
            if (Number.isInteger(this.additionalStats[s]))
                gs += this.additionalStats[s];
        }
        return gs;
    }
}

