import { createBrowserRouter } from "react-router";
import Register from "./feat/auth/pages/register";
import Login from "./feat/auth/pages/login";
import Dashboard from "./feat/dashboard/pages/Dashboard";
import Students from "./feat/students/pages/Students";
import Tasks from "./feat/tasks/pages/Tasks";
import PrivateRoute from "./protect-route/PrivateRoute";
import PublicRoute from "./protect-route/PublicRoute";
import Layout from "./components/Layout/Layout";

export const router = createBrowserRouter([
    {
        path: "/register",
        element: <PublicRoute><Register /></PublicRoute>,
    },
    {
        path: "/",
        element: <PublicRoute><Login /></PublicRoute>,
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>
    },
    {
        path: '/students',
        element: <PrivateRoute><Layout><Students /></Layout></PrivateRoute>
    },
    {
        path: '/tasks',
        element: <PrivateRoute><Layout><Tasks /></Layout></PrivateRoute>
    }
])