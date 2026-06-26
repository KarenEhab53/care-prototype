import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { patient, doctors } from "../data/mockData";
import {
  IconHome,
  IconSearch,
  IconCalendar,
  IconFolder,
  IconShield,
  IconChat,
  IconBell,
  IconUser,
  IconUsers,
  IconStethoscope,
  IconLogOut,
  IconClock,
} from "./icons";
import "./Shell.css";

const NAV_BY_ROLE = {
  patient: [
    { to: "/patient", label: "Overview", icon: IconHome, end: true },
    { to: "/patient/search", label: "Find a Doctor", icon: IconSearch },
    { to: "/patient/appointments", label: "Appointments", icon: IconCalendar },
    { to: "/patient/medical-history", label: "Medical History", icon: IconFolder },
    { to: "/patient/emergency", label: "Emergency Profile", icon: IconShield },
    { to: "/patient/chat", label: "Messages", icon: IconChat },
    { to: "/patient/profile", label: "My Profile", icon: IconUser },
  ],
  doctor: [
    { to: "/doctor", label: "Overview", icon: IconHome, end: true },
    { to: "/doctor/appointments", label: "Appointments", icon: IconCalendar },
    { to: "/doctor/schedule", label: "Schedule", icon: IconClock },
    { to: "/doctor/patients", label: "Patient Records", icon: IconFolder },
    { to: "/doctor/chat", label: "Messages", icon: IconChat },
    { to: "/doctor/profile", label: "My Profile", icon: IconStethoscope },
  ],
  admin: [
    { to: "/admin", label: "Overview", icon: IconHome, end: true },
    { to: "/admin/verifications", label: "Doctor Verifications", icon: IconShield },
    { to: "/admin/users", label: "Users & Doctors", icon: IconUsers },
  ],
};

const ROLE_META = {
  patient: { label: "Patient", name: patient.name },
  doctor: { label: "Doctor", name: doctors[0].name },
  admin: { label: "Admin", name: "System Admin" },
};

export default function Shell({ children }) {
  const { role, setRole, notifications } = useApp();
  const navigate = useNavigate();
  const nav = NAV_BY_ROLE[role];
  const unread = notifications.filter((n) => !n.read).length;

  function handleRoleChange(nextRole) {
    setRole(nextRole);
    navigate(`/${nextRole}`);
  }

  return (
    <div className="shell">
      <aside className="shell__sidebar">
        <div className="shell__brand">
          <span className="shell__brand-mark">+</span>
          <span className="shell__brand-text">MediConnect</span>
        </div>

        <nav className="shell__nav">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `shell__nav-item ${isActive ? "is-active" : ""}`}
            >
              <item.icon width={18} height={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="shell__role-switch">
          <p className="shell__role-switch-label">Prototype: preview as</p>
          <div className="shell__role-pills">
            {Object.keys(NAV_BY_ROLE).map((r) => (
              <button
                key={r}
                className={`shell__role-pill ${role === r ? "is-active" : ""}`}
                onClick={() => handleRoleChange(r)}
              >
                {ROLE_META[r].label}
              </button>
            ))}
          </div>
          <a href="/emergency-lookup" className="shell__emergency-link" target="_blank" rel="noreferrer">
            View Emergency Lookup (public) ↗
          </a>
        </div>
      </aside>

      <div className="shell__main">
        <header className="shell__topbar">
          <div className="shell__topbar-spacer" />
          <button className="shell__icon-btn" aria-label="Notifications">
            <IconBell width={19} height={19} />
            {unread > 0 && <span className="shell__badge-dot">{unread}</span>}
          </button>
          <div className="shell__who">
            <div className="shell__avatar" aria-hidden="true">
              {ROLE_META[role].name.charAt(0)}
            </div>
            <div className="shell__who-text">
              <span className="shell__who-name">{ROLE_META[role].name}</span>
              <span className="shell__who-role">{ROLE_META[role].label}</span>
            </div>
            <button className="shell__icon-btn" aria-label="Log out" title="Log out (mock)">
              <IconLogOut width={17} height={17} />
            </button>
          </div>
        </header>

        <main className="shell__content">{children}</main>
      </div>
    </div>
  );
}
