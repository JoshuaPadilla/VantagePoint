import { z } from "zod";

// Define the exact values allowed by your ML Model
// (These match the unique values found in the Kaggle dataset)
export const predictionDto = z.object({
	Gender: z
		.enum(["male", "female"])
		.describe("Gender must be 'male' or 'female'"),

	Caste: z.enum(["General", "OBC", "SC", "ST"]).describe("Caste is required"),

	coaching: z
		.enum(["NO", "WA", "OA"])
		.describe("NO: None, WA: Weekly, OA: Occasional"),

	Class_ten_education: z.enum(["SEBA", "OTHERS", "CBSE"]),

	twelve_education: z.enum(["AHSEC", "CBSE", "OTHERS"]),

	medium: z.enum(["ENGLISH", "OTHERS", "ASSAMESE"]),

	// Using Enums here ensures we only accept values the Model knows about
	Class_X_Percentage: z.enum(["Excellent", "Vg", "Good", "Average"]),

	Class_XII_Percentage: z.enum(["Excellent", "Vg", "Good", "Average"]),

	// For occupations, we can list the known ones or just use string if we want to be lenient.
	// Using enum is safer for the One-Hot-Encoding in the backend.
	Father_occupation: z.enum([
		"DOCTOR",
		"SCHOOL_TEACHER",
		"BUSINESS",
		"COLLEGE_TEACHER",
		"OTHERS",
		"BANK_OFFICIAL",
		"ENGINEER",
		"CULTIVATOR",
	]),

	Mother_occupation: z.enum([
		"DOCTOR",
		"SCHOOL_TEACHER",
		"BUSINESS",
		"COLLEGE_TEACHER",
		"OTHERS",
		"BANK_OFFICIAL",
		"ENGINEER",
		"CULTIVATOR",
		"HOUSE_WIFE",
	]),

	time: z.enum(["ONE", "TWO", "THREE", "FOUR", "FIVE", "SEVEN", "SIX"]),
});

// 1. Export the Type for use in your Controller
export type predictionDto = z.infer<typeof predictionDto>;
