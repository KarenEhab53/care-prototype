import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Card, Button, Modal, EmptyState, Badge } from "../../components/ui";
import { IconFolder, IconHeart, IconShield, IconBone, IconPaperclip, IconPlus, IconUpload } from "../../components/icons";
import "./MedicalHistory.css";

const ICONS = { heart: IconHeart, shield: IconShield, bone: IconBone, folder: IconFolder };
const PERMISSIONS = ["view", "add", "edit", "delete"];

export default function MedicalHistory() {
  const { folders, doctors, grantFolderAccess, revokeFolderAccess } = useApp();
  const [openFolderId, setOpenFolderId] = useState(null);
  const [accessFolderId, setAccessFolderId] = useState(null);
  const [pendingDoctor, setPendingDoctor] = useState("");
  const [pendingPerms, setPendingPerms] = useState(["view"]);

  const openFolder = folders.find((f) => f.id === openFolderId);
  const accessFolder = folders.find((f) => f.id === accessFolderId);
  const approvedDoctors = doctors.filter((d) => d.status === "approved");

  function togglePerm(p) {
    setPendingPerms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  function handleGrant() {
    if (!pendingDoctor) return;
    grantFolderAccess(accessFolderId, pendingDoctor, pendingPerms);
    setPendingDoctor("");
    setPendingPerms(["view"]);
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Medical History</h1>
          <p className="page__subtitle">Organize records by condition and control which doctors can access each folder.</p>
        </div>
      </div>

      <div className="folder-grid">
        {folders.map((f) => {
          const Icon = ICONS[f.icon] ?? IconFolder;
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
                <span className="folder-card__shared">
                  {f.sharedWith.length === 0 ? "Not shared" : `Shared with ${f.sharedWith.length} doctor${f.sharedWith.length > 1 ? "s" : ""}`}
                </span>
                <button className="folder-card__access-btn" onClick={() => setAccessFolderId(f.id)}>
                  Manage Access
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Folder contents modal */}
      <Modal
        open={!!openFolder}
        onClose={() => setOpenFolderId(null)}
        title={openFolder?.title}
        footer={<Button variant="secondary" onClick={() => setOpenFolderId(null)}>Close</Button>}
      >
        {openFolder && openFolder.records.length === 0 ? (
          <EmptyState icon={IconFolder} title="No records yet" message="Add a diagnosis, visit, or attachment to this folder." />
        ) : (
          <div className="record-stack">
            {openFolder?.records.map((r) => (
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
            <button className="record-add-btn">
              <IconUpload width={15} height={15} /> Upload new record or attachment
            </button>
          </div>
        )}
      </Modal>

      {/* Access management modal */}
      <Modal
        open={!!accessFolder}
        onClose={() => { setAccessFolderId(null); setPendingDoctor(""); setPendingPerms(["view"]); }}
        title={`Manage Access — ${accessFolder?.title ?? ""}`}
        footer={<Button variant="secondary" onClick={() => setAccessFolderId(null)}>Done</Button>}
      >
        {accessFolder && (
          <>
            {accessFolder.sharedWith.length > 0 && (
              <div className="access-current">
                <p className="access-current__label">Currently shared with</p>
                {accessFolder.sharedWith.map((s) => {
                  const doc = doctors.find((d) => d.id === s.doctorId);
                  return (
                    <div key={s.doctorId} className="access-current__row">
                      <div>
                        <p className="access-current__name">{doc?.name ?? "Unknown doctor"}</p>
                        <div className="access-current__perms">
                          {s.permissions.map((p) => <Badge key={p} tone="primary">{p}</Badge>)}
                        </div>
                      </div>
                      <Button variant="danger" size="sm" onClick={() => revokeFolderAccess(accessFolder.id, s.doctorId)}>
                        Revoke
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="access-grant">
              <p className="access-current__label">Grant access to a doctor</p>
              <select value={pendingDoctor} onChange={(e) => setPendingDoctor(e.target.value)} className="access-grant__select">
                <option value="">Select a doctor…</option>
                {approvedDoctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
                ))}
              </select>
              <div className="access-grant__perms">
                {PERMISSIONS.map((p) => (
                  <label key={p} className={`perm-check ${pendingPerms.includes(p) ? "is-checked" : ""}`}>
                    <input type="checkbox" checked={pendingPerms.includes(p)} onChange={() => togglePerm(p)} />
                    {p}
                  </label>
                ))}
              </div>
              <Button size="sm" onClick={handleGrant} disabled={!pendingDoctor}>
                <IconPlus width={14} height={14} /> Grant Access
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
