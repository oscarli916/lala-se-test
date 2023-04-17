import dotenv from "dotenv";

dotenv.config();

export const config = {
	nodeEnv: process.env.NODE_ENV || "development",
	port: process.env.PORT || 8080,
	dbHost: process.env.DB_HOST || "localhost",
	dbPort: process.env.DB_PORT || 3306,
	dbUsername: process.env.DB_USERNAME || "root",
	dbPassword: process.env.DB_PASSWORD || "root",
	dbDatabase: process.env.DB_DATABASE || "orders",
	googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
};
