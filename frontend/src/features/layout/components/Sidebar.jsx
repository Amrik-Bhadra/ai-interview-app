import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  GridIcon,
  FilePlusIcon,
  FileTextIcon,
  ChevronLeftIcon,
  LogoutIcon,
} from "../../interview/components/icons.jsx";
import { useState } from "react";
import Modal from "../../../components/modal/Modal.jsx";
import { notify } from "../../../utils/toast.js";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: GridIcon, end: true },
  { to: "/generate-report", label: "Generate Report", icon: FilePlusIcon },
  { to: "/reports", label: "Reports", icon: FileTextIcon },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await handleLogout();
      notify.success("Logged out successfully!");
      navigate("/login", { replace: true });
    } catch {
      // logout failed silently — session may already be dead on the server,
      // so clear local state and redirect anyway
      notify.error("Failed to logout!");
      navigate("/login", { replace: true });
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  return (
    <>
      <aside className="sidebar">
        <div className="brand-logo">
          <span className="dot" />
          {!collapsed && <span>IntervueAI</span>}
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon className="nav-icon" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            type="button"
            className="nav-item logout-btn"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogoutIcon className="nav-icon" />
            {!collapsed && <span>Logout</span>}
          </button>

          <button
            className="collapse-btn"
            onClick={onToggle}
            aria-label="Toggle sidebar"
          >
            <ChevronLeftIcon className={collapsed ? "rotated" : ""} />
          </button>
        </div>
      </aside>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => !isLoggingOut && setShowLogoutModal(false)}
        title="Log out?"
        size="sm"
        hideClose={isLoggingOut}
        description="You'll be signed out of your current session. Any unsaved progress will be lost."
        footer={
          <>
            <button
              className="button ghost-button"
              onClick={() => setShowLogoutModal(false)}
              disabled={isLoggingOut}
            >
              Cancel
            </button>
            <button
              className="button danger-button"
              onClick={confirmLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? <span className="spinner" /> : "Log out"}
            </button>
          </>
        }
      />
    </>
  );
};

export default Sidebar;
