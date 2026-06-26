import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { patient } from "../../data/mockData";
import { Card, Button } from "../../components/ui";
import StatusPulse from "../../components/StatusPulse";
import "./UsersDoctors.css";

const TABS = ["doctors", "patients"];
const MOCK_PATIENTS = [
  patient,
  { id: "user_2", name: "Yara Hassan", email: "yara.h@example.com", nationalId: "29903021234567" },
  { id: "user_3", name: "Sami Nabil", email: "sami.nabil@example.com", nationalId: "28811051234567" },
];

export default function UsersDoctors() {
  const { doctors, setDoctorStatus } = useApp();
  const [tab, setTab] = useState("doctors");
  const approvedDoctors = doctors.filter((d) => d.status !== "pending");

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Users & Doctors</h1>
          <p className="page__subtitle">Manage active accounts across the platform.</p>
        </div>
      </div>

      <div className="filter-row">
        {TABS.map((t) => (
          <button key={t} className={`filter-pill ${tab === t ? "is-active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "doctors" ? (
        <div className="ud-table">
          <div className="ud-table__head">
            <span>Doctor</span>
            <span>Specialty</span>
            <span>Status</span>
            <span></span>
          </div>
          {approvedDoctors.map((d) => (
            <div key={d.id} className="ud-table__row">
              <span className="ud-table__name">{d.name}</span>
              <span>{d.specialty}</span>
              <StatusPulse status={d.status} size="sm" />
              {d.status === "approved" ? (
                <Button size="sm" variant="danger" onClick={() => setDoctorStatus(d.id, "revoked")}>
                  Revoke
                </Button>
              ) : (
                <Button size="sm" onClick={() => setDoctorStatus(d.id, "approved")}>
                  Reinstate
                </Button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="ud-table">
          <div className="ud-table__head">
            <span>Patient</span>
            <span>Email</span>
            <span>National ID</span>
            <span></span>
          </div>
          {MOCK_PATIENTS.map((p) => (
            <div key={p.id} className="ud-table__row">
              <span className="ud-table__name">{p.name}</span>
              <span>{p.email}</span>
              <span className="mono-value">{p.nationalId}</span>
              <Button size="sm" variant="secondary">View</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
