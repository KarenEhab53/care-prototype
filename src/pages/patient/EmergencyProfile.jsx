import { useState } from "react";
import { patient } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import { Card, Button } from "../../components/ui";
import { IconShield, IconAlertTriangle } from "../../components/icons";
import "./EmergencyProfile.css";

export default function EmergencyProfile() {
  const { showToast } = useApp();
  const [data, setData] = useState(patient);
  const [editing, setEditing] = useState(false);

  function handleSave() {
    setEditing(false);
    showToast("Emergency profile updated.");
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Emergency Profile</h1>
          <p className="page__subtitle">
            Visible to anyone who looks you up by National ID in an emergency — your full medical history stays private.
          </p>
        </div>
        {!editing && <Button onClick={() => setEditing(true)}>Edit</Button>}
      </div>

      <Card className="emergency-banner">
        <IconAlertTriangle width={20} height={20} />
        <p>
          Only the fields below are shown during an emergency lookup. Keep them accurate and up to date.
        </p>
      </Card>

      <Card className="panel emergency-grid">
        <Field label="Blood Type">
          {editing ? (
            <select value={data.bloodType} onChange={(e) => setData({ ...data, bloodType: e.target.value })}>
              {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((b) => <option key={b}>{b}</option>)}
            </select>
          ) : (
            <span className="emergency-pill emergency-pill--blood">{data.bloodType}</span>
          )}
        </Field>

        <Field label="National ID">
          <span className="mono-value">{data.nationalId}</span>
        </Field>

        <Field label="Chronic Diseases" full>
          <TagEditor editing={editing} items={data.chronicDiseases} onChange={(v) => setData({ ...data, chronicDiseases: v })} placeholder="e.g. Diabetes" />
        </Field>

        <Field label="Allergies" full>
          <TagEditor editing={editing} items={data.allergies} onChange={(v) => setData({ ...data, allergies: v })} placeholder="e.g. Penicillin" tone="danger" />
        </Field>

        <Field label="Current Medications" full>
          <TagEditor editing={editing} items={data.currentMedications} onChange={(v) => setData({ ...data, currentMedications: v })} placeholder="e.g. Ventolin Inhaler" />
        </Field>

        <Field label="Emergency Contacts" full>
          <div className="contact-list">
            {data.emergencyContacts.map((c, i) => (
              <div key={i} className="contact-item">
                <strong>{c.name}</strong> <span>({c.relation})</span>
                <span className="mono-value">{c.phone}</span>
              </div>
            ))}
            {editing && <button className="record-add-btn">+ Add emergency contact</button>}
          </div>
        </Field>
      </Card>

      {editing && (
        <div className="emergency-actions">
          <Button variant="secondary" onClick={() => { setEditing(false); setData(patient); }}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
}

function Field({ label, children, full }) {
  return (
    <div className={`emergency-field ${full ? "is-full" : ""}`}>
      <p className="emergency-field__label">{label}</p>
      {children}
    </div>
  );
}

function TagEditor({ editing, items, onChange, placeholder, tone = "primary" }) {
  const [draft, setDraft] = useState("");

  function add() {
    if (!draft.trim()) return;
    onChange([...items, draft.trim()]);
    setDraft("");
  }

  function remove(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <div className="tag-row">
        {items.map((item, i) => (
          <span key={i} className={`emergency-pill emergency-pill--${tone}`}>
            {item}
            {editing && <button onClick={() => remove(i)} aria-label={`Remove ${item}`}>✕</button>}
          </span>
        ))}
        {items.length === 0 && <span className="tag-row__empty">None recorded</span>}
      </div>
      {editing && (
        <div className="tag-input">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <button onClick={add}>Add</button>
        </div>
      )}
    </div>
  );
}
