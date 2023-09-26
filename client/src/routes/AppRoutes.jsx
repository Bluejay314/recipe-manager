import { HomePage, SearchPage } from "@/pages";
import { Routes, Route } from "react-router-dom";

function AppRoutes() {
    return (
        <Routes>
            <Route index element={<HomePage />} />

            <Route
                path="recipes"
                element={<SearchPage />}
            >
            </Route>
        </Routes>
    );
}

export default AppRoutes;
