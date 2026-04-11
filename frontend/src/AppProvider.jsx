import { AuthProvider } from "./feat/auth/context/AuthContext";


const AppProvider = ({ children }) => {
    const providers = [AuthProvider]
    return (
        providers.reduce((acc, Provider) => {
            return <Provider>{acc}</Provider>
        }, children)
    )
}
export default AppProvider