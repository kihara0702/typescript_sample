const hello: string = "hello world";
console.log(hello);

export function fn01(s: string): string {
    if (s === "sk") {
        return s + " hello";
    }
    return s + " hello!";
}

console.log(fn01("sk"));
