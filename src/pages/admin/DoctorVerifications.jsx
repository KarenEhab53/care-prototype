import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Card, Button, Modal, EmptyState } from "../../components/ui";
import StatusPulse from "../../components/StatusPulse";
import { IconShield, IconUpload, IconCheck, IconX } from "../../components/icons";
import "./Verifications.css";

export default function DoctorVerifications() {
  const { doctors, setDoctorStatus } = useApp();
  const [reviewing, setReviewing] = useState(null);
  const pending = doctors.filter((d) => d.status === "pending");
  const decided = doctors.filter((d) => d.status !== "pending");

  function decide(status) {
    setDoctorStatus(reviewing.id, status);
    setReviewing(null);
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Doctor Verifications</h1>
          <p className="page__subtitle">Review submitted documents before granting system access.</p>
        </div>
      </div>

      {pending.length === 0 ? (
        <EmptyState icon={IconShield} title="All caught up" message="No doctor registrations are waiting for review." />
      ) : (
        <div className="apt-list">
          {pending.map((d) => (
            <Card key={d.id} className="verify-row">
              <div className="verify-row__avatar" style={{ background: d.avatarColor }}>
                {d.name.replace("Dr. ", "").charAt(0)}
              </div>
              <div className="apt-row__info">
                <p className="apt-row__doctor">{d.name}</p>
                <p className="apt-row__meta">{d.specialty} · submitted {d.submittedAt}</p>
              </div>
              <StatusPulse status={d.status} />
              <Button size="sm" variant="secondary" onClick={() => setReviewing(d)}>
                Review
              </Button>
            </Card>
          ))}
        </div>
      )}

      <Card className="panel" style={{ marginTop: 8 }}>
        <h3 style={{ marginBottom: 14 }}>Recently Decided</h3>
        <ul className="simple-list">
          {decided.map((d) => (
            <li key={d.id} className="simple-list__row">
              <div>
                <p className="simple-list__title">{d.name}</p>
                <p className="simple-list__meta">{d.specialty}</p>
              </div>
              <StatusPulse status={d.status} size="sm" />
            </li>
          ))}
        </ul>
      </Card>

      <Modal
        open={!!reviewing}
        onClose={() => setReviewing(null)}
        title={reviewing ? `Review — ${reviewing.name}` : ""}
        footer={
          <>
            <Button variant="danger" onClick={() => decide("revoked")}>
              <IconX width={14} height={14} /> Revoke
            </Button>
            <Button onClick={() => decide("approved")}>
              <IconCheck width={14} height={14} /> Approve
            </Button>
          </>
        }
      >
        {reviewing && (
          <div className="verify-detail">
            <div className="verify-detail__row">
              <span>Specialty</span>
              <strong>{reviewing.specialty}</strong>
            </div>
            <div className="verify-detail__row">
              <span>Area</span>
              <strong>{reviewing.area}</strong>
            </div>
            <div className="verify-detail__row">
              <span>Experience</span>
              <strong>{reviewing.experienceYears} years</strong>
            </div>
            <p className="verify-detail__label">Submitted Documents</p>
            <ul className="verify-docs">
              <li><IconUpload width={14} height={14} /> Degree Certificate</li>
              <li><IconUpload width={14} height={14} /> Syndicate Card</li>
              <li><IconUpload width={14} height={14} /> National ID</li>
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
}
