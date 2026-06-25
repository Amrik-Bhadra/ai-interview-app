import { useLocation, Link } from "react-router-dom";
import { PlusIcon } from "../../interview/components/icons.jsx";
import { useAuth } from "../../auth/hooks/useAuth.js";

const titles = {
  "/": "Dashboard",
  "/generate-report": "Generate Interview Report",
  "/reports": "Reports",
};

const Topbar = () => {
  const { pathname } = useLocation();
  const title = titles[pathname] || "Report Details";
  const { user } = useAuth();

  return (
    <header className="topbar">
      <h1>{title}</h1>

      <div className="topbar-actions">
        <Link to="/generate-report" className="button primary-button small">
          <PlusIcon /> New Report
        </Link>
        <div className="user-avatar">
          {user?.username?.charAt(0)?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
