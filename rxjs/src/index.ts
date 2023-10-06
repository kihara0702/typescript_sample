import { filter, tap, from, Subject, map, toArray, lastValueFrom } from "rxjs";

const arr = [1, 2, 3, 4, 5];
const ob01 = from(arr);
ob01.pipe(
    tap((s) => console.log(`pipe start:${s}`)),
    filter((s) => s % 2 == 0)
).subscribe((s) => console.log(s));

const ob02 = from(arr).pipe(
    tap((s) => console.log(`pipe start:${s}`)),
    filter((s) => s % 2 == 0),
    toArray()
);
const filteredArr = await lastValueFrom(ob02);
console.log(filteredArr);

const subj = new Subject();
const ob03 = subj.asObservable().pipe(
    map((s) => `${s}_${s}`),
    toArray()
);

ob03.subscribe((a) => console.log(a));

subj.next("A");
subj.next("B");
subj.next("C");
subj.complete();
