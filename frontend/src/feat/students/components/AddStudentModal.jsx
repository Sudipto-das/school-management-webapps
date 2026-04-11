import { useState,useEffect } from "react"
import { useStudent } from "../hooks/useStudent"

const AddStudentModal = ({ onClose,student }) => {
  const { addStudent, loading, editStudent } = useStudent();
  const isEditMode = !!student;
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    classNumber: "",
    guirdenName: "",
    guirdenPhoneNumber: "",
    email: ""
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        roll: student.roll?.toString() || "",
        classNumber: student.classNumber?.toString() || "",
        guirdenName: student.guirdenName || "",
        guirdenPhoneNumber: student.guirdenPhoneNumber?.toString() || "",
        email: student.email || ""
      });
    }
  }, [student]);


 const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      roll: parseInt(formData.roll),
      classNumber: parseInt(formData.classNumber),
      guirdenName: formData.guirdenName,
      guirdenPhoneNumber: parseInt(formData.guirdenPhoneNumber),
      email: formData.email
    };

    if (isEditMode) {
      await editStudent(student.id, data);
    } else {
      await addStudent(data);
    }

    onClose();
  };



  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{isEditMode ? "Edit Student" : "Add New Student"}</h2>
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                placeholder="Enter student name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roll</label>
                <input
                  type="number"
                  value={formData.roll}
                  onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                  placeholder="Roll number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <input
                  type="number"
                  value={formData.classNumber}
                  onChange={(e) => setFormData({ ...formData, classNumber: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                  placeholder="Class"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name</label>
              <input
                type="text"
                value={formData.guirdenName}
                onChange={(e) => setFormData({ ...formData, guirdenName: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                placeholder="Enter guardian name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Phone</label>
              <input
                type="tel"
                value={formData.guirdenPhoneNumber}
                onChange={(e) => setFormData({ ...formData, guirdenPhoneNumber: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                placeholder="Enter guardian phone"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

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
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : isEditMode ? "Update Student" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStudentModal