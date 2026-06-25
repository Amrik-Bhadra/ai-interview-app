import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import NotFound from "./features/pagenotfound/pages/NotFound";
import Protected from "./features/auth/components/Protected";
import GenerateReport from "./features/interview/pages/GenerateReport";
import DashboardLayout from "./features/layout/components/DashboardLayout";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Reports from "./features/interview/pages/Reports";
import ReportDetail from "./features/interview/pages/ReportDetail";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: (
      <Protected>
        <DashboardLayout />
      </Protected>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "generate-report", element: <GenerateReport /> },
      { path: "reports", element: <Reports /> },
      { path: "reports/:id", element: <ReportDetail /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
