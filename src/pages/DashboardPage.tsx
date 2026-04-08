import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, Video, User, Settings, ChevronRight,
  Trash2, XCircle, RefreshCw, Star, BookOpen, CheckCircle2,
  Phone, Mail, IdCard, Globe, AlertCircle, ArrowRight,
} from 'lucide-react';
import {
  getAppointments,
  cancelAppointment,
  deleteAppointment,
  getProfile,
  saveProfile,
  type SavedAppointment,
  type PatientProfile,
} from '@/lib/appointments';
import PageMeta from '@/components/PageMeta';

type Tab = 'upcoming' | 'past' | 'profile';

// ─── Appointment Card ─────────────────────────────────────────────────────────

function AppointmentCard({
  appt,
  onCancel,
  onDelete,
}: {
  appt: SavedAppointment;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const navigate = useNavigate();
  const [confirmCancel, setConfirmCancel] = useState(false);

  const isUpcoming = appt.status === 'upcoming';
  const isCancelled = appt.status === 'cancelled';

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm transition-all ${
        isCancelled
          ? 'border-slate-200 opacity-60'
          : 'border-slate-200 hover:border-teal-200 hover:shadow-md'
      }`}
    >
      {/* Status bar */}
      <div
        className={`h-1.5 rounded-t-2xl ${
          isCancelled
            ? 'bg-slate-300'
            : isUpcoming
            ? 'bg-gradient-to-r from-teal-500 to-teal-400'
            : 'bg-gradient-to-r from-slate-300 to-slate-200'
        }`}
      />

      <div className="p-5 sm:p-6">
        <div className="flex gap-4">
          {/* Doctor avatar */}
          <div
            className={`h-16 w-16 rounded-xl overflow-hidden flex items-center justify-center text-xl font-bold flex-shrink-0 border-2 border-slate-50 ${appt.doctorAvatarBg}`}
          >
            {appt.doctorImg ? (
              <img src={appt.doctorImg} alt={appt.doctorName} className="w-full h-full object-cover" />
            ) : (
              appt.doctorInitials
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-tight">{appt.doctorName}</h3>
                <p className="text-teal-700 text-sm font-medium">{appt.doctorSpecialty}</p>
              </div>
              {isCancelled ? (
                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full flex-shrink-0">
                  Cancelled
                </span>
              ) : isUpcoming ? (
                <span className="text-xs font-bold bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full flex-shrink-0">
                  Upcoming
                </span>
              ) : (
                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full flex-shrink-0">
                  Completed
                </span>
              )}
            </div>

            {/* Appointment meta */}
            <div className="mt-3 space-y-1.5 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-teal-500 flex-shrink-0" />
                <span>{appt.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-teal-500 flex-shrink-0" />
                <span>{appt.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {appt.type === 'video' ? (
                  <Video className="h-4 w-4 text-purple-500 flex-shrink-0" />
                ) : (
                  <MapPin className="h-4 w-4 text-teal-500 flex-shrink-0" />
                )}
                <span className="truncate">
                  {appt.type === 'video' ? 'Video Visit' : `${appt.doctorClinic}, ${appt.doctorCity}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {!isCancelled && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 flex-wrap">
            {/* Book again (shown for past) or Doctor profile */}
            <Link
              to={`/doctor/${appt.doctorId}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700"
            >
              <ChevronRight className="h-4 w-4" />
              {isUpcoming ? 'View Profile' : 'Book Again'}
            </Link>

            {isUpcoming && (
              <>
                <span className="text-slate-200">|</span>
                <button
                  onClick={() => navigate(`/book/${appt.doctorId}`)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reschedule
                </button>
                <span className="text-slate-200">|</span>
                {confirmCancel ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Are you sure?</span>
                    <button
                      onClick={() => { onCancel(appt.id); setConfirmCancel(false); }}
                      className="text-xs font-bold text-red-600 hover:text-red-700"
                    >
                      Yes, cancel
                    </button>
                    <button
                      onClick={() => setConfirmCancel(false)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-700"
                    >
                      Keep
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmCancel(true)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-600"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                )}
              </>
            )}

            {!isUpcoming && (
              <>
                <span className="text-slate-200">|</span>
                <button
                  onClick={() => onDelete(appt.id)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Profile Tab ─────────────────────────────────────────────────────────────

function ProfileTab() {
  const [profile, setProfile] = useState<PatientProfile>(getProfile());
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof PatientProfile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setProfile((p) => ({ ...p, [field]: e.target.value }));
      setSaved(false);
    };

  const handleSave = () => {
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass =
    'w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-2xl">
      <div className="h-1.5 bg-gradient-to-r from-teal-500 to-teal-400" />
      <div className="p-6 sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Settings className="h-5 w-5 text-teal-500" /> My Profile
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Your details are stored locally on this device. They pre-fill future bookings.
        </p>

        <div className="space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-slate-400" /> First Name
              </label>
              <input
                type="text"
                value={profile.firstName}
                onChange={handleChange('firstName')}
                placeholder="Noor"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={handleChange('lastName')}
                placeholder="Al-Ahmad"
                className={inputClass}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-slate-400" /> Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={handleChange('email')}
              placeholder="noor@example.com"
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-slate-400" /> Phone
              <span className="text-xs text-slate-400 font-normal">(Qatar +974)</span>
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={handleChange('phone')}
              placeholder="+974 3000 0000"
              className={inputClass}
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" /> Date of Birth
            </label>
            <input
              type="date"
              value={profile.dob}
              onChange={handleChange('dob')}
              className={inputClass}
            />
          </div>

          {/* QID */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
              <IdCard className="h-3.5 w-3.5 text-slate-400" /> Qatar ID (QID)
              <span className="text-xs text-slate-400 font-normal">— optional</span>
            </label>
            <input
              type="text"
              value={profile.qid}
              onChange={handleChange('qid')}
              placeholder="28XXXXXXXXX"
              maxLength={11}
              className={inputClass}
            />
            <p className="text-xs text-slate-400 mt-1">
              Your QID is stored only on your device and never shared with third parties.
            </p>
          </div>

          {/* Language preference */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-slate-400" /> Preferred Language
            </label>
            <select
              value={profile.language}
              onChange={handleChange('language')}
              className={inputClass}
            >
              <option value="en">English</option>
              <option value="ar">عربي — Arabic</option>
              <option value="hi">हिंदी — Hindi</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          className={`mt-6 w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
            saved
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
          }`}
        >
          {saved ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Saved!
            </span>
          ) : (
            'Save Profile'
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState({ tab }: { tab: 'upcoming' | 'past' }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
      <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
        {tab === 'upcoming' ? (
          <Calendar className="h-8 w-8 text-teal-400" />
        ) : (
          <BookOpen className="h-8 w-8 text-teal-400" />
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">
        {tab === 'upcoming' ? 'No upcoming appointments' : 'No past appointments'}
      </h3>
      <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
        {tab === 'upcoming'
          ? 'You have no appointments scheduled. Find a doctor and book your first visit.'
          : 'Your completed and cancelled appointments will appear here.'}
      </p>
      {tab === 'upcoming' && (
        <Link
          to="/search"
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm"
        >
          Find a Doctor <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const [appointments, setAppointments] = useState<SavedAppointment[]>([]);

  // Load on mount and after mutations
  const reload = () => setAppointments(getAppointments());
  useEffect(() => { reload(); }, []);

  const upcoming = appointments.filter((a) => a.status === 'upcoming');
  const past = appointments.filter((a) => a.status !== 'upcoming');

  const handleCancel = (id: string) => {
    cancelAppointment(id);
    reload();
  };

  const handleDelete = (id: string) => {
    deleteAppointment(id);
    reload();
  };

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'upcoming', label: 'Upcoming', count: upcoming.length },
    { id: 'past', label: 'Past', count: past.length || undefined },
    { id: 'profile', label: 'My Profile' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PageMeta
        title="My Dashboard — Appointments & Profile | Tabiby"
        description="View and manage your upcoming and past appointments on Tabiby."
        noHreflang
      />

      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Dashboard</h1>
              <p className="text-slate-500 text-sm mt-0.5">Manage your appointments and profile</p>
            </div>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-5 rounded-xl text-sm transition-colors shadow-sm"
            >
              <Star className="h-4 w-4" />
              Book Appointment
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 bg-slate-100 p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Upcoming ── */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {/* Info banner */}
            {upcoming.length > 0 && (
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 flex items-start gap-3 text-sm text-teal-800">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  You can cancel or reschedule up to <strong>24 hours</strong> before your appointment for free.
                </span>
              </div>
            )}
            {upcoming.length === 0 ? (
              <EmptyState tab="upcoming" />
            ) : (
              upcoming.map((a) => (
                <AppointmentCard key={a.id} appt={a} onCancel={handleCancel} onDelete={handleDelete} />
              ))
            )}
          </div>
        )}

        {/* ── Past ── */}
        {activeTab === 'past' && (
          <div className="space-y-4">
            {past.length === 0 ? (
              <EmptyState tab="past" />
            ) : (
              past.map((a) => (
                <AppointmentCard key={a.id} appt={a} onCancel={handleCancel} onDelete={handleDelete} />
              ))
            )}
          </div>
        )}

        {/* ── Profile ── */}
        {activeTab === 'profile' && <ProfileTab />}
      </div>
    </div>
  );
}
