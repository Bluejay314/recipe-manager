import { HomePage, RecipePage, SearchPage } from "@/pages";
import { Routes, Route } from "react-router-dom";

function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage {...props} />} />
            <Route path="recipes" element={<RecipePage {...props} />} />
        </Routes>
    );
}

export default AppRoutes;
