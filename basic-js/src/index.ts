//js基礎
//関数

function fun01() {
    console.log("fun01 called");
}

const fun02 = function () {
    console.log("fun02 called");
};

const fun03 = () => {
    console.log("fun03 called");
};

const obj01 = {
    xxx: "value",
    fun04() {
        console.log("fun04 called");
    },
};

fun01();
fun02();
fun03();
obj01.fun04();

console.log(fun01.name);
console.log(fun02.name);
console.log(fun03.name);
console.log(obj01.fun04.name);

//デフォルト引数
const fun05 = (a: number, b: number = 2) => a + b;
console.log(fun05(1));

//レストパラメータ（残余引数）
const fun06 = (a: number, ...rest: number[]) => {
    console.log(`${a} rest=${rest}`);
};

fun06(1, 2, 3, 4, 5);

//クラス
class Cls01 {
    //プライベートメンバ
    #name: string;

    //コンストラクタ
    constructor(name: string) {
        this.#name = name;
    }

    //メソッド
    sayHello(): string {
        return `hello i am ${this.#name}`;
    }

    sayGoodbay = () => {
        return `goodbay  i am ${this.#name}`;
    };
}

class Cls02 extends Cls01 {
    constructor(name: string) {
        super(name);
    }
    sayHello(): string {
        // #nameはprivateだからみえない
        // return `hello i am ${this.#name}`;
        return `hello i am ??? cls02`;
    }

    sayGoodbay = () => {
        return `goodbay i am ??? cls02`;
    };
}

const instance01 = new Cls01("aaa");
console.log(instance01.sayHello());
console.log(instance01.sayGoodbay());

const instance02 = new Cls02("bbb");
console.log(instance02.sayHello());
console.log(instance02.sayGoodbay());

const instance03: Cls01 = new Cls02("ccc");
console.log(instance03.sayHello());
console.log(instance03.sayGoodbay());

//エラーにならない（構造的部分型だから）
const instance04: Cls02 = new Cls01("ddd");
console.log(instance04.sayHello());
console.log(instance04.sayGoodbay());

class Cls03 {
    sayHello(): string {
        return `hello`;
    }
}
class Cls04 {
    sayGoodbay(): string {
        return `goodbay`;
    }
}
console.log(`${new Cls03()} / ${new Cls04()}`);
// これはコンパイルエラー（構造が違うから）
// const instance05: Cls03 = new Cls04();

//オブジェクトのキー
const foo = "aaa";
const boo = "bbb";
const woo = 124;

const obj02 = {
    foo: 1,
    "<foo>": 3,
    [boo]: 4,
    [`xx_${boo}`]: 5,
    woo: woo / 2,
};
// { foo: 1, '<foo>': 3, bbb: 4, xx_bbb: 5, woo: 62 }
console.log(obj02);

//ショートハンド
const obj03 = {
    foo,
};
// { foo: 'aaa' }
console.log(obj03);

//分割代入
{
    const [first, second] = [1, 2];
    // 1/2
    console.log(`${first} / ${second}`);
}
{
    const [first, second, ...rest] = [1, 2, 3, 4, 5];
    // 1/2/rest...3,4,5
    console.log(`${first} / ${second} / rest...${rest}`);
}
{
    const [first, , third, ...rest] = [1, 2, 3, 4, 5];
    // 1/3/rest...4,5
    console.log(`${first} / ${third} / rest...${rest}`);
}

{
    const obj = {
        name: "john do",
        age: 20,
    };

    const { name, age } = obj;
    // john do/20
    console.log(`${name} / ${age}`);
}

{
    const obj = {
        name: "john do",
        age: 20,
    };

    const { name: newName, age } = obj;
    // john do/20
    console.log(`${newName} / ${age}`);
}

{
    const obj = {
        name: "john do",
        age: 20,
        job: "pg",
        address: "埼玉",
    };

    const { name, age, ...reset } = obj;
    // john do/20/rest={"job":"pg","address":"埼玉"}
    console.log(`${name} / ${age} / rest=${JSON.stringify(reset)}`);
}

//スプレッド構文
{
    const arr = [1, 2, 3];
    const arrShallowCopy = [...arr];
    // [ 1, 2, 3 ]
    console.log(arrShallowCopy);

    const arrCp01 = [-1, 0, ...arr, 4, 5];
    // [
    //   -1, 0, 1, 2,
    //    3, 4, 5
    // ]
    console.log(arrCp01);

    const obj = {
        name: "john do",
        age: 20,
        job: "pg",
        address: "埼玉",
    };
    const objShallowCopy = { ...obj };
    // {"name":"john do","age":20,"job":"pg","address":"埼玉"}
    console.log(`${JSON.stringify(objShallowCopy)}`);

    const cp01 = { ...obj, address: "東京" };
    // {"name":"john do","age":20,"job":"pg","address":"東京"}
    console.log(`${JSON.stringify(cp01)}`);
}

//shallowcopy deepcopy
{
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

        shallowcopy.bbb.ccc = 999;
        console.log(`org = ${JSON.stringify(org)}`);
        console.log(`shallowcopy = ${JSON.stringify(shallowcopy)}`);
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

        deepcopy.bbb.ccc = 999;
        console.log(`org = ${JSON.stringify(org)}`);
        console.log(`deepcopy = ${JSON.stringify(deepcopy)}`);
    }
}

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
    console.log(JSON.stringify(obj1));
    console.log(JSON.stringify(am1));
}
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
    console.log(foo);
    const boo = undefined ?? null ?? NaN ?? "" ?? "foo";
    console.log(boo);
    const woo = undefined ?? null ?? "" ?? "foo";
    console.log(woo);
    const bar = undefined ?? null ?? "foo";
    console.log(bar);
}

// optional chaining
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const foo: any = {
        boo: "boo",
        woo: {
            bar: "bar",
        },
    };

    const bar = (foo && foo.woo && foo.woo.bar) ?? "default bar";
    console.log(bar);
    const baz = (foo && foo.woo && foo.woo.baz) ?? "default baz";
    console.log(baz);
    const woz = (foo && foo.woz && foo.woz.baz) ?? "default woz.baz";
    console.log(woz);

    const bar2 = foo?.woo?.bar ?? "default bar";
    console.log(bar2);

    const baz2 = foo?.woo?.baz ?? "default baz";
    console.log(baz2);

    const woz2 = foo?.woz?.baz ?? "default woz.baz";
    console.log(woz2);

    type Woo = {
        fun1: () => Woo;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fun2: () => any;
        fun3: () => Woo;
    };

    const woo: Woo = {
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
    console.log("rtn=", rtn);
}

//javascriptのthis

import { a01 } from "./a01";

a01();
