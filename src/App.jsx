import { useState, useEffect } from "react";
import {
  Phone, Mail, Calendar, Search, MapPin, CreditCard, Clock,
  User, History, FileSearch, CalendarCheck, MessageSquare, Lock,
  LogOut, ChevronLeft, ChevronRight, Star, Plus, Check, X,
  Send, Paperclip, Image as ImageIcon, RefreshCw, FileText,
  LayoutGrid, Stethoscope, Building2, Users, Settings, Trash2,
  Ambulance, ClipboardList, MessageCircle, Eye, EyeOff, MoreVertical,
  ArrowLeft, Upload, Menu
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

// ============ GLOBAL RESPONSIVE STYLES ============
const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; }
    .care-app { font-family: system-ui, -apple-system, sans-serif; color: ${COLORS.text}; }

    .container-pad { padding: 20px 40px; }
    @media (max-width: 768px) { .container-pad { padding: 16px 18px; } }

    /* ----- Top nav ----- */
    .topnav { display: flex; align-items: center; justify-content: space-between; padding: 18px 40px; border-bottom: 1px solid #eee; background: #fff; position: relative; }
    .topnav-links { display: flex; gap: 32px; }
    .topnav-actions { display: flex; gap: 12px; }
    .topnav-hamburger { display: none; }
    @media (max-width: 768px) {
      .topnav { padding: 14px 18px; }
      .topnav-links { display: none; }
      .topnav-actions .btn-outline { padding: 8px 14px; font-size: 13px; }
      .topnav-actions .btn-primary { padding: 8px 14px; font-size: 13px; }
    }

    /* ----- Buttons / inputs (shared) ----- */
    .btn-primary { background: ${COLORS.main}; color: #fff; border: none; border-radius: 8px; padding: 10px 22px; font-size: 15px; font-weight: 600; cursor: pointer; }
    .btn-outline { background: #fff; color: ${COLORS.main}; border: 1.5px solid ${COLORS.main}; border-radius: 8px; padding: 10px 22px; font-size: 15px; font-weight: 600; cursor: pointer; }
    .field-input { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid #e0e0e0; font-size: 15px; color: ${COLORS.text}; outline: none; }
    .field-label { color: ${COLORS.main}; font-weight: 600; font-size: 15px; margin-bottom: 8px; display: block; }

    /* ----- Hero ----- */
    .hero { background: linear-gradient(135deg, ${COLORS.main}, ${COLORS.secondary}); padding: 60px 40px; color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
    .hero-text { max-width: 560px; }
    .hero-title { font-size: 34px; line-height: 1.3; font-weight: 700; margin: 0; }
    .hero-actions { display: flex; gap: 16px; margin-top: 32px; flex-wrap: wrap; }
    .hero-icon { opacity: 0.5; }
    @media (max-width: 900px) {
      .hero { flex-direction: column; text-align: center; padding: 40px 24px; }
      .hero-text { max-width: 100%; }
      .hero-actions { justify-content: center; }
    }
    @media (max-width: 600px) {
      .hero-title { font-size: 24px; }
      .hero-icon { width: 70px !important; height: 70px !important; }
    }

    /* ----- Booking search bar ----- */
    .booking-card { background: #fff; border: 1px solid #eee; border-radius: 14px; padding: 24px; margin-top: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    .booking-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr auto; gap: 12px; }
    @media (max-width: 900px) { .booking-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 560px) { .booking-grid { grid-template-columns: 1fr; } }

    /* ----- Specialty filter pills ----- */
    .pill-row { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }

    /* ----- Doctor grid (the screenshot you sent) ----- */
    .doctor-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    @media (max-width: 1024px) { .doctor-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 560px) { .doctor-grid { grid-template-columns: 1fr; } }
    .doctor-card { cursor: pointer; border: 1px solid #eee; border-radius: 14px; overflow: hidden; background: #fff; }
    .doctor-card-img { height: 180px; background: #bfe3e6; }
    .doctor-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .doctor-card-body { padding: 14px 10px 18px; text-align: center; }
    .doctor-card-icons { display: flex; justify-content: center; gap: 10px; margin-bottom: 12px; }
    .doctor-icon-circle { width: 32px; height: 32px; border-radius: 50%; background: ${COLORS.main}; display: flex; align-items: center; justify-content: center; }

    /* ----- Doctor list (row layout) ----- */
    .doctor-row { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding: 28px 0; gap: 20px; }
    .doctor-row img.doc-photo { width: 320px; height: 220px; object-fit: cover; border-radius: 14px; flex-shrink: 0; }
    @media (max-width: 700px) {
      .doctor-row { flex-direction: column-reverse; }
      .doctor-row img.doc-photo { width: 100%; height: 200px; }
    }

    /* ----- Doctor profile (public) ----- */
    .profile-layout { display: flex; gap: 40px; }
    .profile-side { background: #e3f3f4; border-radius: 16px; padding: 24px; width: 280px; text-align: center; align-self: flex-start; flex-shrink: 0; }
    .profile-main { flex: 1; min-width: 0; }
    @media (max-width: 800px) {
      .profile-layout { flex-direction: column; }
      .profile-side { width: 100%; }
    }
    .tag-pill { border: 1px solid ${COLORS.main}; color: ${COLORS.main}; background: #eaf6f7; border-radius: 10px; padding: 12px 24px; font-weight: 600; }
    .tag-row { display: flex; gap: 12px; flex-wrap: wrap; }

    /* ----- Booking form ----- */
    .date-row { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
    .date-chip { cursor: pointer; padding: 10px 14px; border-radius: 10px; text-align: center; font-size: 14px; min-width: 56px; }
    .consult-row { display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap; }
    .consult-row button { flex: 1; min-width: 120px; }

    /* ----- Booking confirmation ----- */
    .confirm-layout { display: flex; gap: 40px; flex-wrap: wrap; }
    .confirm-card { width: 520px; max-width: 100%; border: 1px solid #eee; border-radius: 14px; overflow: hidden; }
    .confirm-notes { flex: 1; min-width: 280px; max-width: 600px; border: 1px solid #eee; border-radius: 14px; overflow: hidden; }

    /* ----- Auth page ----- */
    .auth-layout { display: flex; min-height: 600px; flex-wrap: wrap; }
    .auth-form-side { flex: 1; min-width: 320px; padding: 60px 70px; }
    .auth-banner-side { flex: 1; min-width: 320px; background: ${COLORS.main}; color: #fff; padding: 60px 70px; display: flex; flex-direction: column; justify-content: center; }
    @media (max-width: 900px) {
      .auth-form-side, .auth-banner-side { padding: 36px 24px; min-width: 100%; }
      .auth-banner-side { order: -1; text-align: center; }
    }

    /* ----- Portal layout (patient/doctor) ----- */
    .portal-layout { display: flex; gap: 30px; padding: 30px 40px; }
    .portal-sidebar { width: 260px; border: 2px solid ${COLORS.main}; border-radius: 16px; padding: 32px 20px; text-align: center; align-self: flex-start; flex-shrink: 0; }
    .portal-content { flex: 1; min-width: 0; }
    .mobile-topbar { display: none; }
    .sidebar-backdrop { display: none; }

    @media (max-width: 900px) {
      .portal-layout { padding: 14px; flex-direction: column; gap: 0; }
      .mobile-topbar {
        display: flex; align-items: center; justify-content: space-between;
        padding: 14px 4px; margin-bottom: 10px;
      }
      .mobile-topbar-title { font-weight: 700; font-size: 18px; }
      .hamburger-btn {
        background: #fff; border: 1.5px solid ${COLORS.main}; border-radius: 8px;
        width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer;
      }
      .portal-sidebar {
        position: fixed; top: 0; left: 0; height: 100vh; z-index: 1100;
        width: 78vw; max-width: 300px; border-radius: 0; border: none;
        box-shadow: 4px 0 24px rgba(0,0,0,0.15);
        transform: translateX(-100%); transition: transform 0.25s ease;
        overflow-y: auto; background: #fff;
      }
      .portal-sidebar.open { transform: translateX(0); }
      .sidebar-backdrop.open {
        display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 1050;
      }
      .sidebar-close-btn { display: flex !important; }
    }
    .sidebar-close-btn { display: none; }

    .sidebar-item {
      display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 8px;
      cursor: pointer; color: ${COLORS.text}; margin-bottom: 4px; text-align: left;
    }
    .sidebar-item.active { background: #eef0f0; }

    /* ----- Admin layout ----- */
    .admin-layout { display: flex; }
    .admin-sidebar { width: 220px; padding: 20px 0; border-right: 1px solid #eee; min-height: 100vh; flex-shrink: 0; }
    .admin-content { flex: 1; min-width: 0; }
    .admin-topbar { display: flex; justify-content: space-between; align-items: center; padding: 16px 30px; border-bottom: 1px solid #eee; gap: 12px; }
    .admin-search { display: flex; align-items: center; gap: 10px; border: 1px solid #eee; border-radius: 10px; padding: 8px 14px; width: 300px; }
    .admin-hamburger { display: none; }
    @media (max-width: 900px) {
      .admin-sidebar {
        position: fixed; top: 0; left: 0; height: 100vh; z-index: 1100; background: #fff;
        width: 78vw; max-width: 280px; box-shadow: 4px 0 24px rgba(0,0,0,0.15);
        transform: translateX(-100%); transition: transform 0.25s ease; overflow-y: auto;
      }
      .admin-sidebar.open { transform: translateX(0); }
      .admin-search { width: 100%; }
      .admin-topbar { padding: 12px 14px; flex-wrap: wrap; }
      .admin-hamburger { display: flex !important; }
    }

    /* ----- Stat cards ----- */
    .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
    @media (max-width: 900px) { .stat-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 480px) { .stat-grid { grid-template-columns: 1fr; } }

    .two-col-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
    @media (max-width: 800px) { .two-col-grid { grid-template-columns: 1fr; } }

    /* ----- Responsive tables -> stacked cards on mobile ----- */
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table thead { display: table-header-group; }
    .data-table th, .data-table td { padding: 12px 14px; text-align: left; font-size: 14px; }
    @media (max-width: 760px) {
      .data-table-wrap.stack-on-mobile thead { display: none; }
      .data-table-wrap.stack-on-mobile table, .data-table-wrap.stack-on-mobile tbody, .data-table-wrap.stack-on-mobile tr, .data-table-wrap.stack-on-mobile td {
        display: block; width: 100%;
      }
      .data-table-wrap.stack-on-mobile tr {
        border: 1px solid #eee; border-radius: 12px; padding: 12px; margin-bottom: 12px;
      }
      .data-table-wrap.stack-on-mobile td {
        padding: 6px 0; border: none; display: flex; justify-content: space-between; gap: 10px; font-size: 13px;
      }
      .data-table-wrap.stack-on-mobile td::before {
        content: attr(data-label); font-weight: 700; color: ${COLORS.gray}; flex-shrink: 0;
      }
    }

    /* ----- Chat panel ----- */
    .chat-shell { display: flex; border: 1px solid #eee; border-radius: 14px; overflow: hidden; height: 480px; }
    .chat-list { width: 280px; border-right: 1px solid #eee; overflow-y: auto; flex-shrink: 0; }
    .chat-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
    @media (max-width: 760px) {
      .chat-shell { height: 70vh; flex-direction: column; }
      .chat-list { width: 100%; border-right: none; border-bottom: 1px solid #eee; max-height: 160px; }
    }

    /* ----- Appointment cards ----- */
    .appt-card { border-radius: 14px; padding: 20px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
    .appt-left { display: flex; gap: 14px; align-items: center; }
    @media (max-width: 560px) {
      .appt-card { flex-direction: column; align-items: stretch; }
      .appt-right { display: flex; justify-content: space-between; }
    }

    /* ----- Today appointment chips (doctor) ----- */
    .today-chip-row { display: flex; gap: 14px; margin-bottom: 30px; flex-wrap: wrap; }
    .today-chip { border-radius: 12px; padding: 16px; min-width: 200px; display: flex; justify-content: space-between; flex: 1 1 200px; }

    /* ----- Time slot grids ----- */
    .time-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 30px; }
    @media (max-width: 700px) { .time-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 420px) { .time-grid { grid-template-columns: repeat(2, 1fr); } }

    .req-grid { display: flex; gap: 10px; margin-bottom: 18px; }

    /* ----- Find doctors grid (patient portal) ----- */
    .find-doctor-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    @media (max-width: 800px) { .find-doctor-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 480px) { .find-doctor-grid { grid-template-columns: 1fr; } }

    .find-filter-grid { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 10px; margin-bottom: 24px; }
    @media (max-width: 700px) { .find-filter-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 420px) { .find-filter-grid { grid-template-columns: 1fr; } }

    /* ----- ID search emergency card ----- */
    .id-search-card { background: ${COLORS.main}; border-radius: 16px; display: flex; overflow: hidden; max-width: 1000px; flex-wrap: wrap; }
    .id-search-photo { width: 260px; height: 260px; flex-shrink: 0; }
    .id-search-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .id-search-info { padding: 32px 40px; color: #fff; flex: 1; min-width: 240px; }
    @media (max-width: 600px) {
      .id-search-photo { width: 100%; height: 220px; }
      .id-search-info { padding: 24px; }
    }

    .role-picker {
      position: fixed; bottom: 14px; right: 14px; background: #fff; border: 1px solid #ddd; border-radius: 12px;
      padding: 10px; box-shadow: 0 4px 18px rgba(0,0,0,0.12); display: flex; gap: 8px; z-index: 1300; flex-wrap: wrap; max-width: 90vw;
    }
    @media (max-width: 480px) {
      .role-picker { right: 8px; bottom: 8px; padding: 8px; }
      .role-picker span { display: none; }
    }
  `}</style>
);

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
    <div className="topnav">
      <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
        <div style={{ cursor: "pointer" }} onClick={() => go("landing")}><Logo /></div>
        <div className="topnav-links">
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
      <div className="topnav-actions">
        {!loggedRole ? (
          <>
            <button onClick={() => go("signup")} className="btn-primary">Signup</button>
            <button onClick={() => go("login")} className="btn-outline">Login</button>
          </>
        ) : (
          <button onClick={() => go("landing")} className="btn-outline">Exit prototype view</button>
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
      <div className="hero">
        <div className="hero-text">
          <h1 className="hero-title">
            <span style={{ color: COLORS.red }}>Have an emergency?</span> Search by national ID number to find out the patient's record <span style={{ color: COLORS.red }}>OR</span> Find the nearest hospital with an ambulance
          </h1>
          <div className="hero-actions">
            <button onClick={() => go("idSearchPublic")} className="btn-outline" style={{ background: "#fff" }}>Search by ID</button>
            <button className="btn-primary" style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid #fff" }}>Search for ambulance</button>
          </div>
        </div>
        <Stethoscope size={140} strokeWidth={1} className="hero-icon" />
      </div>

      <div className="container-pad">
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Schedule a Doctor Appointment</h2>
        <div className="booking-card">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <Calendar color={COLORS.main} />
            <div>
              <div style={{ fontWeight: 700 }}>Book a doctor</div>
              <div style={{ fontSize: 13, color: COLORS.gray }}>Examination or procedure</div>
            </div>
          </div>
          <div className="booking-grid">
            <select className="field-input"><option>Choose specialty</option>{SPECIALTIES.slice(1).map(s => <option key={s}>{s}</option>)}</select>
            <select className="field-input"><option>Choose city</option><option>Cairo</option><option>Giza</option></select>
            <select className="field-input"><option>Choose area</option><option>Nasr City</option><option>Maadi</option></select>
            <input placeholder="Name of the doctor" className="field-input" />
            <button onClick={() => go("doctorList")} className="btn-primary" style={{ padding: "0 28px" }}>Search</button>
          </div>
        </div>
      </div>

      <div className="container-pad" style={{ paddingBottom: 50 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>Our Doctors</h2>
          <span onClick={() => go("doctorList")} style={{ color: COLORS.main, cursor: "pointer", fontSize: 14 }}>See All</span>
        </div>
        <div className="pill-row">
          {SPECIALTIES.map((s, i) => (
            <button key={s} className={i === 0 ? "btn-primary" : "btn-outline"} style={{ borderRadius: 10 }}>{s}</button>
          ))}
        </div>
        <div className="doctor-grid">
          {[...DOCTORS, ...DOCTORS, ...DOCTORS].slice(0, 12).map((d, i) => (
            <div key={i} className="doctor-card" onClick={() => go("doctorProfilePublic", d)}>
              <div className="doctor-card-img">
                <img src={d.img} alt={d.name} />
              </div>
              <div className="doctor-card-body">
                <div className="doctor-card-icons">
                  {[Phone, Mail, Calendar].map((Icon, j) => (
                    <div key={j} className="doctor-icon-circle">
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
        <div style={{ textAlign: "center", padding: "60px 24px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 30 }}>Search by ID card for your medical history</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 40, flexWrap: "wrap", maxWidth: 560, margin: "0 auto 40px" }}>
            {[...Array(14)].map((_, i) => (
              <input key={i} maxLength={1} style={{ width: 24, height: 38, textAlign: "center", border: "none", borderBottom: `3px solid ${i < 2 ? COLORS.main : "#ddd"}`, fontSize: 18 }}
                onChange={(e) => setId(id + e.target.value)} />
            ))}
          </div>
          <button onClick={() => setStep(1)} className="btn-primary" style={{ padding: "16px 60px", fontSize: 18 }}>Search</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <BackArrow onClick={() => setStep(0)} />
      <div className="container-pad">
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 24 }}>Search by ID</h2>
        <div className="id-search-card">
          <div className="id-search-photo">
            <img src={PATIENT_PROFILE.photo} alt="patient" />
          </div>
          <div className="id-search-info">
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
      <div className="container-pad">
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>Our Doctors</h2>
        <div className="pill-row" style={{ justifyContent: "center" }}>
          {SPECIALTIES.map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={filter === s ? "btn-primary" : "btn-outline"} style={{ borderRadius: 10 }}>{s}</button>
          ))}
        </div>
        {filtered.map((d) => (
          <div key={d.id} className="doctor-row">
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
              <button onClick={() => go("doctorProfilePublic", d)} className="btn-primary" style={{ padding: "12px 50px" }}>Book</button>
            </div>
            <img src={d.img} alt={d.name} className="doc-photo" />
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
      <div className="profile-layout container-pad">
        <div className="profile-side">
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
          <button onClick={() => go("bookAppointment", d)} className="btn-primary" style={{ width: "100%", marginTop: 18 }}>Book Appointment</button>
        </div>

        <div className="profile-main">
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>{d.name}</h2>
          <div style={{ color: COLORS.gray, marginBottom: 16 }}>{d.specialty}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, marginBottom: 10 }}><MapPin size={18} /> {d.area}, Egypt</div>
          <p style={{ color: COLORS.gray, lineHeight: 1.7, maxWidth: 600 }}>{d.bio}</p>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 28, marginBottom: 12 }}>Specializations</h3>
          <div className="tag-row">
            {d.subSpecialty.map((s) => (
              <div key={s} className="tag-pill">{s}</div>
            ))}
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 28, marginBottom: 12 }}>Conditions Treated</h3>
          <div className="tag-row">
            {d.conditionsTreated.map((s) => (
              <div key={s} className="tag-pill">{s}</div>
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
      <div className="profile-layout container-pad">
        <div className="profile-side">
          <img src={d.img} alt={d.name} style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", margin: "0 auto 14px" }} />
          <div style={{ fontWeight: 700, fontSize: 18 }}>{d.name}</div>
          <div style={{ color: COLORS.gray, marginBottom: 10 }}>{d.specialty}</div>
          <div style={{ display: "inline-block", background: COLORS.main, color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 14 }}>{d.rating} ★</div>
          <div style={{ textAlign: "left", fontSize: 14, color: COLORS.text, lineHeight: 2, marginTop: 16 }}>
            <div><Clock size={14} style={{ verticalAlign: -2 }} /> Waiting Time : {d.waiting} Minutes</div>
            <div><Phone size={14} style={{ verticalAlign: -2 }} /> 1599 : Cost of regular call</div>
          </div>
        </div>

        <div className="profile-main" style={{ maxWidth: 700 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>{d.name}</h2>
          <p style={{ color: COLORS.gray, margin: "10px 0 24px" }}>You will be contacted by phone number by the doctor's clinic to confirm the reservation.</p>
          <h3 style={{ fontWeight: 700, marginBottom: 6 }}>Fees</h3>
          <p style={{ marginBottom: 24 }}>{d.consultationFee}-{d.consultationFee + 150} $</p>

          <h3 style={{ fontWeight: 700, marginBottom: 14 }}>Choose Appointment Time</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Date</span>
            <span style={{ color: COLORS.main, cursor: "pointer" }}>April <ChevronRight size={14} style={{ verticalAlign: -2 }} /></span>
          </div>
          <div className="date-row">
            {dates.map((dt) => (
              <div key={dt} onClick={() => setDate(dt)} className="date-chip" style={{
                background: date === dt ? COLORS.main : "#fff", color: date === dt ? "#fff" : COLORS.text,
                border: date === dt ? "none" : "1px solid #eee",
              }}>{dt.split(" ")[0]}<br />{dt.split(" ")[1]}</div>
            ))}
          </div>

          <h3 style={{ fontWeight: 700, marginBottom: 14 }}>Consult Type</h3>
          <div className="consult-row">
            {["Clinic visit", "Home Visit", "Online Consult"].map((c) => (
              <button key={c} onClick={() => setConsult(c)} className={consult === c ? "btn-primary" : "btn-outline"}>{c}</button>
            ))}
          </div>

          <h3 style={{ fontWeight: 700, marginBottom: 14 }}>Time</h3>
          <div className="consult-row">
            {times.map((t) => (
              <button key={t} onClick={() => setTime(t)} className={time === t ? "btn-primary" : "btn-outline"}>{t}</button>
            ))}
          </div>

          <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Notes for the Doctor</h3>
          <input placeholder="Symptoms" style={{ ...inputStyle(), marginBottom: 20, border: "none", borderBottom: "1px solid #ddd", borderRadius: 0, padding: "8px 0" }} />

          <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Documents</h3>
          <div style={{ border: "1px dashed #ccc", borderRadius: 10, padding: 20, textAlign: "center", color: COLORS.gray, marginBottom: 30 }}>
            <Paperclip size={18} style={{ verticalAlign: -3, marginRight: 8 }} />Attach files (Max. 10 files)
          </div>

          <button onClick={() => go("bookingConfirmed", d)} className="btn-primary" style={{ width: "100%", padding: 16, fontSize: 17 }}>Book</button>
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
      <div className="confirm-layout container-pad">
        <div className="confirm-card">
          <div style={{ height: 220, position: "relative" }}>
            <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.95)", color: COLORS.green, fontWeight: 700, padding: "8px 14px", borderRadius: 8, display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
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
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}><span>Clinic address</span><strong style={{ textAlign: "right" }}>{d.clinicLocation[0]}</strong></div>
            <button onClick={() => go("patientPortal", { tab: "appointments" })} className="btn-primary" style={{ width: "100%", marginTop: 20 }}>My Appointments</button>
          </div>
        </div>

        <div className="confirm-notes">
          <div style={{ background: COLORS.main, color: "#fff", padding: "16px 24px", fontWeight: 700, fontSize: 18 }}>Notes for the doctor (optional)</div>
          <div style={{ padding: 24 }}>
            <label style={label()}>Symptoms</label>
            <input style={{ ...inputStyle(), marginBottom: 24, border: "none", borderBottom: "1px solid #ddd", borderRadius: 0, padding: "8px 0" }} />
            <label style={label()}>Documents</label>
            <p style={{ color: COLORS.gray, fontSize: 13, marginBottom: 10 }}>Use images or PDF files (Max. 10 files)</p>
            <div style={{ border: "1px dashed #ccc", borderRadius: 10, padding: 24, textAlign: "center", color: COLORS.gray, marginBottom: 30 }}>
              <Paperclip size={18} style={{ verticalAlign: -3, marginRight: 8 }} />Attach files
            </div>
            <button className="btn-primary" style={{ width: "100%" }}>Send to the doctor</button>
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
    <div className="auth-layout">
      <div className="auth-form-side">
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
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            {["patient", "doctor"].map((r) => (
              <button key={r} onClick={() => setRegRole(r)} className={regRole === r ? "btn-primary" : "btn-outline"} style={{ flex: "1 1 120px" }}>
                {r === "patient" ? "I'm a patient" : "I'm a doctor"}
              </button>
            ))}
            <button disabled className="btn-outline" style={{ flex: "1 1 120px", opacity: 0.4, cursor: "not-allowed" }}>Admin (seed only)</button>
          </div>
        )}

        {tab === "login" ? (
          <>
            <div style={{ position: "relative", marginBottom: 18 }}>
              <Mail size={18} style={{ position: "absolute", left: 14, top: 14, color: COLORS.gray }} />
              <input placeholder="Enter your email" className="field-input" style={{ paddingLeft: 42 }} />
            </div>
            <div style={{ position: "relative", marginBottom: 10 }}>
              <Eye size={18} style={{ position: "absolute", left: 14, top: 14, color: COLORS.gray }} />
              <input placeholder="Enter your Password" type="password" className="field-input" style={{ paddingLeft: 42 }} />
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 18, fontSize: 13, color: COLORS.gray, flexWrap: "wrap" }}>
              Try as:
              <span style={{ color: COLORS.main, cursor: "pointer" }} onClick={() => setRole("patient")}>Patient</span> ·
              <span style={{ color: COLORS.main, cursor: "pointer" }} onClick={() => setRole("doctor")}>Doctor</span> ·
              <span style={{ color: COLORS.main, cursor: "pointer" }} onClick={() => setRole("admin")}>Admin</span>
            </div>
            <button onClick={() => setRole(regRole === "doctor" ? "doctor" : "patient")} className="btn-primary" style={{ width: "100%" }}>Login</button>
            <div style={{ textAlign: "center", marginTop: 14, fontWeight: 600, fontSize: 14, color: COLORS.text }}>Forget your password?</div>
          </>
        ) : regRole === "patient" ? (
          <>
            <input placeholder="Full name" className="field-input" style={{ marginBottom: 16 }} />
            <input placeholder="Email" className="field-input" style={{ marginBottom: 16 }} />
            <input placeholder="Password" type="password" className="field-input" style={{ marginBottom: 16 }} />
            <input placeholder="National ID" className="field-input" style={{ marginBottom: 16 }} />
            <input placeholder="Phone number" className="field-input" style={{ marginBottom: 24 }} />
            <button onClick={() => setRole("patient")} className="btn-primary" style={{ width: "100%" }}>Create account</button>
          </>
        ) : (
          <>
            <input placeholder="Full name" className="field-input" style={{ marginBottom: 16 }} />
            <input placeholder="Email" className="field-input" style={{ marginBottom: 16 }} />
            <input placeholder="Password" type="password" className="field-input" style={{ marginBottom: 16 }} />
            <select className="field-input" style={{ marginBottom: 16 }}><option>Specialty</option>{SPECIALTIES.slice(1).map(s => <option key={s}>{s}</option>)}</select>
            <label style={{ ...label(), marginTop: 6 }}>Required documents</label>
            {["Graduation certificate", "Syndicate card", "National ID card"].map((doc) => (
              <div key={doc} style={{ border: "1px dashed #ccc", borderRadius: 10, padding: "14px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", color: COLORS.gray, flexWrap: "wrap", gap: 8 }}>
                <span><Upload size={16} style={{ verticalAlign: -3, marginRight: 8 }} />{doc}</span>
                <span style={{ color: COLORS.main, fontSize: 13, cursor: "pointer" }}>Upload</span>
              </div>
            ))}
            <p style={{ fontSize: 13, color: COLORS.gray, margin: "14px 0 20px" }}>Your account will be reviewed by an admin before you can log in.</p>
            <button onClick={() => go("pendingApproval")} className="btn-primary" style={{ width: "100%" }}>Submit registration</button>
          </>
        )}
      </div>
      <div className="auth-banner-side">
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Welcome Back !</h2>
        <h1 style={{ fontSize: 44, fontWeight: 700 }}>Wellness Made Easy.</h1>
      </div>
    </div>
  );
}

function PendingApproval({ go }) {
  return (
    <div style={{ textAlign: "center", padding: "100px 24px" }}>
      <Clock size={60} color={COLORS.main} style={{ marginBottom: 20 }} />
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Registration submitted</h2>
      <p style={{ color: COLORS.gray, maxWidth: 460, margin: "0 auto 30px" }}>
        An admin will review your documents and approve your account. You'll be notified once you can log in.
      </p>
      <button onClick={() => go("landing")} className="btn-primary">Back to home</button>
    </div>
  );
}

// ============ MOBILE SIDEBAR WRAPPER (shared by patient/doctor) ============
function MobileSidebarShell({ title, sidebarOpen, setSidebarOpen, sidebarContent, children }) {
  return (
    <>
      <div className="mobile-topbar">
        <div className="mobile-topbar-title">{title}</div>
        <div className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={20} color={COLORS.main} />
        </div>
      </div>
      <div className={`sidebar-backdrop ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />
      <div className={`portal-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-close-btn" style={{ justifyContent: "flex-end", marginBottom: 10, cursor: "pointer" }} onClick={() => setSidebarOpen(false)}>
          <X size={22} />
        </div>
        {sidebarContent}
      </div>
      <div className="portal-content">{children}</div>
    </>
  );
}

// ============ PATIENT PORTAL ============
function PatientSidebar({ active, setActive, exitRole, closeMobile }) {
  const items = [
    { key: "profile", label: "Profile", icon: User },
    { key: "history", label: "History", icon: History },
    { key: "idSearch", label: "ID Search", icon: FileSearch },
    { key: "appointments", label: "My appointment", icon: CalendarCheck },
    { key: "messages", label: "Messages", icon: MessageSquare },
    { key: "doctorAccess", label: "Doctor Access", icon: Lock },
    { key: "findDoctors", label: "Find Doctors", icon: Search },
  ];
  const handleClick = (key) => {
    setActive(key);
    closeMobile?.();
  };
  return (
    <>
      <img src={PATIENT_PROFILE.photo} alt="me" style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", margin: "0 auto 14px", display: "block" }} />
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 24, textAlign: "center" }}>{PATIENT_PROFILE.name}</div>
      {items.map((it) => (
        <div key={it.key} onClick={() => handleClick(it.key)} className={`sidebar-item ${active === it.key ? "active" : ""}`}>
          <it.icon size={18} /> {it.label}
        </div>
      ))}
      <div onClick={exitRole} className="sidebar-item" style={{ color: COLORS.red, marginTop: 16 }}>
        <LogOut size={18} /> Logout
      </div>
    </>
  );
}

function PatientProfileTab() {
  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Profile</h2>
      <label className="field-label">Name</label>
      <input defaultValue={PATIENT_PROFILE.name} className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">Email</label>
      <input defaultValue={PATIENT_PROFILE.email} className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">Location</label>
      <input defaultValue={PATIENT_PROFILE.location} className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">Phone Number</label>
      <input defaultValue={PATIENT_PROFILE.phone} className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">National ID</label>
      <input defaultValue={PATIENT_PROFILE.nationalId} className="field-input" style={{ marginBottom: 26 }} />
      <button className="btn-primary">Save</button>
    </div>
  );
}

function PatientIdSearchTab() {
  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>ID Search emergency info</h2>
      <p style={{ color: COLORS.gray, marginBottom: 24, fontSize: 14 }}>This is the information shown to anyone who searches your National ID in an emergency.</p>
      <label className="field-label">My Phone number</label>
      <input defaultValue={PATIENT_PROFILE.phone} className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">First emergency number</label>
      <input defaultValue={PATIENT_PROFILE.emergencyPhone} className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">Address</label>
      <input defaultValue={PATIENT_PROFILE.location} className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">Blood Type</label>
      <select defaultValue={PATIENT_PROFILE.bloodType} className="field-input" style={{ marginBottom: 18 }}>
        {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(b => <option key={b}>{b}</option>)}
      </select>
      <label className="field-label">Chronic diseases / current medications</label>
      <textarea defaultValue={PATIENT_PROFILE.chronic} className="field-input" style={{ marginBottom: 18, minHeight: 70 }} />
      <label className="field-label">Allergies</label>
      <input defaultValue={PATIENT_PROFILE.allergies} className="field-input" style={{ marginBottom: 26 }} />
      <label className="field-label">Photo</label>
      <img src={PATIENT_PROFILE.photo} alt="profile" style={{ width: 130, height: 130, borderRadius: 12, objectFit: "cover", marginBottom: 24, display: "block" }} />
      <button className="btn-primary">Save</button>
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>My appointment</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
            <div key={a.id} className="appt-card" style={{ border: `1.5px solid ${sc.text}30` }}>
              <div className="appt-left">
                <img src={a.img} alt={a.doctor} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{a.doctor}</div>
                  <div style={{ color: COLORS.gray, fontSize: 13 }}>{a.specialty}</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>{a.date} - {a.time} · {a.price} $</div>
                </div>
              </div>
              <div className="appt-right" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: "6px 16px", fontWeight: 700, fontSize: 13 }}>{a.status}</span>
                {a.status === "Pending" && (
                  <button onClick={() => setAppts(appts.map(x => x.id === a.id ? { ...x, status: "Cancelled" } : x))}
                    className="btn-outline" style={{ borderColor: COLORS.red, color: COLORS.red, padding: "6px 16px", fontSize: 13 }}>Cancel</button>
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
      <div className="pill-row">
        {HISTORY_FOLDERS.map((f, i) => (
          <button key={f.name} onClick={() => setActive(i)} className={active === i ? "btn-primary" : "btn-outline"} style={{ borderRadius: 10 }}>{f.name}</button>
        ))}
        <button className="btn-outline" style={{ borderRadius: 10 }}><Plus size={14} style={{ verticalAlign: -2, marginRight: 4 }} />Add New Folder</button>
      </div>
      <div style={{ position: "relative", paddingLeft: 24 }}>
        <div style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 2, background: COLORS.main }} />
        {HISTORY_FOLDERS[active].entries.map((e, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 32, paddingBottom: 24, borderBottom: i < HISTORY_FOLDERS[active].entries.length - 1 ? "1px dashed #ddd" : "none" }}>
            <div style={{ position: "absolute", left: -24, top: 4, width: 12, height: 12, borderRadius: "50%", background: COLORS.main }} />
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ color: COLORS.gray, fontSize: 13, marginBottom: 4 }}>{e.date}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{e.diagnosis}</div>
                <div style={{ fontSize: 14, marginBottom: 4 }}>Treating Physician : {e.physician}</div>
                <div style={{ fontSize: 13, color: COLORS.gray, marginBottom: 10 }}>{e.visitDate}</div>
                <div style={{ fontSize: 14, color: COLORS.text, maxWidth: 540 }}>Note : {e.note}</div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <button className="btn-outline" style={{ fontSize: 13, padding: "8px 16px" }}>View documents</button>
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
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 14, padding: 20, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 700 }}>{a.doctor}</div>
            <div style={{ color: COLORS.gray, fontSize: 13 }}>Folder: {a.folder}</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["View", "Add", "Edit", "Delete"].map((p) => (
              <span key={p} style={{
                borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600,
                background: a.permissions.includes(p) ? "#eaf6f7" : "#f4f4f4",
                color: a.permissions.includes(p) ? COLORS.main : COLORS.gray,
              }}>{p}</span>
            ))}
            <button className="btn-outline" style={{ borderColor: COLORS.red, color: COLORS.red, padding: "6px 14px", fontSize: 13 }}>Revoke</button>
          </div>
        </div>
      ))}
      <button className="btn-primary"><Plus size={14} style={{ verticalAlign: -2, marginRight: 4 }} />Grant access to a doctor</button>
    </div>
  );
}

function PatientFindDoctorsTab({ go }) {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Find Doctors</h2>
      <div className="find-filter-grid">
        <select className="field-input"><option>Specialty</option>{SPECIALTIES.slice(1).map(s => <option key={s}>{s}</option>)}</select>
        <select className="field-input"><option>Area</option><option>Nasr City</option><option>Maadi</option></select>
        <input placeholder="Doctor name" className="field-input" />
        <button className="btn-primary">Search</button>
      </div>
      <div className="find-doctor-grid">
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
      <div className="chat-shell">
        <div className="chat-list">
          <div style={{ padding: 16, borderBottom: "1px solid #eee", display: "flex", gap: 8 }}>
            <Search size={16} color={COLORS.gray} style={{ marginTop: 10 }} />
            <input placeholder="Search" style={{ border: "none", outline: "none", flex: 1 }} />
          </div>
          {CHATS.map((c, i) => (
            <div key={i} onClick={() => setActive(i)} style={{ display: "flex", gap: 10, padding: 14, cursor: "pointer", background: active === i ? "#e9f7f8" : "transparent", borderBottom: "1px solid #f5f5f5" }}>
              <img src={c.img} alt={c.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                <div style={{ color: COLORS.gray, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.last}</div>
              </div>
              {c.unread > 0 && <span style={{ background: COLORS.main, color: "#fff", borderRadius: "50%", width: 20, height: 20, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.unread}</span>}
            </div>
          ))}
        </div>
        <div className="chat-main">
          <div style={{ padding: 16, borderBottom: "1px solid #eee", display: "flex", gap: 10, alignItems: "center" }}>
            <img src={CHATS[active].img} alt={CHATS[active].name} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
            <strong>{CHATS[active].name}</strong>
          </div>
          <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
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
            <input placeholder="Enter message" style={{ flex: 1, border: "none", outline: "none", minWidth: 0 }} />
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="portal-layout">
      <MobileSidebarShell
        title="Patient Portal"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarContent={<PatientSidebar active={tab} setActive={setTab} exitRole={exitRole} closeMobile={() => setSidebarOpen(false)} />}
      >
        {tab === "profile" && <PatientProfileTab />}
        {tab === "idSearch" && <PatientIdSearchTab />}
        {tab === "appointments" && <PatientAppointmentsTab />}
        {tab === "history" && <PatientHistoryTab />}
        {tab === "doctorAccess" && <PatientDoctorAccessTab />}
        {tab === "messages" && <ChatPanel />}
        {tab === "findDoctors" && <PatientFindDoctorsTab go={go} />}
      </MobileSidebarShell>
    </div>
  );
}

// ============ DOCTOR PORTAL ============
function DoctorSidebar({ active, setActive, exitRole, closeMobile }) {
  const items = [
    { key: "todayAppointments", label: "Appointments", icon: CalendarCheck },
    { key: "profile", label: "Profile", icon: User },
    { key: "updateProfile", label: "Update profile", icon: RefreshCw },
    { key: "slots", label: "Free Slots", icon: Clock },
    { key: "patientAccess", label: "Patient Records", icon: Lock },
    { key: "messages", label: "Messages", icon: MessageSquare },
  ];
  const handleClick = (key) => {
    setActive(key);
    closeMobile?.();
  };
  return (
    <>
      <img src={DOCTORS[1].img} alt="me" style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", margin: "0 auto 14px", display: "block" }} />
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 24, textAlign: "center" }}>Dr. Ahmed Mohamed</div>
      {items.map((it) => (
        <div key={it.key} onClick={() => handleClick(it.key)} className={`sidebar-item ${active === it.key ? "active" : ""}`}>
          <it.icon size={18} /> {it.label}
        </div>
      ))}
      <div onClick={exitRole} className="sidebar-item" style={{ color: COLORS.red, marginTop: 16 }}>
        <LogOut size={18} /> Logout
      </div>
    </>
  );
}

function DoctorTodayAppointmentsTab() {
  const [requests, setRequests] = useState(DOCTOR_REQUESTS);
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Today Appointments</h2>
      <div className="today-chip-row">
        {DOCTOR_TODAY.map((a, i) => (
          <div key={i} className="today-chip" style={{ background: i === 0 ? COLORS.main : "#fff", color: i === 0 ? "#fff" : COLORS.text, border: i === 0 ? "none" : `1px solid ${COLORS.main}` }}>
            <div>
              <div style={{ fontWeight: 700 }}>{a.patient}</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>{a.time} · {a.type}</div>
            </div>
            <MoreVertical size={16} />
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Requests</h2>
      <div className="data-table-wrap stack-on-mobile" style={{ overflowX: "auto", marginBottom: 30 }}>
        <table className="data-table">
          <thead>
            <tr style={{ background: COLORS.main, color: "#fff" }}>
              {["Patient Name", "Gender", "Date", "Time", "Type", "Location", "Accept", "Decline"].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td data-label="Patient Name">{r.patient}</td>
                <td data-label="Gender">{r.gender}</td>
                <td data-label="Date">{r.date}</td>
                <td data-label="Time">{r.time}</td>
                <td data-label="Type">{r.type}</td>
                <td data-label="Location">{r.location}, <span style={{ color: COLORS.main, textDecoration: "underline" }}>See location</span></td>
                <td data-label="Accept">
                  <button onClick={() => setRequests(requests.filter((_, idx) => idx !== i))} style={{ background: "#eaf6ec", border: "none", borderRadius: 6, width: 30, height: 30, color: COLORS.green, cursor: "pointer" }}><Check size={16} /></button>
                </td>
                <td data-label="Decline">
                  <button onClick={() => setRequests(requests.filter((_, idx) => idx !== i))} style={{ background: "#fbeaea", border: "none", borderRadius: 6, width: 30, height: 30, color: COLORS.red, cursor: "pointer" }}><X size={16} /></button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && <tr><td colSpan={8} style={{ padding: 20, textAlign: "center", color: COLORS.gray }}>No pending requests</td></tr>}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>All Appointments</h2>
      <div className="data-table-wrap stack-on-mobile" style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr style={{ background: COLORS.main, color: "#fff" }}>
              {["Patient Name", "Gender", "Date", "Time", "Type", "Location", "Action"].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {APPOINTMENTS.map((a, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td data-label="Patient Name">{a.doctor.replace("Dr. ", "")}</td>
                <td data-label="Gender">Male</td>
                <td data-label="Date">{a.date}</td>
                <td data-label="Time">{a.time}</td>
                <td data-label="Type">Clinic Visit</td>
                <td data-label="Location">Cairo, <span style={{ color: COLORS.main, textDecoration: "underline" }}>See location</span></td>
                <td data-label="Action">
                  {a.status === "Approved" ? (
                    <button className="btn-outline" style={{ padding: "6px 14px", fontSize: 13 }}>Complete</button>
                  ) : <span style={{ color: COLORS.gray, fontSize: 13 }}>{a.status}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      <div className="date-row">
        {dates.map((d) => (
          <div key={d} onClick={() => toggle(d, selectedDates, setSelectedDates)} className="date-chip" style={{
            background: selectedDates.includes(d) ? COLORS.main : "#fff", color: selectedDates.includes(d) ? "#fff" : COLORS.text,
            border: selectedDates.includes(d) ? "none" : "1px solid #eee",
          }}>{d.split(" ")[0]}<br />{d.split(" ")[1]}</div>
        ))}
      </div>
      <div style={{ fontWeight: 600, marginBottom: 10 }}>Time (30-min slots)</div>
      <div className="time-grid">
        {times.map((t, i) => (
          <div key={i} onClick={() => toggle(t, selectedTimes, setSelectedTimes)} style={{
            cursor: "pointer", padding: "10px 8px", borderRadius: 10, textAlign: "center", fontSize: 13,
            background: selectedTimes.includes(t) ? COLORS.main : "#fff", color: selectedTimes.includes(t) ? "#fff" : COLORS.text,
            border: selectedTimes.includes(t) ? "none" : "1px solid #eee",
          }}>{t}</div>
        ))}
      </div>
      <button className="btn-primary">Save</button>
    </div>
  );
}

function DoctorUpdateProfileTab() {
  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Update profile</h2>
      <label className="field-label">Specialization</label>
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <input defaultValue="Cardiology" className="field-input" style={{ flex: "1 1 140px" }} />
        <input placeholder="Type..." className="field-input" style={{ flex: "1 1 140px" }} />
        <button style={{ width: 44, height: 44, borderRadius: 10, border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}><Plus size={18} /></button>
      </div>
      <label className="field-label">Clinic number</label>
      <input defaultValue="19511" className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">Clinic Location</label>
      <input defaultValue="Nasr City Medical Center, Building 5" className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">Conditions Treated</label>
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <input defaultValue="Heart Disease" className="field-input" style={{ flex: "1 1 140px" }} />
        <input defaultValue="Arrhythmia" className="field-input" style={{ flex: "1 1 140px" }} />
        <button style={{ width: 44, height: 44, borderRadius: 10, border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}><Plus size={18} /></button>
      </div>
      <label className="field-label">Type</label>
      <div style={{ display: "flex", gap: 20, marginBottom: 18, fontSize: 15, flexWrap: "wrap" }}>
        {["Online", "Offline", "Both"].map((t) => (
          <label key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input type="radio" name="type" defaultChecked={t === "Both"} /> {t}
          </label>
        ))}
      </div>
      <label className="field-label">Bio</label>
      <textarea defaultValue="Experienced cardiologist with 10+ years treating heart diseases." className="field-input" style={{ marginBottom: 18, minHeight: 70 }} />
      <label className="field-label">Consultation Fee</label>
      <input defaultValue="300" className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">Waiting Time (min)</label>
      <input defaultValue="18" className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">Education</label>
      <textarea defaultValue={"MBBS, Cairo University, 2012\nMD Cardiology, Ain Shams University, 2017"} className="field-input" style={{ marginBottom: 18, minHeight: 70 }} />
      <label className="field-label">Certifications</label>
      <textarea defaultValue="Advanced Cardiac Life Support — AHA, 2020" className="field-input" style={{ marginBottom: 26, minHeight: 60 }} />
      <button className="btn-primary">Save</button>
    </div>
  );
}

function DoctorPatientAccessTab() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Patient records you can access</h2>
      <p style={{ color: COLORS.gray, marginBottom: 24, fontSize: 14 }}>You can only see folders the patient has explicitly granted you access to.</p>
      <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 700 }}>Ahmed Mohamed</div>
            <div style={{ color: COLORS.gray, fontSize: 13 }}>Folder: Cardiology · Permissions: View, Add</div>
          </div>
          <button className="btn-outline" style={{ padding: "8px 16px", fontSize: 13 }}>Open folder</button>
        </div>
        <div style={{ background: "#f8f8f8", borderRadius: 10, padding: 14, fontSize: 14 }}>
          <strong>Mild Arrhythmia</strong> — 2/4/2025<br />
          <span style={{ color: COLORS.gray }}>Patient reports occasional palpitations. ECG shows mild irregularity.</span>
        </div>
      </div>
    </div>
  );
}

function DoctorProfilePreviewCard() {
  const d = DOCTORS[1];
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 20, display: "flex", gap: 16, flexWrap: "wrap" }}>
      <img src={d.img} alt={d.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }} />
      <div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>Dr. Ahmed Mohamed</div>
        <div style={{ color: COLORS.gray, marginBottom: 6 }}>Cardiologist</div>
        <div style={{ fontSize: 13 }}>Nasr City Medical Center, Building 5 · 300 EGP</div>
      </div>
    </div>
  );
}

function DoctorPortal({ ctx, exitRole }) {
  const [tab, setTab] = useState("todayAppointments");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="portal-layout">
      <MobileSidebarShell
        title="Doctor Portal"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarContent={<DoctorSidebar active={tab} setActive={setTab} exitRole={exitRole} closeMobile={() => setSidebarOpen(false)} />}
      >
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
      </MobileSidebarShell>
    </div>
  );
}

// ============ ADMIN PORTAL ============
function AdminSidebar({ active, setActive, exitRole, closeMobile }) {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { key: "doctorRequests", label: "Doctor Requests", icon: Stethoscope },
    { key: "doctors", label: "Doctors", icon: Users },
    { key: "users", label: "Users", icon: User },
    { key: "appointments", label: "Appointments", icon: CalendarCheck },
    { key: "settings", label: "Setting", icon: Settings },
  ];
  const handleClick = (key) => {
    setActive(key);
    closeMobile?.();
  };
  return (
    <>
      <div style={{ padding: "0 24px 24px" }}><Logo /></div>
      {items.map((it) => (
        <div key={it.key} onClick={() => handleClick(it.key)} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", cursor: "pointer",
          background: active === it.key ? COLORS.main : "transparent", color: active === it.key ? "#fff" : COLORS.text,
        }}>
          <it.icon size={18} /> {it.label}
        </div>
      ))}
      <div onClick={exitRole} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", color: COLORS.red, cursor: "pointer", marginTop: 20 }}>
        <LogOut size={18} /> Exit admin view
      </div>
    </>
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
    <div className="container-pad">
      <div className="stat-grid">
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

      <div className="two-col-grid">
        <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
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
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
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
        <div className="data-table-wrap stack-on-mobile" style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr style={{ color: COLORS.gray, fontSize: 13 }}>
                {["Patient", "Date & Time", "Doctor", "Type", "Status"].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {APPOINTMENTS.map((a, i) => (
                <tr key={i} style={{ borderTop: "1px solid #f5f5f5" }}>
                  <td data-label="Patient">{PATIENT_PROFILE.name}</td>
                  <td data-label="Date & Time">{a.date} / {a.time}</td>
                  <td data-label="Doctor">{a.doctor}</td>
                  <td data-label="Type">Clinic Visit</td>
                  <td data-label="Status"><span style={{ color: statusColor(a.status).text, fontWeight: 600 }}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminDoctorRequestsTab() {
  const [reqs, setReqs] = useState(DOCTOR_REGISTRATIONS);
  return (
    <div className="container-pad">
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Doctor verification requests</h2>
      <p style={{ color: COLORS.gray, marginBottom: 24, fontSize: 14 }}>Review submitted documents before approving access to the system.</p>
      {reqs.length === 0 && <div style={{ color: COLORS.gray, padding: 30, textAlign: "center" }}>No pending requests.</div>}
      {reqs.map((r, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 14, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{r.name}</div>
              <div style={{ color: COLORS.gray, fontSize: 13 }}>{r.specialty} · Submitted {r.date}</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => setReqs(reqs.filter((_, idx) => idx !== i))} className="btn-primary" style={{ background: COLORS.green, padding: "8px 18px" }}>Approve</button>
              <button onClick={() => setReqs(reqs.filter((_, idx) => idx !== i))} className="btn-outline" style={{ borderColor: COLORS.red, color: COLORS.red, padding: "8px 18px" }}>Revoke</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
    <div className="container-pad">
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Doctors</h2>
      <div className="data-table-wrap stack-on-mobile" style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr style={{ color: COLORS.gray, fontSize: 13, textAlign: "left" }}>
              {["No.", "Name", "Specialization", "Status", "Action"].map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {DOCTORS.map((d, i) => (
              <tr key={d.id} style={{ borderTop: "1px solid #f0f0f0" }}>
                <td data-label="No.">{i + 1}</td>
                <td data-label="Name">{d.name}</td>
                <td data-label="Specialization">{d.specialty}</td>
                <td data-label="Status">
                  <span style={{ color: d.status === "approved" ? COLORS.green : "#cc9a06", fontWeight: 600, fontSize: 13 }}>
                    {d.status === "approved" ? "Approved" : "Pending"}
                  </span>
                </td>
                <td data-label="Action">
                  <Trash2 size={16} color={COLORS.red} style={{ cursor: "pointer" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminUsersTab() {
  return (
    <div className="container-pad">
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Users</h2>
      <div className="data-table-wrap stack-on-mobile" style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr style={{ color: COLORS.gray, fontSize: 13, textAlign: "left" }}>
              {["Name", "Role", "Joined", "Action"].map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {ADMIN_USERS.map((u, i) => (
              <tr key={i} style={{ borderTop: "1px solid #f0f0f0" }}>
                <td data-label="Name">{u.name}</td>
                <td data-label="Role">{u.role}</td>
                <td data-label="Joined">{u.joined}</td>
                <td data-label="Action"><Trash2 size={16} color={COLORS.red} style={{ cursor: "pointer" }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminAppointmentsTab() {
  return (
    <div className="container-pad">
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>All Appointments</h2>
      <div className="data-table-wrap stack-on-mobile" style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr style={{ color: COLORS.gray, fontSize: 13, textAlign: "left" }}>
              {["Patient", "Doctor", "Date", "Time", "Status"].map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {APPOINTMENTS.map((a, i) => (
              <tr key={i} style={{ borderTop: "1px solid #f0f0f0" }}>
                <td data-label="Patient">{PATIENT_PROFILE.name}</td>
                <td data-label="Doctor">{a.doctor}</td>
                <td data-label="Date">{a.date}</td>
                <td data-label="Time">{a.time}</td>
                <td data-label="Status"><span style={{ color: statusColor(a.status).text, fontWeight: 600 }}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminSettingsTab() {
  return (
    <div className="container-pad" style={{ maxWidth: 500 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Setting</h2>
      <label className="field-label">Admin name</label>
      <input defaultValue="Admin" className="field-input" style={{ marginBottom: 18 }} />
      <label className="field-label">Email</label>
      <input defaultValue="admin@care.com" className="field-input" style={{ marginBottom: 18 }} />
      <button className="btn-primary">Save</button>
    </div>
  );
}

function AdminPortal({ exitRole }) {
  const [tab, setTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="admin-layout">
      <div className={`sidebar-backdrop ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />
      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-close-btn" style={{ justifyContent: "flex-end", padding: "10px 16px", cursor: "pointer" }} onClick={() => setSidebarOpen(false)}>
          <X size={22} />
        </div>
        <AdminSidebar active={tab} setActive={setTab} exitRole={exitRole} closeMobile={() => setSidebarOpen(false)} />
      </div>
      <div className="admin-content">
        <div className="admin-topbar">
          <div className="admin-hamburger hamburger-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} color={COLORS.main} />
          </div>
          <div className="admin-search">
            <Search size={16} color={COLORS.gray} />
            <input placeholder="Search" style={{ border: "none", outline: "none", flex: 1, minWidth: 0 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#cdeaeb", display: "flex", alignItems: "center", justifyContent: "center" }}><User size={18} color={COLORS.main} /></div>
            <strong>Admin</strong>
          </div>
        </div>
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
    <div className="role-picker">
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
      <div className="care-app" style={{ minHeight: "100vh", background: "#fff" }}>
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
    <div className="care-app">
      <GlobalStyles />
      {content}
      <RolePicker />
    </div>
  );
}
