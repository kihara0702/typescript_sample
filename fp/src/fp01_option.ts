import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/lib/function";

{
    const hasValue: O.Option<string> = O.some("hello");
    const noneValue: O.Option<string> = O.none;

    console.log(hasValue);
    // { _tag: 'Some', value: 10 }
    console.log(noneValue);
    // { _tag: 'None' }

    //functor
    const process = (op: O.Option<string>) => {
        return pipe(
            op,
            O.map((v) => {
                console.log("add _");
                return v + "_";
            }),
            O.map((v) => {
                console.log("add @");
                return v + "@";
            }),
            O.map((v) => {
                console.log("add #");
                return v + "#";
            }),
            O.getOrElse(() => "none")
        );
    };
    console.log(1, process(hasValue));
    console.log(2, process(noneValue));
}
//applicative
{
    const curriedFunction = (arg1: string) => (arg2: string) => (arg3: string) =>
        `${arg1} ${arg2} ${arg3}`;
    const val1: O.Option<string> = O.some("hello");
    const val2: O.Option<string> = O.some("world");
    const val3: O.Option<string> = O.some("test");

    const process1 = pipe(O.some(curriedFunction), O.ap(val1), O.ap(val2), O.ap(val3));

    if (O.isSome(process1)) {
        console.log(process1.value);
    }

    const valNone: O.Option<string> = O.none;

    const process2 = pipe(O.some(curriedFunction), O.ap(val1), O.ap(valNone), O.ap(val3));

    if (O.isSome(process2)) {
        console.log(process2.value);
    }

    if (O.isNone(process2)) {
        console.log(process2);
    }
}

//monad
{
    const process1 = (s: string) =>
        pipe(
            O.some(s),
            O.chain((x) => O.some(`_${x}_`)),
            O.chain((x) => {
                console.log(x);
                if (s === "world") {
                    return O.some(`*${x}*`);
                }
                return O.some(`#${x}#`);
            }),
            O.chain((x) => O.some(`@${x}@`))
        );
    const res1 = process1("hello");
    if (O.isSome(res1)) {
        console.log(res1.value);
    }
    const res2 = process1("world");
    if (O.isSome(res2)) {
        console.log(res2.value);
    }
}
