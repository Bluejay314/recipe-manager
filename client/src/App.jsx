import { ErrorBoundary } from "react-error-boundary";
import { HomePage, ErrorPage } from "@/pages";
import "./App.css";

export default function App() {
    return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<HomePage />
		</ErrorBoundary>
	);
}