import { useStudent } from "../hooks/useStudent"
import { useEffect, useState } from "react"
import AddStudentModal from "../components/AddStudentModal"
import Loader from "../../../components/Loader"

const Students = () => {
  const { students, loading, fetchStudents, removeStudent } = useStudent();
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await removeStudent(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-3 md:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Students</h1>
          <p className="text-gray-500 mt-1">Manage your student records</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Student
        </button>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No students found</p>
          <p className="text-sm">Add a new student to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg max-h-[70vh] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">Name</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">Roll</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">Class</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">Guardian</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">Phone</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">Email</th>
                <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 md:px-6 py-3 md:py-4 font-medium text-gray-800 whitespace-nowrap">{student.name}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600 whitespace-nowrap">{student.roll}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600 whitespace-nowrap">{student.classNumber}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600 whitespace-nowrap">{student.guirdenName}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600 whitespace-nowrap">{student.guirdenPhoneNumber}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600 whitespace-nowrap">{student.email}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-1 md:gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-blue-600 hover:text-blue-800 text-sm px-2 md:px-3 py-1 rounded hover:bg-blue-50 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-red-600 hover:text-red-800 text-sm px-2 md:px-3 py-1 rounded hover:bg-red-50 transition"
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

      {showModal && (
        <AddStudentModal onClose={handleCloseModal} student={editingStudent} />
      )}
    </div>
  );
};

export default Students;