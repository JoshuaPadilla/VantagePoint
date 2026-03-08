import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

const features = [
	{
		group: "Demographic Information",
		icon: "person",
		items: [
			{ label: "Gender", values: ["male", "female"] },
			{ label: "Caste", values: ["General", "OBC", "SC", "ST"] },
			{
				label: "Medium of instruction",
				values: ["ENGLISH", "ASSAMESE", "OTHERS"],
			},
		],
	},
	{
		group: "Academic Background",
		icon: "school",
		items: [
			{
				label: "Class Ten Education Board",
				values: ["SEBA", "CBSE", "OTHERS"],
			},
			{
				label: "Class Twelve Education Board",
				values: ["AHSEC", "CBSE", "OTHERS"],
			},
			{
				label: "Class X Percentage",
				values: ["Excellent", "Vg", "Good", "Average"],
			},
			{
				label: "Class XII Percentage",
				values: ["Excellent", "Vg", "Good", "Average"],
			},
		],
	},
	{
		group: "Socio-Economic Factors",
		icon: "family_restroom",
		items: [
			{
				label: "Father's Occupation",
				values: [
					"DOCTOR",
					"SCHOOL_TEACHER",
					"COLLEGE_TEACHER",
					"BUSINESS",
					"BANK_OFFICIAL",
					"ENGINEER",
					"CULTIVATOR",
					"OTHERS",
				],
			},
			{
				label: "Mother's Occupation",
				values: [
					"HOUSE_WIFE",
					"DOCTOR",
					"SCHOOL_TEACHER",
					"COLLEGE_TEACHER",
					"BUSINESS",
					"BANK_OFFICIAL",
					"ENGINEER",
					"CULTIVATOR",
					"OTHERS",
				],
			},
		],
	},
	{
		group: "Preparation Factor",
		icon: "timer",
		items: [
			{ label: "Coaching type", values: ["NO", "WA", "OA"] },
			{
				label: "Daily study time (hours)",
				values: ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN"],
			},
		],
	},
];

const rfReasons = [
	"Many shallow trees with small learning rate reduce variance on small datasets",
	"Sequentially corrects errors, improving accuracy at each step",
	"Performs well in multi-class classification problems",
	"Feature engineering (academic sum & product) boosts signal capture",
];

const confusionMatrix = {
	labels: ["Average", "Good", "Vg", "Excellent"],
	rows: [
		{ actual: "Average", values: [23, 8, 0, 0] },
		{ actual: "Good", values: [2, 21, 10, 1] },
		{ actual: "Vg", values: [2, 20, 19, 1] },
		{ actual: "Excellent", values: [2, 11, 9, 5] },
	],
};

const objectives = [
	"To collect and prepare a structured dataset related to student entrance exam performance",
	"To build a predictive classification model",
	"To evaluate model performance using: Accuracy, Precision, Recall, F1 Score, and Confusion Matrix",
	"To design a user interface that allows performance prediction based on student input data",
];

const scopeItems = [
	"Uses Kaggle dataset as proxy data",
	"Focused on classification-based prediction",
	"Multi-class performance categorization",
	"Includes UI for prediction input and output display",
];

const contributions = [
	"Assist in predicting entrance exam outcomes",
	"Identify patterns in academic and socio-economic factors",
	"Support early academic performance analysis",
];

const metrics = [
	{ label: "Accuracy", value: "0.5075" },
	{ label: "Precision", value: "0.5729" },
	{ label: "Recall", value: "0.5075" },
	{ label: "F1 Score", value: "0.4989" },
];

function About() {
	return (
		<main className="page-wrap flex-1 px-4 py-8 sm:py-12 rise-in">
			{/* Hero */}
			<section className="mb-14 text-center max-w-3xl mx-auto">
				<div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 border border-blue-100 dark:border-blue-800 mb-6">
					<span className="material-symbols-outlined text-primary text-sm">
						info
					</span>
					<span className="text-primary text-xs font-bold uppercase tracking-wider">
						Thesis Documentation
					</span>
				</div>
				<h1 className="mb-4 mt-0 text-2xl font-black leading-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
					Prediction of Student Performance in the Entrance
					Examination using Classification Technique
				</h1>
				<p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed m-0">
					This thesis focuses on predicting student performance in an
					entrance examination using machine learning classification
					techniques. The system analyzes student background data and
					academic history to predict the expected performance
					category.
				</p>
			</section>

			{/* Performance class pills */}
			<section className="mb-14 flex flex-wrap justify-center gap-3">
				{[
					{
						label: "Excellent",
						color: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
					},
					{
						label: "Very Good",
						color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
					},
					{
						label: "Good",
						color: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
					},
					{
						label: "Average",
						color: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
					},
				].map((c) => (
					<span
						key={c.label}
						className={`px-5 py-2 rounded-full border text-sm font-semibold ${c.color}`}
					>
						{c.label}
					</span>
				))}
			</section>

			{/* Data Source */}
			<section className="mb-14">
				<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
					<div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/20 sm:px-8 sm:py-5">
						<span className="material-symbols-outlined text-primary">
							dataset
						</span>
						<h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 m-0">
							Data Source
						</h2>
					</div>
					<div className="flex flex-col items-start gap-6 p-5 sm:p-8 md:flex-row md:gap-8">
						<div className="flex-1 space-y-3">
							<p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed m-0">
								Due to data access limitations, the study uses a
								proxy dataset from Kaggle:{" "}
								<strong className="text-slate-800 dark:text-slate-200">
									Student Performance on an Entrance
									Examination
								</strong>
								. This dataset contains demographic, academic,
								and socio-economic attributes of students and
								serves as a structured substitute for
								institution-specific entrance exam data.
							</p>
							<a
								href="https://www.kaggle.com/datasets/adilshamim8/student-performance-on-an-entrance-examination"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:underline"
							>
								<span className="material-symbols-outlined text-base">
									open_in_new
								</span>
								View on Kaggle
							</a>
						</div>
						<div className="flex-shrink-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700 p-6 gap-2 min-w-[140px] text-center">
							<span className="material-symbols-outlined text-4xl text-primary/40">
								table_chart
							</span>
							<p className="text-xs font-semibold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">
								Proxy Dataset
							</p>
							<p className="text-xs text-slate-400 dark:text-slate-600 m-0">
								Kaggle · 11 Features
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="mb-14">
				<div className="mb-6">
					<h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0 mb-1">
						Features Used in the Model
					</h2>
					<p className="text-slate-500 dark:text-slate-400 text-sm m-0">
						Input variables encoded and used as predictors in the
						classification model.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
					{features.map((f) => (
						<div
							key={f.group}
							className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm"
						>
							<div className="flex items-center gap-2 mb-4">
								<span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
									<span className="material-symbols-outlined text-lg">
										{f.icon}
									</span>
								</span>
								<h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 m-0">
									{f.group}
								</h3>
							</div>
							<ul className="space-y-3 list-none m-0 p-0">
								{f.items.map((item) => (
									<li
										key={item.label}
										className="space-y-1.5"
									>
										<div className="flex items-start gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
											<span className="material-symbols-outlined text-primary text-sm shrink-0 mt-0.5">
												arrow_right
											</span>
											{item.label}
										</div>
										<div className="flex flex-wrap gap-1 pl-5">
											{item.values.map((v) => (
												<span
													key={v}
													className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono"
												>
													{v}
												</span>
											))}
										</div>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			{/* Methodology */}
			<section className="mb-14">
				<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
					<div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/20 sm:px-8 sm:py-5">
						<span className="material-symbols-outlined text-primary">
							account_tree
						</span>
						<h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 m-0">
							Core Methodology
						</h2>
					</div>
					<div className="grid grid-cols-1 gap-6 p-5 sm:p-8 md:grid-cols-2 md:gap-8">
						<div className="space-y-4">
							<h3 className="text-sm font-bold text-primary uppercase tracking-wider m-0">
								Model Used
							</h3>
							<div className="flex items-center gap-3">
								<span className="material-symbols-outlined text-3xl text-primary/30">
									trending_up
								</span>
								<span className="text-xl font-bold text-slate-900 dark:text-white">
									Random Forest Classifier
								</span>
							</div>
							<p className="text-sm text-slate-500 dark:text-slate-400 m-0 font-semibold">
								Selected because:
							</p>
							<ul className="space-y-2 list-none m-0 p-0">
								{rfReasons.map((r) => (
									<li
										key={r}
										className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
									>
										<span className="material-symbols-outlined text-green-500 text-base shrink-0 mt-0.5">
											check
										</span>
										{r}
									</li>
								))}
							</ul>
						</div>
						<div className="space-y-4">
							<h3 className="text-sm font-bold text-primary uppercase tracking-wider m-0">
								Target Variable
							</h3>
							<p className="text-sm text-slate-600 dark:text-slate-400 m-0">
								Entrance examination performance category:
							</p>
							<div className="space-y-2">
								{[
									{
										code: "3",
										label: "Excellent",
										color: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
									},
									{
										code: "2",
										label: "Vg (Very Good)",
										color: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
									},
									{
										code: "1",
										label: "Good",
										color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
									},
									{
										code: "0",
										label: "Average",
										color: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
									},
								].map((t) => (
									<div
										key={t.code}
										className="flex items-center gap-3"
									>
										<span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
											{t.code}
										</span>
										<span
											className={`text-sm font-semibold px-3 py-0.5 rounded-full ${t.color}`}
										>
											{t.label}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Model Evaluation */}
			<section className="mb-14">
				<div className="mb-6">
					<h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0 mb-1">
						Model Evaluation Results
					</h2>
					<p className="text-slate-500 dark:text-slate-400 text-sm m-0">
						Trained Gradient Boosting Classifier performance on the
						held-out test set.
					</p>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					{metrics.map((m) => (
						<div
							key={m.label}
							className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm text-center"
						>
							<p className="text-2xl font-black text-slate-900 dark:text-white m-0">
								{m.value}
							</p>
							<p className="text-xs text-slate-500 uppercase font-semibold mt-1 m-0">
								{m.label}
							</p>
						</div>
					))}
				</div>
				<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
					<div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/20 sm:px-8 sm:py-5">
						<span className="material-symbols-outlined text-primary">
							grid_on
						</span>
						<h3 className="text-base font-bold text-slate-800 dark:text-slate-200 m-0">
							Confusion Matrix
						</h3>
					</div>
					<div className="overflow-x-auto p-4 sm:p-6">
						<table className="w-full text-sm text-center">
							<thead>
								<tr>
									<th className="px-3 py-2 text-left text-xs text-slate-500 font-semibold uppercase sm:px-4">
										Actual \ Predicted
									</th>
									{confusionMatrix.labels.map((l) => (
										<th
											key={l}
											className="px-3 py-2 text-xs text-slate-500 font-semibold uppercase sm:px-4"
										>
											{l}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{confusionMatrix.rows.map((row, ri) => (
									<tr
										key={row.actual}
										className="border-t border-slate-100 dark:border-slate-800"
									>
										<td className="px-3 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase sm:px-4">
											{row.actual}
										</td>
										{row.values.map((v, ci) => (
											<td
												key={ci}
												className={`px-3 py-3 font-bold sm:px-4 ${
													ri === ci
														? "text-primary bg-blue-50 dark:bg-blue-900/20"
														: "text-slate-600 dark:text-slate-400"
												}`}
											>
												{v}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
						<p className="text-xs text-slate-400 dark:text-slate-600 mt-4 mb-0">
							The results show moderate predictive capability. The
							model demonstrates challenges in distinguishing
							higher performance levels.
						</p>
					</div>
				</div>
			</section>

			{/* Objectives + Scope/Contribution */}
			<section className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
					<div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-2">
						<span className="material-symbols-outlined text-primary">
							checklist
						</span>
						<h2 className="text-base font-bold text-slate-800 dark:text-slate-200 m-0">
							Objectives of the Study
						</h2>
					</div>
					<ol className="p-6 space-y-3 list-none m-0">
						{objectives.map((obj, i) => (
							<li key={i} className="flex items-start gap-3">
								<span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
									{i + 1}
								</span>
								<p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed m-0 pt-0.5">
									{obj}
								</p>
							</li>
						))}
					</ol>
				</div>

				<div className="flex flex-col gap-6">
					<div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
						<div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-2">
							<span className="material-symbols-outlined text-primary">
								crop_square
							</span>
							<h2 className="text-base font-bold text-slate-800 dark:text-slate-200 m-0">
								Scope
							</h2>
						</div>
						<ul className="p-6 space-y-2 list-none m-0">
							{scopeItems.map((s) => (
								<li
									key={s}
									className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
								>
									<span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">
										arrow_right
									</span>
									{s}
								</li>
							))}
						</ul>
					</div>

					<div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
						<div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-2">
							<span className="material-symbols-outlined text-primary">
								emoji_objects
							</span>
							<h2 className="text-base font-bold text-slate-800 dark:text-slate-200 m-0">
								Expected Contribution
							</h2>
						</div>
						<div className="p-6 space-y-3">
							<p className="text-sm text-slate-600 dark:text-slate-400 m-0">
								This study demonstrates how machine learning
								can:
							</p>
							<ul className="space-y-2 list-none m-0 p-0">
								{contributions.map((c) => (
									<li
										key={c}
										className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
									>
										<span className="material-symbols-outlined text-green-500 text-base shrink-0 mt-0.5">
											check
										</span>
										{c}
									</li>
								))}
							</ul>
							<p className="text-xs text-slate-400 dark:text-slate-600 m-0 pt-1">
								Provides a foundation for future work using real
								institutional data.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="text-center py-4">
				<Link
					to="/predict"
					className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors text-sm"
				>
					<span className="material-symbols-outlined text-white text-lg">
						psychology
					</span>
					<span className="text-white">Try the Prediction Tool</span>
				</Link>
			</section>
		</main>
	);
}
