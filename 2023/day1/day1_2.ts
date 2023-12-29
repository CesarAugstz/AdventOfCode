import * as fs from 'fs';

const file = fs.readFileSync('./d1', 'utf-8');

const numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const numberStr: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

let result: number = 0;

file
    .split('\n')
    .forEach((x: string) => {
        if (x.length > 0){
            let aux: string = x;
            numberStr
                .forEach( (y, i) => {
                    let len = y.length;
                    while (aux.includes(y)){ 
                        aux = aux.replace(y, y.substring(0, len-1) + (numbers.at(i)?? 'aaaaaaaaaaaa') + y.substring(len-2, len));
                    }})
            console.log("befo: ", x);
            console.log("after: ", aux);
            const filterNums = [...aux]
                .filter( y => numbers.includes(y));
            console.log("filternums: ", filterNums);
            const calibration: number = parseInt(filterNums[0] + filterNums[filterNums.length -1]);
            result += calibration;
        }})

console.log('result: ', result);
