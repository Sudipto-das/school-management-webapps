import { useState, useEffect } from "react"

import {useStudent} from "../../students/hooks/useStudent"
import {useTask} from "../hooks/useTask"
const AssignModal = ({ onClose, task }) => {
  const { handleAssignTask, loading } = useTask()
  const { students, fetchStudents, loadingStudents } = useStudent()
  const [selectedStudents, setSelectedStudents] = useState([])


  useEffect(() => {
    fetchStudents()
  }, [])


  const toggleStudent = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleAssignTask(task._id, selectedStudents)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Assign Task: {task.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {loadingStudents ? (
            <div className="text-center py-4 text-gray-500">Loading students...</div>
          ) : students.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No students available</div>
          ) : (
            <div className="max-h-64 overflow-y-auto space-y-2">
              {students.map(student => (
                <label
                  key={student._id}
                  className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student._id)}
                    onChange={() => toggleStudent(student._id)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{student.name} - Roll: {student.roll}</span>
                </label>
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Assigning..." : "Assign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AssignModal