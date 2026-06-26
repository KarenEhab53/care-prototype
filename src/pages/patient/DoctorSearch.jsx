import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { specialties, areas } from "../../data/mockData";
import { Card, Button, EmptyState } from "../../components/ui";
import { IconSearch, IconMapPin, IconStar, IconChevronRight } from "../../components/icons";
import "./DoctorSearch.css";

export default function DoctorSearch() {
  const { doctors } = useApp();
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [area, setArea] = useState("All");

  const approvedDoctors = doctors.filter((d) => d.status === "approved");

  const results = useMemo(() => {
    return approvedDoctors.filter((d) => {
      const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase());
      const matchesSpecialty = specialty === "All" || d.specialty === specialty;
      const matchesArea = area === "All" || d.area === area;
      return matchesQuery && matchesSpecialty && matchesArea;
    });
  }, [approvedDoctors, query, specialty, area]);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1>Find a Doctor</h1>
          <p className="page__subtitle">Search by name, specialty, or area.</p>
        </div>
      </div>

      <Card className="search-bar">
        <div className="search-bar__field search-bar__field--name">
          <IconSearch width={17} height={17} />
          <input
            type="text"
            placeholder="Search by doctor name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          <option>All</option>
          {specialties.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option>All</option>
          {areas.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </Card>

      {results.length === 0 ? (
        <EmptyState
          icon={IconSearch}
          title="No doctors match those filters"
          message="Try a different specialty or area, or clear your search."
        />
      ) : (
        <div className="doctor-grid">
          {results.map((d) => (
            <Card key={d.id} className="doctor-card">
              <div className="doctor-card__head">
                <div className="doctor-card__avatar" style={{ background: d.avatarColor }}>
                  {d.name.replace("Dr. ", "").charAt(0)}
                </div>
                <div>
                  <h3 className="doctor-card__name">{d.name}</h3>
                  <p className="doctor-card__specialty">{d.specialty}</p>
                </div>
              </div>
              <div className="doctor-card__meta">
                <span>
                  <IconMapPin width={14} height={14} /> {d.area}
                </span>
                <span>
                  <IconStar width={14} height={14} /> {d.rating}
                </span>
              </div>
              <p className="doctor-card__fee">EGP {d.consultationFee} consultation fee</p>
              <Link to={`/patient/doctors/${d.id}`} className="doctor-card__cta">
                <Button variant="secondary" size="sm" className="doctor-card__btn">
                  View Profile <IconChevronRight width={14} height={14} />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
