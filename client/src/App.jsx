import { ErrorBoundary } from "react-error-boundary";
import HomePage from "./pages/HomePage";
import "./styleSheets/App.css";
import ErrorPage from "./pages/ErrorPage";

function App() {
    return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<HomePage />
		</ErrorBoundary>
	);
}

export default App;
