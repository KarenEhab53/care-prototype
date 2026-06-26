import "./StatusPulse.css";

const STATUS_CONFIG = {
  pending: { color: "var(--warning-600)", bg: "var(--warning-50)", label: "Pending", live: true },
  approved: { color: "var(--success-600)", bg: "var(--success-50)", label: "Approved", live: false },
  completed: { color: "var(--text-muted)", bg: "var(--border-soft)", label: "Completed", live: false },
  cancelled: { color: "var(--danger-600)", bg: "var(--danger-50)", label: "Cancelled", live: false },
  revoked: { color: "var(--danger-600)", bg: "var(--danger-50)", label: "Revoked", live: false },
};

// The signature element of this prototype: every status that can still
// change (pending verifications, pending appointments, open slots) gets
// a soft animated pulse. Anything resolved gets a solid dot. One motif,
// used everywhere a status lives, instead of scattered motion effects.
export default function StatusPulse({ status, size = "md" }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      className={`status-pulse status-pulse--${size}`}
      style={{ color: config.color, background: config.bg }}
    >
      <span
        className={`status-pulse__dot ${config.live ? "status-pulse__dot--live" : ""}`}
        style={{ background: config.color }}
      />
      {config.label}
    </span>
  );
}
