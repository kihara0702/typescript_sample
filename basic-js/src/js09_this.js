{
    //1)newしたとき＝新規作成されたオブジェクト
    // eslint-disable-next-line no-inner-declarations
    function f1(foo) {
        console.log(1, "f1 called");
        this === undefined || (this.foo = foo);
        console.log(2, JSON.stringify(this));
    }

    const v1 = new f1("aaa");
    // 1 f1 called
    // 2 {"foo":"aaa"}
    const v2 = new f1("bbb");
    // 1 f1 called
    // 2 {"foo":"bbb"}
    console.log(3, JSON.stringify(v1));
    // 3 {"foo":"aaa"}
    console.log(4, JSON.stringify(v2));
    // 4 {"foo":"bbb"}

    //newしていないときはundefined
    f1("ccc");
    // 1 f1 called
    // 2 undefined
}
{
    //2)メソッドとして呼ばれたとき xxx.yyy のxxx
    const foo = {
        woo: "boo",
        bar() {
            console.log(5, this);
        },
    };

    foo.bar();
    // 5 { woo: 'boo', bar: [Function: bar] }
}
{
    //3)それ以外（strictモード） undefined thisはundefinedだけどglobalThisで見える
    // eslint-disable-next-line no-inner-declarations
    function f1(foo) {
        console.log(6, "f1 called");
        this === undefined || (this.foo = foo);
        console.log(7, JSON.stringify(this));
    }

    const v1 = new f1("aaa");
    // f1 called
    // 7 {"foo":"aaa"}
    console.log(8, JSON.stringify(v1));
    // 8 {"foo":"aaa"}
    //newしていないときはundefined
    f1("ccc");
    // 6 f1 called
    // 7 undefined
}
//こういう時にヘン
{
    class Foo {
        name = "myname";
        boo() {
            //ここではthisが見える
            console.log(9, `boo ${JSON.stringify(this)}`);
            function woo() {
                //ここではthisが見えない
                console.log(10, `woo ${JSON.stringify(this)}`);
            }
            woo();
            const baz = () => {
                //ここではthisが見える
                console.log(11, `baz ${JSON.stringify(this)}`);
            };
            baz();

            //thisが見えるようにする
            const wooWithThis = woo.bind(this);
            wooWithThis();
            // 10 woo {"name":"myname"}
            woo.call(this);
            // 10 woo {"name":"myname"}
        }
        bar = () => {
            //ここではthisが見える
            console.log(12, `bar ${JSON.stringify(this)}`);
            function woo() {
                //ここではthisが見えない
                console.log(13, `woo ${JSON.stringify(this)}`);
            }
            woo();
            const baz = () => {
                //ここではthisが見える
                console.log(14, `baz ${JSON.stringify(this)}`);
            };
            baz();

            //thisが見えるようにする
            const wooWithThis = woo.bind(this);
            wooWithThis();
            // 13 woo {"name":"myname"}
            woo.call(this);
            // 13 woo {"name":"myname"}
        };
    }

    const foo = new Foo();
    foo.boo();
    // 9 boo {"name":"myname"}
    // 10 woo undefined
    // 11 baz {"name":"myname"}
    foo.bar();
    // 12 bar {"name":"myname"}
    // 13 woo undefined
    // 14 baz {"name":"myname"}
}

{
    const obj = {
        name: "myname",
        boo() {
            //ここではthisが見える
            console.log(15, `boo ${JSON.stringify(this)}`);
            function woo() {
                //ここではthisが見えない
                console.log(16, `woo ${JSON.stringify(this)}`);
            }
            woo();
            const baz = () => {
                //ここではthisが見える
                console.log(17, `baz ${JSON.stringify(this)}`);
            };
            baz();

            //thisが見えるようにする
            const wooWithThis = woo.bind(this);
            wooWithThis();
            // 16 woo {"name":"myname"}
            woo.call(this);
            // 16 woo {"name":"myname"}
        },
        bar: () => {
            //ここではthisが見えない
            // 定義されたスコープのthisをキャプチャする
            // ここではトップレベルのスコープ（モジュールのスコープ）の this は、global オブジェクトにならない
            // Node.js の各ファイルは独自のモジュールとして扱われ、その中でのトップレベルの this はそのモジュールのエクスポート（exports オブジェクト）を指す。
            console.log(18, `bar ${JSON.stringify(this)}`);
            console.log(19, `bar gloval ${this === global}`);
            console.log(20, `bar exports ${this === exports}`);
            function woo() {
                //ここではthisが見えない
                console.log(21, `woo ${JSON.stringify(this)}`);
                console.log(22, `woo gloval ${this === global}`);
                console.log(23, `woo exports ${this === exports}`);
            }
            woo();
            const baz = () => {
                //ここではthisが見えない
                console.log(24, `baz ${JSON.stringify(this)}`);
                console.log(25, `baz gloval ${this === global}`);
                console.log(26, `baz exports ${this === exports}`);
            };
            baz();
        },
    };

    obj.boo();
    // 15 boo {"name":"myname"}
    // 16 woo undefined
    // 17 baz {"name":"myname"}
    obj.bar();
    // 18 bar {}
    // 19 bar gloval false
    // 20 bar exports true
    // 21 woo undefined
    // 22 woo gloval false
    // 23 woo exports false
    // 24 baz {}
    // 25 baz gloval false
    // 26 baz exports true
}
