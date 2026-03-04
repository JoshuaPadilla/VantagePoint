import cors from "cors";
import "dotenv/config";
import express, { type Request, type Response } from "express";
import morgan from "morgan";
import evaluationRoute from "./routes/evaluation.route.js";
import predictionRoute from "./routes/prediction.route.js";

const app = express();
const PORT = 3006;

// Middleware to parse JSON
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:4173"] }));

app.get("/", (req: Request, res: Response) => {
	res.send("Hello from TypeScript Express!");
});
app.use("/predict", predictionRoute);
app.use("/evaluation", evaluationRoute);

app.listen(PORT, () => {
	console.log(`⚡️ Server is running at http://localhost:${PORT}`);
});
