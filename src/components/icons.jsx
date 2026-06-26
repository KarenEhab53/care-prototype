// Minimal inline icon set so the prototype has no extra dependency.
// Each icon is a simple stroked SVG sized to 20x20 by default.

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconHome = (p) => (
  <svg {...base} {...p}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v9.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
  </svg>
);

export const IconSearch = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const IconCalendar = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);

export const IconFolder = (p) => (
  <svg {...base} {...p}>
    <path d="M3.5 6.5a1.5 1.5 0 0 1 1.5-1.5h4.5l2 2.5h8a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5Z" />
  </svg>
);

export const IconShield = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3.5 4.5 6.5v5.2c0 5 3.4 7.6 7.5 8.8 4.1-1.2 7.5-3.8 7.5-8.8V6.5Z" />
    <path d="m9 12 2 2 4-4.5" />
  </svg>
);

export const IconChat = (p) => (
  <svg {...base} {...p}>
    <path d="M4 5.5h16v10H9.5L5 19v-3.5H4Z" />
  </svg>
);

export const IconBell = (p) => (
  <svg {...base} {...p}>
    <path d="M6 10.5a6 6 0 1 1 12 0v3.2l1.5 2.8H4.5L6 13.7Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const IconUser = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
  </svg>
);

export const IconClock = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </svg>
);

export const IconX = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconUsers = (p) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <circle cx="17.5" cy="9" r="2.3" />
    <path d="M15.7 13.2c2.4.2 4.3 1.9 4.3 4.6" />
  </svg>
);

export const IconStethoscope = (p) => (
  <svg {...base} {...p}>
    <path d="M6 4v6a4 4 0 0 0 8 0V4" />
    <path d="M10 14v2a4 4 0 0 0 8 0v-1.5" />
    <circle cx="19.5" cy="13" r="1.6" />
  </svg>
);

export const IconAlertTriangle = (p) => (
  <svg {...base} {...p}>
    <path d="M12 4.5 21 19.5H3Z" />
    <path d="M12 10v4M12 17h.01" />
  </svg>
);

export const IconUpload = (p) => (
  <svg {...base} {...p}>
    <path d="M12 16V5M8 9l4-4 4 4" />
    <path d="M4.5 16.5V18a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-1.5" />
  </svg>
);

export const IconHeart = (p) => (
  <svg {...base} {...p}>
    <path d="M12 19.5 4.8 12.6a4.6 4.6 0 0 1 6.6-6.4l.6.6.6-.6a4.6 4.6 0 0 1 6.6 6.4Z" />
  </svg>
);

export const IconBone = (p) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7" />
    <circle cx="5.5" cy="18.5" r="2" />
    <circle cx="7" cy="17" r="0.1" />
    <circle cx="18.5" cy="5.5" r="2" />
  </svg>
);

export const IconLogOut = (p) => (
  <svg {...base} {...p}>
    <path d="M9 5H6a1.5 1.5 0 0 0-1.5 1.5v11A1.5 1.5 0 0 0 6 19h3" />
    <path d="M14 16l4.5-4-4.5-4M18.5 12H9" />
  </svg>
);

export const IconChevronRight = (p) => (
  <svg {...base} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const IconPlus = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMapPin = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </svg>
);

export const IconStar = (p) => (
  <svg {...base} {...p}>
    <path d="m12 4 2.5 5.5 5.9.6-4.5 4 1.3 5.9L12 17l-5.2 3 1.3-5.9-4.5-4 5.9-.6Z" />
  </svg>
);

export const IconSend = (p) => (
  <svg {...base} {...p}>
    <path d="M4.5 12 20 4.5 13 19l-2.4-5.6L4.5 12Z" />
  </svg>
);

export const IconPaperclip = (p) => (
  <svg {...base} {...p}>
    <path d="M16.5 7 8.8 14.7a3 3 0 0 0 4.2 4.2l7-7a4.5 4.5 0 0 0-6.4-6.4l-7 7" />
  </svg>
);
