import * as fs from 'fs';

const file: string = fs.readFileSync('./d2', 'utf-8');

// 12 red cubes, 13 green cubes, and 14 blue cubes

const maxCubes = {
    red: 12,
    green: 13,
    blue: 14
}
console.log('max', maxCubes);
    
let result: number = 0;

// biome-ignore lint/complexity/noForEach: <explanation>
file
    .trimEnd()
    .split('\n')
    ?.forEach((line) => {
        const gameId = line.split(':')[0].substring(4);
        const game = line
                        .split(':')[1]
                        ?.split(';');
        let valid: boolean = false;
        game
            .forEach((g) => {
                valid = g.split(',')
                .some((x) => {
                        if (x.includes('blue'))
                            if (parseInt(x.substring(0, (x.indexOf('blue')-1)).trim()) > maxCubes.blue)
                                    return true;
                        if (x.includes('red'))
                            if (parseInt(x.substring(0, (x.indexOf('red')-1)).trim()) > maxCubes.red)
                                    return true;
                        if (x.includes('green'))
                            if (parseInt(x.substring(0, (x.indexOf('green')-1)).trim()) > maxCubes.green)
                                    return true;
                        return false;
                }) || valid;
            })

        if (!valid){
            console.log('nvalid: ', gameId);
            console.log('game: ', game);
            result += parseInt(gameId);
        }
    })


console.log('result: ', result);
