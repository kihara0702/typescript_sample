// javascriptのthis
export const a01 = () => {
    {
        //newしたとき＝新規作成されたオブジェクト
        // eslint-disable-next-line no-inner-declarations
        function f1(foo) {
            console.log(this);
            this.foo = foo;
        }
        const v1 = new f1("aaa");
        const v2 = new f1("bbb");
        console.log(JSON.stringify(v1));
        console.log(JSON.stringify(v2));
    }
    {
        //メソッドとして呼ばれたとき xxx.yyy のxxx
        const foo = {
            woo: "boo",
            bar() {
                console.log(this.woo);
            },
        };

        foo.bar();

        // eslint-disable-next-line no-inner-declarations
        function f1() {
            console.log(this);
            // console.log(globalThis);
        }

        //それ以外（strictモード） undefined thisはundefinedだけどglobalThisで見える
        f1();
        new f1();
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
            woo: () => {
                return this.name;
            },
            boo() {
                this.name;
            },
        };

        foo.woo();
    }
};
