import { createFileRoute } from "@tanstack/react-router";

type EvalData = {
	model_name: string;
	dataset_source: string;
	metrics: {
		accuracy: number;
		f1_score: number;
		precision: number;
		recall: number;
	};
	confusion_matrix: number[][];
	class_labels: Record<string, string>;
};

export const Route = createFileRoute("/")({
	loader: async (): Promise<EvalData> => {
		const res = await fetch("/vantage/api/evaluation");
		if (!res.ok) throw new Error("Failed to fetch evaluation data");

		return res.json();
	},
	component: EvaluationPage,
});

function MetricCard({
	icon,
	label,
	value,
	color,
}: {
	icon: string;
	label: string;
	value: number;
	color: string;
}) {
	const pct = (value * 100).toFixed(1);
	return (
		<div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group rise-in">
			<div
				className={`absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${color}-600`}
			>
				<span className={`material-symbols-outlined text-6xl`}>
					{icon}
				</span>
			</div>
			<span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
				{label}
			</span>
			<div className="mt-1 flex items-baseline gap-2">
				<span className="text-4xl font-black text-slate-900 dark:text-white">
					{pct}%
				</span>
			</div>
			<div className="metric-bar mt-4 rounded-full">
				<div
					className={`bg-${color}-600 h-full rounded-full transition-all duration-700`}
					style={{ width: `${pct}%` }}
				/>
			</div>
		</div>
	);
}

function ConfusionMatrix({
	matrix,
	labels,
}: {
	matrix: number[][];
	labels: string[];
}) {
	const allValues = matrix.flat();
	const maxVal = Math.max(...allValues);

	const cellColor = (val: number, rowIdx: number, colIdx: number) => {
		const intensity = val / maxVal;
		if (rowIdx === colIdx) {
			return `rgba(19,109,236,${0.25 + intensity * 0.75})`;
		}
		return `rgba(226,232,240,${0.3 + intensity * 0.7})`;
	};

	const textColor = (val: number, rowIdx: number, colIdx: number) => {
		if (rowIdx === colIdx && val / maxVal > 0.4) return "text-white";
		return "text-slate-800 dark:text-slate-200";
	};

	return (
		<div className="overflow-x-auto">
			<div className="relative min-w-[340px]">
				{/* Axis labels */}
				<div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden md:block">
					Actual
				</div>
				<div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
					Predicted
				</div>
				{/* Column headers */}
				<div
					className="grid mb-1"
					style={{
						gridTemplateColumns: `80px repeat(${labels.length}, 1fr)`,
					}}
				>
					<div />
					{labels.map((l) => (
						<div
							key={l}
							className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 px-1 truncate"
						>
							{l}
						</div>
					))}
				</div>
				{/* Matrix rows */}
				{matrix.map((row, rIdx) => (
					<div
						key={rIdx}
						className="grid mb-1"
						style={{
							gridTemplateColumns: `80px repeat(${labels.length}, 1fr)`,
						}}
					>
						<div className="flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 pr-2 truncate">
							{labels[rIdx]}
						</div>
						{row.map((val, cIdx) => (
							<div
								key={cIdx}
								className={`rounded-md flex flex-col items-center justify-center p-2 min-h-[56px] cursor-default transition-transform hover:scale-105 ${textColor(val, rIdx, cIdx)}`}
								style={{
									background: cellColor(val, rIdx, cIdx),
								}}
							>
								<span className="text-lg font-bold leading-none">
									{val}
								</span>
								{rIdx === cIdx && (
									<span className="text-[9px] opacity-80 mt-0.5">
										✓ correct
									</span>
								)}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

function EvaluationPage() {
	const data = Route.useLoaderData();
	console.log(data);

	// Build ordered labels from class_labels (0→Average,1→Good,2→Vg,3→Excellent)
	const orderedLabels = Object.keys(data.class_labels)
		.sort((a, b) => Number(a) - Number(b))
		.map((k) => data.class_labels[k]);

	const metrics = [
		{
			icon: "check_circle",
			label: "Model Accuracy",
			value: data.metrics.accuracy,
			color: "blue",
		},
		{
			icon: "precision_manufacturing",
			label: "Precision Score",
			value: data.metrics.precision,
			color: "indigo",
		},
		{
			icon: "functions",
			label: "F1 Score",
			value: data.metrics.f1_score,
			color: "purple",
		},
		{
			icon: "replay",
			label: "Recall",
			value: data.metrics.recall,
			color: "violet",
		},
	];

	return (
		<main className="py-8 px-4">
			<div className="page-wrap">
				{/* Page header */}
				<div className="flex flex-col md:flex-row md:items-center mb-8 gap-4 rise-in justify-center">
					<div>
						<h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 m-0">
							<span className="material-symbols-outlined text-primary">
								model_training
							</span>
							Model Evaluation Results
						</h1>
						<p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
							{data.model_name} — {data.dataset_source}
						</p>
					</div>
				</div>

				{/* Metric cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
					{metrics.map((m, i) => (
						<div
							key={m.label}
							style={{ animationDelay: `${i * 80}ms` }}
						>
							<MetricCard {...m} />
						</div>
					))}
				</div>

				{/* Confusion matrix */}
				<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 rise-in">
					<div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
						<h3 className="font-bold text-slate-900 dark:text-white text-lg m-0">
							Confusion Matrix
						</h3>
						<div className="flex items-center gap-3 text-xs text-slate-500">
							<span className="flex items-center gap-1">
								<span className="w-3 h-3 rounded-sm bg-blue-100 inline-block" />{" "}
								Low
							</span>
							<span className="flex items-center gap-1">
								<span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />{" "}
								High
							</span>
						</div>
					</div>
					<div className="p-6 md:p-8">
						<ConfusionMatrix
							matrix={data.confusion_matrix}
							labels={orderedLabels}
						/>
					</div>
				</div>

				{/* Classification summary table */}
				<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm rise-in">
					<div className="p-5 border-b border-slate-100 dark:border-slate-800">
						<h3 className="font-bold text-slate-900 dark:text-white text-lg m-0">
							Per-Class Performance
						</h3>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
							<thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-bold text-slate-500 dark:text-slate-300">
								<tr>
									<th className="px-6 py-4">Class</th>
									<th className="px-6 py-4">
										True Positives (diagonal)
									</th>
									<th className="px-6 py-4">Total Actual</th>
									<th className="px-6 py-4">
										Class Accuracy
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
								{orderedLabels.map((label, idx) => {
									const tp =
										data.confusion_matrix[idx]?.[idx] ?? 0;
									const total =
										data.confusion_matrix[idx]?.reduce(
											(a: number, b: number) => a + b,
											0,
										) ?? 0;
									const acc =
										total > 0
											? ((tp / total) * 100).toFixed(1)
											: "—";
									return (
										<tr
											key={label}
											className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
										>
											<td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
												<span className="inline-block w-2.5 h-2.5 rounded-full bg-primary mr-2" />
												{label}
											</td>
											<td className="px-6 py-4">{tp}</td>
											<td className="px-6 py-4">
												{total}
											</td>
											<td className="px-6 py-4">
												{acc}%
											</td>
										</tr>
									);
								})}
								<tr className="bg-slate-50/50 dark:bg-slate-800/20 font-bold text-slate-900 dark:text-white">
									<td className="px-6 py-4">Overall</td>
									<td className="px-6 py-4">
										{data.confusion_matrix.reduce(
											(
												sum: number,
												row: number[],
												i: number,
											) => sum + (row[i] ?? 0),
											0,
										)}
									</td>
									<td className="px-6 py-4">
										{data.confusion_matrix
											.flat()
											.reduce(
												(a: number, b: number) => a + b,
												0,
											)}
									</td>
									<td className="px-6 py-4">
										{(data.metrics.accuracy * 100).toFixed(
											1,
										)}
										%
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</main>
	);
}
