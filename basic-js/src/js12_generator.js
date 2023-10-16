// eslint-disable-next-line @typescript-eslint/no-var-requires
const rxjs = require("rxjs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const operators = require("rxjs/operators");

const g1 = function* () {
    console.log("start");
    const r1 = yield 1;
    console.log(r1);
    const r2 = yield 2;
    console.log(r2);
    const r3 = yield 3;
    console.log(r3);
};

const gi1 = g1();
console.log("first next call");
console.log(gi1.next("r1")); //最初のnext呼び出しの引数は無視されるので注意
console.log(gi1.next("r2"));
console.log(gi1.next("r3"));
console.log(gi1.next("r4"));
// irst next call
// start
// { value: 1, done: false }
// r2
// { value: 2, done: false }
// r3
// { value: 3, done: false }
// r4
// { value: undefined, done: true }

(async () => {
    //無限リスト
    const g2 = function* () {
        let i = 1;
        while (true) {
            yield i++;
        }
    };

    const stm = rxjs.from(g2()).pipe(
        operators.filter((v) => v % 2 == 0),
        operators.take(3),
        operators.toArray()
    );
    console.log(await rxjs.lastValueFrom(stm));
    // [ 2, 4, 6 ]
})();
