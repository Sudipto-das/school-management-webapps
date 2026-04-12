import { useParams } from "react-router";
import { useTask } from "../hooks/useTask";
import { useEffect } from "react";
const ManageTask = () => {
    const { id } = useParams();
    const { handleGetStudentsByTask, handleUpdateStudentTaskStatus, taskDetails, loading } = useTask()


    useEffect(() => {
        handleGetStudentsByTask(id)
    }, [id])

    const handleStatusChange = async (studentTaskId, taskId, e) => {
        e.preventDefault()
        try {
            await handleUpdateStudentTaskStatus(studentTaskId, taskId)
        } catch (error) {
            console.error('Failed to update status:', error)
        }
    }


    return (
        <div className="p-3 md:p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Task</h1>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : taskDetails.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">
                    <p className="text-lg">No students assigned</p>
                    <p className="text-sm">Assign students from the Tasks page</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Roll</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Class</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {taskDetails.map((st) => (
                                <tr key={st._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-800">{st.studentId?.roll}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{st.studentId?.name}</td>
                                    <td className="px-6 py-4 text-gray-600">Class {st.studentId?.classNumber}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={(e) => handleStatusChange(st.studentId._id, st.taskId, e)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${st.isCompleted
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                } transition-colors`}
                                        >
                                            {st.isCompleted ? 'Completed' : 'Pending'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
export default ManageTask;