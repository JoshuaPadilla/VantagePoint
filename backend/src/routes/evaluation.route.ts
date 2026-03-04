import { Router } from "express";
import { getEvaluation } from "../controllers/evaluation.controller.js";

const evaluationRoute = Router();

evaluationRoute.get("/", getEvaluation);

export default evaluationRoute;
