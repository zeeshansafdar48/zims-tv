import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "@/pages/NotFound";

export default function AppRoutes() {
  const routes = useRoutes([
    { path: "/login", element: <Login /> },
    // {
    //   path: "/dashboard",
    //   element: (
    //     <ProtectedRoute>
    //       <Dashboard />
    //     </ProtectedRoute>
    //   ),
    // },
    // Dynamic route example
    // {
    //   path: "/user/:id",
    //   element: (
    //     <ProtectedRoute>
    //       <div>User Profile (dynamic route)</div>
    //     </ProtectedRoute>
    //   ),
    // },
    // Fallback for 404
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
}
