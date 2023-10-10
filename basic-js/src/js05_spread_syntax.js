//スプレッド構文

const arr = [1, 2, 3];
const arrShallowCopy = [...arr];

console.log(arrShallowCopy);
// [ 1, 2, 3 ]

const arrCp01 = [-1, 0, ...arr, 4, 5];
console.log(arrCp01);
// [
//   -1, 0, 1, 2,
//    3, 4, 5
// ]

const obj = {
    name: "john do",
    age: 20,
    job: "pg",
    address: "埼玉",
};
const objShallowCopy = { ...obj };
console.log(`${JSON.stringify(obj)}`);
// {"name":"john do","age":20,"job":"pg","address":"埼玉"}
console.log(`${JSON.stringify(objShallowCopy)}`);
// {"name":"john do","age":20,"job":"pg","address":"埼玉"}

const cp01 = { ...obj, address: "東京" };
console.log(`${JSON.stringify(cp01)}`);
// {"name":"john do","age":20,"job":"pg","address":"東京"}
