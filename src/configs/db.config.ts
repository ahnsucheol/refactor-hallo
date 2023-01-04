import { DataSource } from "typeorm";
import "dotenv/config";

const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/**/*.entity{.ts,.js}"],
  migrationsTableName: "migrations",
  migrations: ["src/migration/*.ts"],
  synchronize: true,
  logging: true,
});

export { myDataSource };
