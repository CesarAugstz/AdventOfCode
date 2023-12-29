fn main() {

    let input_data: Vec<&str> = include_str!("../d5")
        .split("\n\n")
        .collect();

    let aux: Vec<&str> = input_data[0]
        .split(":")
        .collect::<Vec<_>>()[1]
        .trim()
        .split(" ")
        .collect();

    let range_seeds: Vec<i64> = aux.iter()
        .map(|x| x.parse::<i64>().unwrap())
        .collect();

    println!("range seeds: {:?}", range_seeds); 

    #[derive(Debug)]
    struct Transform {
        d_range_start: i64,
        s_range_start: i64,
        range_length: i64
    }

    let mut transforms: Vec<Vec<Transform>> = Vec::new();

    for i in 1..input_data.len() {
        let mut lines: Vec<&str> = input_data[i].trim().split("\n").collect();
        lines.remove(0); 
        let mut trs: Vec<Transform> = Vec::new();
        for line in lines {
            let vals: Vec<&str> = line.trim().split(" ").collect();
            println!("vals: {:?}", vals);
            let tr: Transform = Transform 
            {
                d_range_start: vals[0].parse::<i64>().unwrap(),
                s_range_start: vals[1].parse::<i64>().unwrap(), 
                range_length: vals[2].parse::<i64>().unwrap() 
            };
            trs.push(tr);
        }
        transforms.push(trs); 
    } 
    for trs in transforms.iter() {
        for tr in trs {
            println!("tr: {:?}", tr);
        }
        println!("next transform");
    }

    let mut min_loc: i64 = i64::MAX;
    let mut i: usize = 0;
    while i < range_seeds.len() - 1 {
        let start_seed: i64 = range_seeds[i];
        for j in start_seed..(start_seed + range_seeds[i + 1]) {
            let mut seed: i64 = j;
            for trs in transforms.iter() {
                for tr in trs {
                    if seed >= tr.s_range_start && seed <= (tr.s_range_start + tr.range_length) {
                        seed = tr.d_range_start + (seed - tr.s_range_start);
                        break;
                    }
                }
            }
            if j % 10000000 == 0 {
                println!("seed: {}, to finish: {}, j: {}", i, start_seed + range_seeds[i + 1] - j, j);
            }
            if seed < min_loc {
                println!("new min loc: {}, old min loc: {}", seed, min_loc);
                min_loc = seed;
            }
        }
        i+=2;
    }
    println!("min loc: {}", min_loc);
}
