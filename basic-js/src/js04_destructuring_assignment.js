//分割代入
{
    const [first, second] = [1, 2];
    console.log(`${first} / ${second}`);
    // 1/2
}
{
    const [first, second, ...rest] = [1, 2, 3, 4, 5];
    console.log(`${first} / ${second} / rest...${rest}`);
    // 1/2/rest...3,4,5
}
{
    const [first, , third, ...rest] = [1, 2, 3, 4, 5];
    console.log(`${first} / ${third} / rest...${rest}`);
    // 1/3/rest...4,5
}

{
    const obj = {
        name: "john do",
        age: 20,
    };

    const { name, age } = obj;
    console.log(`${name} / ${age}`);
    // john do/20
}

{
    const obj = {
        name: "john do",
        age: 20,
    };

    const { name: newName, age } = obj;
    console.log(`${newName} / ${age}`);
    // john do/20
}

{
    const obj = {
        name: "john do",
        age: 20,
        job: "pg",
        address: "埼玉",
    };

    const { name, age, ...reset } = obj;
    console.log(`${name} / ${age} / rest=${JSON.stringify(reset)}`);
    // john do/20/rest={"job":"pg","address":"埼玉"}
}
