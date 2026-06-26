import { NavLink } from "react-router-dom";
import {
  GridIcon,
  FilePlusIcon,
  FileTextIcon,
  ChevronLeftIcon,
  LogoutIcon,
} from "../../interview/components/icons.jsx";

const navItems = [
  { to: "/", label: "Dashboard", icon: GridIcon, end: true },
  { to: "/generate-report", label: "Generate Report", icon: FilePlusIcon },
  { to: "/reports", label: "Reports", icon: FileTextIcon },
];

const Sidebar = ({ collapsed, onToggle }) => {
  return (
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
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <Icon className="nav-icon" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="nav-item logout-btn">
          <LogoutIcon className="nav-icon" />
          {!collapsed && <span>Logout</span>}
        </button>

        <button className="collapse-btn" onClick={onToggle} aria-label="Toggle sidebar">
          <ChevronLeftIcon className={collapsed ? "rotated" : ""} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;