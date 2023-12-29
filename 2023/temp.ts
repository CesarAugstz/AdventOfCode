const arr1 = [1, 2, 3];

const arr2 = [ 2, 3];

let eq = arr1.reduce((total, num) => arr2.includes(num) ? total+1 : total, 0);

console.log(eq);
