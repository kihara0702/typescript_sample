export const ts02 = "ts02"; //dummy

// キー/プロパティ名がstring,valueがstringならOK
interface if01 {
    [key: string]: string;
}

const v01: if01 = {
    aaa: "val1",
    bbb: "val2",
};

console.log(1, v01);
// { aaa: 'val1', bbb: 'val2' }

// 型エイリアスでもいける
type t02 = {
    [key: string]: string;
};

const v02: t02 = {
    aaa: "val1",
    bbb: "val2",
};
console.log(2, v02);
// { aaa: 'val1', bbb: 'val2' }

// // もう少しありえるサンプル なぜかコンパイルエラー
// interface if03 {
//     [key in ("key1" | "key2" | "key3")]: string;
// }

// 型エイリアスならいける
type t04 = {
    [key in "key1" | "key2" | "key3"]: string;
};

const v04: t04 = {
    key1: "val1",
    key2: "val2",
    key3: "val3",
};
console.log(4, v04);
// 4 { key1: 'val1', key2: 'val2', key3: 'val3' }

// Record型でもいける
const r05: Record<string, string> = {
    aaa: "val1",
    bbb: "val2",
};
console.log(5, r05);
// 5 { aaa: 'val1', bbb: 'val2' }

const r06: Record<"key1" | "key2" | "key3", string> = { key1: "val1", key2: "val2", key3: "val3" };
console.log(6, r06);
// 6 { key1: 'val1', key2: 'val2', key3: 'val3' }
