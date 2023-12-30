fn main() {
    let input_data: Vec<&str> = include_str!("../d6")
        .split("\n")
        .collect();

    let times: Vec<i16> = input_data[0]
        .split_whitespace()
        .collect::<Vec<_>>()[1..]
        .iter()
        .map(|x| x.parse::<i16>().unwrap())
        .collect();

    let distances: Vec<i16> = input_data[1]
        .split_whitespace()
        .collect::<Vec<_>>()[1..]
        .iter()
        .map(|x| x.parse::<i16>().unwrap())
        .collect();

    let diff_wins: Vec<i16> = times
        .iter()
        .zip(distances.iter())
        .map(|(x, y)| beats_record(*x, *y, 1))
        .collect();
    let result: i32 = diff_wins
        .iter()
        .map(|x| *x as i32)
        .reduce(|x, y| x * y)
        .unwrap();
        
    println!("{:?}", result);
}

fn beats_record(time: i16, distance: i16, i: i16) -> i16 {
    if i == time {
        return 0;
    }
    if i * (time - i) <= distance {
        return 0 + beats_record(time, distance, i + 1);
    }
    return 1 + beats_record(time, distance, i + 1); 
}
