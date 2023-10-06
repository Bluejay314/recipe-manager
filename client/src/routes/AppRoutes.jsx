import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { RecipeBuildProvider } from "@/context/RecipeBuildContext";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import RecipePage from "@/pages/RecipePage";
import LoginPage from "@/pages/LoginPage";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

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