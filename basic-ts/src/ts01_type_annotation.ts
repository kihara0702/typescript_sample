export const ts01 = "ts01"; //dummy
let v01: string = "foo";
v01 = "boo";
console.log(1, v01);
// 1 boo

// コンパイルエラー
// v01 = 1:

// 省略しても型推論してくれる
const v02 = "xxx";
console.log(2, v02);
// 2 xxx

// 配列の型付け
const v03: number[] = [1, 2, 3, 4];
console.log(3, v03);
// 3 [ 1, 2, 3, 4 ]

// こちらでも同等だがあまり使わない
const v04: Array<number> = [1, 2, 3, 4];
console.log(4, v04);
// 4 [ 1, 2, 3, 4 ]

// オブジェクトの型付け
// インラインで書く
const v05_1: { name: string; age: number } = { name: "john do", age: 20 };
console.log(5, v05_1);
// 5 { name: 'john do', age: 20 }

// インターフェースで書く
interface if05_2 {
    name: string;
    age: number;
}

const v05_2: if05_2 = {
    name: "john do",
    age: 20,
};
console.log(5, v05_2);
// 5 { name: 'john do', age: 20 }

interface if05_3 {
    readonly name: string; //書き換え不可になる
    age?: number; //あってもなくてもいい
}

const v05_3: if05_3 = {
    name: "john do",
    // age: 20, なくてもコンパイルエラー
};

// 読み取り専用プロパティであるため、'name' に代入することはできません。ts(2540)
// v05_3.name = "update!";

// ageは省略可能だから後から入れてもいい
v05_3.age = 0;
v05_3.age = undefined;
delete v05_3.age; //消してもいい
// delete v05_2.age; //これはコンパイルエラー

console.log(5, v05_3);
// 5 { name: 'john do' }

// 型エイリアスで書く
type tp06 = {
    readonly name: string; //書き換え不可になる
    age?: number; //あってもなくてもいい
};

const v06_2: tp06 = {
    name: "john do",
    // age: 20, なくてもコンパイルエラー
};

// 読み取り専用プロパティであるため、'name' に代入することはできません。ts(2540)
// v05_3.name = "update!";

// ageは省略可能だから後から入れてもいい
v06_2.age = 0;
v06_2.age = undefined;
delete v06_2.age; //消してもいい

console.log(6, v06_2);
// 6 { name: 'john do' }

//関数の型定義
// コールシグネチャ
// 省略番
type callSig1 = (name: string, age: number) => { name: string; age: number };
const fn07: callSig1 = (name, age) => {
    return {
        name,
        age,
    };
};
console.log(7, fn07("john do", 20));
// 7 { name: 'john do', age: 20 }

// 完全版
type callSig2 = { (name: string, age: number): { name: string; age: number } };
const fn08: callSig2 = (name, age) => {
    return {
        name,
        age,
    };
};
console.log(8, fn08("john do", 20));
// 8 { name: 'john do', age: 20 }
