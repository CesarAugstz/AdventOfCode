import * as fs from 'fs';

const file = fs.readFileSync('day4/d4', 'utf-8');

console.log('file: \n', file);

let result: number = 0;
let cards: number[]= [];
for (let i: number = 0; i< 1000; i++) {
    cards[i] = 0;
}

const lines = file.trimEnd().split('\n');
lines
    .forEach((line: string, i: number) => {
        const card = line.split(':')[1].split('|')[0].trim().split(' ');
        const myNumbers = line.split(':')[1].split('|')[1].trim().split(' ');
        myNumbers.map((num: string) => { if (num == '') myNumbers.splice(myNumbers.indexOf(num), 1) });
        card.map((num: string) => { if (num == '') card.splice(card.indexOf(num), 1) });
        const cardId = parseInt(line.split(':')[0].substring(line.split(':')[0].lastIndexOf(' ')+1));
        cards[cardId] += 1
        const howMany: number = myNumbers
            .reduce((total, num) => card.includes(num) ? total+1 : total, 0);

        console.log('howMany: ', howMany);
        console.log('cardId: ', cardId);

        for (let i: number =cardId+1; i< cardId+1+howMany; i++) {
            console.log('cards['+i+']: ', cards[i], ' += ', (cards[cardId]+1));
            cards[i] += (cards[cardId]); 
            console.log('cards['+i+']: ', cards[i]);
        }
        console.log('cards: ', cards);
    });

result = cards.reduce((total, num) => total+num, 0);
console.log('result: ', result);
