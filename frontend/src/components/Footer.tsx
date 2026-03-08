export default function Footer() {
	return (
		<footer className="border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark py-8">
			<div className="page-wrap flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
				<p className="m-0 text-sm text-slate-400 dark:text-slate-500">
					&copy; {new Date().getFullYear()} Vantage Point.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:justify-end">
					<a
						href="#"
						className="text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors"
					>
						Privacy Policy
					</a>
					<a
						href="#"
						className="text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors"
					>
						Help Center
					</a>
				</div>
			</div>
		</footer>
	);
}
