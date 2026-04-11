import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext.jsx";


export const useDashboard = () => {
    return useContext(DashboardContext);
}