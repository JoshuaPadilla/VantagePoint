import type { Request, Response } from "express";
import { predictionDto } from "../dto.ts/prediction.dto.js";

const ML_SERVICE_URL =
	process.env.ML_SERVICE_URL ?? "http://localhost:5000/predict";

export const predict = async (req: Request, res: Response): Promise<void> => {
	// 1. Validate incoming request body against the DTO schema
	const parseResult = predictionDto.safeParse(req.body);

	if (!parseResult.success) {
		res.status(400).json({
			message: "Validation failed",
			errors: parseResult.error.flatten().fieldErrors,
		});
		return;
	}

	const validatedInput = parseResult.data;

	try {
		// 2. Forward validated data to the ML model service
		const mlResponse = await fetch(ML_SERVICE_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(validatedInput),
		});

		if (!mlResponse.ok) {
			const errorBody = await mlResponse.text();
			res.status(502).json({
				message: "ML service returned an error",
				details: errorBody,
			});
			return;
		}

		// 3. Return the prediction result to the client
		const prediction = await mlResponse.json();
		res.status(200).json({ prediction });
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown error";
		res.status(503).json({
			message: "Could not reach ML service",
			details: message,
		});
	}
};
