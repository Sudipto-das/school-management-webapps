import { Navigate, useLocation } from "react-router";
import { useAuth } from "../feat/auth/hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation();
    const from = location.state?.from || "/dashboard"
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : user ? (
                children
            ) : (
                <Navigate to="/" state={{ from }} replace />
            )}
        </>
    )
}


export default PrivateRoute;