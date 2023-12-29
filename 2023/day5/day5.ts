import * as fs from 'fs';

const file = fs.readFileSync('day5/d5', 'utf-8');

console.log('file: \n', file);

class Fn {
    dRangeStart: number = 0;
    sRangeStart: number = 0;
    rangeLength: number = 0;
}

let result: number = 0;
let fnss: Fn[][] = [];

const lines: string[] = file.trimEnd().split('\n\n');
console.log('lines: \n', lines);

const seeds: number[] = strToInt(lines[0].split(':')[1].trim().split(' '));
console.log('seeds : ', seeds);

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

for (let iSeed: number = 0; iSeed <= seeds.length; iSeed++){
    for (let fns of fnss) {
        for (let fn of fns) {
            console.log('entry fn: ', fn);
            if (fn.sRangeStart <= seeds[iSeed] && ((fn.sRangeStart + fn.rangeLength) >= seeds[iSeed])) {
                console.log('old seeds[iSeed]: ', seeds[iSeed]);
                seeds[iSeed] = fn.dRangeStart + (seeds[iSeed] - fn.sRangeStart);
                console.log('new seeds[iSeed]: ', seeds[iSeed]);
                break;
            }
        }
    }
}

console.log('final locations: ', seeds);
console.log('lowest: ', Math.min(...seeds));

function strToInt(arr: string[]) : number[]  {
    let nums: number[] = [];
    for (let i of arr)
        nums.push(parseInt(i));
    return nums;
}

