import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "var(--surface)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "0.75rem 1rem",
            fontSize: "0.9rem",
            fontFamily: "inherit",
          },
          success: {
            iconTheme: {
              primary: "var(--success)",
              secondary: "var(--text)",
            },
          },
          error: {
            iconTheme: { primary: "var(--error)", secondary: "var(--text)" },
          },
        }}
      />
    </AuthProvider>
  );
};

export default App;
