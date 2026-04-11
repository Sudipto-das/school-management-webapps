

import { useAuth } from "../feat/auth/hooks/useAuth"
import { Navigate } from "react-router"
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth()
    


    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : user ? (
                <Navigate to="/dashboard" replace />
            ) : (
                children
            )}
        </>
    )
}
export default PublicRoute