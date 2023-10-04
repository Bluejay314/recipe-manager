import { RegisterForm, LoginForm } from "@/components";
import { HomePage, LoginPage, RecipePage, SearchPage } from "@/pages";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { RecipeBuildProvider } from "@/context/RecipeBuildContext";

export default function AppRoutes(props) {
    return (
            <Routes>
                <Route index element={<ProtectedRoute redirectPath="/account/login"><HomePage /></ProtectedRoute>} />

                <Route path="user" element={<ProtectedRoute redirectPath="/account/login" />}>
                    <Route path="search" element={<SearchPage/>} />
                    <Route path="recipes" element={<RecipeBuildProvider><RecipePage /></RecipeBuildProvider>} />
                </Route>

                <Route path="account" element={<LoginPage />}>
                    <Route path="login" element={<LoginForm />} />
                    <Route path="register" element={<RegisterForm />} />
                </Route>
            </Routes>
    );
}