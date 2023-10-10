//オブジェクトのマージ
{
    const obj1 = {
        aaa: "val1",
        bbb: "val2",
        ccc: {
            ddd: "val3",
            eee: "val4",
        },
    };
    const mo1 = {
        bbb: "marge val2",
        ccc: {
            ddd: "marge val3",
        },
    };
    const am1 = {
        ...obj1,
        ...mo1,
    };
    const am2 = {
        ...obj1,
        ccc: {
            ddd: "marge val4",
        },
    };

    console.log(JSON.stringify(obj1));
    // {"aaa":"val1","bbb":"val2","ccc":{"ddd":"val3","eee":"val4"}}
    console.log(JSON.stringify(am1));
    // {"aaa":"val1","bbb":"marge val2","ccc":{"ddd":"marge val3"}}
    console.log(JSON.stringify(am2));
    // {"aaa":"val1","bbb":"val2","ccc":{"ddd":"marge val4"}}
}
