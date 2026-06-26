// Mock data standing in for the real MongoDB collections.
// No backend calls happen in this prototype — everything here is
// read/written to in-memory React state so the flows feel real
// without needing your Express API connected.

export const specialties = [
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Endocrinology",
];

export const areas = [
  "Nasr City",
  "Maadi",
  "Heliopolis",
  "Dokki",
  "New Cairo",
  "Zamalek",
];

export const doctors = [
  {
    id: "doc_1",
    name: "Dr. Heba Mansour",
    specialty: "Cardiology",
    subSpecialty: ["Heart Failure", "Hypertension"],
    area: "Nasr City",
    avatarColor: "#39a2ab",
    bio: "Experienced cardiologist with 10+ years treating heart disease.",
    experienceYears: 10,
    clinicLocation: ["Nasr City Medical Center, Building 5"],
    consultationFee: 300,
    conditionsTreated: ["Heart Disease", "High Blood Pressure", "Arrhythmia"],
    education: [
      { degree: "MBBS", university: "Cairo University", year: 2012 },
      { degree: "MD Cardiology", university: "Ain Shams University", year: 2017 },
    ],
    certifications: [
      { name: "Advanced Cardiac Life Support", issuer: "AHA", year: 2020 },
    ],
    status: "approved",
    rating: 4.8,
  },
  {
    id: "doc_2",
    name: "Dr. Omar Saleh",
    specialty: "Orthopedics",
    subSpecialty: ["Sports Injuries", "Joint Replacement"],
    area: "Maadi",
    avatarColor: "#225555",
    bio: "Orthopedic surgeon focused on sports medicine and joint care.",
    experienceYears: 8,
    clinicLocation: ["Maadi Specialized Clinic"],
    consultationFee: 250,
    conditionsTreated: ["Fractures", "Joint Pain", "ACL Injury"],
    education: [{ degree: "MBBS", university: "Alexandria University", year: 2014 }],
    certifications: [],
    status: "approved",
    rating: 4.6,
  },
  {
    id: "doc_3",
    name: "Dr. Nourhan Adel",
    specialty: "Pediatrics",
    subSpecialty: ["Neonatal Care"],
    area: "Heliopolis",
    avatarColor: "#39a2ab",
    bio: "Pediatrician dedicated to newborn and child healthcare.",
    experienceYears: 6,
    clinicLocation: ["Heliopolis Family Clinic"],
    consultationFee: 200,
    conditionsTreated: ["Common Childhood Illnesses", "Vaccinations"],
    education: [{ degree: "MBBS", university: "Cairo University", year: 2018 }],
    certifications: [],
    status: "approved",
    rating: 4.9,
  },
  {
    id: "doc_4",
    name: "Dr. Karim Fathy",
    specialty: "Dermatology",
    subSpecialty: ["Cosmetic Dermatology"],
    area: "Zamalek",
    avatarColor: "#225555",
    bio: "Dermatologist with focus on skin health and cosmetic procedures.",
    experienceYears: 5,
    clinicLocation: ["Zamalek Skin Center"],
    consultationFee: 280,
    conditionsTreated: ["Acne", "Eczema", "Skin Allergies"],
    education: [{ degree: "MBBS", university: "Ain Shams University", year: 2019 }],
    certifications: [],
    status: "pending",
    rating: null,
    documents: {
      degree: "degree_certificate.pdf",
      syndicateCard: "syndicate_card.pdf",
      nationalId: "national_id.pdf",
    },
    submittedAt: "2026-06-20",
  },
  {
    id: "doc_5",
    name: "Dr. Mona Tarek",
    specialty: "Neurology",
    subSpecialty: ["Migraine", "Epilepsy"],
    area: "Dokki",
    avatarColor: "#39a2ab",
    bio: "Neurologist specializing in chronic headache and seizure disorders.",
    experienceYears: 11,
    clinicLocation: ["Dokki Neuro Center"],
    consultationFee: 350,
    conditionsTreated: ["Migraine", "Epilepsy", "Nerve Pain"],
    education: [{ degree: "MD Neurology", university: "Cairo University", year: 2015 }],
    certifications: [],
    status: "pending",
    rating: null,
    documents: {
      degree: "degree_certificate.pdf",
      syndicateCard: "syndicate_card.pdf",
      nationalId: "national_id.pdf",
    },
    submittedAt: "2026-06-22",
  },
];

export const patient = {
  id: "user_1",
  name: "Karen Adel",
  nationalId: "29801011234567",
  phone: "+20 100 123 4567",
  email: "karen.adel@example.com",
  location: "New Cairo, Cairo",
  bloodType: "O+",
  chronicDiseases: ["Asthma"],
  allergies: ["Penicillin"],
  currentMedications: ["Ventolin Inhaler"],
  emergencyContacts: [
    { name: "Ahmed Adel", relation: "Father", phone: "+20 122 765 4321" },
  ],
};

export const appointments = [
  {
    id: "apt_1",
    doctorId: "doc_1",
    doctorName: "Dr. Heba Mansour",
    specialty: "Cardiology",
    date: "2026-06-25",
    time: "10:00",
    status: "approved",
  },
  {
    id: "apt_2",
    doctorId: "doc_2",
    doctorName: "Dr. Omar Saleh",
    specialty: "Orthopedics",
    date: "2026-06-28",
    time: "13:30",
    status: "pending",
  },
  {
    id: "apt_3",
    doctorId: "doc_3",
    doctorName: "Dr. Nourhan Adel",
    specialty: "Pediatrics",
    date: "2026-06-10",
    time: "09:00",
    status: "completed",
  },
  {
    id: "apt_4",
    doctorId: "doc_1",
    doctorName: "Dr. Heba Mansour",
    specialty: "Cardiology",
    date: "2026-06-05",
    time: "11:30",
    status: "cancelled",
  },
];

export const medicalFolders = [
  {
    id: "folder_1",
    title: "Cardiology",
    icon: "heart",
    records: [
      {
        id: "rec_1",
        diagnosis: "Mild Hypertension",
        visitDate: "2026-05-12",
        notes: "Prescribed low-dose beta blocker, advised low-sodium diet.",
        attachments: ["blood_pressure_log.pdf", "ecg_scan.jpg"],
      },
    ],
    sharedWith: [{ doctorId: "doc_1", permissions: ["view", "add"] }],
  },
  {
    id: "folder_2",
    title: "Allergy & Immunology",
    icon: "shield",
    records: [
      {
        id: "rec_2",
        diagnosis: "Penicillin Allergy — confirmed",
        visitDate: "2024-02-03",
        notes: "Reaction confirmed via skin prick test.",
        attachments: ["allergy_test_results.pdf"],
      },
    ],
    sharedWith: [],
  },
  {
    id: "folder_3",
    title: "Orthopedics",
    icon: "bone",
    records: [
      {
        id: "rec_3",
        diagnosis: "Sprained Ankle",
        visitDate: "2026-06-01",
        notes: "Grade 1 sprain. RICE protocol recommended for 2 weeks.",
        attachments: ["xray_ankle.jpg"],
      },
    ],
    sharedWith: [{ doctorId: "doc_2", permissions: ["view", "add", "edit"] }],
  },
];

export const availabilitySlots = [
  { id: "slot_1", date: "2026-06-25", time: "09:00", bookedBy: null },
  { id: "slot_2", date: "2026-06-25", time: "09:30", bookedBy: null },
  { id: "slot_3", date: "2026-06-25", time: "10:00", bookedBy: "user_1" },
  { id: "slot_4", date: "2026-06-25", time: "10:30", bookedBy: null },
  { id: "slot_5", date: "2026-06-26", time: "11:00", bookedBy: null },
  { id: "slot_6", date: "2026-06-26", time: "11:30", bookedBy: "user_2" },
];

export const doctorAppointments = [
  {
    id: "apt_1",
    patientName: "Karen Adel",
    patientId: "user_1",
    date: "2026-06-25",
    time: "10:00",
    status: "approved",
    reason: "Routine blood pressure check-up",
  },
  {
    id: "apt_5",
    patientName: "Yara Hassan",
    patientId: "user_2",
    date: "2026-06-26",
    time: "11:30",
    status: "pending",
    reason: "Chest discomfort, follow-up requested",
  },
  {
    id: "apt_6",
    patientName: "Sami Nabil",
    patientId: "user_3",
    date: "2026-06-18",
    time: "14:00",
    status: "completed",
    reason: "Annual cardiac screening",
  },
];

export const chatThreads = [
  {
    id: "chat_1",
    withName: "Dr. Heba Mansour",
    withRole: "doctor",
    lastMessage: "Your test results look stable. See you Thursday.",
    unread: 1,
    messages: [
      { from: "doctor", text: "Hi Karen, how are you feeling after the new dosage?", time: "09:12" },
      { from: "patient", text: "Better, less dizziness in the mornings.", time: "09:15" },
      { from: "doctor", text: "Good to hear. Your test results look stable. See you Thursday.", time: "09:18" },
    ],
  },
  {
    id: "chat_2",
    withName: "Dr. Omar Saleh",
    withRole: "doctor",
    lastMessage: "Please keep the ankle elevated for now.",
    unread: 0,
    messages: [
      { from: "patient", text: "Is it okay to walk on it today?", time: "Yesterday" },
      { from: "doctor", text: "Please keep the ankle elevated for now.", time: "Yesterday" },
    ],
  },
];

export const notifications = [
  {
    id: "n_1",
    type: "appointment_approved",
    text: "Dr. Heba Mansour approved your appointment for Jun 25, 10:00.",
    time: "2h ago",
    read: false,
  },
  {
    id: "n_2",
    type: "message",
    text: "New message from Dr. Heba Mansour.",
    time: "3h ago",
    read: false,
  },
  {
    id: "n_3",
    type: "access_granted",
    text: "You granted Dr. Omar Saleh access to your Orthopedics folder.",
    time: "1d ago",
    read: true,
  },
  {
    id: "n_4",
    type: "appointment_cancelled",
    text: "Your appointment on Jun 5 was cancelled.",
    time: "3d ago",
    read: true,
  },
];

export const adminStats = {
  totalUsers: 1284,
  totalDoctors: 96,
  pendingVerifications: 2,
  appointmentsToday: 41,
};
