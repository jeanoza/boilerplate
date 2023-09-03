import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import dotenv from "dotenv"

dotenv.config();

export const AppDataSource =  new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432, 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User],
  // dropSchema: true, // drop all table when restart
  // migrations: [],
  // subscribers: [],
});
