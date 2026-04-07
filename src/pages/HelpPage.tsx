import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, MessageCircle, Phone, Mail, Stethoscope } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_SECTIONS = [
  {
    title: 'Booking Appointments',
    items: [
      {
        q: 'How do I book an appointment on Tabiby?',
        a: 'Simply search for a doctor by specialty or name, view their profile, select an available time slot, and complete the booking form with your details. You\'ll receive an instant confirmation by email and SMS.',
      },
      {
        q: 'Can I book same-day appointments?',
        a: 'Yes! Many doctors on Tabiby offer same-day availability. Use the "Available Today" filter on the search page to find doctors who can see you today.',
      },
      {
        q: 'Is there a fee to use Tabiby?',
        a: 'Tabiby is completely free for patients. You only pay the doctor\'s standard consultation fee, which is displayed on their profile before you book.',
      },
      {
        q: 'How can I cancel or reschedule my appointment?',
        a: 'You can cancel or reschedule for free up to 24 hours before your appointment. Check your confirmation email for the cancellation link, or log in to your Tabiby account.',
      },
      {
        q: 'What happens after I book?',
        a: 'You\'ll receive an email and SMS confirmation with your appointment details. The clinic may contact you to confirm. Please arrive 10 minutes early for your first visit.',
      },
    ],
  },
  {
    title: 'Doctors & Profiles',
    items: [
      {
        q: 'How does Tabiby verify doctors?',
        a: 'Every doctor listed on Tabiby goes through a credential verification process. We confirm their Qatar Council for Healthcare Practitioners (QCHP) registration, medical license, and professional qualifications before they appear on the platform.',
      },
      {
        q: 'Can I read reviews before booking?',
        a: 'Yes. Every doctor profile displays verified patient reviews and an overall star rating. Reviews are only collected from confirmed Tabiby patients, so they reflect real experiences.',
      },
      {
        q: 'What does the "Verified" badge mean?',
        a: 'The blue Verified badge means Tabiby has confirmed the doctor\'s medical license, qualifications, and QCHP registration. It\'s your assurance that you\'re seeing a legitimate, licensed healthcare provider.',
      },
      {
        q: 'Are video consultations available?',
        a: 'Many doctors offer video consultations for follow-ups, prescription renewals, and non-urgent consultations. Look for the "Video Visits Available" badge on doctor profiles.',
      },
    ],
  },
  {
    title: 'Insurance & Payments',
    items: [
      {
        q: 'How do I know if a doctor accepts my insurance?',
        a: 'Each doctor profile displays the insurance plans they accept. You can also filter search results by your insurance provider. Tabiby works with QLM, Al Koot, Cigna, Nextcare, MetLife, GIG Gulf, Bupa, and more.',
      },
      {
        q: 'Does Tabiby process payments?',
        a: 'Currently, payments are made directly to the clinic at the time of your appointment. Tabiby does not collect any payment from patients.',
      },
      {
        q: 'What if my insurance isn\'t listed?',
        a: 'Contact the clinic directly to confirm coverage. You can find clinic contact information on the doctor\'s profile page. We\'re continuously expanding our insurance partner network.',
      },
    ],
  },
  {
    title: 'Account & Privacy',
    items: [
      {
        q: 'How do I create a Tabiby account?',
        a: 'Click "Sign Up" in the top navigation bar. You can register as a patient with your name, email, and phone number. Registration is free and takes less than a minute.',
      },
      {
        q: 'Is my personal health information safe?',
        a: 'Absolutely. Tabiby complies with Qatar\'s data protection regulations. Your personal health information is encrypted, never sold to third parties, and only shared with the healthcare providers you choose to book. See our Privacy Policy for full details.',
      },
      {
        q: 'Can I book for a family member?',
        a: 'Yes. During the booking process, you can enter a different name for the patient. You\'ll still receive confirmation to your contact details.',
      },
    ],
  },
  {
    title: 'For Doctors & Clinics',
    items: [
      {
        q: 'How do I list my practice on Tabiby?',
        a: 'Visit our For Providers page and create an account. You\'ll need to provide your QCHP registration number, specialty, clinic details, and availability. Our team will verify your credentials and have you live within 48 hours.',
      },
      {
        q: 'Is it free to list on Tabiby?',
        a: 'Yes, we offer a free Basic plan for individual practitioners. We also offer Professional and Clinic plans with advanced features. See our pricing on the For Providers page.',
      },
      {
        q: 'How do I update my availability?',
        a: 'Log in to your provider dashboard and navigate to the Schedule section. You can set recurring weekly availability, block out dates, and manage your appointment types.',
      },
    ],
  },
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/40 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-secondary/30 transition-colors"
      >
        <span className="font-semibold text-foreground text-sm leading-relaxed">{item.q}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-foreground/70 text-sm leading-relaxed border-t border-border/30 pt-4">
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = FAQ_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        !searchQuery ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((s) => s.items.length > 0);

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Stethoscope className="w-4 h-4" /> Help Center
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-primary-foreground/80 mb-8">Find answers to common questions about Tabiby</p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 rounded-2xl border-0 bg-white text-slate-900 pl-12 pr-5 text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-slate-400"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {filteredSections.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No results found for "{searchQuery}"</p>
                <button onClick={() => setSearchQuery('')} className="mt-3 text-primary hover:underline font-medium">
                  Clear search
                </button>
              </div>
            )}
            {filteredSections.map((section) => (
              <div key={section.title} className="mb-10">
                <h2 className="font-bold text-xl text-foreground mb-4">{section.title}</h2>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <FAQAccordion key={item.q} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-secondary/30 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">Still need help?</h2>
            <p className="text-foreground/70">Our support team is here for you</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: Mail,
                title: 'Email Support',
                desc: 'support@tabiby.co',
                sub: 'Response within 24 hours',
              },
              {
                icon: Phone,
                title: 'Phone Support',
                desc: '+974 4000 8888',
                sub: 'Sun–Thu, 8am–6pm AST',
              },
              {
                icon: MessageCircle,
                title: 'Live Chat',
                desc: 'Chat with us now',
                sub: 'Available during business hours',
              },
            ].map((c) => (
              <div key={c.title} className="bg-card rounded-2xl p-6 border border-border/40 shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <c.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-1">{c.title}</h3>
                <p className="text-primary font-semibold text-sm mb-1">{c.desc}</p>
                <p className="text-muted-foreground text-xs">{c.sub}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">
              Are you a healthcare provider?{' '}
              <Link to="/for-providers" className="text-primary hover:underline font-medium">
                Visit our Provider Help Center
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
