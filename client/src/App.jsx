import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage, SearchPage } from "@/pages";
import { recipes } from "@/data/allrecipes";
import "./App.css";

export default function App() {
    return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<SearchPage items={recipes}/>
		</ErrorBoundary>
	);
}