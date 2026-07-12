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
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import VerifyOtp from "./features/auth/pages/VerifyOtp";
import ResetPassword from "./features/auth/pages/ResetPassword";
import Landing from "./pages/Landing";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-otp", element: <VerifyOtp /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    element: (
      <Protected>
        <DashboardLayout />
      </Protected>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "generate-report", element: <GenerateReport /> },
      { path: "reports", element: <Reports /> },
      { path: "reports/:id", element: <ReportDetail /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);