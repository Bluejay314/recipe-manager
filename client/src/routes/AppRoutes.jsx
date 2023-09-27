import { HomePage, SearchPage } from "@/pages";
import { Routes, Route } from "react-router-dom";

function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<HomePage />} />

            <Route
                path="recipes"
                element={<SearchPage {...props} />}
            >
            </Route>
        </Routes>
    );
}

export default AppRoutes;
