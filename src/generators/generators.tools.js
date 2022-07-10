
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

export function formated(str,obj) {
    for (let key in obj) {
        str = str.replace(new RegExp("{"+key+"}","g"),obj[key]);
    }
    return str;
}

