import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import logo_and_text from "../assets/logo_and_text.png";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	const location = useRouterState({ select: (s) => s.location.pathname });

	const navigate = useNavigate();

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

	return (
		<header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
			<div className="page-wrap flex items-center justify-between py-4 px-4 md:px-0">
				{/* Brand */}
				<Link to="/" className="flex items-center gap-3 no-underline">
					<img
						src={logo_and_text}
						alt="Arbor Logo"
						className="h-12 ml-2"
					/>
				</Link>

				{/* Nav */}
				<nav className="hidden md:flex items-center gap-6">
					{navLink("/", "Dashboard")}
					{navLink("/predict", "Prediction Tool")}
					{navLink("/about", "About")}
				</nav>

				{/* Actions */}
				<div className="flex items-center gap-3">
					<ThemeToggle />
					<button
						className="hidden sm:flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95"
						onClick={() => navigate({ to: "/predict" })}
					>
						<span>Start Prediction</span>
					</button>
				</div>
			</div>
		</header>
	);
}
