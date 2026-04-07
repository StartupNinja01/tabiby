import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Video, Download, ArrowRight, Stethoscope } from 'lucide-react';

export default function ConfirmationPage() {
  const { state } = useLocation() as {
    state: {
      doctor: { id: number; name: string; specialty: string; clinic: string; address: string; city: string; img: string; initials: string; avatarBg: string };
      date: string;
      time: string;
      type: string;
      patient: { firstName: string; lastName: string; email: string; phone: string };
    } | null;
  };

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Stethoscope className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">No Booking Found</h1>
          <p className="text-slate-500 mb-6">It looks like you came here directly. Let's find you a doctor.</p>
          <Link to="/search" className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors">
            Find a Doctor
          </Link>
        </div>
      </div>
    );
  }

  const { doctor, date, time, type, patient } = state;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Appointment Confirmed!</h1>
          <p className="text-slate-500 text-lg">
            A confirmation has been sent to <span className="font-semibold text-slate-700">{patient.email}</span>
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-400"></div>
          <div className="p-6 sm:p-8">

            {/* Doctor */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
              <div className={`h-16 w-16 rounded-xl overflow-hidden flex items-center justify-center text-xl font-bold flex-shrink-0 ${doctor.avatarBg}`}>
                {doctor.img ? (
                  <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover" />
                ) : (
                  doctor.initials
                )}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">{doctor.name}</p>
                <p className="text-teal-700 font-medium">{doctor.specialty}</p>
                <p className="text-slate-500 text-sm">{doctor.clinic}</p>
              </div>
            </div>

            {/* Appointment Details */}
            <h2 className="font-bold text-slate-900 mb-4">Appointment Details</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Date</p>
                  <p className="text-slate-800 font-semibold">{date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Time</p>
                  <p className="text-slate-800 font-semibold">{time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {type === 'video' ? <Video className="h-5 w-5 text-purple-600" /> : <MapPin className="h-5 w-5 text-teal-600" />}
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Type</p>
                  <p className="text-slate-800 font-semibold capitalize">{type} Appointment</p>
                  {type === 'in-person' && (
                    <p className="text-slate-500 text-sm">{doctor.clinic}, {doctor.address}, {doctor.city}, Qatar</p>
                  )}
                </div>
              </div>
            </div>

            {/* Patient Details */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">Patient</h3>
              <p className="text-slate-700 font-medium">{patient.firstName} {patient.lastName}</p>
              <p className="text-slate-500 text-sm">{patient.email} · {patient.phone}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-700 font-semibold py-3 px-5 rounded-xl transition-colors shadow-sm">
            <Download className="h-4 w-4" />
            Add to Calendar
          </button>
          <Link
            to={`/doctor/${doctor.id}`}
            className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-5 rounded-xl transition-colors shadow-sm"
          >
            View Doctor Profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 mb-4">What to expect</h2>
          <div className="space-y-4">
            {[
              { icon: '📧', title: 'Confirmation Email', desc: `A booking confirmation has been sent to ${patient.email}` },
              { icon: '📱', title: 'Reminder', desc: 'You will receive an SMS reminder 24 hours before your appointment' },
              { icon: '🏥', title: 'Arrive Early', desc: `Please arrive 10 minutes early for your first visit to ${doctor.clinic}` },
              { icon: '🔄', title: 'Cancellation', desc: 'You can cancel or reschedule for free up to 24 hours before your appointment' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Find Another Doctor */}
        <div className="text-center mt-8">
          <Link to="/search" className="text-teal-600 hover:text-teal-700 font-medium text-sm hover:underline">
            Book another appointment →
          </Link>
        </div>
      </div>
    </div>
  );
}
