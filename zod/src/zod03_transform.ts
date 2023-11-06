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
const scm2 = scm1.transform((v) => z.string().trim().min(1).parse(v));

console.log("入力必須じゃない");
console.log(scm1.safeParse(undefined));
console.log(scm1.safeParse("     "));
console.log(scm1.safeParse("a"));
console.log(scm1.safeParse("bbb"));
console.log("入力必須");
console.log(scm2.safeParse(undefined));
console.log(scm2.safeParse(""));
console.log(scm2.safeParse("a"));
console.log(scm2.safeParse("bbb"));
