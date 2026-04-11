

import { createContext, useState } from "react"
import { getStudents, updateStudent, deleteStudent, getStudentById, createStudent } from "../services/student.services"
 

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchStudents = async () => {
        try {
            setLoading(true)
            const data = await getStudents();
            setStudents(data.map(s => ({ ...s, id: s._id || s.id })));
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    };

    const addStudent = async (student) => {
        try {
            const newStudent = await createStudent(student);
            const studentId = newStudent._id || newStudent.id;
            setStudents([...students, { ...newStudent, id: studentId }]);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    };

    const editStudent = async (id, student) => {
        try {
            setLoading(true);
            const updatedStudent = await updateStudent(id, student);
            const studentId = updatedStudent._id || updatedStudent.id || id;
            setStudents(students.map((s) => ((s._id || s.id) === id ? { ...updatedStudent, id: studentId } : s)));
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    };

    const removeStudent = async (id) => {
        try {
            await deleteStudent(id);
            setStudents(students.filter((s) => (s._id || s.id) !== id));
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    };

    const getStudent = async (id) => {
        try {
            const student = await getStudentById(id);
            return student;
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    };

    return (
        <StudentContext.Provider
            value={{
                students,
                loading,
                fetchStudents,
                addStudent,
                editStudent,
                removeStudent,
                getStudent,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
};