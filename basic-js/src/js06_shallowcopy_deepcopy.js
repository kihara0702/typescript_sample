//shallowcopy deepcopy
{
    // shallowcopy
    const org = {
        aaa: 0,
        bbb: {
            ccc: 1,
        },
    };

    const shallowcopy = { ...org };
    console.log(`org = ${JSON.stringify(org)}`);
    // org = {"aaa":0,"bbb":{"ccc":1}}
    shallowcopy.bbb.ccc = 999;
    console.log(`org = ${JSON.stringify(org)}`);
    // org = {"aaa":0,"bbb":{"ccc":999}}
    console.log(`shallowcopy = ${JSON.stringify(shallowcopy)}`);
    // shallowcopy = {"aaa":0,"bbb":{"ccc":999}}
}

{
    // deepcopy
    const org = {
        aaa: 0,
        bbb: {
            ccc: 1,
        },
    };

    const deepcopy = JSON.parse(JSON.stringify(org));
    console.log(`org = ${JSON.stringify(org)}`);
    // org = {"aaa":0,"bbb":{"ccc":1}}

    deepcopy.bbb.ccc = 999;
    console.log(`org = ${JSON.stringify(org)}`);
    // org = {"aaa":0,"bbb":{"ccc":1}}
    console.log(`deepcopy = ${JSON.stringify(deepcopy)}`);
    // deepcopy = {"aaa":0,"bbb":{"ccc":999}}
}
