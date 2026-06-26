import { useState } from "react";
import { patient } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import { Card, Button } from "../../components/ui";
import "./Profile.css";

export default function PatientProfile() {
  const { showToast } = useApp();
  const [form, setForm] = useState(patient);
  const [editing, setEditing] = useState(false);

  function handleSave() {
    setEditing(false);
    showToast("Profile updated.");
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>My Profile</h1>
          <p className="page__subtitle">Your personal information and location.</p>
        </div>
        {!editing && <Button onClick={() => setEditing(true)}>Edit Profile</Button>}
      </div>

      <Card className="panel profile-grid">
        <ProfileField label="Full Name" value={form.name} editing={editing} onChange={(v) => setForm({ ...form, name: v })} />
        <ProfileField label="Phone" value={form.phone} editing={editing} onChange={(v) => setForm({ ...form, phone: v })} />
        <ProfileField label="Email" value={form.email} editing={editing} onChange={(v) => setForm({ ...form, email: v })} />
        <ProfileField label="Location" value={form.location} editing={editing} onChange={(v) => setForm({ ...form, location: v })} />
        <div className="profile-field is-full">
          <p className="profile-field__label">National ID</p>
          <p className="mono-value">{form.nationalId}</p>
          <p className="profile-field__hint">National ID can't be edited after registration.</p>
        </div>
      </Card>

      {editing && (
        <div className="emergency-actions">
          <Button variant="secondary" onClick={() => { setEditing(false); setForm(patient); }}>Cancel</Button>
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
