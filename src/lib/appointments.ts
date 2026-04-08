/**
 * appointments.ts — localStorage CRUD for patient appointments.
 *
 * This module is the single source of truth for persisted appointments on
 * the client side. When a real backend is added, swap these functions for
 * API calls and the rest of the app continues working unchanged.
 */

export interface SavedAppointment {
  id: string;               // uuid-like: `${doctorId}-${Date.now()}`
  doctorId: number;
  doctorName: string;
  doctorSpecialty: string;
  doctorClinic: string;
  doctorAddress: string;
  doctorCity: string;
  doctorImg: string;
  doctorInitials: string;
  doctorAvatarBg: string;
  date: string;             // Human-readable: "Wednesday, 9 April 2026"
  time: string;             // "10:00 AM"
  type: 'in-person' | 'video';
  patientFirstName: string;
  patientLastName: string;
  patientEmail: string;
  patientPhone: string;
  reason?: string;
  status: 'upcoming' | 'past' | 'cancelled';
  bookedAt: string;         // ISO timestamp
}

const STORAGE_KEY = 'tabiby_appointments';

function loadAll(): SavedAppointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedAppointment[]) : [];
  } catch {
    return [];
  }
}

function saveAll(appointments: SavedAppointment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

/** Add a new appointment (called from BookingPage on confirm) */
export function saveAppointment(appt: Omit<SavedAppointment, 'id' | 'bookedAt'>): SavedAppointment {
  const full: SavedAppointment = {
    ...appt,
    id: `${appt.doctorId}-${Date.now()}`,
    bookedAt: new Date().toISOString(),
  };
  const existing = loadAll();
  saveAll([full, ...existing]);
  return full;
}

/** Read all appointments for the current patient */
export function getAppointments(): SavedAppointment[] {
  const appts = loadAll();
  // Auto-age appointments whose date string has passed
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return appts.map((a) => {
    if (a.status === 'upcoming') {
      // Try to parse the date and check if it's in the past
      const parsed = new Date(a.date);
      if (!isNaN(parsed.getTime()) && parsed < today) {
        return { ...a, status: 'past' as const };
      }
    }
    return a;
  });
}

/** Cancel an appointment by id */
export function cancelAppointment(id: string): void {
  const appts = loadAll().map((a) =>
    a.id === id ? { ...a, status: 'cancelled' as const } : a,
  );
  saveAll(appts);
}

/** Delete an appointment record entirely */
export function deleteAppointment(id: string): void {
  saveAll(loadAll().filter((a) => a.id !== id));
}

// ─── Patient Profile ──────────────────────────────────────────────────────────

const PROFILE_KEY = 'tabiby_patient_profile';

export interface PatientProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;         // stored with +974 prefix
  dob: string;
  qid: string;           // Qatar ID — optional, never required
  language: 'en' | 'ar' | 'hi';
}

const DEFAULT_PROFILE: PatientProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '+974 ',
  dob: '',
  qid: '',
  language: 'en',
};

export function getProfile(): PatientProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<PatientProfile>) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: PatientProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
