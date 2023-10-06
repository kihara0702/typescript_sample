//class
export const a00 = () => {
  {
    class Foo {
      private name: string;
      constructor(name: string) {
        this.name = name;
      }
    }
    //以下と同等
    class Boo {
      constructor(private name: string) {}
    }
    console.log(JSON.stringify(new Foo("john do")));
    console.log(JSON.stringify(new Boo("john do")));
  }
};
