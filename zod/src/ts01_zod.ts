//後から追加
import { RefinementCtx, z } from "zod";

const hello: string = "hello world";
console.log(hello);

const scm1 = z.string().superRefine((v: string, ctx: RefinementCtx) => {
    if (v === "a") {
        ctx.addIssue({
            code: "custom",
        });
    }
});
const scm2 = z.string().trim().min(1);

const scm3 = z.intersection(scm1, scm2);

console.log("入力必須じゃない");
console.log(scm1.safeParse("     "));
console.log(scm1.safeParse("a"));
console.log(scm1.safeParse("bbb"));
console.log("入力必須");
console.log(scm3.safeParse(""));
console.log(scm3.safeParse("a"));
console.log(scm3.safeParse("bbb"));
