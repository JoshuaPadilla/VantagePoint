import type { Request, Response } from "express";
import { readFileSync } from "fs";
import { join } from "path";

const EVAL_JSON_PATH =
	process.env.EVAL_JSON_PATH ??
	join(process.cwd(), "../prediction/evaluation_json.json");

export const getEvaluation = (_req: Request, res: Response): void => {
	try {
		const raw = readFileSync(EVAL_JSON_PATH, "utf-8");
		res.status(200).json(JSON.parse(raw));
	} catch {
		res.status(500).json({ message: "Could not read evaluation data" });
	}
};
