import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage, SearchPage } from "@/pages";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import recipes from "./data/allrecipes"

export default function App() {
    return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<AppRoutes items={recipes}/>
		</ErrorBoundary>
	);
}