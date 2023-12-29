const { performance } = require('perf_hooks');
import * as fs from 'fs';

var start = performance.now();
const file = fs.readFileSync('day5/d5', 'utf-8');

console.log('file: \n', file);

class Fn {
    dRangeStart: number = 0;
    sRangeStart: number = 0;
    rangeLength: number = 0;
}

let final: number = Number.MAX_VALUE;
let fnss: Fn[][] = [];

const lines: string[] = file.trimEnd().split('\n\n');
console.log('lines: \n', lines);

const rangeSeeds: number[] = strToInt(lines[0].split(':')[1].trim().split(' '));

for (let i: number = 1; i < lines.length; i++) {
    let lns:string[] = lines[i].split('\n');
    lns = lns.slice(1);
    let fns1: Fn[] = [];
    for (let ln of lns) {
        let fn: Fn = new Fn();
        let val: string[] = ln.trimEnd().split(' '); 
        fn.dRangeStart = parseInt(val[0]);
        fn.sRangeStart = parseInt(val[1]);
        fn.rangeLength = parseInt(val[2]);
        fns1.push(fn);
    }
    fnss.push(fns1);
}

for (let i: number = 0; i < rangeSeeds.length; i++) {
    let init = rangeSeeds[i];
    let end = rangeSeeds[i+1] + init;
    for (let j: number = rangeSeeds[i]; j <= (rangeSeeds[i] + rangeSeeds[i+1]); j++) {
        if (j % 1000000 === 0)
            console.log('j: ', j, 'init: ', init, 'end: ', end, 'i: ', i, 'diff: ', (end - j));
        let seed: number = j;
        for (let fns of fnss) {
            for (let fn of fns) {
                if (fn.sRangeStart <= seed && ((fn.sRangeStart + fn.rangeLength) >= seed)) {
                    seed = fn.dRangeStart + (seed - fn.sRangeStart);
                    break;
                }
            }
        }
        if (seed < final) {
            console.log('j: ', j, 'init: ', init, 'end: ', end, 'i: ', i, 'diff: ', (end - j));
            console.log('new final: ', seed);
            console.log('old final: ', final);
            final = seed;
        }
    }
    i++;
}
console.log('final: ', final);
console.log('time: ', (performance.now() - start), 'ms');
//         27992443
// final:  27992443
// time:  530656.6752840132 ms

function strToInt(arr: string[]) : number[]  {
    let nums: number[] = [];
    for (let i of arr)
        nums.push(parseInt(i));
    return nums;
}

