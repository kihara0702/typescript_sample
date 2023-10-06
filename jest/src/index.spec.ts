import { fn01 } from "./index";
describe("index.tsのテスト", () => {
    test("fn01のテスト", () => {
        const res = fn01("say");
        expect(res).toBe("say hello!");
    });
});
