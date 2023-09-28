import { RegisterForm, SignInForm } from "@/components";
import { HomePage, LoginPage, RecipePage, SearchPage } from "@/pages";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage {...props} />} />
            <Route path="recipes" element={<RecipePage />} />
            <Route path="account" element={<LoginPage />}>
                <Route path="login" element={<SignInForm />} />
                <Route path="register" element={<RegisterForm />} />
            </Route>
        </Routes>
    );
}