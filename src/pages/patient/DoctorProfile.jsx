import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { availabilitySlots } from "../../data/mockData";
import { Card, Button, Modal } from "../../components/ui";
import { IconMapPin, IconStar, IconCalendar, IconChevronRight } from "../../components/icons";
import "./DoctorProfile.css";

export default function DoctorProfile() {
  const { id } = useParams();
  const { doctors, showToast } = useApp();
  const doctor = doctors.find((d) => d.id === id);
  const [bookingSlot, setBookingSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  if (!doctor) {
    return (
      <div className="page">
        <p>Doctor not found.</p>
        <Link to="/patient/search">Back to search</Link>
      </div>
    );
  }

  const openSlots = availabilitySlots.filter((s) => !s.bookedBy);

  function handleConfirmBooking() {
    setConfirmed(true);
    showToast(`Request sent to ${doctor.name} for ${bookingSlot.date} at ${bookingSlot.time}.`);
  }

  function closeModal() {
    setBookingSlot(null);
    setConfirmed(false);
  }

  return (
    <div className="page">
      <Link to="/patient/search" className="back-link">
        ← Back to search
      </Link>

      <Card className="dprofile-hero">
        <div className="dprofile-hero__avatar" style={{ background: doctor.avatarColor }}>
          {doctor.name.replace("Dr. ", "").charAt(0)}
        </div>
        <div className="dprofile-hero__info">
          <h1>{doctor.name}</h1>
          <p className="dprofile-hero__specialty">
            {doctor.specialty} · {doctor.subSpecialty.join(", ")}
          </p>
          <div className="dprofile-hero__meta">
            <span><IconMapPin width={14} height={14} /> {doctor.area}</span>
            <span><IconStar width={14} height={14} /> {doctor.rating} rating</span>
            <span>{doctor.experienceYears}+ years experience</span>
          </div>
        </div>
        <div className="dprofile-hero__action">
          <p className="dprofile-hero__fee">EGP {doctor.consultationFee}</p>
          <p className="dprofile-hero__fee-label">per consultation</p>
        </div>
      </Card>

      <div className="two-col">
        <div className="dprofile-stack">
          <Card className="panel">
            <h3>About</h3>
            <p className="dprofile-bio">{doctor.bio}</p>
          </Card>

          <Card className="panel">
            <h3>Education</h3>
            <ul className="dprofile-list">
              {doctor.education.map((e, i) => (
                <li key={i}>
                  <strong>{e.degree}</strong> — {e.university} ({e.year})
                </li>
              ))}
            </ul>
          </Card>

          {doctor.certifications.length > 0 && (
            <Card className="panel">
              <h3>Certifications</h3>
              <ul className="dprofile-list">
                {doctor.certifications.map((c, i) => (
                  <li key={i}>
                    <strong>{c.name}</strong> — {c.issuer} ({c.year})
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card className="panel">
            <h3>Conditions Treated</h3>
            <div className="dprofile-tags">
              {doctor.conditionsTreated.map((c) => (
                <span key={c} className="dprofile-tag">{c}</span>
              ))}
            </div>
          </Card>
        </div>

        <Card className="panel">
          <h3>Available Slots</h3>
          <p className="page__subtitle" style={{ marginBottom: 14 }}>
            Each slot is 30 minutes. Only one patient can hold a slot.
          </p>
          {openSlots.length === 0 ? (
            <p className="panel__empty">No open slots right now.</p>
          ) : (
            <ul className="slot-list">
              {openSlots.map((s) => (
                <li key={s.id} className="slot-list__row">
                  <span>
                    <IconCalendar width={15} height={15} /> {s.date} · {s.time}
                  </span>
                  <Button size="sm" onClick={() => setBookingSlot(s)}>
                    Book <IconChevronRight width={13} height={13} />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Modal
        open={!!bookingSlot}
        onClose={closeModal}
        title={confirmed ? "Request Sent" : "Confirm Appointment"}
        footer={
          confirmed ? (
            <Button onClick={closeModal}>Done</Button>
          ) : (
            <>
              <Button variant="secondary" onClick={closeModal}>Cancel</Button>
              <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
            </>
          )
        }
      >
        {bookingSlot && !confirmed && (
          <div className="booking-summary">
            <p>You're booking a 30-minute slot with:</p>
            <p className="booking-summary__doctor">{doctor.name} — {doctor.specialty}</p>
            <p className="booking-summary__slot">{bookingSlot.date} at {bookingSlot.time}</p>
            <p className="booking-summary__fee">Consultation fee: EGP {doctor.consultationFee}</p>
            <p className="booking-summary__note">
              The doctor will need to approve this request before it's confirmed. You can cancel anytime while it's pending.
            </p>
          </div>
        )}
        {confirmed && (
          <p>
            Your request for <strong>{bookingSlot.date} at {bookingSlot.time}</strong> has been sent to {doctor.name}. You'll get a notification once it's approved.
          </p>
        )}
      </Modal>
    </div>
  );
}
