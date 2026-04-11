import { StudentContext } from "../context/StudentContext";
import { useContext } from "react";
export const useStudent = () => {
    return useContext(StudentContext);
}