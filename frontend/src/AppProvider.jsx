import { AuthProvider } from "./feat/auth/context/AuthContext";
import { DashboardProvider } from "./feat/dashboard/context/DashboardContext";
import { StudentProvider } from "./feat/students/context/StudentContext";
import { TaskProvider } from "./feat/tasks/context/TaskContext";
const AppProvider = ({ children }) => {
    const providers = [AuthProvider, DashboardProvider,StudentProvider,TaskProvider]
    return (
        providers.reduce((acc, Provider) => {
            return <Provider>{acc}</Provider>
        }, children)
    )
}
export default AppProvider