// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("node:fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fsp = require("node:fs/promises");

//callback
fs.readFile("./data/01.txt", { encoding: "utf-8" }, (_err, data) => {
    console.log(`callback ${data}`);
    fs.readFile("./data/02.txt", { encoding: "utf-8" }, (_err, data) => {
        console.log(`callback ${data}`);
        fs.readFile("./data/03.txt", { encoding: "utf-8" }, (_err, data) => {
            console.log(`callback ${data}`);
        });
    });
});

//promise
fsp.readFile("./data/01.txt", { encoding: "utf-8" })
    .then((data) => {
        console.log(`promise ${data}`);
        return fsp.readFile("./data/02.txt", { encoding: "utf-8" });
    })
    .then((data) => {
        console.log(`promise ${data}`);
        return fsp.readFile("./data/03.txt", { encoding: "utf-8" });
    })
    .then((data) => {
        console.log(`promise ${data}`);
    });

// async/await
(async () => {
    const data1 = await fsp.readFile("./data/01.txt", { encoding: "utf-8" });
    console.log(`async/await ${data1}`);
    const data2 = await fsp.readFile("./data/02.txt", { encoding: "utf-8" });
    console.log(`async/await ${data2}`);
    const data3 = await fsp.readFile("./data/03.txt", { encoding: "utf-8" });
    console.log(`async/await ${data3}`);
})();
