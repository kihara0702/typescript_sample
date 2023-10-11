//手続き型
// eslint-disable-next-line @typescript-eslint/no-var-requires
const readlineSync = require("readline-sync");

const ans = Math.floor(Math.random() * 11);

// eslint-disable-next-line no-constant-condition
while (true) {
    const input = readlineSync.prompt();
    if (input === ans.toString()) {
        console.log("正解");
        break;
    }
    console.log("はずれ");
}
