import * as fs from 'fs';

const file = fs.readFileSync('./d3', 'utf-8');
//const file = 
//`467..114..
//...*......
//..35..633.
//......#...
//617*......
//.....+.58.
//..592.....
//......755.
//...$.*....
//.664.598..`;

console.log('file: ', file);

let result: number = 0;

const lines = file.split('\n');
lines
    .forEach((line: string, i: number) => {
        console.log('line: ', line, ' index: ', i);
        const f = line.search('(0-9)');
        
        const numbers = line.matchAll(/([0-9])\w+/g);
        for (const number of numbers) {
            console.log('number: ', number);
            let isValid: boolean;
            let init = line.indexOf(number[0], parseInt(number[3]));
            let final = init + number[0].length + 1;
            if (init == 0)
                init = 1;
            if (final == line.length)
                final = line.length - 1;
            console.log('init: ', init, ' final: ', final);
            console.log('length: ', number[0].length);
            console.log('bottom: ',lines[i+1], ' slice: ',lines[i+1].slice(init-1, final+1), ' valid: ', lines[i+1].slice(init-1, final+1).search(/([!--]|[/{}|~]|[:-@]|[[-`])+/g));
            console.log('bottom true? ', (lines[i+1].slice(init-1, final+1).search(/([!--]|[/{}|~]|[:-@]|[[-`])+/g)))
            console.log('i < lines.length: ', i < lines.length);
            console.log('left', line.slice(init-1, init), ' valid: ', line.slice(init-1, init).search(/([!--]|[/{}|~]|[:-@]|[[-`])+/g));
            console.log('right', line.slice(final-1, final), ' valid: ', line.slice(final-1, final).search(/([!--]|[/{}|~]|[:-@]|[[-`])+/g));
            if (i > 0)
                console.log('top: ', lines[i-1], ' slice: ', lines[i-1].slice(init-1, final+1), ' valid: ', lines[i-1].slice(init-1, final+1).search(/([!--]|[/{}|~]|[:-@]|[[-`])+/g));
            // top
            if (i > 0 && (lines[i-1].slice(init-1, final+1).search(/([!--]|[/{}|~]|[:-@]|[[-`])+/g) > -1)){
                console.log('top true');
                isValid = true;
            }
            else if (i < lines.length && (lines[i+1].slice(init-1, final+1).search(/([!--]|[/{}|~][:-@]|[[-`])+/g) > -1)){
                console.log('bottom true');
                isValid = true;    
            }
            else if (line.slice(init-1, init).search(/([!--]|[/{}|~]|[:-@]|[[-`])+/g) > -1 || (line.slice(final-1, final).search(/([!--]|[/{}|~]|[:-@]|[[-`])+/g) > -1)){
                console.log('left or right true');
                isValid = true;
            }
            else isValid = false;
            console.log('is valid ', isValid);
            if (isValid) {
                result += parseInt(number[0]);
            }
        }
    });

console.log('result: ', result);
