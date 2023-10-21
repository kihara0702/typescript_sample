// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fsp = require("fs/promises");

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

//promise（自作）
const getOdd = () => {
    return new Promise((resolve, reject) => {
        const n = Math.floor(Math.random() * 3);
        if (n % 2 === 0) {
            resolve(n);
        } else {
            reject(-1);
        }
    });
};
(async () => {
    const data1 = await getOdd().catch((_res) => console.log("error 1"));
    console.log(`mypromise ${data1}`);
    const data2 = await getOdd().catch((_res) => console.log("error 2"));
    console.log(`mypromise ${data2}`);
    const data3 = await getOdd().catch((_res) => console.log("error 3"));
    console.log(`mypromise ${data3}`);
})();
