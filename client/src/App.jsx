import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage, SearchPage } from "@/pages";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import recipes from "./data/allrecipes"
import { UserProvider } from "./context/UserContext";
import { RecipeBuildProvider } from "./context/RecipeBuildContext";

export default function App() {
    return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<UserProvider>
				<RecipeBuildProvider>
					<AppRoutes items={recipes}/>
				</RecipeBuildProvider>
			</UserProvider>
		</ErrorBoundary>
	);
}