import { useState } from "react";
import { doctors } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import { Card, Button, Badge } from "../../components/ui";
import "../patient/Profile.css";
import "./DoctorProfileEdit.css";

export default function DoctorProfileEdit() {
  const { showToast } = useApp();
  const me = doctors[0];
  const [form, setForm] = useState(me);
  const [editing, setEditing] = useState(false);

  function handleSave() {
    setEditing(false);
    showToast("Professional profile updated.");
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>My Profile</h1>
          <p className="page__subtitle">This is what patients see on your public profile.</p>
        </div>
        {!editing && <Button onClick={() => setEditing(true)}>Edit Profile</Button>}
      </div>

      <Card className="panel profile-grid">
        <ProfileField label="Specialty" value={form.specialty} editing={editing} onChange={(v) => setForm({ ...form, specialty: v })} />
        <ProfileField label="Experience (years)" value={String(form.experienceYears)} editing={editing} onChange={(v) => setForm({ ...form, experienceYears: Number(v) || 0 })} />
        <ProfileField label="Consultation Fee (EGP)" value={String(form.consultationFee)} editing={editing} onChange={(v) => setForm({ ...form, consultationFee: Number(v) || 0 })} />
        <ProfileField label="Clinic Location" value={form.clinicLocation[0]} editing={editing} onChange={(v) => setForm({ ...form, clinicLocation: [v] })} />
        <div className="profile-field is-full">
          <p className="profile-field__label">Bio</p>
          {editing ? (
            <textarea className="profile-field__textarea" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          ) : (
            <p className="profile-field__value">{form.bio}</p>
          )}
        </div>
      </Card>

      <Card className="panel">
        <h3 style={{ marginBottom: 12 }}>Sub-Specialties</h3>
        <div className="doc-tag-row">
          {form.subSpecialty.map((s) => <Badge key={s} tone="primary">{s}</Badge>)}
        </div>
      </Card>

      <Card className="panel">
        <h3 style={{ marginBottom: 12 }}>Conditions Treated</h3>
        <div className="doc-tag-row">
          {form.conditionsTreated.map((c) => <Badge key={c} tone="neutral">{c}</Badge>)}
        </div>
      </Card>

      <Card className="panel">
        <h3 style={{ marginBottom: 12 }}>Education</h3>
        <ul className="dprofile-list">
          {form.education.map((e, i) => (
            <li key={i}><strong>{e.degree}</strong> — {e.university} ({e.year})</li>
          ))}
        </ul>
      </Card>

      {editing && (
        <div className="emergency-actions">
          <Button variant="secondary" onClick={() => { setEditing(false); setForm(me); }}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
}

function ProfileField({ label, value, editing, onChange }) {
  return (
    <div className="profile-field">
      <p className="profile-field__label">{label}</p>
      {editing ? (
        <input className="profile-field__input" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <p className="profile-field__value">{value}</p>
      )}
    </div>
  );
}
