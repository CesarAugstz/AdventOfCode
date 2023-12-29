import * as fs from 'fs';

const file: string = fs.readFileSync('./d2', 'utf-8');

// 12 red cubes, 13 green cubes, and 14 blue cubes

    
let result: number = 0;

// biome-ignore lint/complexity/noForEach: <explanation>
file
    .trimEnd()
    .split('\n')
    ?.forEach((line) => {

        const maxCubes = {
            red: 0,
            green: 0,
            blue: 0
        }
        const gameId = line.split(':')[0].substring(4);
        const game = line
                        .split(':')[1]
                        ?.split(';');
        let valid: boolean = false;
        game
            .forEach((g) => {
                g.split(',')
                .forEach((x) => {
                        if (x.includes('blue'))
                            if (parseInt(x.substring(0, (x.indexOf('blue')-1)).trim()) > maxCubes.blue)
                                maxCubes.blue = parseInt(x.substring(0, (x.indexOf('blue')-1)).trim());
                        if (x.includes('red'))
                            if (parseInt(x.substring(0, (x.indexOf('red')-1)).trim()) > maxCubes.red)
                                maxCubes.red = parseInt(x.substring(0, (x.indexOf('red')-1)).trim());
                        if (x.includes('green'))
                            if (parseInt(x.substring(0, (x.indexOf('green')-1)).trim()) > maxCubes.green)
                                maxCubes.green = parseInt(x.substring(0, (x.indexOf('green')-1)).trim());
                });
            })
        result += maxCubes.red * maxCubes.green * maxCubes.blue;

    })


console.log('result: ', result);
