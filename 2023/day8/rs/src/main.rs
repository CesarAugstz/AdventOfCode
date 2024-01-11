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

        let start: &Node = nodes.iter().find(|x| x.name == "AAA").unwrap();
        let mut current: &Node = start.clone(); 
        let mut steps: i64 = 0;
        'outer: loop {
            for step in instr.clone() {
                if step == 'L' {
                   current = nodes.iter().find(|x| x.name == current.left).unwrap();
                }
                else {
                   current = nodes.iter().find(|x| x.name == current.right).unwrap();
                }
                steps += 1;
                if current.name == "ZZZ" {
                    break 'outer;
                }
            }
        }
        println!("steps: {:?}", steps);
}

