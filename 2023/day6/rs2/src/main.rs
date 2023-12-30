fn main() {
    let input_data: Vec<&str> = include_str!("../d6")
        .split("\n")
        .collect();

    let time: i64 = input_data[0]
        .split(":")
        .collect::<Vec<_>>()[1]
        .chars()
        .filter(|x| x != &' ')
        .collect::<String>()
        .parse::<i64>()
        .unwrap();

    let distance: i64 = input_data[1]
        .split(":")
        .collect::<Vec<_>>()[1]
        .chars()
        .filter(|x| x != &' ')
        .collect::<String>()
        .parse::<i64>()
        .unwrap();
        

    println!("{:?}", beats_record(time as i64, distance as i64, 1));
}

fn beats_record(time: i64, distance: i64, i: i64) -> i64 {
    if i == time {
        return 0;
    }
    if i * (time - i) <= distance {
        return 0 + beats_record(time, distance, i + 1);
    }
    return 1 + beats_record(time, distance, i + 1); 
}
