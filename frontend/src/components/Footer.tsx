export default function Footer() {
	return (
		<footer className="border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark py-8">
			<div className="page-wrap px-4 md:px-0 flex flex-col md:flex-row items-center justify-between gap-4">
				<p className="text-slate-400 dark:text-slate-500 text-sm m-0">
					&copy; {new Date().getFullYear()} Vantage Point.
				</p>
				<div className="flex items-center gap-6">
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
