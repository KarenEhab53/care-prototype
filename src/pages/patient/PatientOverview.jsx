import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { patient } from "../../data/mockData";
import { Card, Button } from "../../components/ui";
import StatusPulse from "../../components/StatusPulse";
import {
  IconSearch,
  IconCalendar,
  IconFolder,
  IconShield,
  IconChevronRight,
} from "../../components/icons";

export default function PatientOverview() {
  const { appointments, notifications } = useApp();
  const upcoming = appointments
    .filter((a) => a.status === "approved" || a.status === "pending")
    .slice(0, 3);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Welcome back, {patient.name.split(" ")[0]}</h1>
          <p className="page__subtitle">Here's what's happening with your care.</p>
        </div>
        <Link to="/patient/search">
          <Button>
            <IconSearch width={16} height={16} /> Find a Doctor
          </Button>
        </Link>
      </div>

      <div className="quick-grid">
        <QuickLink to="/patient/search" icon={IconSearch} label="Find a Doctor" tint="var(--primary-50)" iconColor="var(--primary-700)" />
        <QuickLink to="/patient/appointments" icon={IconCalendar} label="Appointments" tint="var(--success-50)" iconColor="var(--success-600)" />
        <QuickLink to="/patient/medical-history" icon={IconFolder} label="Medical History" tint="var(--warning-50)" iconColor="var(--warning-600)" />
        <QuickLink to="/patient/emergency" icon={IconShield} label="Emergency Profile" tint="var(--danger-50)" iconColor="var(--danger-600)" />
      </div>

      <div className="two-col">
        <Card className="panel">
          <div className="panel__head">
            <h3>Upcoming Appointments</h3>
            <Link className="panel__see-all" to="/patient/appointments">
              See all <IconChevronRight width={14} height={14} />
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="panel__empty">No upcoming appointments yet.</p>
          ) : (
            <ul className="simple-list">
              {upcoming.map((a) => (
                <li key={a.id} className="simple-list__row">
                  <div>
                    <p className="simple-list__title">{a.doctorName}</p>
                    <p className="simple-list__meta">
                      {a.specialty} · {a.date} at {a.time}
                    </p>
                  </div>
                  <StatusPulse status={a.status} size="sm" />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="panel">
          <div className="panel__head">
            <h3>Recent Notifications</h3>
          </div>
          <ul className="simple-list">
            {notifications.slice(0, 4).map((n) => (
              <li key={n.id} className="simple-list__row">
                <div>
                  <p className={`simple-list__title ${!n.read ? "is-unread" : ""}`}>{n.text}</p>
                  <p className="simple-list__meta">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function QuickLink({ to, icon: Icon, label, tint, iconColor }) {
  return (
    <Link to={to} className="quick-card">
      <span className="quick-card__icon" style={{ background: tint, color: iconColor }}>
        <Icon width={20} height={20} />
      </span>
      <span className="quick-card__label">{label}</span>
    </Link>
  );
}
