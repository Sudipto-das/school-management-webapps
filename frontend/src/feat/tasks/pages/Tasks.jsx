import { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../context/TaskContext'
import Loader from '../../../components/Loader.jsx'
import Error from '../../../components/Error.jsx'
import TaskModal from '../components/TaskModal'
import AssignModal from '../components/AssignModal'
import { useNavigate } from 'react-router'

const Tasks = () => {
  const { tasks, loading, error, handleDeleteTask, fetchTasks } = useContext(TaskContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const navigate = useNavigate()

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (date) => {
    if (!date) return 'No due date'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  const handleClickOnBody = (taskId) => {
    navigate(`/manage-task/${taskId}`)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <div className="p-3 md:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
          <div className='flex gap-5 '>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setEditingTask(null)
                setShowModal(true)
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Task
            </button>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>
        </div>

        {error && (
          <Error error={error.message} />
        )}

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No tasks found</p>
            <p className="text-sm">Create a new task to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Head */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200" >
                {filteredTasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleClickOnBody(task._id)}>
                    {/* Title */}
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {task.title}
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                      {task.description || 'No description'}
                    </td>

                    {/* Due Date */}
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 ${isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-500'}`}>
                        <span>{formatDate(task.dueDate)}</span>
                        {isOverdue(task.dueDate) && (
                          <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">
                            Overdue
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingTask(task)
                            setShowModal(true)
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 rounded hover:bg-blue-50 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingTask(task)
                            setShowAssignModal(true)
                          }}
                          className="text-green-600 hover:text-green-800 text-sm px-3 py-1 rounded hover:bg-green-50 transition"
                        >
                          Assign
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteTask(task._id)
                          }}

                          className="text-red-600 hover:text-red-800 text-sm px-3 py-1 rounded hover:bg-red-50 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <TaskModal
          onClose={() => {
            setShowModal(false)
            setEditingTask(null)
          }}
          task={editingTask}
        />
      )}

      {showAssignModal && editingTask && (
        <AssignModal
          onClose={() => {
            setShowAssignModal(false)
            setEditingTask(null)
          }}
          task={editingTask}
        />
      )}
    </div>
  );
}


export default Tasks;