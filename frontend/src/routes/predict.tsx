import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useEffect, useState } from "react";

export const Route = createFileRoute("/predict")({
	component: PredictPage,
});

type FormState = {
	Gender: string;
	Caste: string;
	coaching: string;
	Class_ten_education: string;
	twelve_education: string;
	medium: string;
	Class_X_Percentage: string;
	Class_XII_Percentage: string;
	Father_occupation: string;
	Mother_occupation: string;
	time: string;
};

const INITIAL: FormState = {
	Gender: "",
	Caste: "",
	coaching: "",
	Class_ten_education: "",
	twelve_education: "",
	medium: "",
	Class_X_Percentage: "",
	Class_XII_Percentage: "",
	Father_occupation: "",
	Mother_occupation: "",
	time: "",
};

const occupations = [
	"CULTIVATOR",
	"SCHOOL_TEACHER",
	"COLLEGE_TEACHER",
	"BUSINESS",
	"DOCTOR",
	"ENGINEER",
	"BANK_OFFICIAL",
	"OTHERS",
];

function SelectField({
	id,
	label,
	icon,
	value,
	onChange,
	options,
	placeholder = "Select an option...",
}: {
	id: keyof FormState;
	label: string;
	icon: string;
	value: string;
	onChange: (val: string) => void;
	options: { value: string; label: string }[];
	placeholder?: string;
}) {
	return (
		<div className="space-y-2">
			<label
				htmlFor={id}
				className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
			>
				{label}
			</label>
			<div className="relative">
				<select
					id={id}
					required
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-1 focus:ring-primary text-sm py-3 px-4 pl-11 appearance-none transition-shadow"
				>
					<option value="" disabled>
						{placeholder}
					</option>
					{options.map((o) => (
						<option key={o.value} value={o.value}>
							{o.label}
						</option>
					))}
				</select>
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<span className="material-symbols-outlined text-slate-400 text-xl">
						{icon}
					</span>
				</div>
				<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
					<span className="material-symbols-outlined text-slate-400 text-sm">
						expand_more
					</span>
				</div>
			</div>
		</div>
	);
}

function SectionHeading({ icon, title }: { icon: string; title: string }) {
	return (
		<div className="flex items-center gap-2 pt-2 pb-1 border-b border-slate-100 dark:border-slate-800">
			<span className="material-symbols-outlined text-primary text-xl">
				{icon}
			</span>
			<h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider m-0">
				{title}
			</h4>
		</div>
	);
}

function PredictPage() {
	const navigate = useNavigate();
	const [form, setForm] = useState<FormState>(INITIAL);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const set = (key: keyof FormState) => (val: string) =>
		setForm((prev) => ({ ...prev, [key]: val }));

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		// Store form data in sessionStorage for result page sidebar
		sessionStorage.setItem("arborFormData", JSON.stringify(form));

		try {
			const res = await fetch("/api/predict", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			if (!res.ok) {
				const err = await res
					.json()
					.catch(() => ({ message: "Prediction failed" }));
				setError(err.message ?? "Prediction failed");
				return;
			}

			const data = await res.json();
			const { result, label, confidence } = data.prediction;

			navigate({
				to: "/result",
				search: { result, label, confidence },
			});
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Could not reach backend",
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const init = async () => {
			// Check if user came from result page with form data in sessionStorage
			const stored = sessionStorage.getItem("arborFormData");
			if (stored) {
				setForm(JSON.parse(stored));
				sessionStorage.removeItem("arborFormData");
			}
		};

		init();
	}, []);

	return (
		<main className="flex-1 flex flex-col items-center justify-center py-12 px-4 rise-in">
			<div className="w-full max-w-2xl">
				{/* Page intro */}
				<div className="mb-8 text-center">
					<div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 border border-blue-100 dark:border-blue-800 mb-4">
						<span className="material-symbols-outlined text-primary text-sm">
							psychology
						</span>
						<span className="text-primary text-xs font-bold uppercase tracking-wider">
							Random Forest Classifier
						</span>
					</div>
					<h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 mt-0">
						Student Performance Prediction
					</h1>
					<p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
						Enter the student details below to generate a
						performance forecast based on historical academic data.
					</p>
				</div>

				{/* Form card */}
				<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-800 overflow-hidden">
					<div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
						<h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg flex items-center gap-2 m-0">
							<span className="material-symbols-outlined text-primary">
								edit_note
							</span>
							Input Parameters
						</h3>
					</div>

					<div className="p-8">
						<form onSubmit={handleSubmit} className="space-y-7">
							{/* Personal Details */}
							<div className="space-y-4">
								<SectionHeading
									icon="person"
									title="Personal Details"
								/>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
									<SelectField
										id="Gender"
										label="Gender"
										icon="wc"
										value={form.Gender}
										onChange={set("Gender")}
										options={[
											{ value: "male", label: "Male" },
											{
												value: "female",
												label: "Female",
											},
										]}
									/>
									<SelectField
										id="Caste"
										label="Caste / Category"
										icon="group"
										value={form.Caste}
										onChange={set("Caste")}
										options={[
											{
												value: "General",
												label: "General",
											},
											{ value: "OBC", label: "OBC" },
											{ value: "SC", label: "SC" },
											{ value: "ST", label: "ST" },
										]}
									/>
								</div>
							</div>

							{/* Academic Background */}
							<div className="space-y-4">
								<SectionHeading
									icon="school"
									title="Academic Background"
								/>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
									<SelectField
										id="Class_ten_education"
										label="Class X Education Board"
										icon="library_books"
										value={form.Class_ten_education}
										onChange={set("Class_ten_education")}
										options={[
											{ value: "SEBA", label: "SEBA" },
											{ value: "CBSE", label: "CBSE" },
											{
												value: "OTHERS",
												label: "Others",
											},
										]}
									/>
									<SelectField
										id="twelve_education"
										label="Class XII Education Board"
										icon="library_books"
										value={form.twelve_education}
										onChange={set("twelve_education")}
										options={[
											{ value: "AHSEC", label: "AHSEC" },
											{ value: "CBSE", label: "CBSE" },
											{
												value: "OTHERS",
												label: "Others",
											},
										]}
									/>
									<SelectField
										id="medium"
										label="Medium of Instruction"
										icon="translate"
										value={form.medium}
										onChange={set("medium")}
										options={[
											{
												value: "ENGLISH",
												label: "English",
											},
											{
												value: "ASSAMESE",
												label: "Assamese",
											},
											{
												value: "OTHERS",
												label: "Others",
											},
										]}
									/>
									<SelectField
										id="Class_X_Percentage"
										label="Class X Percentage Grade"
										icon="grade"
										value={form.Class_X_Percentage}
										onChange={set("Class_X_Percentage")}
										options={[
											{
												value: "Excellent",
												label: "Excellent (≥ 80%)",
											},
											{
												value: "Vg",
												label: "Very Good (60–79%)",
											},
											{
												value: "Good",
												label: "Good (45–59%)",
											},
											{
												value: "Average",
												label: "Average (< 45%)",
											},
										]}
									/>
									<SelectField
										id="Class_XII_Percentage"
										label="Class XII Percentage Grade"
										icon="grade"
										value={form.Class_XII_Percentage}
										onChange={set("Class_XII_Percentage")}
										options={[
											{
												value: "Excellent",
												label: "Excellent (≥ 80%)",
											},
											{
												value: "Vg",
												label: "Very Good (60–79%)",
											},
											{
												value: "Good",
												label: "Good (45–59%)",
											},
											{
												value: "Average",
												label: "Average (< 45%)",
											},
										]}
									/>
								</div>
							</div>

							{/* Parents' Occupation */}
							<div className="space-y-4">
								<SectionHeading
									icon="work"
									title="Parents' Occupation"
								/>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
									<SelectField
										id="Father_occupation"
										label="Father's Occupation"
										icon="engineering"
										value={form.Father_occupation}
										onChange={set("Father_occupation")}
										options={occupations.map((o) => ({
											value: o,
											label: o
												.replace(/_/g, " ")
												.replace(/\b\w/g, (c) =>
													c.toUpperCase(),
												),
										}))}
									/>
									<SelectField
										id="Mother_occupation"
										label="Mother's Occupation"
										icon="engineering"
										value={form.Mother_occupation}
										onChange={set("Mother_occupation")}
										options={[
											...occupations,
											"HOUSE_WIFE",
										].map((o) => ({
											value: o,
											label: o
												.replace(/_/g, " ")
												.replace(/\b\w/g, (c) =>
													c.toUpperCase(),
												),
										}))}
									/>
								</div>
							</div>

							{/* Study Habits */}
							<div className="space-y-4">
								<SectionHeading
									icon="timer"
									title="Study Habits"
								/>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
									<SelectField
										id="coaching"
										label="Coaching Support"
										icon="hub"
										value={form.coaching}
										onChange={set("coaching")}
										options={[
											{ value: "NO", label: "None" },
											{
												value: "WA",
												label: "Weekly Attendance",
											},
											{
												value: "OA",
												label: "Occasional Attendance",
											},
										]}
									/>
									<SelectField
										id="time"
										label="Weekly Study Hours (approx.)"
										icon="schedule"
										value={form.time}
										onChange={set("time")}
										options={[
											{ value: "ONE", label: "1 hour" },
											{ value: "TWO", label: "2 hours" },
											{
												value: "THREE",
												label: "3 hours",
											},
											{ value: "FOUR", label: "4 hours" },
											{ value: "FIVE", label: "5 hours" },
											{ value: "SIX", label: "6 hours" },
											{
												value: "SEVEN",
												label: "7+ hours",
											},
										]}
									/>
								</div>
							</div>

							{/* Error */}
							{error && (
								<div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
									<span className="material-symbols-outlined text-red-500 text-xl">
										error
									</span>
									{error}
								</div>
							)}

							{/* Submit */}
							<div className="pt-2">
								<button
									type="submit"
									disabled={loading}
									className="group w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-primary/40 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
								>
									{loading ? (
										<>
											<span className="material-symbols-outlined animate-spin text-xl">
												progress_activity
											</span>
											<span className="text-base font-bold">
												Calculating...
											</span>
										</>
									) : (
										<>
											<span className="text-base font-bold">
												Calculate Prediction
											</span>
											<span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
												arrow_forward
											</span>
										</>
									)}
								</button>
							</div>
						</form>
					</div>

					{/* Footer note */}
					<div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-start gap-3">
						<span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">
							info
						</span>
						<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed m-0">
							Predictions are estimates based on the Random Forest
							Classification model. Results should be used as
							guidance for academic counseling and not as absolute
							determinants of student potential.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
