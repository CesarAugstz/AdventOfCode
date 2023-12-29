import * as fs from 'fs';

const file = fs.readFileSync('./d1', 'utf-8');

const numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

let result: number = 0;

file
    .split('\n')
    .forEach((x: string) => {
        if (x.length > 0){
            const filterNums = [...x]
            .filter( y => numbers.includes(y));
            const calibration: number = parseInt(filterNums[0] + filterNums[filterNums.length -1]);
            console.log('cali : ', calibration);
            result += calibration;
        }})

console.log('result: ', result);
