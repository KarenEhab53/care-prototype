import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { adminStats } from "../../data/mockData";
import { Card } from "../../components/ui";
import StatusPulse from "../../components/StatusPulse";
import { IconUsers, IconStethoscope, IconShield, IconCalendar, IconChevronRight } from "../../components/icons";

export default function AdminOverview() {
  const { doctors } = useApp();
  const pendingDoctors = doctors.filter((d) => d.status === "pending");

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>System Overview</h1>
          <p className="page__subtitle">Platform-wide activity and pending actions.</p>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard icon={IconUsers} label="Total Patients" value={adminStats.totalUsers.toLocaleString()} />
        <StatCard icon={IconStethoscope} label="Active Doctors" value={adminStats.totalDoctors} />
        <StatCard icon={IconShield} label="Pending Verifications" value={pendingDoctors.length} alert={pendingDoctors.length > 0} />
        <StatCard icon={IconCalendar} label="Appointments Today" value={adminStats.appointmentsToday} />
      </div>

      <Card className="panel">
        <div className="panel__head">
          <h3>Doctors Awaiting Review</h3>
          <Link className="panel__see-all" to="/admin/verifications">
            Review all <IconChevronRight width={14} height={14} />
          </Link>
        </div>
        {pendingDoctors.length === 0 ? (
          <p className="panel__empty">No pending doctor registrations.</p>
        ) : (
          <ul className="simple-list">
            {pendingDoctors.map((d) => (
              <li key={d.id} className="simple-list__row">
                <div>
                  <p className="simple-list__title">{d.name}</p>
                  <p className="simple-list__meta">{d.specialty} · submitted {d.submittedAt}</p>
                </div>
                <StatusPulse status={d.status} size="sm" />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, alert }) {
  return (
    <Card className="stat-card">
      <span style={{ color: "var(--primary-600)" }}>
        <Icon width={18} height={18} />
      </span>
      <span className="stat-card__label">{label}</span>
      <span className={`stat-card__value ${alert ? "is-alert" : ""}`}>{value}</span>
    </Card>
  );
}
