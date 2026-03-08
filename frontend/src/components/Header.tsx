import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo_and_text from "../assets/logo_and_text.png";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	const location = useRouterState({ select: (s) => s.location.pathname });
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [location]);

	const navLink = (to: string, label: string) => {
		const isActive = location === to;
		return (
			<Link
				to={to as any}
				className={`text-sm font-medium transition-colors ${
					isActive
						? "text-primary font-bold"
						: "text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
				}`}
			>
				{label}
			</Link>
		);
	};

	const navDropdownItem = (
		to: string,
		label: string,
		onClick?: () => void,
	) => {
		const isActive = location === to;
		return (
			<Link
				to={to as any}
				onClick={onClick}
				className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
					isActive
						? "bg-primary/10 text-primary"
						: "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
				}`}
			>
				<span>{label}</span>
				<span
					className="material-symbols-outlined text-base"
					aria-hidden="true"
				>
					chevron_right
				</span>
			</Link>
		);
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
			<div className="page-wrap py-3 md:py-4">
				<div className="relative flex items-center justify-between gap-3">
					{/* Brand */}
					<Link
						to="/"
						className="flex items-center gap-3 no-underline"
					>
						<img
							src={logo_and_text}
							alt="Arbor Logo"
							className="h-9 sm:h-11 md:h-12"
						/>
					</Link>

					{/* Nav */}
					<nav className="hidden md:flex items-center gap-6">
						{navLink("/", "Dashboard")}
						{navLink("/predict", "Prediction Tool")}
						{navLink("/about", "About")}
					</nav>

					{/* Actions */}
					<div className="flex items-center gap-2 sm:gap-3">
						<ThemeToggle />
						<button
							type="button"
							className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
							onClick={() => setIsMobileMenuOpen((prev) => !prev)}
							aria-label={
								isMobileMenuOpen
									? "Close navigation menu"
									: "Open navigation menu"
							}
							aria-expanded={isMobileMenuOpen}
							aria-controls="mobile-main-nav"
						>
							<span
								className="material-symbols-outlined"
								aria-hidden="true"
							>
								{isMobileMenuOpen ? "close" : "menu"}
							</span>
						</button>
						<button
							className="hidden md:flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95"
							onClick={() => navigate({ to: "/predict" })}
						>
							<span>Start Prediction</span>
						</button>
					</div>
				</div>

				{isMobileMenuOpen && (
					<nav
						id="mobile-main-nav"
						className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900 md:hidden"
					>
						<div className="space-y-1">
							{navDropdownItem("/", "Dashboard", () =>
								setIsMobileMenuOpen(false),
							)}
							{navDropdownItem(
								"/predict",
								"Prediction Tool",
								() => setIsMobileMenuOpen(false),
							)}
							{navDropdownItem("/about", "About", () =>
								setIsMobileMenuOpen(false),
							)}
						</div>
						<div className="my-3 h-px bg-slate-200 dark:bg-slate-700" />
						<button
							type="button"
							className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark active:scale-95"
							onClick={() => {
								setIsMobileMenuOpen(false);
								navigate({ to: "/predict" });
							}}
						>
							<span>Start Prediction</span>
						</button>
					</nav>
				)}
			</div>
		</header>
	);
}
