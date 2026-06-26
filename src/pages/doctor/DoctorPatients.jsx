import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { doctors } from "../../data/mockData";
import { Card, Button, Modal, Badge, EmptyState } from "../../components/ui";
import { IconFolder, IconHeart, IconShield, IconBone, IconPaperclip } from "../../components/icons";
import "../patient/MedicalHistory.css";

const ICONS = { heart: IconHeart, shield: IconShield, bone: IconBone, folder: IconFolder };
const ME = doctors[0].id; // doc_1 — the logged-in doctor in this prototype

export default function DoctorPatients() {
  const { folders } = useApp();
  const [openFolderId, setOpenFolderId] = useState(null);

  const accessible = folders.filter((f) => f.sharedWith.some((s) => s.doctorId === ME));
  const openFolder = accessible.find((f) => f.id === openFolderId);
  const myPerms = openFolder?.sharedWith.find((s) => s.doctorId === ME)?.permissions ?? [];

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Patient Records</h1>
          <p className="page__subtitle">You can only see folders a patient has explicitly shared with you.</p>
        </div>
      </div>

      {accessible.length === 0 ? (
        <EmptyState
          icon={IconShield}
          title="No folders shared yet"
          message="When a patient grants you access to a medical history folder, it will appear here."
        />
      ) : (
        <div className="folder-grid">
          {accessible.map((f) => {
            const Icon = ICONS[f.icon] ?? IconFolder;
            const perms = f.sharedWith.find((s) => s.doctorId === ME)?.permissions ?? [];
            return (
              <Card key={f.id} className="folder-card">
                <button className="folder-card__main" onClick={() => setOpenFolderId(f.id)}>
                  <span className="folder-card__icon"><Icon width={20} height={20} /></span>
                  <div className="folder-card__text">
                    <h3>{f.title}</h3>
                    <p>{f.records.length} record{f.records.length !== 1 ? "s" : ""}</p>
                  </div>
                </button>
                <div className="folder-card__footer">
                  <div className="access-current__perms">
                    {perms.map((p) => <Badge key={p} tone="primary">{p}</Badge>)}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={!!openFolder}
        onClose={() => setOpenFolderId(null)}
        title={openFolder?.title}
        footer={<Button variant="secondary" onClick={() => setOpenFolderId(null)}>Close</Button>}
      >
        {openFolder && (
          <div className="record-stack">
            {openFolder.records.map((r) => (
              <div key={r.id} className="record-item">
                <div className="record-item__head">
                  <strong>{r.diagnosis}</strong>
                  <span>{r.visitDate}</span>
                </div>
                <p className="record-item__notes">{r.notes}</p>
                {r.attachments.length > 0 && (
                  <div className="record-item__attachments">
                    {r.attachments.map((a) => (
                      <span key={a} className="record-item__attachment">
                        <IconPaperclip width={12} height={12} /> {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {myPerms.includes("add") && (
              <button className="record-add-btn">+ Add a new diagnosis or record</button>
            )}
            {!myPerms.includes("add") && (
              <p className="panel__empty" style={{ textAlign: "center" }}>
                You have view-only access to this folder.
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
