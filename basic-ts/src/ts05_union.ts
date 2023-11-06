export const ts05 = "ts05"; //dummy
type Color = "Red" | "Blue" | "Green";
const [clr1, clr2, clr3]: Color[] = ["Red", "Blue", "Green"];
// コンパイルエラー "Red", "Blue", "Green"以外は入らない
// const c: Color = "aaa";
console.log(1, clr1, clr2, clr3);
// 1 Red Blue Green

// 配列要素にユニオン型を指定;() がないとダメ
const arr: (string | number)[] = ["aaa", 1, "aaaaaa", 1, 2, 3];
console.log(2, arr);
// 2 [ 'aaa', 1, 'aaaaaa', 1, 2, 3 ]

// ユニオン型と絞り込み(narrowing)
process.env.TEST_ID = "dummy";
const maybeId: string | undefined = process.env.TEST_ID;

// const id: string = maybeId; // nullかもしれないので、代入できない。
if (typeof maybeId === "string") {
    const id: string = maybeId; // この分岐内では文字列型に絞り込まれるため、代入できる。
    console.log(3, id);
    // 3 dummy
}

//これでもいける
if (maybeId !== undefined) {
    const id: string = maybeId; // この分岐内では文字列型に絞り込まれるため、代入できる。
    console.log(4, id);
    // 4 dummy
}

// 判別可能ユニオン型（discriminated union）
// タグ付きユニオン(tagged union)
// 直和型

{
    // タグ付きユニオンのない世界
    type status = start | complete | fail;

    type start = { done: false };
    type complete = { done: true; result: string };
    type fail = { done: true; error: string };

    let proc: status = { done: false };
    if (!proc.done) {
        console.log(5, "start");
        // 5 start
    }
    proc = { done: true, result: "fin." };
    // 完了の判定
    if (proc.done) {
        proc = { done: true, result: "fin." };
        // 成功の判定
        if (proc.done && "result" in proc) {
            console.log(6, proc.result);
            // 6 fin.
        }
    }
    // ↑めんどくさい
}

{
    // タグ付きユニオンのある世界
    type start = { tag: "start" };
    type complete = { tag: "complete"; result: string };
    type fail = { tag: "fail"; error: string };
    type status = start | complete | fail;

    let proc: status = { tag: "start" };
    if (proc.tag === "start") {
        console.log(7, "start");
        // 7 start
    }
    proc = { tag: "complete", result: "fin." };
    // 完了の判定
    if (proc.tag === "complete") {
        console.log(8, proc.result);
        // 8 fin.
    }
    // ↑すっきり
}
