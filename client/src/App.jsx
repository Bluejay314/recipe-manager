import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import recipes from "./data/allrecipes"
import { UserProvider } from "./context/UserContext";

export default function App() {
    return (
			<UserProvider>
					<AppRoutes items={recipes}/>
			</UserProvider>
	);
}