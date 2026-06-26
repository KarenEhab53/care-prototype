import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { doctors } from "../../data/mockData";
import { Card, Button } from "../../components/ui";
import StatusPulse from "../../components/StatusPulse";
import { IconCalendar, IconClock, IconFolder, IconChat, IconChevronRight } from "../../components/icons";

export default function DoctorOverview() {
  const { doctorAppointments } = useApp();
  const me = doctors[0];
  const pending = doctorAppointments.filter((a) => a.status === "pending");
  const today = doctorAppointments.filter((a) => a.status === "approved").slice(0, 3);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Welcome back, {me.name}</h1>
          <p className="page__subtitle">{me.specialty} · {pending.length} appointment{pending.length !== 1 ? "s" : ""} need your response.</p>
        </div>
        <Link to="/doctor/schedule">
          <Button>
            <IconClock width={16} height={16} /> Manage Schedule
          </Button>
        </Link>
      </div>

      <div className="quick-grid">
        <QuickLink to="/doctor/appointments" icon={IconCalendar} label="Appointments" tint="var(--success-50)" iconColor="var(--success-600)" />
        <QuickLink to="/doctor/schedule" icon={IconClock} label="Free Slots" tint="var(--primary-50)" iconColor="var(--primary-700)" />
        <QuickLink to="/doctor/patients" icon={IconFolder} label="Patient Records" tint="var(--warning-50)" iconColor="var(--warning-600)" />
        <QuickLink to="/doctor/chat" icon={IconChat} label="Messages" tint="var(--danger-50)" iconColor="var(--danger-600)" />
      </div>

      <div className="two-col">
        <Card className="panel">
          <div className="panel__head">
            <h3>Pending Requests</h3>
            <Link className="panel__see-all" to="/doctor/appointments">
              See all <IconChevronRight width={14} height={14} />
            </Link>
          </div>
          {pending.length === 0 ? (
            <p className="panel__empty">No pending requests right now.</p>
          ) : (
            <ul className="simple-list">
              {pending.map((a) => (
                <li key={a.id} className="simple-list__row">
                  <div>
                    <p className="simple-list__title">{a.patientName}</p>
                    <p className="simple-list__meta">{a.date} at {a.time}</p>
                  </div>
                  <StatusPulse status={a.status} size="sm" />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="panel">
          <div className="panel__head">
            <h3>Today's Confirmed</h3>
          </div>
          {today.length === 0 ? (
            <p className="panel__empty">Nothing confirmed yet for today.</p>
          ) : (
            <ul className="simple-list">
              {today.map((a) => (
                <li key={a.id} className="simple-list__row">
                  <div>
                    <p className="simple-list__title">{a.patientName}</p>
                    <p className="simple-list__meta">{a.date} at {a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
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
