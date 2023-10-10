//オブジェクトのキー
const foo = "aaa";
const boo = "bbb";
const woo = 124;

const obj02 = {
    foo: 1,
    "<foo>": 3,
    [boo]: 4,
    [`xx_${boo}`]: 5,
    woo: woo / 2,
};
console.log(obj02);
// { foo: 1, '<foo>': 3, bbb: 4, xx_bbb: 5, woo: 62 }

//ショートハンド
const obj03 = {
    foo,
};
console.log(obj03);
// { foo: 'aaa' }
