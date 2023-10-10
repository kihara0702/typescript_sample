{
    //1)newしたとき＝新規作成されたオブジェクト
    // eslint-disable-next-line no-inner-declarations
    function f1(foo) {
        console.log("f1 called");
        this === undefined || (this.foo = foo);
        console.log(JSON.stringify(this));
    }

    const v1 = new f1("aaa");
    // f1 called
    // {"f1":"aaa"}
    const v2 = new f1("bbb");
    // f1 called
    // {"f1":"bbb"}
    console.log(JSON.stringify(v1));
    // {"foo":"aaa"}
    console.log(JSON.stringify(v2));
    // {"foo":"bbb"}

    //newしていないときはundefined
    f1("ccc");
    // f1 called
    // undefined
}
{
    //2)メソッドとして呼ばれたとき xxx.yyy のxxx
    const foo = {
        woo: "boo",
        bar() {
            console.log(this);
        },
    };

    foo.bar();
    // { woo: 'boo', bar: [Function: bar] }
}
{
    //3)それ以外（strictモード） undefined thisはundefinedだけどglobalThisで見える
    // eslint-disable-next-line no-inner-declarations
    function f1(foo) {
        console.log("f1 called");
        this === undefined || (this.foo = foo);
        console.log(JSON.stringify(this));
    }

    const v1 = new f1("aaa");
    // f1 called
    // {"f1":"aaa"}
    console.log(JSON.stringify(v1));
    // {"foo":"aaa"}
    //newしていないときはundefined
    f1("ccc");
    // f1 called
    // undefined
}
{
    class Foo {
        #name;
        constructor(name) {
            this.#name = name;
        }
        Woo = () => {
            console.log(this.name);
            function woo_1() {
                console.log(this?.name ?? "nameがない");
            }
            woo_1();
        };
        boo() {
            console.log(this.name);
        }
    }

    const foo = new Foo("boo");
    console.log(foo.Woo());
    console.log(foo.boo());
}
{
    const foo = {
        name: "aaa",
        boo() {
            return this.name;
        },
        woo: () => {
            return this.name;
        },
    };

    console.log(foo.woo());
    console.log(foo.boo());
}
