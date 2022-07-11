import {randomName} from "./generators.name.js";
import {description} from "./generators.description.js";
import {newStats,MAX_STAT_POINTS} from "./generators.stats.js";
import { astroSign } from "./generators.astrologicalSign.js"; 
import names from "@/assets/json/names.json";
import {pick,createArray, getKeyByValue} from "./generators.tools.js";


export function profile(name=null,origin=null,gender=null,age=null,century=null,statistics={},max=MAX_STAT_POINTS)
{
    //gender
    if(!gender) gender = pick(["boy","girl"]);

    //origin
    if(!origin){
        var options = [];
        //list of all array in names[gender]
        for(var or in names[gender]){
            options.push(names[gender][or]);
        }

        origin = pick(options);
        //get origine key from names
        var peuple = getKeyByValue(names[gender],origin)

    }

    //century
    if(!century) century=pick(createArray(1,21));

    //age
    if(!age) age= pick(createArray(1,100));

    //statistics
    //for each statistic, in stats, generate a random value if not provided in statistics
    statistics= newStats(max,statistics);

    //name
    if(!name) name = randomName(origin,1)[0];

    //birthday
    var birthday = [pick(createArray(1,28)),pick(createArray(1,12)),pick(createArray((century-1)*100,(century)*100))];
	var birthdayString = birthday[0]+'/'+birthday[1]+'/'+birthday[2];
	var sign = astroSign(birthday[0],birthday[1],birthday[2])

    var desc = description(name,age,gender,statistics);

    return {
        "name":name,
        "origin":peuple,
        "age":age,
        "birthday":birthdayString,
        "astrological sign":sign,
        "stats":statistics,
        "description":desc
        }

}