import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const dbConfig: DataSourceOptions = {
	type: "mysql",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT!),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [__dirname + "/../**/*.entity{.ts,.js}"],
	synchronize: process.env.NODE_ENV === "development",
	logging: process.env.NODE_ENV === "development",
	migrations: [__dirname + "/../**/*-migrations{.ts,.js}"],
};
export const OrderDataSource = new DataSource(dbConfig);
