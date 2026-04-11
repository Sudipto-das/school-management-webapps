
import { Link, useLocation } from "react-router"
import { FaHome, FaUserGraduate, FaTasks, FaTimes } from 'react-icons/fa'

const Sidebar = ({ onClose }) => {
      const location = useLocation()
      const currentPath = location.pathname.replace('/', '')
      
      return(
          <div className="w-64 bg-gray-800 text-white h-screen p-4 left-0 top-0 md:relative">
              <button 
                className="md:hidden absolute top-4 right-4 text-white"
                onClick={onClose}
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-bold mb-6 flex justify-center">Admin Panel</h2>
              <ul>
                  <li className={`mb-4 p-2 rounded cursor-pointer ${currentPath === 'dashboard' ? 'bg-gray-700' : ''}`}>
                      <Link to="/dashboard" className="flex items-center" onClick={onClose}>
                          <FaHome className="mr-2" /> Dashboard
                      </Link>
                  </li>
                  <li className={`mb-4 p-2 rounded cursor-pointer ${currentPath === 'students' ? 'bg-gray-700' : ''}`}>
                      <Link to="/students" className="flex items-center" onClick={onClose}>
                          <FaUserGraduate className="mr-2" /> Students
                     </Link>
                  </li>
                  <li className={`mb-4 p-2 rounded cursor-pointer ${currentPath === 'tasks' ? 'bg-gray-700' : ''}`}>
                      <Link to="/tasks" className="flex items-center" onClick={onClose}>
                          <FaTasks className="mr-2" /> Tasks
                      </Link>
                  </li>
              </ul>
          </div>
       )
}

export default Sidebar