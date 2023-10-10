//  ショートサーキット/短絡評価
{
    const foo = undefined || null || 0 || NaN || "" || "foo";
    true && console.log("1", foo);
    // 1 foo
    false && console.log("2", foo);
    //表示されない
    const boo = " " && 100 && [] && {} && "boo";
    true || console.log("3", boo);
    //表示されない
    false || console.log("4", boo);
    // 4 boo
}
//nulllish coalescing
{
    // const foo = undefined || null || 0 || NaN || "" || "foo";
    // ↑だと0,Nan,""もfalseと判定
    // ??(nulllish coalescing)だとundefined,nullだけ判定
    const foo = undefined ?? null ?? 0 ?? NaN ?? "" ?? "foo";
    console.log("5", foo);
    // 5 0
    const boo = undefined ?? null ?? NaN ?? "" ?? "foo";
    console.log("6", boo);
    // 6 NaN
    const woo = undefined ?? null ?? "" ?? "foo";
    console.log("7", woo);
    // 7
    const bar = undefined ?? null ?? "foo";
    console.log("8", bar);
    // 8 foo
}

// optional chaining
{
    const foo = {
        boo: "boo",
        woo: {
            bar: "bar",
        },
    };

    const bar = (foo && foo.woo && foo.woo.bar) ?? "default bar";
    console.log(bar);
    // bar
    const baz = (foo && foo.woo && foo.woo.baz) ?? "default baz";
    console.log(baz);
    // default baz
    const woz = (foo && foo.woz && foo.woz.baz) ?? "default woz.baz";
    console.log(woz);
    // default woz.baz

    const bar2 = foo?.woo?.bar ?? "default bar";
    console.log(bar2);
    // bar

    const baz2 = foo?.woo?.baz ?? "default baz";
    console.log(baz2);
    // default baz

    const woz2 = foo?.woz?.baz ?? "default woz.baz";
    console.log(woz2);
    // default woz.baz

    const woo = {
        fun1() {
            console.log("fun1 called");
            return this;
        },
        fun2() {
            console.log("fun2 called");
            return undefined;
        },
        fun3() {
            console.log("fun3 called");
            return this;
        },
    };

    const rtn = woo.fun1()?.fun2()?.fun3();
    // fun1 called
    // fun2 called
    console.log("rtn=", rtn);
    // rtn= undefined
}
