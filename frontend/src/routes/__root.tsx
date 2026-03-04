import { Outlet, createRootRoute } from "@tanstack/react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles.css";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased">
			<Header />
			<div className="flex-1">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
