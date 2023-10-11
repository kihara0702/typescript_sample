import { Repository, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    //QueryBuilder01
    console.log("QueryBuilder01");
    const repo01 = new Repository<User>(User, AppDataSource.manager);
    const qb01 = repo01
      .createQueryBuilder("user")
      .select(["user.id", "user.firstName", "user.lastName", "user.age"])
      .where("user.id = :id", { id: user.id });
    console.log(qb01.getSql());
    console.log(qb01.getParameters());
    const data01 = await qb01.getOne();
    console.log(data01);
    console.log(data01.firstName);

    //QueryBuilder02
    console.log("QueryBuilder02");
    const repo02 = new Repository<User>(User, AppDataSource.manager);
    const sub02 = repo02
      .createQueryBuilder("user")
      .select("MAX(user.id)", "maxId");
    const qb02 = repo02
      .createQueryBuilder("user")
      .select(["user.id", "user.firstName", "user.lastName", "user.age"])
      .where(`user.id = (${sub02.getQuery()})`);
    console.log(qb02.getSql());
    console.log(qb02.getParameters());
    const data02 = await qb02.getOne();
    console.log(data02);
    console.log(data02.firstName);

    //PKのないテーブル
    // console.log('Inserting a new test into the database...');
    // const test = new Test();
    // test.firstName = 'Timber';
    // test.lastName = 'Saw';
    // test.age = 25;
    // await AppDataSource.manager.save(test);
    // console.log('Saved a new test with firstName: ' + test.firstName);

    // console.log('Loading test from the database...');
    // const tests = await AppDataSource.manager.find(Test);
    // console.log('Loaded users: ', tests);

    // //QueryBuilder01
    // console.log('QueryBuilder02');
    // const repo03 = new Repository<Test>(Test, AppDataSource.manager);
    // const qb03 = repo03
    //   .createQueryBuilder('test')
    //   .select(['test.firstName', 'test.lastName', 'test.age'])
    //   .where('test.firstName = :firstName', { firstName: test.firstName });
    // console.log(qb01.getSql());
    // console.log(qb01.getParameters());
    // const data03 = await qb03.getOne();
    // console.log(data03);
    // console.log(data03.firstName);

    //
    // const rawResult01 = await AppDataSource.manager.query(`
    // CREATE TABLE test (
    //   firstName TEXT,
    //   lastName TEXT,
    //   age INTEGER)`);

    const rawResult02 = await AppDataSource.manager.query(
      "insert into test values('aaaa','bbbb',20)"
    );
    const rawResult03 = await AppDataSource.manager.query("SELECT * FROM test");
    console.log(rawResult03);
  })
  .catch((error) => console.log(error));
