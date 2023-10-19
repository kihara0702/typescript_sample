import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, Test } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "user.db",
  synchronize: true,
  logging: false,
  entities: [User, Test],
  migrations: [],
  subscribers: [],
});
