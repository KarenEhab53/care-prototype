import { useState } from "react";
import { availabilitySlots as initialSlots } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import { Card, Button, Modal } from "../../components/ui";
import { IconPlus, IconClock } from "../../components/icons";
import "./Schedule.css";

export default function DoctorSchedule() {
  const { showToast } = useApp();
  const [slots, setSlots] = useState(initialSlots);
  const [adding, setAdding] = useState(false);
  const [date, setDate] = useState("2026-06-27");
  const [time, setTime] = useState("09:00");

  const grouped = slots.reduce((acc, s) => {
    acc[s.date] = acc[s.date] || [];
    acc[s.date].push(s);
    return acc;
  }, {});

  function addSlot() {
    setSlots((prev) => [...prev, { id: `slot_${Date.now()}`, date, time, bookedBy: null }]);
    setAdding(false);
    showToast("Free slot added — 30 minutes.");
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Schedule</h1>
          <p className="page__subtitle">Each slot is fixed at 30 minutes. Only one patient can hold a given slot.</p>
        </div>
        <Button onClick={() => setAdding(true)}>
          <IconPlus width={16} height={16} /> Add Free Slot
        </Button>
      </div>

      {Object.entries(grouped).map(([d, daySlots]) => (
        <Card key={d} className="panel">
          <h3 className="schedule-date">{d}</h3>
          <div className="slot-grid">
            {daySlots.map((s) => (
              <div key={s.id} className={`slot-chip ${s.bookedBy ? "is-booked" : "is-open"}`}>
                <IconClock width={13} height={13} />
                {s.time}
                <span>{s.bookedBy ? "Booked" : "Open"}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <Modal
        open={adding}
        onClose={() => setAdding(false)}
        title="Add a Free Slot"
        footer={
          <>
            <Button variant="secondary" onClick={() => setAdding(false)}>Cancel</Button>
            <Button onClick={addSlot}>Add Slot</Button>
          </>
        }
      >
        <div className="slot-form">
          <label>
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Start Time
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </label>
          <p className="slot-form__hint">Slot duration is fixed at 30 minutes per the system rules.</p>
        </div>
      </Modal>
    </div>
  );
}
