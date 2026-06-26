import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Card, Button, EmptyState, Modal } from "../../components/ui";
import StatusPulse from "../../components/StatusPulse";
import { IconCalendar } from "../../components/icons";
import "./Appointments.css";

const FILTERS = ["all", "pending", "approved", "completed", "cancelled"];

export default function PatientAppointments() {
  const { appointments, cancelAppointment } = useApp();
  const [filter, setFilter] = useState("all");
  const [toCancel, setToCancel] = useState(null);

  const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  function handleCancel() {
    cancelAppointment(toCancel.id);
    setToCancel(null);
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Appointments</h1>
          <p className="page__subtitle">Track and manage your bookings. Pending appointments can be cancelled.</p>
        </div>
      </div>

      <div className="filter-row">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-pill ${filter === f ? "is-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={IconCalendar}
          title="No appointments here"
          message="Appointments matching this filter will show up here."
        />
      ) : (
        <div className="apt-list">
          {filtered.map((a) => (
            <Card key={a.id} className="apt-row">
              <div className="apt-row__info">
                <p className="apt-row__doctor">{a.doctorName}</p>
                <p className="apt-row__meta">{a.specialty} · {a.date} at {a.time}</p>
              </div>
              <StatusPulse status={a.status} />
              {a.status === "pending" ? (
                <Button variant="danger" size="sm" onClick={() => setToCancel(a)}>
                  Cancel
                </Button>
              ) : (
                <span className="apt-row__locked">
                  {a.status === "approved" ? "Cancellation closed" : "—"}
                </span>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!toCancel}
        onClose={() => setToCancel(null)}
        title="Cancel this appointment?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setToCancel(null)}>Keep it</Button>
            <Button variant="danger" onClick={handleCancel}>Cancel Appointment</Button>
          </>
        }
      >
        {toCancel && (
          <p>
            This will cancel your appointment with <strong>{toCancel.doctorName}</strong> on{" "}
            {toCancel.date} at {toCancel.time}. This can't be undone.
          </p>
        )}
      </Modal>
    </div>
  );
}
