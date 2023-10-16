const f = () => {
    let i = 1;
    return () => i++;
};

const c = f();
console.log(c());
// 1
console.log(c());
// 2
console.log(c());
// 3
