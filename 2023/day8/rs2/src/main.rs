use std::{env, fs::read_to_string};

#[derive(Debug)]
struct Node {
    name: String,
    left: String,
    right: String,
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let mut file_name: String = String::from("ex");
    if args.len() > 1 {
        println!("args: {:?}", args[1]);
        file_name = args[1].clone();
    }
    let input = read_to_string(file_name.to_string())
        .unwrap_or_else(|err| {
            println!("Error reading file: {}", err);
            panic!();
        });

    let input_lines: Vec<&str> = input
        .trim()
        .split("\n")
        .collect();

    let instr: Vec<char> = input_lines[0]
        .trim()
        .chars()
        .collect();

    let nodes: Vec<Node> = input_lines
        .iter()
        .skip(2)
        .map(|line| {
            let line_split: Vec<&str> = line
                .split(" ")
                .collect();
            Node {
                name: line_split[0].to_string(),
                left: line_split[2][1..][..3].to_string(),
                right: line_split[3][..3].to_string(),
            }
        })
        .collect();

        let start: Vec<&Node> = nodes.iter().filter(|x| &x.name[2..] == "A").collect();
        let mut currents: Vec<&Node> = start.clone(); 
        let mut steps: i64 = 0;
        'outer: loop {
            for step in instr.clone() {
                if step == 'L' {
                    for i in 0..currents.clone().len() {
                        currents[i] = nodes.iter().find(|x| x.name == currents[i].left).unwrap();
                    }
                }
                else {
                    for i in 0..currents.clone().len() {
                        currents[i] = nodes.iter().find(|x| x.name == currents[i].right).unwrap();
                    }
                }
                steps += 1;
                
                let eq_z = currents
                    .iter()
                    .filter(|x| &x.name[2..] == "Z")
                    .count();

                for i in 0..currents.clone().len() {
                    if &currents[i].name[2..] == "Z" {
                        println!("curr z {:?}", currents[i]);
                    }
                }
                // print len
                if eq_z > 0 {
                    println!("len: {:?}", eq_z);
                }
                if eq_z == currents.len() {
                    break 'outer;
                }
            }
        }
        println!("steps: {:?}", steps);
}

