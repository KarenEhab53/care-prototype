import { useState } from "react";
import {
  Phone, Mail, Calendar, Search, MapPin, CreditCard, Clock,
  User, History, FileSearch, CalendarCheck, MessageSquare, Lock,
  LogOut, ChevronLeft, ChevronRight, Star, Plus, Check, X,
  Send, Paperclip, Image as ImageIcon, RefreshCw, FileText,
  LayoutGrid, Stethoscope, Building2, Users, Settings, Trash2,
  Ambulance, ClipboardList, MessageCircle, Eye, EyeOff, MoreVertical,
  ArrowLeft, Upload
} from "lucide-react";

const COLORS = {
  main: "#39a2ab",
  white: "#ffffff",
  secondary: "#225555",
  red: "#cb2027",
  text: "#2a2a2a",
  gray: "#a8a8a8",
  card: "#39a2ab",
  green: "#8ccc44",
};

function Logo() {
  return (
    <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.main, fontFamily: "Georgia, serif" }}>
      Care<span style={{ color: COLORS.red }}>.com</span>
    </div>
  );
}

function TopNav({ go, page, loggedRole }) {
  const navItems = [
    { label: "Home", key: "landing" },
    { label: "Reservation", key: "reservation" },
    { label: "About us", key: "about" },
    { label: "English", key: "lang" },
  ];
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 40px", borderBottom: "1px solid #eee", background: COLORS.white,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
        <div style={{ cursor: "pointer" }} onClick={() => go("landing")}><Logo /></div>
        <div style={{ display: "flex", gap: 32 }}>
          {navItems.map((n) => (
            <span key={n.key}
              onClick={() => n.key !== "lang" && go(n.key)}
              style={{
                cursor: "pointer", fontSize: 15,
                color: page === n.key ? COLORS.main : "#bbb",
                fontWeight: page === n.key ? 600 : 400,
              }}>
              {n.label}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {!loggedRole ? (
          <>
            <button onClick={() => go("signup")} style={btnPrimary()}>Signup</button>
            <button onClick={() => go("login")} style={btnOutline()}>Login</button>
          </>
        ) : (
          <button onClick={() => go("landing")} style={btnOutline()}>Exit prototype view</button>
        )}
      </div>
    </div>
  );
}

function btnPrimary(extra) {
  return {
    background: COLORS.main, color: "#fff", border: "none", borderRadius: 8,
    padding: "10px 22px", fontSize: 15, fontWeight: 600, cursor: "pointer", ...extra,
  };
}
function btnOutline(extra) {
  return {
    background: "#fff", color: COLORS.main, border: `1.5px solid ${COLORS.main}`,
    borderRadius: 8, padding: "10px 22px", fontSize: 15, fontWeight: 600, cursor: "pointer", ...extra,
  };
}
function inputStyle(extra) {
  return {
    width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #e0e0e0",
    fontSize: 15, color: COLORS.text, outline: "none", boxSizing: "border-box", ...extra,
  };
}
function label() {
  return { color: COLORS.main, fontWeight: 600, fontSize: 15, marginBottom: 8, display: "block" };
}

function BackArrow({ onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: "pointer", padding: "20px 40px 0" }}>
      <ArrowLeft size={20} color={COLORS.text} />
    </div>
  );
}

// ---------- MOCK DATA ----------
const DOCTORS = [
  {
    id: 1, name: "Dr. Sara Mohamed", specialty: "Gynecologist", area: "Nasr City",
    rating: 4.8, price: 200, waiting: 18, status: "approved",
    bio: "Experienced gynecologist with 10+ years treating women's health issues.",
    experienceYears: 10, clinicLocation: ["Nasr City Medical Center, Building 5"],
    consultationFee: 300,
    conditionsTreated: ["PCOS", "Pregnancy Care", "Menstrual Disorders"],
    subSpecialty: ["Obstetrics", "Fertility"],
    education: [
      { degree: "MBBS", university: "Cairo University", year: 2010 },
      { degree: "MD Gynecology", university: "Ain Shams University", year: 2015 },
    ],
    certifications: [{ name: "Advanced Obstetric Care", issuer: "EOG", year: 2019 }],
    img: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=300&h=300&fit=crop",
  },
  {
    id: 2, name: "Dr. Ahmed Mohamed", specialty: "Cardiologist", area: "Maadi",
    rating: 4.6, price: 300, waiting: 25, status: "approved",
    bio: "Experienced cardiologist with 10+ years treating heart diseases.",
    experienceYears: 10, clinicLocation: ["Nasr City Medical Center, Building 5"],
    consultationFee: 300,
    conditionsTreated: ["Heart Disease", "High Blood Pressure", "Arrhythmia"],
    subSpecialty: ["Heart Failure", "Hypertension"],
    education: [
      { degree: "MBBS", university: "Cairo University", year: 2012 },
      { degree: "MD Cardiology", university: "Ain Shams University", year: 2017 },
    ],
    certifications: [{ name: "Advanced Cardiac Life Support", issuer: "AHA", year: 2020 }],
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
  },
  {
    id: 3, name: "Dr. Mona Khalil", specialty: "Dermatologist", area: "Zamalek",
    rating: 4.9, price: 250, waiting: 12, status: "approved",
    bio: "Skin specialist focused on cosmetic and clinical dermatology.",
    experienceYears: 8, clinicLocation: ["Zamalek Clinic, Building 2"],
    consultationFee: 250,
    conditionsTreated: ["Acne", "Eczema", "Skin Allergies"],
    subSpecialty: ["Cosmetic Dermatology"],
    education: [{ degree: "MBBS", university: "Alexandria University", year: 2014 }],
    certifications: [{ name: "Dermatology Board", issuer: "EDA", year: 2021 }],
    img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop",
  },
  {
    id: 4, name: "Dr. Omar Farouk", specialty: "Orthopedic", area: "Heliopolis",
    rating: 4.7, price: 280, waiting: 20, status: "pending",
    bio: "Specialist in joint and bone surgery.",
    experienceYears: 14, clinicLocation: ["Heliopolis Ortho Center"],
    consultationFee: 280,
    conditionsTreated: ["Fractures", "Joint Pain", "Sports Injuries"],
    subSpecialty: ["Sports Medicine"],
    education: [{ degree: "MBBS", university: "Cairo University", year: 2008 }],
    certifications: [{ name: "Ortho Surgery Board", issuer: "EOA", year: 2016 }],
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop",
  },
];

const SPECIALTIES = ["All", "Orthopedic", "Dentist", "Cardiologist", "Dermatologist", "Gynecologist"];

const PATIENT_PROFILE = {
  name: "Ahmed Mohamed", email: "ahmedmohamed@email.com", location: "Cairo",
  phone: "01122555884", nationalId: "29501150123456",
  emergencyPhone: "011225558558", bloodType: "O+",
  chronic: "Mild asthma, takes Ventolin inhaler when needed.",
  allergies: "Penicillin",
  photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop",
};

const APPOINTMENTS = [
  { id: 1, doctor: "Dr. Sara Mohamed", specialty: "Gynecologist", date: "Tue 12/4/2025", time: "2 PM", price: 200, status: "Pending", img: DOCTORS[0].img },
  { id: 2, doctor: "Dr. Ahmed Mohamed", specialty: "Cardiologist", date: "Thu 14/4/2025", time: "11 AM", price: 300, status: "Approved", img: DOCTORS[1].img },
  { id: 3, doctor: "Dr. Mona Khalil", specialty: "Dermatologist", date: "Mon 2/4/2025", time: "10 AM", price: 250, status: "Completed", img: DOCTORS[2].img },
  { id: 4, doctor: "Dr. Sara Mohamed", specialty: "Gynecologist", date: "Tue 12/4/2025", time: "2 PM", price: 200, status: "Cancelled", img: DOCTORS[0].img },
];

const HISTORY_FOLDERS = [
  {
    name: "Cardiology", entries: [
      {
        date: "May 2025", diagnosis: "Mild Arrhythmia", physician: "Dr. Ahmed Mohamed",
        visitDate: "2/4/2025",
        note: "Patient reports occasional palpitations. ECG shows mild irregularity. Prescribed beta blockers and follow-up in 3 months.",
      },
    ],
  },
  {
    name: "Diabetes", entries: [
      {
        date: "Jan 2025", diagnosis: "Type 2 Diabetes - Routine Check", physician: "Dr. Mona Khalil",
        visitDate: "10/1/2025",
        note: "Blood sugar levels stable. HbA1c at 6.8%. Continue current medication, recheck in 6 months.",
      },
    ],
  },
];

const DOCTOR_ACCESS = [
  { doctor: "Dr. Ahmed Mohamed", folder: "Cardiology", permissions: ["View", "Add"] },
  { doctor: "Dr. Mona Khalil", folder: "Diabetes", permissions: ["View"] },
];

const CHATS = [
  { name: "Dr. Ahmed Mohamed", last: "It's been great, thanks", unread: 0, img: DOCTORS[1].img },
  { name: "Dr. Sara Mohamed", last: "See you at your appointment", unread: 2, img: DOCTORS[0].img },
  { name: "Dr. Mona Khalil", last: "Please send your latest test results", unread: 0, img: DOCTORS[2].img },
];

const DOCTOR_REQUESTS = [
  { patient: "Mariam Adel", gender: "Female", date: "9/2/2025", time: "3 PM", type: "Home Visit", location: "Cairo" },
  { patient: "Youssef Hany", gender: "Male", date: "9/2/2025", time: "4 PM", type: "Clinic Visit", location: "Giza" },
];

const DOCTOR_TODAY = [
  { patient: "Mariam Adel", time: "3 PM Today", type: "Home visit" },
  { patient: "Youssef Hany", time: "6 PM Today", type: "Call" },
];

const DOCTOR_REGISTRATIONS = [
  { name: "Dr. Omar Farouk", specialty: "Orthopedic", date: "20/5/2025", docs: ["Graduation Certificate", "Syndicate Card", "National ID"] },
  { name: "Dr. Laila Nour", specialty: "Pediatrics", date: "21/5/2025", docs: ["Graduation Certificate", "Syndicate Card", "National ID"] },
];

const ADMIN_USERS = [
  { name: "Ahmed Mohamed", role: "Patient", joined: "1/2/2025" },
  { name: "Mariam Adel", role: "Patient", joined: "3/2/2025" },
  { name: "Dr. Sara Mohamed", role: "Doctor", joined: "5/1/2025" },
];

// ---------- LANDING PAGE ----------
function Landing({ go }) {
  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${COLORS.main}, ${COLORS.secondary})`, padding: "60px 40px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ maxWidth: 560 }}>
          <h1 style={{ fontSize: 34, lineHeight: 1.3, fontWeight: 700, margin: 0 }}>
            <span style={{ color: COLORS.red }}>Have an emergency?</span> Search by national ID number to find out the patient's record <span style={{ color: COLORS.red }}>OR</span> Find the nearest hospital with an ambulance
          </h1>
          <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
            <button onClick={() => go("idSearchPublic")} style={{ ...btnOutline(), background: "#fff" }}>Search by ID</button>
            <button style={{ ...btnPrimary(), background: "rgba(255,255,255,0.15)", border: "1.5px solid #fff" }}>Search for ambulance</button>
          </div>
        </div>
        <Stethoscope size={140} strokeWidth={1} style={{ opacity: 0.5 }} />
      </div>

      <div style={{ padding: "40px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Schedule a Doctor Appointment</h2>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: 24, marginTop: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <Calendar color={COLORS.main} />
            <div>
              <div style={{ fontWeight: 700 }}>Book a doctor</div>
              <div style={{ fontSize: 13, color: COLORS.gray }}>Examination or procedure</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: 12 }}>
            <select style={inputStyle()}><option>Choose specialty</option>{SPECIALTIES.slice(1).map(s => <option key={s}>{s}</option>)}</select>
            <select style={inputStyle()}><option>Choose city</option><option>Cairo</option><option>Giza</option></select>
            <select style={inputStyle()}><option>Choose area</option><option>Nasr City</option><option>Maadi</option></select>
            <input placeholder="Name of the doctor" style={inputStyle()} />
            <button onClick={() => go("doctorList")} style={{ ...btnPrimary(), padding: "0 28px" }}>Search</button>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 40px 50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>Our Doctors</h2>
          <span onClick={() => go("doctorList")} style={{ color: COLORS.main, cursor: "pointer", fontSize: 14 }}>See All</span>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {SPECIALTIES.map((s, i) => (
            <button key={s} style={i === 0 ? btnPrimary({ borderRadius: 10 }) : btnOutline({ borderRadius: 10 })}>{s}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {DOCTORS.map((d) => (
            <div key={d.id} onClick={() => go("doctorProfilePublic", d)} style={{ cursor: "pointer", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
              <div style={{ height: 180, background: "#bfe3e6", position: "relative" }}>
                <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "14px 0 6px", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 12 }}>
                  {[Phone, Mail, Calendar].map((Icon, i) => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.main, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={15} color="#fff" />
                    </div>
                  ))}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{d.name}</div>
                <div style={{ color: COLORS.gray, fontSize: 13 }}>{d.specialty}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- ID SEARCH (Public Emergency) ----------
function IdSearchPublic({ go }) {
  const [step, setStep] = useState(0);
  const [id, setId] = useState("");
  if (step === 0) {
    return (
      <div>
        <BackArrow onClick={() => go("landing")} />
        <div style={{ textAlign: "center", padding: "60px 40px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 30 }}>Search by ID card for your medical history</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
            {[...Array(14)].map((_, i) => (
              <input key={i} maxLength={1} style={{ width: 28, height: 40, textAlign: "center", border: "none", borderBottom: `3px solid ${i < 2 ? COLORS.main : "#ddd"}`, fontSize: 18 }}
                onChange={(e) => setId(id + e.target.value)} />
            ))}
          </div>
          <button onClick={() => setStep(1)} style={{ ...btnPrimary(), padding: "16px 60px", fontSize: 18 }}>Search</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <BackArrow onClick={() => setStep(0)} />
      <div style={{ padding: "20px 40px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 24 }}>Search by ID</h2>
        <div style={{ background: COLORS.main, borderRadius: 16, padding: 0, display: "flex", overflow: "hidden", maxWidth: 1000, position: "relative" }}>
          <div style={{ width: 260, height: 260 }}>
            <img src={PATIENT_PROFILE.photo} alt="patient" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: "32px 40px", color: "#fff", flex: 1 }}>
            <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>{PATIENT_PROFILE.name}</h3>
            <div style={{ fontSize: 16, marginBottom: 8 }}>Blood Type : <strong>{PATIENT_PROFILE.bloodType}</strong></div>
            <div style={{ fontSize: 16, marginBottom: 8 }}>Chronic Diseases : {PATIENT_PROFILE.chronic}</div>
            <div style={{ fontSize: 16, marginBottom: 8 }}>Allergies : {PATIENT_PROFILE.allergies}</div>
            <div style={{ fontSize: 16, marginBottom: 8 }}>First emergency number : {PATIENT_PROFILE.emergencyPhone}</div>
            <div style={{ fontSize: 16, marginBottom: 20 }}>My Phone number : {PATIENT_PROFILE.phone}</div>
            <div style={{ marginBottom: 12, opacity: 0.85 }}>OR</div>
            <button style={{ background: "#fff", color: COLORS.main, border: "none", borderRadius: 10, padding: "14px 30px", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Call Emergency</button>
          </div>
        </div>
        <p style={{ marginTop: 20, color: COLORS.gray, fontSize: 13, maxWidth: 600 }}>
          This is emergency-only information. The patient's full medical history is never shown here, by design.
        </p>
      </div>
    </div>
  );
}

// ---------- DOCTOR LIST ----------
function DoctorList({ go }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? DOCTORS : DOCTORS.filter(d => d.specialty === filter);
  return (
    <div>
      <BackArrow onClick={() => go("landing")} />
      <div style={{ padding: "20px 40px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>Our Doctors</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 30, justifyContent: "center" }}>
          {SPECIALTIES.map((s) => (
            <button key={s} onClick={() => setFilter(s)} style={filter === s ? btnPrimary({ borderRadius: 10 }) : btnOutline({ borderRadius: 10 })}>{s}</button>
          ))}
        </div>
        {filtered.map((d) => (
          <div key={d.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", padding: "28px 0" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{d.name}</div>
              <div style={{ color: COLORS.gray, marginBottom: 8 }}>{d.specialty}</div>
              <div style={{ color: "#f5b400", marginBottom: 10 }}>{"★".repeat(Math.round(d.rating))}<span style={{ color: "#ddd" }}>{"★".repeat(5 - Math.round(d.rating))}</span></div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: COLORS.text, marginBottom: 6 }}><Stethoscope size={16} />{d.specialty}</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: COLORS.text, marginBottom: 6 }}><MapPin size={16} />{d.area}, Egypt</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: COLORS.text, marginBottom: 6 }}><CreditCard size={16} />Price : {d.price}</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: COLORS.green, marginBottom: 6 }}><Clock size={16} />Waiting Time : {d.waiting} Minutes</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: COLORS.text, marginBottom: 14 }}><Phone size={16} />1599 : Cost of regular call</div>
              <div style={{ background: "#f4f4f4", borderRadius: 8, padding: "8px 14px", display: "inline-block", color: COLORS.gray, fontSize: 14, marginBottom: 14 }}>Available Today From 2:00 PM</div>
              <br />
              <button onClick={() => go("doctorProfilePublic", d)} style={{ ...btnPrimary(), padding: "12px 50px" }}>Book</button>
            </div>
            <img src={d.img} alt={d.name} style={{ width: 320, height: 220, objectFit: "cover", borderRadius: 14 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- DOCTOR PROFILE (public view) ----------
function DoctorProfilePublic({ go, ctx }) {
  const d = ctx || DOCTORS[0];
  return (
    <div>
      <BackArrow onClick={() => go("doctorList")} />
      <div style={{ display: "flex", gap: 40, padding: "20px 40px" }}>
        <div style={{ background: "#e3f3f4", borderRadius: 16, padding: 24, width: 280, textAlign: "center", alignSelf: "flex-start" }}>
          <img src={d.img} alt={d.name} style={{ width: 110, height: 110, borderRadius: "50%", objectFit: "cover", margin: "0 auto 14px" }} />
          <div style={{ fontWeight: 700, fontSize: 18 }}>{d.name}</div>
          <div style={{ color: COLORS.gray, marginBottom: 10 }}>{d.specialty}</div>
          <div style={{ display: "inline-block", background: COLORS.main, color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 14, marginBottom: 18 }}>{d.rating} ★</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 18 }}>
            {[Calendar, Phone, Mail].map((Icon, i) => (
              <div key={i} style={{ width: 44, height: 44, borderRadius: 10, background: "#cdeaeb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={18} color={COLORS.main} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: "left", fontSize: 14, color: COLORS.text, lineHeight: 2 }}>
            <div>{d.consultationFee}-{d.consultationFee + 150} $</div>
            <div>Online / Offline</div>
            <div><CreditCard size={14} style={{ verticalAlign: -2 }} /> Price : {d.price}</div>
            <div style={{ color: COLORS.green }}><Clock size={14} style={{ verticalAlign: -2 }} /> Waiting Time : {d.waiting} Minutes</div>
            <div><Phone size={14} style={{ verticalAlign: -2 }} /> 1599 : Cost of regular call</div>
          </div>
          <button onClick={() => go("bookAppointment", d)} style={{ ...btnPrimary(), width: "100%", marginTop: 18 }}>Book Appointment</button>
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>{d.name}</h2>
          <div style={{ color: COLORS.gray, marginBottom: 16 }}>{d.specialty}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, marginBottom: 10 }}><MapPin size={18} /> {d.area}, Egypt</div>
          <p style={{ color: COLORS.gray, lineHeight: 1.7, maxWidth: 600 }}>{d.bio}</p>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 28, marginBottom: 12 }}>Specializations</h3>
          <div style={{ display: "flex", gap: 12 }}>
            {d.subSpecialty.map((s) => (
              <div key={s} style={{ border: `1px solid ${COLORS.main}`, color: COLORS.main, background: "#eaf6f7", borderRadius: 10, padding: "12px 24px", fontWeight: 600 }}>{s}</div>
            ))}
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 28, marginBottom: 12 }}>Conditions Treated</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {d.conditionsTreated.map((s) => (
              <div key={s} style={{ border: `1px solid ${COLORS.main}`, color: COLORS.main, background: "#eaf6f7", borderRadius: 10, padding: "12px 24px", fontWeight: 600 }}>{s}</div>
            ))}
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 28, marginBottom: 8 }}>Qualification</h3>
          {d.education.map((e, i) => (
            <div key={i} style={{ marginBottom: 4 }}><strong>{e.degree}</strong> — {e.university} ({e.year})</div>
          ))}

          <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>Certifications</h3>
          {d.certifications.map((c, i) => (
            <div key={i} style={{ marginBottom: 4 }}><strong>{c.name}</strong> — {c.issuer} ({c.year})</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- BOOK APPOINTMENT ----------
function BookAppointment({ go, ctx }) {
  const d = ctx || DOCTORS[0];
  const [date, setDate] = useState("Wed 23");
  const [consult, setConsult] = useState("Clinic visit");
  const [time, setTime] = useState("12:00 Pm");
  const dates = ["Mon 21", "Tue 22", "Wed 23", "The 24", "Fri 25", "Sat 26", "Sun 27"];
  const times = ["10:00 Am", "11:00 Am", "12:00 Pm", "2:00 Pm"];
  return (
    <div>
      <BackArrow onClick={() => go("doctorProfilePublic", d)} />
      <div style={{ display: "flex", gap: 40, padding: "20px 40px" }}>
        <div style={{ background: "#e3f3f4", borderRadius: 16, padding: 24, width: 280, textAlign: "center", alignSelf: "flex-start" }}>
          <img src={d.img} alt={d.name} style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", margin: "0 auto 14px" }} />
          <div style={{ fontWeight: 700, fontSize: 18 }}>{d.name}</div>
          <div style={{ color: COLORS.gray, marginBottom: 10 }}>{d.specialty}</div>
          <div style={{ display: "inline-block", background: COLORS.main, color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 14 }}>{d.rating} ★</div>
          <div style={{ textAlign: "left", fontSize: 14, color: COLORS.text, lineHeight: 2, marginTop: 16 }}>
            <div><Clock size={14} style={{ verticalAlign: -2 }} /> Waiting Time : {d.waiting} Minutes</div>
            <div><Phone size={14} style={{ verticalAlign: -2 }} /> 1599 : Cost of regular call</div>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: 700 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>{d.name}</h2>
          <p style={{ color: COLORS.gray, margin: "10px 0 24px" }}>You will be contacted by phone number by the doctor's clinic to confirm the reservation.</p>
          <h3 style={{ fontWeight: 700, marginBottom: 6 }}>Fees</h3>
          <p style={{ marginBottom: 24 }}>{d.consultationFee}-{d.consultationFee + 150} $</p>

          <h3 style={{ fontWeight: 700, marginBottom: 14 }}>Choose Appointment Time</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Date</span>
            <span style={{ color: COLORS.main, cursor: "pointer" }}>April <ChevronRight size={14} style={{ verticalAlign: -2 }} /></span>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {dates.map((dt) => (
              <div key={dt} onClick={() => setDate(dt)} style={{
                cursor: "pointer", padding: "10px 14px", borderRadius: 10, textAlign: "center", fontSize: 14,
                background: date === dt ? COLORS.main : "#fff", color: date === dt ? "#fff" : COLORS.text,
                border: date === dt ? "none" : "1px solid #eee",
              }}>{dt.split(" ")[0]}<br />{dt.split(" ")[1]}</div>
            ))}
          </div>

          <h3 style={{ fontWeight: 700, marginBottom: 14 }}>Consult Type</h3>
          <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
            {["Clinic visit", "Home Visit", "Online Consult"].map((c) => (
              <button key={c} onClick={() => setConsult(c)} style={consult === c ? btnPrimary({ flex: 1 }) : btnOutline({ flex: 1 })}>{c}</button>
            ))}
          </div>

          <h3 style={{ fontWeight: 700, marginBottom: 14 }}>Time</h3>
          <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
            {times.map((t) => (
              <button key={t} onClick={() => setTime(t)} style={time === t ? btnPrimary({ flex: 1 }) : btnOutline({ flex: 1 })}>{t}</button>
            ))}
          </div>

          <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Notes for the Doctor</h3>
          <input placeholder="Symptoms" style={{ ...inputStyle(), marginBottom: 20, border: "none", borderBottom: "1px solid #ddd", borderRadius: 0, padding: "8px 0" }} />

          <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Documents</h3>
          <div style={{ border: "1px dashed #ccc", borderRadius: 10, padding: 20, textAlign: "center", color: COLORS.gray, marginBottom: 30 }}>
            <Paperclip size={18} style={{ verticalAlign: -3, marginRight: 8 }} />Attach files (Max. 10 files)
          </div>

          <button onClick={() => go("bookingConfirmed", d)} style={{ ...btnPrimary(), width: "100%", padding: 16, fontSize: 17 }}>Book</button>
        </div>
      </div>
    </div>
  );
}

function BookingConfirmed({ go, ctx }) {
  const d = ctx || DOCTORS[0];
  return (
    <div>
      <BackArrow onClick={() => go("landing")} />
      <div style={{ display: "flex", gap: 40, padding: "20px 40px" }}>
        <div style={{ width: 520, border: "1px solid #eee", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ height: 220, position: "relative" }}>
            <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.95)", color: COLORS.green, fontWeight: 700, padding: "8px 14px", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <Check size={16} /> Your booking was successfully submitted
            </div>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}><Mail size={18} color={COLORS.gray} /><span>We notified {d.name} of your booking</span></div>
            <div style={{ display: "flex", gap: 10, marginBottom: 18, borderBottom: "1px solid #eee", paddingBottom: 18 }}><CreditCard size={18} color={COLORS.gray} /><span>Examination Fees: {d.consultationFee} EGP</span></div>
            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}><Phone size={18} color={COLORS.gray} /><span>Clinic number: <span style={{ color: COLORS.main }}>01000722584</span></span></div>
            <div style={{ display: "flex", gap: 10, marginBottom: 18, borderBottom: "1px solid #eee", paddingBottom: 18 }}><Calendar size={18} color={COLORS.gray} /><span>Booking details</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}><span>Patient name</span><strong>{PATIENT_PROFILE.name}</strong></div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}><span>Booking date</span><strong>12/4/2025</strong></div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}><span>Clinic address</span><strong>{d.clinicLocation[0]}</strong></div>
            <button onClick={() => go("patientPortal", { tab: "appointments" })} style={{ ...btnPrimary(), width: "100%", marginTop: 20 }}>My Appointments</button>
          </div>
        </div>

        <div style={{ flex: 1, border: "1px solid #eee", borderRadius: 14, overflow: "hidden", maxWidth: 600 }}>
          <div style={{ background: COLORS.main, color: "#fff", padding: "16px 24px", fontWeight: 700, fontSize: 18 }}>Notes for the doctor (optional)</div>
          <div style={{ padding: 24 }}>
            <label style={label()}>Symptoms</label>
            <input style={{ ...inputStyle(), marginBottom: 24, border: "none", borderBottom: "1px solid #ddd", borderRadius: 0, padding: "8px 0" }} />
            <label style={label()}>Documents</label>
            <p style={{ color: COLORS.gray, fontSize: 13, marginBottom: 10 }}>Use images or PDF files (Max. 10 files)</p>
            <div style={{ border: "1px dashed #ccc", borderRadius: 10, padding: 24, textAlign: "center", color: COLORS.gray, marginBottom: 30 }}>
              <Paperclip size={18} style={{ verticalAlign: -3, marginRight: 8 }} />Attach files
            </div>
            <button style={{ ...btnPrimary(), width: "100%" }}>Send to the doctor</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- AUTH ----------
function AuthPage({ go, mode, setRole }) {
  const [tab, setTab] = useState(mode || "login");
  const [regRole, setRegRole] = useState("patient");
  return (
    <div style={{ display: "flex", minHeight: 600 }}>
      <div style={{ flex: 1, padding: "60px 70px" }}>
        <div style={{ marginBottom: 30, cursor: "pointer" }} onClick={() => go("landing")}><Logo /></div>
        <div style={{ display: "flex", gap: 30, marginBottom: 30, borderBottom: "1px solid #eee" }}>
          {["login", "signup"].map((t) => (
            <div key={t} onClick={() => setTab(t)} style={{
              cursor: "pointer", paddingBottom: 14, fontSize: 22, fontWeight: 700,
              color: tab === t ? COLORS.main : "#ccc", borderBottom: tab === t ? `3px solid ${COLORS.main}` : "none",
            }}>{t === "login" ? "Login" : "Sign up"}</div>
          ))}
        </div>

        {tab === "signup" && (
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {["patient", "doctor"].map((r) => (
              <button key={r} onClick={() => setRegRole(r)} style={regRole === r ? btnPrimary({ flex: 1 }) : btnOutline({ flex: 1 })}>
                {r === "patient" ? "I'm a patient" : "I'm a doctor"}
              </button>
            ))}
            <div style={{ position: "relative" }}>
              <button disabled style={{ ...btnOutline({ flex: 1 }), opacity: 0.4, cursor: "not-allowed" }}>Admin (seed only)</button>
            </div>
          </div>
        )}

        {tab === "login" ? (
          <>
            <div style={{ position: "relative", marginBottom: 18 }}>
              <Mail size={18} style={{ position: "absolute", left: 14, top: 14, color: COLORS.gray }} />
              <input placeholder="Enter your email" style={{ ...inputStyle(), paddingLeft: 42 }} />
            </div>
            <div style={{ position: "relative", marginBottom: 10 }}>
              <Eye size={18} style={{ position: "absolute", left: 14, top: 14, color: COLORS.gray }} />
              <input placeholder="Enter your Password" type="password" style={{ ...inputStyle(), paddingLeft: 42 }} />
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 18, fontSize: 13, color: COLORS.gray }}>
              Try as:
              <span style={{ color: COLORS.main, cursor: "pointer" }} onClick={() => setRole("patient")}>Patient</span> ·
              <span style={{ color: COLORS.main, cursor: "pointer" }} onClick={() => setRole("doctor")}>Doctor</span> ·
              <span style={{ color: COLORS.main, cursor: "pointer" }} onClick={() => setRole("admin")}>Admin</span>
            </div>
            <button onClick={() => setRole(regRole === "doctor" ? "doctor" : "patient")} style={{ ...btnPrimary(), width: "100%" }}>Login</button>
            <div style={{ textAlign: "center", marginTop: 14, fontWeight: 600, fontSize: 14, color: COLORS.text }}>Forget your password?</div>
          </>
        ) : regRole === "patient" ? (
          <>
            <input placeholder="Full name" style={{ ...inputStyle(), marginBottom: 16 }} />
            <input placeholder="Email" style={{ ...inputStyle(), marginBottom: 16 }} />
            <input placeholder="Password" type="password" style={{ ...inputStyle(), marginBottom: 16 }} />
            <input placeholder="National ID" style={{ ...inputStyle(), marginBottom: 16 }} />
            <input placeholder="Phone number" style={{ ...inputStyle(), marginBottom: 24 }} />
            <button onClick={() => setRole("patient")} style={{ ...btnPrimary(), width: "100%" }}>Create account</button>
          </>
        ) : (
          <>
            <input placeholder="Full name" style={{ ...inputStyle(), marginBottom: 16 }} />
            <input placeholder="Email" style={{ ...inputStyle(), marginBottom: 16 }} />
            <input placeholder="Password" type="password" style={{ ...inputStyle(), marginBottom: 16 }} />
            <select style={{ ...inputStyle(), marginBottom: 16 }}><option>Specialty</option>{SPECIALTIES.slice(1).map(s => <option key={s}>{s}</option>)}</select>
            <label style={{ ...label(), marginTop: 6 }}>Required documents</label>
            {["Graduation certificate", "Syndicate card", "National ID card"].map((doc) => (
              <div key={doc} style={{ border: "1px dashed #ccc", borderRadius: 10, padding: "14px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", color: COLORS.gray }}>
                <span><Upload size={16} style={{ verticalAlign: -3, marginRight: 8 }} />{doc}</span>
                <span style={{ color: COLORS.main, fontSize: 13, cursor: "pointer" }}>Upload</span>
              </div>
            ))}
            <p style={{ fontSize: 13, color: COLORS.gray, margin: "14px 0 20px" }}>Your account will be reviewed by an admin before you can log in.</p>
            <button onClick={() => go("pendingApproval")} style={{ ...btnPrimary(), width: "100%" }}>Submit registration</button>
          </>
        )}
      </div>
      <div style={{ flex: 1, background: COLORS.main, color: "#fff", padding: "60px 70px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Welcome Back !</h2>
        <h1 style={{ fontSize: 44, fontWeight: 700 }}>Wellness Made Easy.</h1>
      </div>
    </div>
  );
}

function PendingApproval({ go }) {
  return (
    <div style={{ textAlign: "center", padding: "100px 40px" }}>
      <Clock size={60} color={COLORS.main} style={{ marginBottom: 20 }} />
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Registration submitted</h2>
      <p style={{ color: COLORS.gray, maxWidth: 460, margin: "0 auto 30px" }}>
        An admin will review your documents and approve your account. You'll be notified once you can log in.
      </p>
      <button onClick={() => go("landing")} style={btnPrimary()}>Back to home</button>
    </div>
  );
}

// ============ PATIENT PORTAL ============
function PatientSidebar({ active, setActive, exitRole }) {
  const items = [
    { key: "profile", label: "Profile", icon: User },
    { key: "history", label: "History", icon: History },
    { key: "idSearch", label: "ID Search", icon: FileSearch },
    { key: "appointments", label: "My appointment", icon: CalendarCheck },
    { key: "messages", label: "Messages", icon: MessageSquare },
    { key: "doctorAccess", label: "Doctor Access", icon: Lock },
    { key: "findDoctors", label: "Find Doctors", icon: Search },
  ];
  return (
    <div style={{ width: 260, border: `2px solid ${COLORS.main}`, borderRadius: 16, padding: "32px 20px", textAlign: "center", alignSelf: "flex-start" }}>
      <img src={PATIENT_PROFILE.photo} alt="me" style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", margin: "0 auto 14px" }} />
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>{PATIENT_PROFILE.name}</div>
      {items.map((it) => (
        <div key={it.key} onClick={() => setActive(it.key)} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 8, cursor: "pointer",
          background: active === it.key ? "#eef0f0" : "transparent", color: COLORS.text, marginBottom: 4, textAlign: "left",
        }}>
          <it.icon size={18} /> {it.label}
        </div>
      ))}
      <div onClick={exitRole} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", color: COLORS.red, cursor: "pointer", marginTop: 16 }}>
        <LogOut size={18} /> Logout
      </div>
    </div>
  );
}

function PatientProfileTab() {
  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Profile</h2>
      <label style={label()}>Name</label>
      <input defaultValue={PATIENT_PROFILE.name} style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>Email</label>
      <input defaultValue={PATIENT_PROFILE.email} style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>Location</label>
      <input defaultValue={PATIENT_PROFILE.location} style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>Phone Number</label>
      <input defaultValue={PATIENT_PROFILE.phone} style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>National ID</label>
      <input defaultValue={PATIENT_PROFILE.nationalId} style={{ ...inputStyle(), marginBottom: 26 }} />
      <button style={btnPrimary()}>Save</button>
    </div>
  );
}

function PatientIdSearchTab() {
  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>ID Search emergency info</h2>
      <p style={{ color: COLORS.gray, marginBottom: 24, fontSize: 14 }}>This is the information shown to anyone who searches your National ID in an emergency.</p>
      <label style={label()}>My Phone number</label>
      <input defaultValue={PATIENT_PROFILE.phone} style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>First emergency number</label>
      <input defaultValue={PATIENT_PROFILE.emergencyPhone} style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>Address</label>
      <input defaultValue={PATIENT_PROFILE.location} style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>Blood Type</label>
      <select defaultValue={PATIENT_PROFILE.bloodType} style={{ ...inputStyle(), marginBottom: 18 }}>
        {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(b => <option key={b}>{b}</option>)}
      </select>
      <label style={label()}>Chronic diseases / current medications</label>
      <textarea defaultValue={PATIENT_PROFILE.chronic} style={{ ...inputStyle(), marginBottom: 18, minHeight: 70 }} />
      <label style={label()}>Allergies</label>
      <input defaultValue={PATIENT_PROFILE.allergies} style={{ ...inputStyle(), marginBottom: 26 }} />
      <label style={label()}>Photo</label>
      <img src={PATIENT_PROFILE.photo} alt="profile" style={{ width: 130, height: 130, borderRadius: 12, objectFit: "cover", marginBottom: 24, display: "block" }} />
      <button style={btnPrimary()}>Save</button>
    </div>
  );
}

function statusColor(status) {
  if (status === "Approved") return { bg: "#eaf6ec", text: COLORS.green };
  if (status === "Cancelled") return { bg: "#fbeaea", text: COLORS.red };
  if (status === "Completed") return { bg: "#e9f3fd", text: "#2b7fd1" };
  return { bg: "#fff8e6", text: "#cc9a06" };
}

function PatientAppointmentsTab() {
  const [filter, setFilter] = useState("All");
  const [appts, setAppts] = useState(APPOINTMENTS);
  const filtered = filter === "All" ? appts : appts.filter(a => a.status === filter);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>My appointment</h2>
        <div style={{ display: "flex", gap: 10 }}>
          {["Pending", "Approved", "Completed", "Cancelled"].map((s) => (
            <button key={s} onClick={() => setFilter(filter === s ? "All" : s)}
              style={{ borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", border: `1.5px solid ${statusColor(s).text}`, background: filter === s ? statusColor(s).text : "#fff", color: filter === s ? "#fff" : statusColor(s).text }}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {filtered.map((a) => {
          const sc = statusColor(a.status);
          return (
            <div key={a.id} style={{ border: `1.5px solid ${sc.text}30`, borderRadius: 14, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <img src={a.img} alt={a.doctor} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{a.doctor}</div>
                  <div style={{ color: COLORS.gray, fontSize: 13 }}>{a.specialty}</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>{a.date} - {a.time} · {a.price} $</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: "6px 16px", fontWeight: 700, fontSize: 13 }}>{a.status}</span>
                {a.status === "Pending" && (
                  <button onClick={() => setAppts(appts.map(x => x.id === a.id ? { ...x, status: "Cancelled" } : x))}
                    style={{ ...btnOutline(), borderColor: COLORS.red, color: COLORS.red, padding: "6px 16px", fontSize: 13 }}>Cancel</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PatientHistoryTab() {
  const [active, setActive] = useState(0);
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>History</h2>
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {HISTORY_FOLDERS.map((f, i) => (
          <button key={f.name} onClick={() => setActive(i)} style={active === i ? btnPrimary({ borderRadius: 10 }) : btnOutline({ borderRadius: 10 })}>{f.name}</button>
        ))}
        <button style={{ ...btnOutline({ borderRadius: 10 }) }}><Plus size={14} style={{ verticalAlign: -2, marginRight: 4 }} />Add New Folder</button>
      </div>
      <div style={{ position: "relative", paddingLeft: 24 }}>
        <div style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 2, background: COLORS.main }} />
        {HISTORY_FOLDERS[active].entries.map((e, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 32, paddingBottom: 24, borderBottom: i < HISTORY_FOLDERS[active].entries.length - 1 ? "1px dashed #ddd" : "none" }}>
            <div style={{ position: "absolute", left: -24, top: 4, width: 12, height: 12, borderRadius: "50%", background: COLORS.main }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: COLORS.gray, fontSize: 13, marginBottom: 4 }}>{e.date}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{e.diagnosis}</div>
                <div style={{ fontSize: 14, marginBottom: 4 }}>Treating Physician : {e.physician}</div>
                <div style={{ fontSize: 13, color: COLORS.gray, marginBottom: 10 }}>{e.visitDate}</div>
                <div style={{ fontSize: 14, color: COLORS.text, maxWidth: 540 }}>Note : {e.note}</div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <button style={btnOutline({ fontSize: 13, padding: "8px 16px" })}>View documents</button>
                <MoreVertical size={18} color={COLORS.gray} />
              </div>
            </div>
          </div>
        ))}
        <div style={{ position: "relative", color: COLORS.main, fontWeight: 700, cursor: "pointer" }}>
          <div style={{ position: "absolute", left: -25, top: 2, width: 14, height: 14, background: COLORS.main, transform: "rotate(45deg)" }} />
          Add New History
        </div>
      </div>
    </div>
  );
}

function PatientDoctorAccessTab() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Doctor Access Management</h2>
      <p style={{ color: COLORS.gray, marginBottom: 24, fontSize: 14 }}>Grant doctors permission to view or edit specific medical history folders.</p>
      {DOCTOR_ACCESS.map((a, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 14, padding: 20, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700 }}>{a.doctor}</div>
            <div style={{ color: COLORS.gray, fontSize: 13 }}>Folder: {a.folder}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["View", "Add", "Edit", "Delete"].map((p) => (
              <span key={p} style={{
                borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600,
                background: a.permissions.includes(p) ? "#eaf6f7" : "#f4f4f4",
                color: a.permissions.includes(p) ? COLORS.main : COLORS.gray,
              }}>{p}</span>
            ))}
            <button style={{ ...btnOutline({ borderColor: COLORS.red, color: COLORS.red, padding: "6px 14px", fontSize: 13 }) }}>Revoke</button>
          </div>
        </div>
      ))}
      <button style={btnPrimary()}><Plus size={14} style={{ verticalAlign: -2, marginRight: 4 }} />Grant access to a doctor</button>
    </div>
  );
}

function PatientFindDoctorsTab({ go }) {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Find Doctors</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 10, marginBottom: 24 }}>
        <select style={inputStyle()}><option>Specialty</option>{SPECIALTIES.slice(1).map(s => <option key={s}>{s}</option>)}</select>
        <select style={inputStyle()}><option>Area</option><option>Nasr City</option><option>Maadi</option></select>
        <input placeholder="Doctor name" style={inputStyle()} />
        <button style={btnPrimary()}>Search</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {DOCTORS.filter(d => d.status === "approved").map((d) => (
          <div key={d.id} onClick={() => go("doctorProfilePublic", d)} style={{ cursor: "pointer", border: "1px solid #eee", borderRadius: 14, overflow: "hidden" }}>
            <img src={d.img} alt={d.name} style={{ width: "100%", height: 150, objectFit: "cover" }} />
            <div style={{ padding: 14, textAlign: "center" }}>
              <div style={{ fontWeight: 700 }}>{d.name}</div>
              <div style={{ color: COLORS.gray, fontSize: 13 }}>{d.specialty} · {d.area}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatPanel({ title }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>{title || "Messages"}</h2>
      <div style={{ display: "flex", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", height: 480 }}>
        <div style={{ width: 280, borderRight: "1px solid #eee" }}>
          <div style={{ padding: 16, borderBottom: "1px solid #eee", display: "flex", gap: 8 }}>
            <Search size={16} color={COLORS.gray} style={{ marginTop: 10 }} />
            <input placeholder="Search" style={{ border: "none", outline: "none", flex: 1 }} />
          </div>
          {CHATS.map((c, i) => (
            <div key={i} onClick={() => setActive(i)} style={{ display: "flex", gap: 10, padding: 14, cursor: "pointer", background: active === i ? "#e9f7f8" : "transparent", borderBottom: "1px solid #f5f5f5" }}>
              <img src={c.img} alt={c.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                <div style={{ color: COLORS.gray, fontSize: 12 }}>{c.last}</div>
              </div>
              {c.unread > 0 && <span style={{ background: COLORS.main, color: "#fff", borderRadius: "50%", width: 20, height: 20, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.unread}</span>}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 16, borderBottom: "1px solid #eee", display: "flex", gap: 10, alignItems: "center" }}>
            <img src={CHATS[active].img} alt={CHATS[active].name} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
            <strong>{CHATS[active].name}</strong>
          </div>
          <div style={{ flex: 1, padding: 20 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <img src={CHATS[active].img} alt="" style={{ width: 28, height: 28, borderRadius: "50%" }} />
              <div style={{ background: "#f3f3f3", borderRadius: 12, padding: "10px 16px", maxWidth: 280 }}>Hi, how can I help you today?</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
              <div style={{ background: COLORS.main, color: "#fff", borderRadius: 12, padding: "10px 16px", maxWidth: 280 }}>{CHATS[active].last}</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #eee", padding: 14, display: "flex", gap: 10, alignItems: "center" }}>
            <Paperclip size={18} color={COLORS.gray} />
            <input placeholder="Enter message" style={{ flex: 1, border: "none", outline: "none" }} />
            <ImageIcon size={18} color={COLORS.gray} />
            <Send size={18} color={COLORS.main} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientPortal({ go, ctx, exitRole }) {
  const [tab, setTab] = useState(ctx?.tab || "profile");
  return (
    <div style={{ display: "flex", gap: 30, padding: "30px 40px" }}>
      <PatientSidebar active={tab} setActive={setTab} exitRole={exitRole} />
      <div style={{ flex: 1 }}>
        {tab === "profile" && <PatientProfileTab />}
        {tab === "idSearch" && <PatientIdSearchTab />}
        {tab === "appointments" && <PatientAppointmentsTab />}
        {tab === "history" && <PatientHistoryTab />}
        {tab === "doctorAccess" && <PatientDoctorAccessTab />}
        {tab === "messages" && <ChatPanel />}
        {tab === "findDoctors" && <PatientFindDoctorsTab go={go} />}
      </div>
    </div>
  );
}

// ============ DOCTOR PORTAL ============
function DoctorSidebar({ active, setActive, exitRole }) {
  const items = [
    { key: "todayAppointments", label: "Appointments", icon: CalendarCheck },
    { key: "profile", label: "Profile", icon: User },
    { key: "updateProfile", label: "Update profile", icon: RefreshCw },
    { key: "slots", label: "Free Slots", icon: Clock },
    { key: "patientAccess", label: "Patient Records", icon: Lock },
    { key: "messages", label: "Messages", icon: MessageSquare },
  ];
  return (
    <div style={{ width: 260, border: `2px solid ${COLORS.main}`, borderRadius: 16, padding: "32px 20px", textAlign: "center", alignSelf: "flex-start" }}>
      <img src={DOCTORS[1].img} alt="me" style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", margin: "0 auto 14px" }} />
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Dr. Ahmed Mohamed</div>
      {items.map((it) => (
        <div key={it.key} onClick={() => setActive(it.key)} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 8, cursor: "pointer",
          background: active === it.key ? "#eef0f0" : "transparent", color: COLORS.text, marginBottom: 4, textAlign: "left",
        }}>
          <it.icon size={18} /> {it.label}
        </div>
      ))}
      <div onClick={exitRole} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", color: COLORS.red, cursor: "pointer", marginTop: 16 }}>
        <LogOut size={18} /> Logout
      </div>
    </div>
  );
}

function DoctorTodayAppointmentsTab() {
  const [requests, setRequests] = useState(DOCTOR_REQUESTS);
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Today Appointments</h2>
      <div style={{ display: "flex", gap: 14, marginBottom: 30, flexWrap: "wrap" }}>
        {DOCTOR_TODAY.map((a, i) => (
          <div key={i} style={{ background: i === 0 ? COLORS.main : "#fff", color: i === 0 ? "#fff" : COLORS.text, border: i === 0 ? "none" : `1px solid ${COLORS.main}`, borderRadius: 12, padding: 16, minWidth: 200, display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{a.patient}</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>{a.time} · {a.type}</div>
            </div>
            <MoreVertical size={16} />
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Requests</h2>
      <div style={{ overflowX: "auto", marginBottom: 30 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.main, color: "#fff" }}>
              {["Patient Name", "Gender", "Date", "Time", "Type", "Location", "Accept", "Decline"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 13 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px 14px" }}>{r.patient}</td>
                <td style={{ padding: "12px 14px" }}>{r.gender}</td>
                <td style={{ padding: "12px 14px" }}>{r.date}</td>
                <td style={{ padding: "12px 14px" }}>{r.time}</td>
                <td style={{ padding: "12px 14px" }}>{r.type}</td>
                <td style={{ padding: "12px 14px" }}>{r.location}, <span style={{ color: COLORS.main, textDecoration: "underline" }}>See location</span></td>
                <td style={{ padding: "12px 14px" }}>
                  <button onClick={() => setRequests(requests.filter((_, idx) => idx !== i))} style={{ background: "#eaf6ec", border: "none", borderRadius: 6, width: 30, height: 30, color: COLORS.green, cursor: "pointer" }}><Check size={16} /></button>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <button onClick={() => setRequests(requests.filter((_, idx) => idx !== i))} style={{ background: "#fbeaea", border: "none", borderRadius: 6, width: 30, height: 30, color: COLORS.red, cursor: "pointer" }}><X size={16} /></button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && <tr><td colSpan={8} style={{ padding: 20, textAlign: "center", color: COLORS.gray }}>No pending requests</td></tr>}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>All Appointments</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: COLORS.main, color: "#fff" }}>
            {["Patient Name", "Gender", "Date", "Time", "Type", "Location", "Action"].map(h => (
              <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 13 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {APPOINTMENTS.map((a, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px 14px" }}>{a.doctor.replace("Dr. ", "")}</td>
              <td style={{ padding: "12px 14px" }}>Male</td>
              <td style={{ padding: "12px 14px" }}>{a.date}</td>
              <td style={{ padding: "12px 14px" }}>{a.time}</td>
              <td style={{ padding: "12px 14px" }}>Clinic Visit</td>
              <td style={{ padding: "12px 14px" }}>Cairo, <span style={{ color: COLORS.main, textDecoration: "underline" }}>See location</span></td>
              <td style={{ padding: "12px 14px" }}>
                {a.status === "Approved" ? (
                  <button style={btnOutline({ padding: "6px 14px", fontSize: 13 })}>Complete</button>
                ) : <span style={{ color: COLORS.gray, fontSize: 13 }}>{a.status}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DoctorSlotsTab() {
  const [selectedDates, setSelectedDates] = useState(["Wed 23", "Fri 25", "Sun 27"]);
  const [selectedTimes, setSelectedTimes] = useState(["12:00 PM", "4:00 PM", "9:00 PM"]);
  const dates = ["Mon 21", "Tue 22", "Wed 23", "The 24", "Fri 25", "Sat 26", "Sun 27"];
  const times = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 AM", "8:00 AM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 PM"];
  const toggle = (val, list, setList) => setList(list.includes(val) ? list.filter(v => v !== val) : [...list, val]);
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Free Appointments This Week</h2>
      <p style={{ color: COLORS.gray, fontSize: 14, marginBottom: 24 }}>Each slot is 30 minutes and can only be booked by one patient.</p>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontWeight: 600 }}>Date</span>
        <span style={{ color: COLORS.main, cursor: "pointer" }}>April <ChevronRight size={14} style={{ verticalAlign: -2 }} /></span>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 30, flexWrap: "wrap" }}>
        {dates.map((d) => (
          <div key={d} onClick={() => toggle(d, selectedDates, setSelectedDates)} style={{
            cursor: "pointer", padding: "10px 14px", borderRadius: 10, textAlign: "center", fontSize: 14, minWidth: 56,
            background: selectedDates.includes(d) ? COLORS.main : "#fff", color: selectedDates.includes(d) ? "#fff" : COLORS.text,
            border: selectedDates.includes(d) ? "none" : "1px solid #eee",
          }}>{d.split(" ")[0]}<br />{d.split(" ")[1]}</div>
        ))}
      </div>
      <div style={{ fontWeight: 600, marginBottom: 10 }}>Time (30-min slots)</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 30 }}>
        {times.map((t, i) => (
          <div key={i} onClick={() => toggle(t, selectedTimes, setSelectedTimes)} style={{
            cursor: "pointer", padding: "10px 8px", borderRadius: 10, textAlign: "center", fontSize: 13,
            background: selectedTimes.includes(t) ? COLORS.main : "#fff", color: selectedTimes.includes(t) ? "#fff" : COLORS.text,
            border: selectedTimes.includes(t) ? "none" : "1px solid #eee",
          }}>{t}</div>
        ))}
      </div>
      <button style={btnPrimary()}>Save</button>
    </div>
  );
}

function DoctorUpdateProfileTab() {
  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Update profile</h2>
      <label style={label()}>Specialization</label>
      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        <input defaultValue="Cardiology" style={inputStyle()} />
        <input placeholder="Type..." style={inputStyle()} />
        <button style={{ width: 44, height: 44, borderRadius: 10, border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}><Plus size={18} /></button>
      </div>
      <label style={label()}>Clinic number</label>
      <input defaultValue="19511" style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>Clinic Location</label>
      <input defaultValue="Nasr City Medical Center, Building 5" style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>Conditions Treated</label>
      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        <input defaultValue="Heart Disease" style={inputStyle()} />
        <input defaultValue="Arrhythmia" style={inputStyle()} />
        <button style={{ width: 44, height: 44, borderRadius: 10, border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}><Plus size={18} /></button>
      </div>
      <label style={label()}>Type</label>
      <div style={{ display: "flex", gap: 20, marginBottom: 18, fontSize: 15 }}>
        {["Online", "Offline", "Both"].map((t) => (
          <label key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input type="radio" name="type" defaultChecked={t === "Both"} /> {t}
          </label>
        ))}
      </div>
      <label style={label()}>Bio</label>
      <textarea defaultValue="Experienced cardiologist with 10+ years treating heart diseases." style={{ ...inputStyle(), marginBottom: 18, minHeight: 70 }} />
      <label style={label()}>Consultation Fee</label>
      <input defaultValue="300" style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>Waiting Time (min)</label>
      <input defaultValue="18" style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>Education</label>
      <textarea defaultValue={"MBBS, Cairo University, 2012\nMD Cardiology, Ain Shams University, 2017"} style={{ ...inputStyle(), marginBottom: 18, minHeight: 70 }} />
      <label style={label()}>Certifications</label>
      <textarea defaultValue="Advanced Cardiac Life Support — AHA, 2020" style={{ ...inputStyle(), marginBottom: 26, minHeight: 60 }} />
      <button style={btnPrimary()}>Save</button>
    </div>
  );
}

function DoctorPatientAccessTab() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Patient records you can access</h2>
      <p style={{ color: COLORS.gray, marginBottom: 24, fontSize: 14 }}>You can only see folders the patient has explicitly granted you access to.</p>
      <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontWeight: 700 }}>Ahmed Mohamed</div>
            <div style={{ color: COLORS.gray, fontSize: 13 }}>Folder: Cardiology · Permissions: View, Add</div>
          </div>
          <button style={btnOutline({ padding: "8px 16px", fontSize: 13 })}>Open folder</button>
        </div>
        <div style={{ background: "#f8f8f8", borderRadius: 10, padding: 14, fontSize: 14 }}>
          <strong>Mild Arrhythmia</strong> — 2/4/2025<br />
          <span style={{ color: COLORS.gray }}>Patient reports occasional palpitations. ECG shows mild irregularity.</span>
        </div>
      </div>
    </div>
  );
}

function DoctorPortal({ ctx, exitRole }) {
  const [tab, setTab] = useState("todayAppointments");
  return (
    <div style={{ display: "flex", gap: 30, padding: "30px 40px" }}>
      <DoctorSidebar active={tab} setActive={setTab} exitRole={exitRole} />
      <div style={{ flex: 1 }}>
        {tab === "todayAppointments" && <DoctorTodayAppointmentsTab />}
        {tab === "profile" && (
          <div style={{ maxWidth: 600 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 18 }}>Profile</h2>
            <p style={{ color: COLORS.gray, marginBottom: 18 }}>This is how patients see you when booking.</p>
            <DoctorProfilePreviewCard />
          </div>
        )}
        {tab === "updateProfile" && <DoctorUpdateProfileTab />}
        {tab === "slots" && <DoctorSlotsTab />}
        {tab === "patientAccess" && <DoctorPatientAccessTab />}
        {tab === "messages" && <ChatPanel title="Messages" />}
      </div>
    </div>
  );
}

function DoctorProfilePreviewCard() {
  const d = DOCTORS[1];
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 20, display: "flex", gap: 16 }}>
      <img src={d.img} alt={d.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }} />
      <div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>Dr. Ahmed Mohamed</div>
        <div style={{ color: COLORS.gray, marginBottom: 6 }}>Cardiologist</div>
        <div style={{ fontSize: 13 }}>Nasr City Medical Center, Building 5 · 300 EGP</div>
      </div>
    </div>
  );
}

// ============ ADMIN PORTAL ============
function AdminSidebar({ active, setActive, exitRole }) {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { key: "doctorRequests", label: "Doctor Requests", icon: Stethoscope },
    { key: "doctors", label: "Doctors", icon: Users },
    { key: "users", label: "Users", icon: User },
    { key: "appointments", label: "Appointments", icon: CalendarCheck },
    { key: "settings", label: "Setting", icon: Settings },
  ];
  return (
    <div style={{ width: 220, padding: "20px 0", borderRight: "1px solid #eee", minHeight: "100vh" }}>
      <div style={{ padding: "0 24px 24px" }}><Logo /></div>
      {items.map((it) => (
        <div key={it.key} onClick={() => setActive(it.key)} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", cursor: "pointer",
          background: active === it.key ? COLORS.main : "transparent", color: active === it.key ? "#fff" : COLORS.text,
        }}>
          <it.icon size={18} /> {it.label}
        </div>
      ))}
      <div onClick={exitRole} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", color: COLORS.red, cursor: "pointer", marginTop: 20 }}>
        <LogOut size={18} /> Exit admin view
      </div>
    </div>
  );
}

function AdminTopBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 30px", borderBottom: "1px solid #eee" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid #eee", borderRadius: 10, padding: "8px 14px", width: 300 }}>
        <Search size={16} color={COLORS.gray} />
        <input placeholder="Search" style={{ border: "none", outline: "none", flex: 1 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#cdeaeb", display: "flex", alignItems: "center", justifyContent: "center" }}><User size={18} color={COLORS.main} /></div>
        <strong>Admin</strong>
      </div>
    </div>
  );
}

function AdminDashboardTab() {
  const stats = [
    { label: "Doctors", value: 245, sub: "3 Doctors Join This week", icon: Stethoscope, color: "#39a2ab" },
    { label: "Users", value: 245, sub: "24 Users Join This week", icon: User, color: "#e8a23a" },
    { label: "Hospitals", value: 245, sub: "3 Hospitals Join This week", icon: Building2, color: "#cb2027" },
    { label: "Ambulance", value: 245, sub: "3 Join This week", icon: Ambulance, color: "#8ccc44" },
  ];
  return (
    <div style={{ padding: 30 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 30 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ border: "1px solid #eee", borderRadius: 14, padding: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${s.color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <s.icon size={20} color={s.color} />
            </div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: COLORS.gray, marginBottom: 10 }}>{s.label}</div>
            <div style={{ fontSize: 13, color: s.color, fontWeight: 600 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 30 }}>
        <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: 18 }}>Success Rates by Specialty</h3>
            <select style={{ border: "1px solid #eee", borderRadius: 8, padding: "4px 10px" }}><option>Feb 2025</option></select>
          </div>
          {["Gynecology", "Cardiology", "Orthopedics", "Dermatology"].map((s) => (
            <div key={s} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 4 }}><span>{s}</span><span>83%</span></div>
              <div style={{ height: 8, background: "#eee", borderRadius: 6 }}><div style={{ width: "83%", height: 8, background: COLORS.main, borderRadius: 6 }} /></div>
            </div>
          ))}
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: 18 }}>Top Doctors</h3>
            <select style={{ border: "1px solid #eee", borderRadius: 8, padding: "4px 10px" }}><option>Feb 2025</option></select>
          </div>
          {DOCTORS.slice(0, 4).map((d) => (
            <div key={d.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 4 }}><span>{d.name}</span><span>83%</span></div>
              <div style={{ height: 8, background: "#eee", borderRadius: 6 }}><div style={{ width: "83%", height: 8, background: COLORS.main, borderRadius: 6 }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Recent Appointments</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ color: COLORS.gray, fontSize: 13 }}>
              {["Patient", "Date & Time", "Doctor", "Type", "Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "8px 0" }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {APPOINTMENTS.map((a, i) => (
              <tr key={i} style={{ borderTop: "1px solid #f5f5f5" }}>
                <td style={{ padding: "10px 0" }}>{PATIENT_PROFILE.name}</td>
                <td style={{ padding: "10px 0" }}>{a.date} / {a.time}</td>
                <td style={{ padding: "10px 0" }}>{a.doctor}</td>
                <td style={{ padding: "10px 0" }}>Clinic Visit</td>
                <td style={{ padding: "10px 0" }}><span style={{ color: statusColor(a.status).text, fontWeight: 600 }}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminDoctorRequestsTab() {
  const [reqs, setReqs] = useState(DOCTOR_REGISTRATIONS);
  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Doctor verification requests</h2>
      <p style={{ color: COLORS.gray, marginBottom: 24, fontSize: 14 }}>Review submitted documents before approving access to the system.</p>
      {reqs.length === 0 && <div style={{ color: COLORS.gray, padding: 30, textAlign: "center" }}>No pending requests.</div>}
      {reqs.map((r, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 14, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{r.name}</div>
              <div style={{ color: COLORS.gray, fontSize: 13 }}>{r.specialty} · Submitted {r.date}</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setReqs(reqs.filter((_, idx) => idx !== i))} style={{ ...btnPrimary({ background: COLORS.green, padding: "8px 18px" }) }}>Approve</button>
              <button onClick={() => setReqs(reqs.filter((_, idx) => idx !== i))} style={{ ...btnOutline({ borderColor: COLORS.red, color: COLORS.red, padding: "8px 18px" }) }}>Revoke</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {r.docs.map((doc) => (
              <div key={doc} style={{ border: "1px solid #eee", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: COLORS.text, display: "flex", alignItems: "center", gap: 6 }}>
                <FileText size={14} color={COLORS.main} /> {doc}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminDoctorsTab() {
  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Doctors</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ color: COLORS.gray, fontSize: 13, textAlign: "left" }}>
            {["No.", "Name", "Specialization", "Status", "Action"].map(h => <th key={h} style={{ padding: "10px 0" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {DOCTORS.map((d, i) => (
            <tr key={d.id} style={{ borderTop: "1px solid #f0f0f0" }}>
              <td style={{ padding: "12px 0" }}>{i + 1}</td>
              <td style={{ padding: "12px 0" }}>{d.name}</td>
              <td style={{ padding: "12px 0" }}>{d.specialty}</td>
              <td style={{ padding: "12px 0" }}>
                <span style={{ color: d.status === "approved" ? COLORS.green : "#cc9a06", fontWeight: 600, fontSize: 13 }}>
                  {d.status === "approved" ? "Approved" : "Pending"}
                </span>
              </td>
              <td style={{ padding: "12px 0" }}>
                <Trash2 size={16} color={COLORS.red} style={{ cursor: "pointer" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminUsersTab() {
  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Users</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ color: COLORS.gray, fontSize: 13, textAlign: "left" }}>
            {["Name", "Role", "Joined", "Action"].map(h => <th key={h} style={{ padding: "10px 0" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {ADMIN_USERS.map((u, i) => (
            <tr key={i} style={{ borderTop: "1px solid #f0f0f0" }}>
              <td style={{ padding: "12px 0" }}>{u.name}</td>
              <td style={{ padding: "12px 0" }}>{u.role}</td>
              <td style={{ padding: "12px 0" }}>{u.joined}</td>
              <td style={{ padding: "12px 0" }}><Trash2 size={16} color={COLORS.red} style={{ cursor: "pointer" }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminAppointmentsTab() {
  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>All Appointments</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ color: COLORS.gray, fontSize: 13, textAlign: "left" }}>
            {["Patient", "Doctor", "Date", "Time", "Status"].map(h => <th key={h} style={{ padding: "10px 0" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {APPOINTMENTS.map((a, i) => (
            <tr key={i} style={{ borderTop: "1px solid #f0f0f0" }}>
              <td style={{ padding: "12px 0" }}>{PATIENT_PROFILE.name}</td>
              <td style={{ padding: "12px 0" }}>{a.doctor}</td>
              <td style={{ padding: "12px 0" }}>{a.date}</td>
              <td style={{ padding: "12px 0" }}>{a.time}</td>
              <td style={{ padding: "12px 0" }}><span style={{ color: statusColor(a.status).text, fontWeight: 600 }}>{a.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminSettingsTab() {
  return (
    <div style={{ padding: 30, maxWidth: 500 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Setting</h2>
      <label style={label()}>Admin name</label>
      <input defaultValue="Admin" style={{ ...inputStyle(), marginBottom: 18 }} />
      <label style={label()}>Email</label>
      <input defaultValue="admin@care.com" style={{ ...inputStyle(), marginBottom: 18 }} />
      <button style={btnPrimary()}>Save</button>
    </div>
  );
}

function AdminPortal({ exitRole }) {
  const [tab, setTab] = useState("dashboard");
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar active={tab} setActive={setTab} exitRole={exitRole} />
      <div style={{ flex: 1 }}>
        <AdminTopBar />
        {tab === "dashboard" && <AdminDashboardTab />}
        {tab === "doctorRequests" && <AdminDoctorRequestsTab />}
        {tab === "doctors" && <AdminDoctorsTab />}
        {tab === "users" && <AdminUsersTab />}
        {tab === "appointments" && <AdminAppointmentsTab />}
        {tab === "settings" && <AdminSettingsTab />}
      </div>
    </div>
  );
}

// ============ ROOT APP ============
export default function App() {
  const [page, setPage] = useState("landing");
  const [ctx, setCtx] = useState(null);
  const [role, setRole] = useState(null);

  const go = (p, c) => {
    setPage(p);
    setCtx(c || null);
    window.scrollTo?.(0, 0);
  };

  const handleSetRole = (r) => {
    setRole(r);
    if (r === "patient") go("patientPortal");
    if (r === "doctor") go("doctorPortal");
    if (r === "admin") go("adminPortal");
  };

  const exitRole = () => {
    setRole(null);
    go("landing");
  };

  const RolePicker = () => (
    <div style={{ position: "fixed", bottom: 18, right: 18, background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 10, boxShadow: "0 4px 18px rgba(0,0,0,0.12)", display: "flex", gap: 8, zIndex: 1000, fontFamily: "system-ui, sans-serif" }}>
      <span style={{ fontSize: 12, color: COLORS.gray, alignSelf: "center", marginRight: 4 }}>View as:</span>
      {["patient", "doctor", "admin"].map((r) => (
        <button key={r} onClick={() => handleSetRole(r)} style={{
          fontSize: 12, padding: "6px 12px", borderRadius: 8, cursor: "pointer", textTransform: "capitalize",
          border: role === r ? "none" : "1px solid #ddd", background: role === r ? COLORS.main : "#fff", color: role === r ? "#fff" : COLORS.text,
        }}>{r}</button>
      ))}
    </div>
  );

  let content;
  if (page === "patientPortal") content = <PatientPortal go={go} ctx={ctx} exitRole={exitRole} />;
  else if (page === "doctorPortal") content = <DoctorPortal ctx={ctx} exitRole={exitRole} />;
  else if (page === "adminPortal") content = <AdminPortal exitRole={exitRole} />;
  else {
    content = (
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", color: COLORS.text, minHeight: "100vh", background: "#fff" }}>
        <TopNav go={go} page={page} loggedRole={role} />
        {page === "landing" && <Landing go={go} />}
        {page === "idSearchPublic" && <IdSearchPublic go={go} />}
        {page === "doctorList" && <DoctorList go={go} />}
        {page === "doctorProfilePublic" && <DoctorProfilePublic go={go} ctx={ctx} />}
        {page === "bookAppointment" && <BookAppointment go={go} ctx={ctx} />}
        {page === "bookingConfirmed" && <BookingConfirmed go={go} ctx={ctx} />}
        {page === "login" && <AuthPage go={go} mode="login" setRole={handleSetRole} />}
        {page === "signup" && <AuthPage go={go} mode="signup" setRole={handleSetRole} />}
        {page === "pendingApproval" && <PendingApproval go={go} />}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {content}
      <RolePicker />
    </div>
  );
}
