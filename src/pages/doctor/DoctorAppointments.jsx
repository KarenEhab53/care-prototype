import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Card, Button, EmptyState } from "../../components/ui";
import StatusPulse from "../../components/StatusPulse";
import { IconCalendar, IconCheck, IconX } from "../../components/icons";
import "../patient/Appointments.css";

const FILTERS = ["all", "pending", "approved", "completed", "cancelled"];

export default function DoctorAppointments() {
  const { doctorAppointments, updateDoctorAppointment } = useApp();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? doctorAppointments : doctorAppointments.filter((a) => a.status === filter);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Appointments</h1>
          <p className="page__subtitle">Approve, cancel, or mark visits complete.</p>
        </div>
      </div>

      <div className="filter-row">
        {FILTERS.map((f) => (
          <button key={f} className={`filter-pill ${filter === f ? "is-active" : ""}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={IconCalendar} title="Nothing here" message="Appointments matching this filter will appear here." />
      ) : (
        <div className="apt-list">
          {filtered.map((a) => (
            <Card key={a.id} className="apt-row">
              <div className="apt-row__info">
                <p className="apt-row__doctor">{a.patientName}</p>
                <p className="apt-row__meta">{a.date} at {a.time}</p>
                <p className="apt-row__reason">{a.reason}</p>
              </div>
              <StatusPulse status={a.status} />
              {a.status === "pending" && (
                <div className="apt-row__actions">
                  <Button size="sm" onClick={() => updateDoctorAppointment(a.id, "approved")}>
                    <IconCheck width={14} height={14} /> Approve
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => updateDoctorAppointment(a.id, "cancelled")}>
                    <IconX width={14} height={14} /> Cancel
                  </Button>
                </div>
              )}
              {a.status === "approved" && (
                <Button size="sm" variant="secondary" onClick={() => updateDoctorAppointment(a.id, "completed")}>
                  Mark Complete
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
