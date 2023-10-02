import { RegisterForm, LoginForm } from "@/components";
import { HomePage, LoginPage, Page, RecipePage, SearchPage } from "@/pages";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes(props) {
    return (
            <Routes>
                <Route index element={<HomePage />} />

                <Route path="user" element={<ProtectedRoute redirectPath="/account/login"><Page /></ProtectedRoute>}>
                    <Route path="search" element={<SearchPage {...props} />} />
                    <Route path="recipes" element={<RecipePage />} />
                </Route>

                <Route path="account" element={<LoginPage />}>
                    <Route path="login" element={<LoginForm />} />
                    <Route path="register" element={<RegisterForm />} />
                </Route>
            </Routes>
    );
}