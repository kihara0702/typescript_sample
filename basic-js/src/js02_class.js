//クラス
class Cls01 {
    //プライベートメンバ
    #name;

    //コンストラクタ
    constructor(name) {
        this.#name = name;
    }

    //メソッド
    sayHello() {
        return `hello i am ${this.#name}`;
    }

    sayGoodbay = () => {
        return `goodbay  i am ${this.#name}`;
    };
}

class Cls02 extends Cls01 {
    constructor(name) {
        super(name);
    }
    sayHello() {
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
