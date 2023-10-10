// union型
export const a01 = () => {
    type Animal = {
        species: string;
    };

    type Human = {
        name: string;
    };

    type User = Animal | Human;

    //ユーザ定義型ガード
    const isAnimal = (target: unknown): target is Animal => {
        if (target == null) {
            return false;
        }
        const t = target as Animal;
        return typeof t.species === "string";
    };

    //ユーザ定義型ガード
    const isHuman = (target: unknown): target is Human => {
        if (target == null) {
            return false;
        }
        const t = target as Human;
        return typeof t.name === "string";
    };

    const P = (o: unknown) => {
        console.log(isAnimal(o) ? `${o.species} is animal` : `${JSON.stringify(o)} is not animal`);
        console.log(isHuman(o) ? `${o.name} is human` : `${JSON.stringify(o)} is not human`);
    };

    const tama: User = {
        species: "cat",
    };
    const taro: User = {
        name: "taro",
    };

    const jiro: Human = {
        name: "jiro",
    };
    const create = (s: string): User => {
        return {
            name: s,
        };
    };

    const saburo = create("saburo");

    console.log(typeof tama);
    console.log(typeof taro);
    console.log(typeof jiro);
    console.log(typeof saburo);
    P(tama);
    P(taro);
    P(jiro);
    P(saburo);
};
