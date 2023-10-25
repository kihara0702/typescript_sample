export const ts03 = "ts03"; //dummy
// // そもそも不変のオブジェクトリテラルを使えと怒られる
// enum Color {
//     Red,
//     Blue,
//     Green,
// }

// enum Color {
//     Red = "Red",
//     Blue = "Blue",
//     Green = "Green",
// }

const Color = {
    Red: "Red",
    Blue: "Blue",
    Green: "Green",
} as const;

const [clr1, clr2, clr3] = [Color.Red, Color.Blue, Color.Green];
console.log(clr1, clr2, clr3);
