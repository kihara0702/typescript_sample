//手続き型
// eslint-disable-next-line @typescript-eslint/no-var-requires
const readlineSync = require("readline-sync");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rxjs = require("rxjs");

const ans = Math.floor(Math.random() * 11);

const reader = function* () {
    while (true) {
        const input = readlineSync.prompt();
        yield input;
    }
};

const ins = rxjs.from(reader());

rxjs.lastValueFrom(
    ins.pipe(
        rxjs.tap((v) => {
            v !== ans.toString() && console.log("はずれ");
        }),
        rxjs.filter((v) => v === ans.toString()),
        rxjs.tap(() => console.log("正解")),
        rxjs.take(1)
    )
);
