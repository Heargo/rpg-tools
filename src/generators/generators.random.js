// Multiply elements by its weight and create new array
export function weight(obj) {
    //transofmr array 
    var arr = Object.keys(obj).map(function (key) {
        return {item:key,weight:obj[key]};
    });
    return [].concat(...arr.map((obj) => Array(Math.ceil(obj.weight * 100)).fill(obj)));
}

export function pickWeight(arr) {
    let weighted = weight(arr);
    return weighted[Math.floor(Math.random() * weighted.length)]
}

export function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

export function pickWeightMultiples(arr,n) {
    let weighted = weight(arr);
    let result = [];
    for (let i = 0; i < n; i++) {
        result.push(weighted[Math.floor(Math.random() * weighted.length)]);
    }
    return result;
}

