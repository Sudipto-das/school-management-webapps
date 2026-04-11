import { createBrowserRouter } from "react-router";
import Register from "./feat/auth/pages/register";
import Login from "./feat/auth/pages/login";


export const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <Login />,
    }
])