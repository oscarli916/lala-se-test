import express from "express";
import cors from "cors";
import orderController from "./controllers/orderController";
import { config } from "./config/appConfig";
import { OrderDataSource } from "./config/dbConfig";

OrderDataSource.initialize()
	.then(async () => {})
	.catch((error) => console.log(error));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", orderController);

const port = config.port;

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

export default app;
