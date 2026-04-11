import { useState } from "react";
import { createContext } from "react";
import { getDashboardStats, getDashboardRecent } from "../services/dashboard.services";
export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [stats, setStats] = useState(null);
    const [recent, setRecent] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleGetStats = async () => {
        try {
            setLoading(true);
            const data = await getDashboardStats();
            setStats(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const handleGetRecent = async () => {
        try {
            setLoading(true);
            const data = await getDashboardRecent();
            setRecent(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <DashboardContext.Provider value={{ stats, recent, loading, handleGetStats, handleGetRecent }}>
            {children}
        </DashboardContext.Provider>
    )


}