export const ts04 = "ts04"; //dummy
// リテラル型
type Johndo = "john do";
const foo: Johndo = "john do";

// john do以外は入らない コンパイルエラー
// foo = "alice";
console.log(1, foo);
