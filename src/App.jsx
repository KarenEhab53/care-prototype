import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Shell from "./components/Shell";
import { Toast } from "./components/ui";
import "./styles/page.css";

import PatientOverview from "./pages/patient/PatientOverview";
import DoctorSearch from "./pages/patient/DoctorSearch";
import DoctorProfile from "./pages/patient/DoctorProfile";
import PatientAppointments from "./pages/patient/PatientAppointments";
import MedicalHistory from "./pages/patient/MedicalHistory";
import EmergencyProfile from "./pages/patient/EmergencyProfile";
import PatientChat from "./pages/patient/PatientChat";
import PatientProfile from "./pages/patient/PatientProfile";

import DoctorOverview from "./pages/doctor/DoctorOverview";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorChat from "./pages/doctor/DoctorChat";
import DoctorProfileEdit from "./pages/doctor/DoctorProfileEdit";

import AdminOverview from "./pages/admin/AdminOverview";
import DoctorVerifications from "./pages/admin/DoctorVerifications";
import UsersDoctors from "./pages/admin/UsersDoctors";

import EmergencySearch from "./pages/shared/EmergencySearch";

function AppRoutes() {
  const { toast } = useApp();
  return (
    <>
      <Routes>
        <Route path="/emergency-lookup" element={<EmergencySearch />} />

        <Route
          path="/patient/*"
          element={
            <Shell>
              <Routes>
                <Route index element={<PatientOverview />} />
                <Route path="search" element={<DoctorSearch />} />
                <Route path="doctors/:id" element={<DoctorProfile />} />
                <Route path="appointments" element={<PatientAppointments />} />
                <Route path="medical-history" element={<MedicalHistory />} />
                <Route path="emergency" element={<EmergencyProfile />} />
                <Route path="chat" element={<PatientChat />} />
                <Route path="profile" element={<PatientProfile />} />
              </Routes>
            </Shell>
          }
        />

        <Route
          path="/doctor/*"
          element={
            <Shell>
              <Routes>
                <Route index element={<DoctorOverview />} />
                <Route path="appointments" element={<DoctorAppointments />} />
                <Route path="schedule" element={<DoctorSchedule />} />
                <Route path="patients" element={<DoctorPatients />} />
                <Route path="chat" element={<DoctorChat />} />
                <Route path="profile" element={<DoctorProfileEdit />} />
              </Routes>
            </Shell>
          }
        />

        <Route
          path="/admin/*"
          element={
            <Shell>
              <Routes>
                <Route index element={<AdminOverview />} />
                <Route path="verifications" element={<DoctorVerifications />} />
                <Route path="users" element={<UsersDoctors />} />
              </Routes>
            </Shell>
          }
        />

        <Route path="*" element={<Navigate to="/patient" replace />} />
      </Routes>
      <Toast toast={toast} />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
