import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { z } from "zod";

const searchSchema = z.object({
	result: z.number().int().min(0).max(3),
	label: z.string(),
	confidence: z.number(),
});

export const Route = createFileRoute("/result")({
	validateSearch: searchSchema,
	component: ResultPage,
});

const labelConfig: Record<
	string,
	{ bg: string; text: string; icon: string; iconColor: string; desc: string }
> = {
	Excellent: {
		bg: "bg-green-100 dark:bg-green-900/30",
		text: "text-green-700 dark:text-green-400",
		icon: "emoji_events",
		iconColor: "text-green-600 dark:text-green-400",
		desc: "Outstanding academic performance predicted.",
	},
	Vg: {
		bg: "bg-blue-100 dark:bg-blue-900/30",
		text: "text-blue-700 dark:text-blue-400",
		icon: "thumb_up",
		iconColor: "text-blue-600 dark:text-blue-400",
		desc: "Very good academic performance expected.",
	},
	Good: {
		bg: "bg-amber-100 dark:bg-amber-900/30",
		text: "text-amber-700 dark:text-amber-400",
		icon: "check_circle",
		iconColor: "text-amber-600 dark:text-amber-400",
		desc: "Good performance; some areas need focus.",
	},
	Average: {
		bg: "bg-orange-100 dark:bg-orange-900/30",
		text: "text-orange-700 dark:text-orange-400",
		icon: "warning",
		iconColor: "text-orange-600 dark:text-orange-400",
		desc: "Average performance; additional support recommended.",
	},
};

const labelDisplayName: Record<string, string> = {
	Excellent: "Excellent",
	Vg: "Very Good",
	Good: "Good",
	Average: "Average",
};

function GaugeCircle({ confidence }: { confidence: number }) {
	const radius = 70;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference * (1 - confidence / 100);
	const circleRef = useRef<SVGCircleElement>(null);

	useEffect(() => {
		const el = circleRef.current;
		if (!el) return;
		// Animate from full offset to actual offset
		el.style.strokeDashoffset = String(circumference);
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				el.style.transition =
					"stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)";
				el.style.strokeDashoffset = String(offset);
			});
		});
	}, [circumference, offset]);

	return (
		<div className="relative flex flex-col items-center justify-center shrink-0">
			<svg
				className="w-40 h-40 transform -rotate-90"
				viewBox="0 0 160 160"
			>
				<circle
					cx="80"
					cy="80"
					r={radius}
					fill="transparent"
					stroke="currentColor"
					strokeWidth="12"
					className="text-slate-100 dark:text-slate-800"
				/>
				<circle
					ref={circleRef}
					cx="80"
					cy="80"
					r={radius}
					fill="transparent"
					stroke="#136dec"
					strokeWidth="12"
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={circumference}
				/>
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<span className="text-3xl font-bold text-slate-900 dark:text-white leading-none">
					{confidence.toFixed(1)}%
				</span>
				<span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mt-0.5">
					Confidence
				</span>
			</div>
		</div>
	);
}

function ResultPage() {
	const navigate = useNavigate();
	const { result, label, confidence } = Route.useSearch();

	// Read form inputs back from sessionStorage
	const storedForm = (() => {
		try {
			const raw = sessionStorage.getItem("arborFormData");
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	})();

	const config = labelConfig[label] ?? labelConfig["Average"];
	const displayName = labelDisplayName[label] ?? label;

	// Recommendations based on label
	const recommendations: Record<string, string[]> = {
		Excellent: [
			"Continue current study habits and dedication.",
			"Consider mentoring peers to reinforce your own understanding.",
		],
		Vg: [
			"Maintain consistency in study schedule.",
			"Focus on any weak subjects identified in Class XII.",
		],
		Good: [
			"Increase weekly study hours and seek coaching support.",
			"Review Class XII topics systematically before assessments.",
		],
		Average: [
			"Enroll in structured coaching sessions for key subjects.",
			"Set dedicated daily study goals and track progress weekly.",
		],
	};

	const tips = recommendations[label] ?? recommendations["Average"];

	return (
		<main className="flex-1 py-10 px-4 rise-in">
			<div className="page-wrap">
				{/* Breadcrumb */}
				<div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-6">
					<button
						onClick={() => navigate({ to: "/predict" })}
						className="hover:text-primary flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
					>
						<span className="material-symbols-outlined text-lg">
							arrow_back
						</span>
						Back to Inputs
					</button>
					<span>/</span>
					<span className="text-slate-900 dark:text-white font-medium">
						Prediction Result
					</span>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Main result panel */}
					<div className="lg:col-span-2 flex flex-col gap-6">
						{/* Primary outcome card */}
						<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative overflow-hidden">
							<div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-blue-400" />
							<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
								<div>
									<h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
										Prediction Outcome
									</h3>
									<div className="flex items-center gap-3">
										<div
											className={`flex h-12 w-12 items-center justify-center rounded-full ${config.bg} ${config.iconColor}`}
										>
											<span className="material-symbols-outlined text-2xl">
												{config.icon}
											</span>
										</div>
										<h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white m-0">
											{displayName}
										</h1>
									</div>
									<p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
										{config.desc}
									</p>
								</div>
								<div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 self-start">
									<span className="material-symbols-outlined text-primary text-lg">
										psychology
									</span>
									<span className="text-primary font-medium text-sm">
										Random Forest Model
									</span>
								</div>
							</div>

							<div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
								{/* Gauge */}
								<GaugeCircle confidence={confidence} />

								{/* Analysis */}
								<div className="flex-1 space-y-4">
									<div>
										<h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
											Analysis Summary
										</h4>
										<p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
											Based on the provided student
											parameters, the Random Forest
											classifier predicts a performance
											category of{" "}
											<strong>{displayName}</strong> with{" "}
											{confidence.toFixed(1)}% model
											confidence (class {result} on a 0–3
											scale).
										</p>
									</div>
									{/* Confidence band */}
									<div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
										<h5 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
											Confidence Level
										</h5>
										<div className="space-y-2">
											<div className="flex items-center justify-between text-sm">
												<span className="text-slate-700 dark:text-slate-300">
													Model Confidence
												</span>
												<span
													className={`font-bold ${
														confidence >= 60
															? "text-green-600"
															: confidence >= 40
																? "text-amber-600"
																: "text-orange-600"
													}`}
												>
													{confidence >= 60
														? "+ High"
														: confidence >= 40
															? "~ Moderate"
															: "! Low"}
												</span>
											</div>
											<div className="metric-bar rounded-full">
												<div
													className="bg-primary h-full rounded-full transition-all duration-700"
													style={{
														width: `${confidence}%`,
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Action buttons */}
							<div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-4">
								<Link
									to="/predict"
									className="flex-1 bg-white hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 no-underline"
								>
									<span className="material-symbols-outlined">
										restart_alt
									</span>
									Test Another Student
								</Link>
								<Link
									to="/"
									className="flex-1 bg-white hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 no-underline"
								>
									<span className="material-symbols-outlined">
										dashboard
									</span>
									View Dashboard
								</Link>
							</div>
						</div>

						{/* Recommendations */}
						<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
							<div className="flex items-center gap-2 mb-4">
								<span className="material-symbols-outlined text-amber-500">
									lightbulb
								</span>
								<h3 className="font-bold text-slate-900 dark:text-white text-lg m-0">
									Recommendations
								</h3>
							</div>
							<ul className="space-y-3 list-none p-0 m-0">
								{tips.map((tip, i) => (
									<li
										key={i}
										className="flex gap-3 text-sm text-slate-600 dark:text-slate-300"
									>
										<span className="block w-1.5 h-1.5 mt-2 rounded-full bg-amber-500 shrink-0" />
										{tip}
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Sidebar: input parameters */}
					<div className="lg:col-span-1">
						<div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
							<h3 className="font-bold text-slate-900 dark:text-white text-base mb-4 pb-4 border-b border-slate-200 dark:border-slate-700 m-0">
								Input Parameters
							</h3>

							{storedForm ? (
								<div className="space-y-4 text-sm">
									{[
										{
											section: "Personal",
											fields: ["Gender", "Caste"],
										},
										{
											section: "Academic",
											fields: [
												"Class_ten_education",
												"twelve_education",
												"medium",
												"Class_X_Percentage",
												"Class_XII_Percentage",
											],
										},
										{
											section: "Parents",
											fields: [
												"Father_occupation",
												"Mother_occupation",
											],
										},
										{
											section: "Study Habits",
											fields: ["coaching", "time"],
										},
									].map(({ section, fields }) => (
										<div key={section}>
											<p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
												{section}
											</p>
											{fields.map((f) => (
												<div
													key={f}
													className="flex justify-between items-center mb-1.5"
												>
													<span className="text-slate-600 dark:text-slate-400 capitalize">
														{f.replace(/_/g, " ")}
													</span>
													<span className="font-semibold text-slate-900 dark:text-white text-right ml-2">
														{storedForm[f] || "—"}
													</span>
												</div>
											))}
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-slate-500">
									No input data available.
								</p>
							)}

							<div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
								<Link
									to="/predict"
									className="text-primary text-sm font-semibold hover:underline flex items-center gap-1 justify-center"
								>
									<span className="material-symbols-outlined text-base">
										edit
									</span>
									Edit Inputs
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
