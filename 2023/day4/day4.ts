import * as fs from 'fs';

const file = fs.readFileSync('day4/d4', 'utf-8');
// const file = 
// `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

console.log('file: \n', file);

let result: number = 0;

const lines = file.trimEnd().split('\n');
lines
    .forEach((line: string, i: number) => {
        const card = line.split(':')[1].split('|')[0].trim().split(' ');
        const myNumbers = line.split(':')[1].split('|')[1].trim().split(' ');
        myNumbers.map((num: string) => { if (num == '') myNumbers.splice(myNumbers.indexOf(num), 1) });
        card.map((num: string) => { if (num == '') card.splice(card.indexOf(num), 1) });
        const cardId = line.split(':')[0].split(' ')[1];
        let rptNumbers: number[] = [];
        myNumbers.map((num: string) => { if (card.includes(num)) rptNumbers.push(parseInt(num)) });
        const howMany = myNumbers
            .reduce((total, num) => card.includes(num) ? total+1 : total, 0);
        console.log('myNumbers: ', myNumbers);
        console.log(howMany);
        console.log('cardId: ', cardId);
        console.log('repeat numbers: ', rptNumbers);
        let points: number = 0
        if (howMany > 0)
            points =(Math.pow(2, howMany-1));


        console.log('poits: ', points); 
        result += points;
    });

console.log('result: ', result);
