import { useEffect } from "react";
import { useDashboard } from "../hooks/useDashboard";
import Loader from "../../../components/Loader";

const Dashboard = () => {
    const { stats, recent, loading, error, handleGetStats, handleGetRecent } = useDashboard();

    useEffect(() => {
        handleGetStats();
        handleGetRecent();
        console.log(recent)
    }, [])

    if (loading) {
        return (
            <Loader />
        )
    }

    if (error) {
        return (
            <Error error={error} />
        )
    }

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 text-sm md:text-base">Welcome back! Here's an overview of your school.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Students</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{stats?.totalStudents || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Tasks</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{stats?.totalTasks || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Completed Tasks</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{stats?.completedTasks || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Pending Tasks</p>
                            <p className="text-2xl font-bold text-orange-600 mt-1">{stats?.pendingTasks || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-5 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800">Recent Students</h2>
                    </div>
                    <div className="p-5">
                        {recent?.recentStudents?.length > 0 ? (
                            <div className="space-y-4">
                                {recent.recentStudents.map((student) => (
                                    <div key={student._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-medium text-sm">
                                                    {student.name?.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-gray-800 font-medium text-sm">{student.name}</p>
                                                <p className="text-gray-500 text-xs">Class {student.classNumber} • Roll {student.roll}</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No recent students</p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-5 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800">Recent Tasks</h2>
                    </div>
                    <div className="p-5">
                        {recent?.recentTasks?.length > 0 ? (
                            <div className="space-y-4">
                                {recent.recentTasks.map((task) => (
                                    <div key={task._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                        <div className="flex-1">
                                            <p className="text-gray-800 font-medium text-sm">{task.title}</p>
                                            <p className="text-gray-500 text-xs mt-1">
                                                Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No deadline'}
                                            </p>
                                        </div>
                                        <span className="text-gray-400 text-xs">
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No recent tasks</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;