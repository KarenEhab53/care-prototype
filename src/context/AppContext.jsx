import { createContext, useContext, useState } from "react";
import {
  appointments as initialAppointments,
  doctorAppointments as initialDoctorAppointments,
  doctors as initialDoctors,
  notifications as initialNotifications,
  medicalFolders as initialFolders,
} from "../data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [role, setRole] = useState("patient"); // "patient" | "doctor" | "admin"
  const [appointments, setAppointments] = useState(initialAppointments);
  const [doctorAppointments, setDoctorAppointments] = useState(initialDoctorAppointments);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [folders, setFolders] = useState(initialFolders);
  const [toast, setToast] = useState(null);

  function showToast(message, tone = "success") {
    setToast({ message, tone, key: Date.now() });
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => setToast(null), 3200);
  }

  // Patient: cancel a pending appointment
  function cancelAppointment(id) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
    showToast("Appointment cancelled.", "danger");
  }

  // Doctor: approve / cancel / complete an appointment
  function updateDoctorAppointment(id, status) {
    setDoctorAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    const labels = { approved: "Appointment approved.", cancelled: "Appointment cancelled.", completed: "Appointment marked complete." };
    showToast(labels[status] ?? "Updated.", status === "cancelled" ? "danger" : "success");
  }

  // Admin: approve / revoke a doctor verification request
  function setDoctorStatus(id, status) {
    setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    showToast(status === "approved" ? "Doctor approved." : "Doctor revoked.", status === "approved" ? "success" : "danger");
  }

  function markNotificationRead(id) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function grantFolderAccess(folderId, doctorId, permissions) {
    setFolders((prev) =>
      prev.map((f) =>
        f.id === folderId
          ? {
              ...f,
              sharedWith: [
                ...f.sharedWith.filter((s) => s.doctorId !== doctorId),
                { doctorId, permissions },
              ],
            }
          : f
      )
    );
    showToast("Access permissions updated.", "success");
  }

  function revokeFolderAccess(folderId, doctorId) {
    setFolders((prev) =>
      prev.map((f) =>
        f.id === folderId
          ? { ...f, sharedWith: f.sharedWith.filter((s) => s.doctorId !== doctorId) }
          : f
      )
    );
    showToast("Access revoked.", "danger");
  }

  const value = {
    role,
    setRole,
    appointments,
    cancelAppointment,
    doctorAppointments,
    updateDoctorAppointment,
    doctors,
    setDoctorStatus,
    notifications,
    markNotificationRead,
    folders,
    grantFolderAccess,
    revokeFolderAccess,
    toast,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
