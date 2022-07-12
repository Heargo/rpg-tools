import ITEMS from '@/assets/json/items.json';
/**
 * It takes an object with keys and values, and returns an array of the keys repeated a number of times
 * equal to the value.
 * @param obj - The object that contains the items and their weights.
 * @returns An array of objects with the item and weight properties.
 */
export function weight(obj) {
    var arr = Object.keys(obj).map(function (key) {
        return {item:key,weight:obj[key]};
    });
    return [].concat(...arr.map((obj) => Array(Math.ceil(obj.weight * 100)).fill(obj)));
}

/**
 * It takes an array of objects, each object having a `weight` property, and returns a random object
 * from the array, with the probability of each object being returned being proportional to its
 * `weight` property
 * @param arr - The array of objects to pick from.
 * @returns a random element from the array.
 */
export function pickWeight(arr) {
    let weighted = weight(arr);
    return weighted[Math.floor(Math.random() * weighted.length)]
}

/**
 * `pick` returns a random element from an array
 * @param arr - The array to pick a random element from.
 * @returns A random element from the array.
 */
export function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * It takes an array of objects, and returns an array of objects, where each object is a random
 * selection from the original array, and the probability of each object being selected is proportional
 * to its weight
 * @param arr - an array of objects, each with a "weight" property
 * @param n - number of items to select
 * @returns An array of n elements from the array arr, where the probability of each element being
 * selected is proportional to its weight.
 */
export function selectWeight(arr,n) {
    let weighted = weight(arr);
    let result = [];
    for (let i = 0; i < n; i++) {
        result.push(weighted[Math.floor(Math.random() * weighted.length)]);
    }
    return result;
}

/**
 * It returns a function that returns a random item from the array, and removes that item from the
 * array so it won't be returned again
 * @param arr - The array to select from.
 * @returns A function that returns a random item from the array.
 */
export function selecterNoRepeats(arr) {
    var copy = arr.slice(0);
    return function() {
        if (copy.length < 1) { copy = arr.slice(0); }
        var index = Math.floor(Math.random() * copy.length);
        var item = copy[index];
        copy.splice(index, 1);
        return item;
    };
}

/**
 * It takes a string and an object, and replaces all instances of {key} in the string with the value of
 * obj[key].
 * @param str - The string to be formatted.
 * @param obj - {
 */
export function formated(str,obj) {
    for (let key in obj) {
        str = str.replace(new RegExp("{"+key+"}","g"),obj[key]);
    }
    return str;
}



/**
 * It takes an array and an average, and returns a dictionary with the array values as keys and the
 * probability of each value as the value
 * @param array - the array of values
 * @param average - the average of the array
 * @returns A dictionary with the keys being the array values and the values being the probabilities.
 */
export function gauss(array,average) {
    var a=array.length/6;
    average = array.indexOf(average);
    var probs=[];
    for(let i=0;i<array.length;i++) {
        probs[i]=(3/(a*Math.sqrt(2*Math.PI)))*Math.exp(-0.5*(((3*(i-average))/a)**2))
    }

    var dic={};
    for(let i=0;i<array.length;i++) {
        dic[array[i]]=probs[i];
    }

    return dic;
}


/**
 * It takes two numbers as arguments, and returns an array of numbers between those two numbers.
 * @param start - The starting number of the sequence.
 * @param end - The end of the range (inclusive)
 * @returns An array of numbers from start to end.
 */
export function createArray(start,end) {
    var arr=[];
    for(let i=start;i<=end;i++) {
        arr.push(i);
    }
    return arr;
}

/**
 * It returns the key of an object that matches the value you pass to it
 * @param object - The object to search through.
 * @param value - The value you want to find the key for.
 * @returns The key of the object that matches the value.
 */
export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}



/**
 * It takes a word and a category, and if the category is feminine, it checks if the word is in a
 * dictionary of masculine words that have a feminine equivalent, and if it is, it returns the feminine
 * equivalent. If the category is plural, it adds an 's' to the word.
 * @param mot - the word to check
 * @param category - category of the word to check
 */
export function check_orthographe(mot,category)
{
    var new_mot=mot;
    if (ITEMS.language.liste_category_feminins.includes(category))
    {
        if (Object.keys(ITEMS.language.dico_ortographe_m_to_f).includes(mot))
            new_mot=ITEMS.language.dico_ortographe_m_to_f[mot];

        if (ITEMS.language.liste_category_pluriel.includes(category)){
            if (new_mot[-1]!='x' && new_mot[-1]!='s')
                new_mot+='s';
        }
    }
    return new_mot;
}