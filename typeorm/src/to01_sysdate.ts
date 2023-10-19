import { Repository, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "./data-source";
import { Test } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    console.log("sysdate");
    const repo = new Repository<Test>(Test, AppDataSource.manager);
    const data = await repo.query(
      "select strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime') AS current_datetime;"
    );
    console.log(data);
  })
  .catch((error) => console.log(error));
