export const a = 0;
{
    class Foo {
        private name: string;
        constructor(name: string) {
            this.name = name;
        }
    }
    //以下と同等
    class Boo {
        constructor(private name: string) {}
    }
    console.log(JSON.stringify(new Foo("john do")));
    console.log(JSON.stringify(new Boo("john do")));
}

{
    class Cls01 {
        //プライベートメンバ（js）
        #name1: string;

        //プライベートメンバ（ts）
        private name2: string;

        //コンストラクタ
        constructor(name1: string, name2: string) {
            this.#name1 = name1;
            this.name2 = name2;
        }

        //メソッド
        sayHello() {
            return `hello i am ${this.#name1}`;
        }

        sayGoodbay = () => {
            return `goodbay  i am ${this.name2}`;
        };
    }
    //エラーにならない（構造的部分型だから）
    const obj1 = new Cls01("aaa", "bbb");
    //tsでprivateにしているだけなので見ようと思えば見える
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tmp = obj1 as any;
    console.log(`private name2 = ${tmp.name2}`);
    console.log(obj1.sayHello());
    console.log(obj1.sayGoodbay());
}
{
    class Cls01 {
        sayHello(): string {
            return `hello`;
        }
    }
    class Cls02 {
        sayHello(): string {
            return `hello`;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class Cls03 {
        sayGoodbay(): string {
            return `goodbay`;
        }
    }
    const o1 = new Cls01();
    //エラーにならない（構造的部分型）
    const o2: Cls01 = new Cls02();
    // これはコンパイルエラー（構造が違うから）
    // const o3: Cls01 = new Cls03();
    console.log(`${o1} ${o2}`);
    // これはコンパイルエラー（構造が違うから）
    // const instance05: Cls03 = new Cls04();
}
