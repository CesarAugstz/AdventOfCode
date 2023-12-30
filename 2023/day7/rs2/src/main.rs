#[derive(Debug)]
struct Repeat {
    c: char,
    count: i16,
}

#[derive(Debug)]
#[derive(Clone)]
struct Hand {
    id: i32, 
    cards: String,
    points: i32,
    bid: i64,
    jokers: i32,
    joker_used: bool,
}

fn main() {
    let input_data: Vec<&str> = include_str!("d7")
        .trim()
        .split("\n")
        .collect();


    let mut hands: Vec<Hand> = input_data
        .iter()
        .map(|x| Hand {
            cards: x.split(" ").take(1).collect(), 
            points: 0,
            bid: x.split(" ").skip(1).take(1).collect::<String>().parse::<i64>().unwrap(),
            jokers: 0,
            joker_used: false,
            id: 0,
        })
        .collect();


    hands.iter_mut()
        .for_each(|hand| {
            hand.jokers = hand.cards.chars()
                .filter(|x| *x == 'J')
                .count() as i32;
        });

    println!("{:?}", hands);

    hands.iter_mut()
        .for_each(|hand| {
            let repeats = repeate(&hand.cards);
            let mut arr_rpt: Vec<i16> = Vec::new();
            repeats.iter()
                .for_each(|x| arr_rpt.push(x.count));

            arr_rpt.sort_by(|a, b| b.cmp(a));
            


            if arr_rpt.len() > 0 {
                if hand.jokers > 0 {
                    match arr_rpt[0] {
                        4 => arr_rpt[0] = 5,
                        3 => {
                            if hand.jokers == 2 { arr_rpt[0] = 5; }
                            else if hand.jokers == 1 { arr_rpt[0] = 4; }
                            else if arr_rpt.len() > 1 { 
                                arr_rpt.pop();
                                arr_rpt[0] = 5;
                            }
                        },
                        2 => {
                            if arr_rpt.len() == 1 {


                            else { arr_rpt[0] = 3; }
                        },
                        _ => (),
                    }
                }
                match arr_rpt[0] {
                    5 => hand.points = 50,
                    4 => hand.points = 40,
                    3 => {
                        if arr_rpt.len() > 1 && arr_rpt[1] == 2 { hand.points = 35; }
                        else { hand.points = 30; }
                    }
                    2 => {
                        if arr_rpt.len() > 1 && arr_rpt[1] == 2 { hand.points = 20; }
                        else { hand.points = 15; }
                    }
                    _ => hand.points = 0,  
                }
            }
        });
    let mut times = 10;

    hands.sort_by(|a, b| a.points.cmp(&b.points));

    hands.iter_mut()
        .enumerate()
        .for_each(|(i, x)| x.id = i as i32);

    while times > 0 { 
        let mut changes: i32 = 0;
        for i in 1..hands.len() {
            let value: [char; 13] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
            for j in 0..hands.len() {
                let mut l = 0;
                if hands[j].points == hands[i].points && hands[j].id != hands[i].id {
                    let mut br = true;
                    while br {
                        let h1_char = hands[j].cards.chars().nth(l).unwrap(); 
                        let h2_char = hands[i].cards.chars().nth(l).unwrap();
                        for value in value.iter() {
                            if h1_char == h2_char {
                                break;
                            }
                            if h1_char == *value {
                                if hands[j].id < hands[i].id {
                                    let aux = hands[j].id;
                                    hands[j].id = hands[i].id;
                                    hands[i].id = aux;
                                    changes += 1;
                                }
                                br = false;
                                break;
                            }
                            else if h2_char == *value {
                                if hands[j].id > hands[i].id {
                                    let aux = hands[j].id;
                                    hands[j].id = hands[i].id;
                                    hands[i].id = aux;
                                    changes += 1;
                                }
                                br = false;
                                break;
                            }
                        }
                        l += 1;
                    }
                } 
            }
        }
        hands.sort_by(|a, b| a.points.cmp(&b.points));
        times -= 1;
        println!("times: {:?}", times);
        println!("changes: {:?}", changes);
    }
    println!("hands ordered by points");
    hands.iter()
        .for_each(|x| println!("{:?}", x));

    hands.sort_by(|a, b| a.id.cmp(&b.id));
    let result: i64 = hands.iter()
        .enumerate()
        .fold(0, |acc, (i, x)| {
            acc + x.bid * (i as i64 + 1)
        });
    println!("hands ordered by id");
    hands.iter()
        .for_each(|x| println!("{:?}", x));
    println!("result: {:?}", result);
}

fn repeate(arr: &str) -> Vec<Repeat> {
    let mut result: Vec<Repeat> = Vec::new();
    for c in arr.chars() {
        let mut count = 0;
        arr.chars()
            .for_each(|x| if x == c { count += 1; });
        if count > 1 && !result.iter().any(|x| x.c == c) {
            println!("c: {:?}, count: {:?}", c, count);
            result.push(Repeat { c, count: count as i16 });
        }
    }
    result
}

