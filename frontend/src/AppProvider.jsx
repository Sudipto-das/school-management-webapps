import { AuthProvider } from "./feat/auth/context/AuthContext";
import { DashboardProvider } from "./feat/dashboard/context/DashboardContext";

const AppProvider = ({ children }) => {
    const providers = [AuthProvider, DashboardProvider]
    return (
        providers.reduce((acc, Provider) => {
            return <Provider>{acc}</Provider>
        }, children)
    )
}
export default AppProvider