
const split = (num) => {

    console.log("splitting number: " + num);

    const numLen = num.toString().length;

    if (!isFinite(num) || numLen === 1) {
        throw Error(`Cannot split number: ${num}`);
    }

    const halfLen = Math.floor(numLen / 2); 
    const divider = 10 ** halfLen;    //how many places from the right to cut off at

    const front = Math.floor(num / divider);  //retrieve the first ~ half digits 
    console.log("front: " + front);

    const back = num % divider;   //retrieve the remaining trailing digits
    console.log("back: " + back);

    return [front, back];
};

const karatsuba = (int1, int2) => {

    //only peform the multiplication if down to a single digit    
    if (int1 < 10 || int2 < 10) {
        console.log("beneath 10, multiplying " + int1 + " and " + int2 );
        return int1 * int2;  
    }

    //if not small enough yet to multiply, break them down further in recursion

    console.log("breaking apart karatsuba int1: " + int1);
    console.log("breaking apart karatsuba int2: " + int2);

    const maxLen = Math.max(int1.toString().length, int2.toString().length);
    const halfMaxLen = Math.floor(maxLen / 2);

    const [a, b] = split(int1);
    const [c, d] = split(int2);

    const ac = karatsuba(a, c);
    const bd = karatsuba(b, d);
    const abcd = karatsuba(a + b, c + d);
    const magic = abcd - ac - bd;

    return ac * 10 ** (2 * halfMaxLen) + magic * 10 ** halfMaxLen + bd;     
};

console.log("starting karatsuba...");

//console.log(split(1234)); //[ 12, 34 ]
//console.log(split(12)); //[ 1, 2 ]
//console.log(split(1)); //error

const arg1 = 12;
const arg2 = 45;

console.log("Multiplying " + arg1 + " with " + arg2 + " using Karatsuba");

const product = karatsuba(arg1, arg2);   // 
console.log(product);

console.log("finished Karatsuba");

// exports.karatsuba = karatsuba;
// exports.split = split;

module.exports = {
    karatsuba: karatsuba,
    split: split
};




