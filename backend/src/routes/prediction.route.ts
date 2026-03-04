import { Router } from "express";
import { predict } from "../controllers/prediction.controller.js";

const predictionRoute = Router();

predictionRoute.post("/", predict);

export default predictionRoute;
