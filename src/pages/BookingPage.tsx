import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Check, Calendar, User, ClipboardCheck, Video, MapPin, Clock, Star, CheckCircle2 } from 'lucide-react';
import { getDoctorById } from '@/data/doctors';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';
import { saveAppointment, getProfile } from '@/lib/appointments';

type Step = 1 | 2 | 3;
type AppointmentType = 'in-person' | 'video';

const TIME_SLOTS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM',
];

// Some slots "unavailable" for realism
const UNAVAILABLE = new Set(['9:30 AM', '11:00 AM', '1:00 PM', '3:30 PM']);

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doctor = getDoctorById(Number(id));

  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('in-person');
  // Pre-fill from saved patient profile (if available)
  const savedProfile = getProfile();
  const [form, setForm] = useState({
    firstName: savedProfile.firstName || '',
    lastName:  savedProfile.lastName  || '',
    email:     savedProfile.email     || '',
    phone:     savedProfile.phone !== '+974 ' ? savedProfile.phone : '',
    dob:       savedProfile.dob       || '',
    reason: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Doctor Not Found</h1>
          <Link to="/search" className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700">
            Search Doctors
          </Link>
        </div>
      </div>
    );
  }

  const setField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validateStep2 = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedDate || !selectedTime) return;
      setStep(2);
    } else if (step === 2) {
      if (!validateStep2()) return;
      setStep(3);
    }
  };

  const handleConfirm = () => {
    const dateStr = selectedDate?.toLocaleDateString('en-QA', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }) ?? '';

    // Persist to localStorage so the Dashboard can read it
    saveAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorClinic: doctor.clinic,
      doctorAddress: doctor.address,
      doctorCity: doctor.city,
      doctorImg: doctor.img,
      doctorInitials: doctor.initials,
      doctorAvatarBg: doctor.avatarBg,
      date: dateStr,
      time: selectedTime,
      type: appointmentType,
      patientFirstName: form.firstName,
      patientLastName: form.lastName,
      patientEmail: form.email,
      patientPhone: form.phone,
      reason: form.reason || undefined,
      status: 'upcoming',
    });

    navigate('/confirmation', {
      state: {
        doctor,
        date: dateStr,
        time: selectedTime,
        type: appointmentType,
        patient: form,
      },
    });
  };

  const steps = [
    { num: 1, label: 'Choose Time', icon: Calendar },
    { num: 2, label: 'Your Info', icon: User },
    { num: 3, label: 'Confirm', icon: ClipboardCheck },
  ];

  const inputClass =
    'w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <button
            onClick={() => step === 1 ? navigate(`/doctor/${doctor.id}`) : setStep((s) => (s - 1) as Step)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors font-medium"
          >
            <ChevronLeft className="h-4 w-4" />
            {step === 1 ? `Back to ${doctor.name}` : 'Back'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step > s.num
                    ? 'bg-teal-600 text-white'
                    : step === s.num
                    ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                </div>
                <span className={`text-xs mt-1.5 font-medium whitespace-nowrap ${step === s.num ? 'text-teal-700' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-4 transition-colors ${step > s.num ? 'bg-teal-500' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">

            {/* Step 1: Date & Time */}
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Choose Date & Time</h2>
                <p className="text-slate-500 text-sm mb-6">Select a convenient appointment slot</p>

                {/* Appointment Type */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-700 mb-3">Appointment Type</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setAppointmentType('in-person')}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                        appointmentType === 'in-person'
                          ? 'border-teal-500 bg-teal-50 text-teal-800'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <MapPin className="h-5 w-5 flex-shrink-0" />
                      <div className="text-left">
                        <p className="font-semibold text-sm">In-Person</p>
                        <p className="text-xs text-slate-500">{doctor.clinic}</p>
                      </div>
                    </button>
                    {doctor.videoVisits && (
                      <button
                        onClick={() => setAppointmentType('video')}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                          appointmentType === 'video'
                            ? 'border-purple-500 bg-purple-50 text-purple-800'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Video className="h-5 w-5 flex-shrink-0" />
                        <div className="text-left">
                          <p className="font-semibold text-sm">Video Visit</p>
                          <p className="text-xs text-slate-500">Online consultation</p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Calendar */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-700 mb-3">Select Date</p>
                  <div className="flex justify-center">
                    <CalendarPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        const d = new Date(date);
                        d.setHours(0, 0, 0, 0);
                        return d < today || d.getDay() === 5; // disable past and Fridays
                      }}
                      className="rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-3">
                      Available Times — {selectedDate.toLocaleDateString('en-QA', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const unavail = UNAVAILABLE.has(slot);
                        return (
                          <button
                            key={slot}
                            disabled={unavail}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                              unavail
                                ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                                : selectedTime === slot
                                ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNextStep}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full mt-8 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors"
                >
                  Continue to Patient Info
                </button>
              </div>
            )}

            {/* Step 2: Patient Info */}
            {step === 2 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Your Information</h2>
                {savedProfile.firstName && (
                  <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2 mb-4 text-xs text-teal-700 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                    Pre-filled from your saved profile —{' '}
                    <a href="/dashboard" className="underline hover:text-teal-900">edit in Dashboard</a>
                  </div>
                )}
                <p className="text-slate-500 text-sm mb-6">We need a few details to complete your booking</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name *</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={setField('firstName')}
                        placeholder="Noor"
                        className={inputClass + (errors.firstName ? ' border-red-400 focus:border-red-500 focus:ring-red-500/30' : '')}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name *</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={setField('lastName')}
                        placeholder="Al-Ahmad"
                        className={inputClass + (errors.lastName ? ' border-red-400' : '')}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={setField('email')}
                      placeholder="noor@example.com"
                      className={inputClass + (errors.email ? ' border-red-400' : '')}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={setField('phone')}
                      placeholder="+974 3000 0000"
                      className={inputClass + (errors.phone ? ' border-red-400' : '')}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Date of Birth</label>
                    <input
                      type="date"
                      value={form.dob}
                      onChange={setField('dob')}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Reason for Visit</label>
                    <select
                      value={form.reason}
                      onChange={setField('reason')}
                      className={inputClass}
                    >
                      <option value="">Select reason...</option>
                      <option>General Checkup</option>
                      <option>Follow-up Appointment</option>
                      <option>New Concern / Symptom</option>
                      <option>Chronic Condition Management</option>
                      <option>Second Opinion</option>
                      <option>Prescription Renewal</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Additional Notes (optional)</label>
                    <textarea
                      value={form.notes}
                      onChange={setField('notes')}
                      rows={3}
                      placeholder="Any specific concerns or information for the doctor..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl transition-colors"
                >
                  Review Appointment
                </button>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {step === 3 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Confirm Your Appointment</h2>
                <p className="text-slate-500 text-sm mb-6">Please review your details before confirming</p>

                <div className="space-y-4">
                  <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                    <h3 className="font-semibold text-teal-900 mb-3">Appointment Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        <span className="text-slate-700">
                          {selectedDate?.toLocaleDateString('en-QA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-teal-600" />
                        <span className="text-slate-700">{selectedTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {appointmentType === 'video' ? (
                          <Video className="h-4 w-4 text-purple-600" />
                        ) : (
                          <MapPin className="h-4 w-4 text-teal-600" />
                        )}
                        <span className="text-slate-700 capitalize">{appointmentType} appointment</span>
                      </div>
                      {appointmentType === 'in-person' && (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{doctor.clinic}, {doctor.address}, {doctor.city}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3">Patient Information</h3>
                    <div className="space-y-1.5 text-sm text-slate-600">
                      <p><span className="font-medium text-slate-800">Name:</span> {form.firstName} {form.lastName}</p>
                      <p><span className="font-medium text-slate-800">Email:</span> {form.email}</p>
                      <p><span className="font-medium text-slate-800">Phone:</span> {form.phone}</p>
                      {form.reason && <p><span className="font-medium text-slate-800">Reason:</span> {form.reason}</p>}
                      {form.notes && <p><span className="font-medium text-slate-800">Notes:</span> {form.notes}</p>}
                    </div>
                    <button onClick={() => setStep(2)} className="text-teal-600 text-xs font-medium mt-2 hover:underline">
                      Edit information
                    </button>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Consultation fee</span>
                      <span className="font-bold text-slate-900">QAR {doctor.fee}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Payment collected at clinic</p>
                  </div>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl transition-colors text-base shadow-sm"
                >
                  Confirm Booking
                </button>
                <p className="text-center text-xs text-slate-400 mt-3">
                  By confirming, you agree to Tabiby's{' '}
                  <Link to="/terms" className="hover:underline">Terms of Service</Link>
                </p>
              </div>
            )}
          </div>

          {/* Doctor Summary Sidebar */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sticky top-24">
              <div className={`h-24 w-24 rounded-xl overflow-hidden flex items-center justify-center text-xl font-bold mx-auto mb-3 ${doctor.avatarBg}`}>
                {doctor.img ? (
                  <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover" />
                ) : (
                  doctor.initials
                )}
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-900">{doctor.name}</p>
                <p className="text-teal-700 text-sm font-medium">{doctor.specialty}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-slate-700">{doctor.rating}</span>
                  <span className="text-xs text-slate-400">({doctor.reviews})</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-500">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span>{doctor.clinic}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
