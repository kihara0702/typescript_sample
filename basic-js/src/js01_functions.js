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
        console.log(`fun04 this ${JSON.stringify(this)}`);
    },
    fun05: () => {
        // 定義されたスコープのthisをキャプチャする
        // ここではトップレベルのスコープ（モジュールのスコープ）の this は、global オブジェクトにならない
        // Node.js の各ファイルは独自のモジュールとして扱われ、その中でのトップレベルの this はそのモジュールのエクスポート（exports オブジェクト）を指す。
        console.log("fun05 called");
        console.log(`fun05 gloval ${this === global}`);
        console.log(`fun05 exports ${this === exports}`);
        console.log(`fun05 this ${JSON.stringify(this)}`);
    },
};

fun01();
// fun01 called
fun02();
// fun02 called
fun03();
// fun03 called
obj01.fun04();
// fun04 called
// fun04 this {"xxx":"value"}
obj01.fun05();
// fun05 gloval false
// fun05 exports true
// fun05 this {}
console.log(fun01.name);
// fun01
console.log(fun02.name);
// fun02
console.log(fun03.name);
// fun03
console.log(obj01.fun04.name);
// fun04
console.log(obj01.fun05.name);
// fun05

//デフォルト引数
const fun06 = (a, b = 2) => a + b;
console.log(fun06(1));
// 3

//レストパラメータ（残余引数）
const fun07 = (a, ...rest) => {
    console.log(`${a} rest=${rest}`);
};
fun07(1, 2, 3, 4, 5);
// 1 rest=2,3,4,5
