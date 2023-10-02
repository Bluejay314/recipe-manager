import { useUserContext } from "@/context/UserContext";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ redirectPath = "/", children }) {
    const { currentUser } = useUserContext();

    if (!currentUser.token) return <Navigate to={redirectPath} replace />

    return children ? children : <Outlet />;
}

export default ProtectedRoute;
