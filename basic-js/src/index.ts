//js基礎
//関数

function fun01() {
    console.log('fun01 called');
  }
  
  const fun02 = function () {
    console.log('fun02 called');
  };
  
  const fun03 = () => {
    console.log('fun03 called');
  };
  
  const obj01 = {
    xxx: 'value',
    fun04() {
      console.log('fun04 called');
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
  
  const instance01 = new Cls01('aaa');
  console.log(instance01.sayHello());
  console.log(instance01.sayGoodbay());
  
  const instance02 = new Cls02('bbb');
  console.log(instance02.sayHello());
  console.log(instance02.sayGoodbay());
  
  const instance03: Cls01 = new Cls02('ccc');
  console.log(instance03.sayHello());
  console.log(instance03.sayGoodbay());
  
  //エラーにならない（構造的部分型だから）
  const instance04: Cls02 = new Cls01('ddd');
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
  
  // これはコンパイルエラー（構造が違うから）
  // const instance05: Cls03 = new Cls04();
  
  //オブジェクトのキー
  const foo = 'aaa';
  const boo = 'bbb';
  const woo = 124;
  
  const obj02 = {
    foo: 1,
    '<foo>': 3,
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
    console.log(`${first}/${second}`);
  }
  {
    const [first, second, ...rest] = [1, 2, 3, 4, 5];
    // 1/2/rest...3,4,5
    console.log(`${first}/${second}/rest...${rest}`);
  }
  {
    const [first, , third, ...rest] = [1, 2, 3, 4, 5];
    // 1/3/rest...4,5
    console.log(`${first}/${third}/rest...${rest}`);
  }
  
  {
    const obj = {
      name: 'john do',
      age: 20,
    };
  
    const { name, age } = obj;
    // john do/20
    console.log(`${name}/${age}`);
  }
  
  {
    const obj = {
      name: 'john do',
      age: 20,
    };
  
    const { name: newName, age } = obj;
    // john do/20
    console.log(`${newName}/${age}`);
  }
  
  {
    const obj = {
      name: 'john do',
      age: 20,
      job: 'pg',
      address: '埼玉',
    };
  
    const { name, age, ...reset } = obj;
    // john do/20/rest={"job":"pg","address":"埼玉"}
    console.log(`${name}/${age}/rest=${JSON.stringify(reset)}`);
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
      name: 'john do',
      age: 20,
      job: 'pg',
      address: '埼玉',
    };
    const objShallowCopy = { ...obj };
    // {"name":"john do","age":20,"job":"pg","address":"埼玉"}
    console.log(`${JSON.stringify(objShallowCopy)}`);
  
    const cp01 = { ...obj, address: '東京' };
    // {"name":"john do","age":20,"job":"pg","address":"東京"}
    console.log(`${JSON.stringify(cp01)}`);
  }
  
  //shallowcopy deepcopy
  {
    {
      // shallowcopy
      const org = {
        aaa : 0,
        bbb : {
          ccc:1
        }
      }

    const shallowcopy = {...org}
    console.log(`org=${JSON.stringify(org)}`)

    shallowcopy.bbb.ccc = 999;
    console.log(`org=${JSON.stringify(org)}`)
    console.log(`shallowcopy=${JSON.stringify(shallowcopy)}`)
  }

  {
    // deepcopy
    const org = {
        aaa : 0,
        bbb : {
          ccc:1
        }
      }

    const deepcopy = JSON.parse(JSON.stringify(org))
    console.log(`org=${JSON.stringify(org)}`)

    deepcopy.bbb.ccc = 999;
    console.log(`org=${JSON.stringify(org)}`)
    console.log(`deepcopy=${JSON.stringify(deepcopy)}`)
  }
 }

//  ショートサーキット/短絡評価
