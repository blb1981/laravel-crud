import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./views/Login";
import Users from "./views/Users";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/users", element: <Users /> },
      { path: "/users/new", element: <UserForm key="userCreate" /> },
      { path: "/users/:id", element: <UserForm key="userUpdate" /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
