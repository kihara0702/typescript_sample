export const ts08 = "ts08"; //dummy
// xxx | null | undefinedな型からxxxを取り出す
// Assertion Functions

type Foo = "test" | null | undefined;

function assertExists<T>(value: T | null | undefined): asserts value is NonNullable<T> {
    if (typeof value === "undefined" || value === null) {
        throw new Error("ops");
    }
}

const r = Math.floor(Math.random() * 3);
let [v1, v2, v3]: [Foo, Foo, Foo] = [undefined, undefined, undefined];
switch (r) {
    case 0:
        v1 = "test";
        v2 = null;
        break;
    case 1:
        v2 = "test";
        v3 = null;
        break;
    case 2:
        v3 = "test";
        v1 = null;
        break;
}
try {
    assertExists(v1);
    //assert後は"test"として扱える
    console.log(`${v1} ${v1.length}`);
} catch (e) {
    console.log(e);
}

try {
    assertExists(v2);
    //assert後は"test"として扱える
    console.log(`${v2} ${v2.length}`);
} catch (e) {
    console.log(e);
}

try {
    assertExists(v3);
    //assert後は"test"として扱える
    console.log(`${v3} ${v3.length}`);
} catch (e) {
    console.log(e);
}
