import type { Equal, Expect } from "@type-challenges/utils";
import { z } from "zod";

export const ts07 = "ts07"; //dummy

// any なんでも入る
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let anyValue: any = "string value";
anyValue = 1;
anyValue = false;
anyValue = { fld: "foo" };

console.log(1, anyValue);
// 1 { fld: 'foo' }

// 存在しないキーでも呼べる
console.log(2, anyValue.woo);
// 2 undefined
// 適当に代入もOK
const i: number = anyValue;
console.log(3, i);

// unknown なんでも入る
let unknownValue1: unknown = "string value";
unknownValue1 = 1;
unknownValue1 = false;
unknownValue1 = { fld: "foo" };

// ただしプロパティ、メソッドは何もない
// なので以下はコンパイルエラー
// console.log(4, unknownValue.woo);
console.log(4, unknownValue1);
// 4 { fld: 'foo' }

// 具体的な型への代入もNG コンパイルエラー
// const j : number = unknownValue2;

type UserInfo = { name: string; age: number };
const unknownValue2: unknown = { name: "john do", age: 20 };
//このままだとnameもageも取り出せない
// 型ガードでnameとageを保証する

// ユーザ定義型ガード
const isUserInfo = (arg: unknown): arg is UserInfo => {
    if (typeof arg !== "object" || arg === null) {
        return false;
    }
    const userInfo = arg as Record<keyof UserInfo, unknown>;
    if (typeof userInfo.name !== "string") {
        return false;
    }
    return typeof userInfo.age === "number";
};

if (isUserInfo(unknownValue2)) {
    const unwrappedValue1: UserInfo = unknownValue2;
    console.log(5, unwrappedValue1);
    // 5 { name: 'john do', age: 20 }
}

// ユーザ定義型ガードを手書きするのは非常に負荷が高いし危険なのでzodを使う
const zUserInfoScm = z.object({
    name: z.string(),
    age: z.number(),
});

type zUserInfo = z.infer<typeof zUserInfoScm>;

//zodを使ったユーザ定義型ガード
const isZUserInfo = (arg: unknown): arg is zUserInfo => {
    return zUserInfoScm.safeParse(unknownValue2).success;
};
if (isZUserInfo(unknownValue2)) {
    const unwrappedValue2: zUserInfo = unknownValue2;
    console.log(6, unwrappedValue2);
    // 6 { name: 'john do', age: 20 }
}

// never型
// 何も代入できない
// const neverValue: never = 1; //コンパイルエラー
// const neverValue: never = null; //コンパイルエラー
// const neverValue: never = undefined; //コンパイルエラー
// const a: any = 1;
// const neverValue: never = a; //コンパイルエラー

// never型は代入できる
const a: never = 1 as never;
const neverValue = a;
console.log(7, neverValue);

// 使いどころ
// 必ず例外を投げる関数の戻り値
{
    const raiseError = (): never => {
        throw new Error("ops");
    };
    try {
        raiseError();
    } catch (e) {
        console.log(8, e);
        // 8 Error: ops
        // at raiseError...
    }
}

// 無限に帰らない関数
// 無限ループするから呼べないけど
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gen(): never {
    const i = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        console.log(9, i);
    }
}

// ありえない型もneverになる
// numberかつstringな型（インターセクション）
type numString = number & string;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [Expect<Equal<never, numString>>];

//網羅性の担保
type Color = "Red" | "Yellow" | "Blue";
const Stop = (clr: Color): boolean => {
    if (clr === "Red") {
        return true;
    }
    if (clr === "Yellow") {
        return false;
    }
    if (clr === "Blue") {
        return false;
    }
    // ↑どれか一つでも分岐が漏れると↓でエラーになる
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ops: never = clr;
    return false;
};

console.log(10, Stop("Red"));
// 10 true
