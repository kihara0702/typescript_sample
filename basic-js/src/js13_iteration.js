//普通のArray
const builtInArr = [1, 2, 3];
//各要素に1を足す＞最初の要素だけ取る
//あまりよくない
const rtn01 = builtInArr.map((v) => v + 1).slice(0, 1);
console.log(rtn01);
// [ 2 ]
//ログにはいてみる
//イテレートするたびに全件回す
const rtn02 = builtInArr
    .map((v) => {
        console.log(`map + 1:${v}`);
        return v + 1;
    })
    .slice(0, 1);
console.log("builtInArr");
console.log(rtn02);
// map + 1:1
// map + 1:2
// map + 1:3
// builtInArr
// [ 2 ]

//fp-ts 遅延評価しない
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FPA = require("fp-ts/lib/Array");
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/order
const FPF = require("fp-ts/lib/function");

const fpTsArr = FPF.pipe(
    builtInArr,
    FPA.map((v) => {
        console.log(`map + 1:${v}`);
        return v + 1;
    }),
    FPA.takeLeft(1)
);
console.log("fp-ts");
console.log(fpTsArr);
// map + 1:1
// map + 1:2
// map + 1:3
// fp-ts
// [ 2 ]

// //fp-ts-contrib takeがうまくいかない
// // eslint-disable-next-line @typescript-eslint/no-var-requires, import/order
// const FPCL = require("fp-ts-contrib/lib/List");
// // eslint-disable-next-line @typescript-eslint/no-var-requires, import/order
// const FPCF = require("fp-ts-contrib/lib/filterA");

// console.log("fp-ts-contrib-start");
// const fpTscArr = FPF.pipe(
//     FPCL.fromArray(builtInArr),
//     FPCL.map((v) => {
//         console.log(`map + 1:${v}`);
//         return v + 1;
//     }),
//     FPCL.take(1)
// );
// console.log("fp-ts-contrib");
// console.log(fpTscArr);
// // map + 1:1
// // map + 1:2
// // map + 1:3
// // fp-ts
// // [ 2 ]

//ramba 遅延評価しない
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/order
const R = require("ramda");
// 1から10までの配列を生成
const range = R.range(1, 4);

const process = R.pipe(
    R.map((v) => {
        console.log(`map + 1:${v}`);
        return v + 1;
    }),
    R.take(1)
);
const result = process(range);
console.log("ramda");
console.log(result);
// map + 1:1
// map + 1:2
// map + 1:3
// ramda
// [ 2 ]

// eslint-disable-next-line @typescript-eslint/no-var-requires
const RXJS = require("rxjs");

(async () => {
    const ob01 = RXJS.from(builtInArr).pipe(
        RXJS.map((v) => {
            console.log(`map + 1:${v}`);
            return v + 1;
        }),
        RXJS.take(1),
        RXJS.toArray()
    );
    const filteredArr = await RXJS.lastValueFrom(ob01);
    console.log("rxjs");
    console.log(filteredArr);
    // map + 1:1
    // rxjs
    // [ 2 ]
    // 不要なイテレートはしない
})();
