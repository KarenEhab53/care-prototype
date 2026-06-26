import { useState } from "react";
import { patient } from "../../data/mockData";
import { Card, Button } from "../../components/ui";
import { IconShield, IconAlertTriangle, IconSearch } from "../../components/icons";
import "./EmergencySearch.css";

export default function EmergencySearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    setSearched(true);
    setResult(query.trim() === patient.nationalId ? patient : null);
  }

  return (
    <div className="es-page">
      <div className="es-card">
        <div className="es-card__icon">
          <IconShield width={26} height={26} />
        </div>
        <h1>Emergency Lookup</h1>
        <p className="es-card__subtitle">
          For emergency responders and bystanders only. Enter the patient's National ID to view critical medical information.
        </p>

        <form onSubmit={handleSearch} className="es-form">
          <div className="es-form__field">
            <IconSearch width={17} height={17} />
            <input
              type="text"
              inputMode="numeric"
              placeholder="National ID number…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <p className="es-card__hint">
          Try <span className="mono-value">{patient.nationalId}</span> for this demo.
        </p>
      </div>

      {searched && (
        <Card className="es-result">
          {result ? (
            <>
              <div className="es-result__head">
                <IconAlertTriangle width={18} height={18} />
                <h3>Emergency Information Found</h3>
              </div>
              <p className="es-result__name">{result.name}</p>
              <div className="es-result__grid">
                <Field label="Blood Type" value={result.bloodType} highlight />
                <Field label="Chronic Diseases" value={result.chronicDiseases.join(", ") || "None recorded"} />
                <Field label="Allergies" value={result.allergies.join(", ") || "None recorded"} />
                <Field label="Current Medications" value={result.currentMedications.join(", ") || "None recorded"} />
              </div>
              <div className="es-result__contacts">
                <p className="es-result__label">Emergency Contacts</p>
                {result.emergencyContacts.map((c, i) => (
                  <p key={i} className="es-result__contact">
                    {c.name} ({c.relation}) — <span className="mono-value">{c.phone}</span>
                  </p>
                ))}
              </div>
              <p className="es-result__note">
                Full medical history is not shown here — only the emergency information this patient chose to share.
              </p>
            </>
          ) : (
            <p className="es-result__empty">No patient found with that National ID.</p>
          )}
        </Card>
      )}
    </div>
  );
}

function Field({ label, value, highlight }) {
  return (
    <div className="es-field">
      <p className="es-field__label">{label}</p>
      <p className={`es-field__value ${highlight ? "is-highlight" : ""}`}>{value}</p>
    </div>
  );
}
