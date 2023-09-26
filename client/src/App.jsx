import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage, SearchPage } from "@/pages";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
    return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<AppRoutes />
		</ErrorBoundary>
	);
}