import { Link } from 'react-router-dom';
import { Stethoscope, ArrowLeft } from 'lucide-react';

const LAST_UPDATED = 'April 7, 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">{title}</h2>
      <div className="space-y-3 text-slate-600 leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold text-primary tracking-tight">Tabiby</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: {LAST_UPDATED}</p>
          <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-xl text-teal-800 text-sm">
            Your privacy matters to Tabiby. This policy explains what information we collect, how we use it, and the choices you have. We comply with Qatar's Personal Data Privacy Protection Law (Law No. 13 of 2016).
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12">

          <Section title="1. Who We Are">
            <p>Tabiby Health LLC ("Tabiby," "we," "us," or "our") operates the Tabiby platform, a healthcare marketplace connecting patients with licensed healthcare providers in Qatar. We are registered in Qatar and our registered address is in West Bay, Doha, Qatar.</p>
            <p>Tabiby is the data controller for personal information collected through our website and application. For privacy inquiries, contact our Data Protection Officer at: <strong>privacy@tabiby.co</strong></p>
          </Section>

          <Section title="2. Information We Collect">
            <p><strong>Information You Provide Directly:</strong></p>
            <ul className="list-disc pl-6 space-y-1.5 mb-4">
              <li><strong>Account information:</strong> Name, email address, phone number, date of birth, and password when you create an account</li>
              <li><strong>Appointment information:</strong> The specialty, doctor, date, time, and reason for your appointment bookings</li>
              <li><strong>Health information:</strong> Any notes or health-related information you choose to share in your booking (e.g., reason for visit, symptoms)</li>
              <li><strong>Insurance information:</strong> Insurance provider details you provide to find in-network doctors</li>
              <li><strong>Communications:</strong> Messages you send to us via support channels</li>
              <li><strong>Reviews:</strong> Ratings and written reviews you submit about healthcare providers</li>
            </ul>

            <p><strong>Information Collected Automatically:</strong></p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Usage data:</strong> Pages visited, features used, search queries, and time spent on the platform</li>
              <li><strong>Device information:</strong> Device type, operating system, browser type, and IP address</li>
              <li><strong>Location data:</strong> General location (city/region) based on IP address to show relevant nearby doctors</li>
              <li><strong>Cookies and similar technologies:</strong> As described in our Cookie Policy below</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Provide the Service:</strong> Process bookings, send confirmations and reminders, and facilitate communication between patients and providers</li>
              <li><strong>Account management:</strong> Create and manage your account, verify your identity, and provide customer support</li>
              <li><strong>Improve the platform:</strong> Analyze usage patterns to improve our features, search algorithms, and user experience</li>
              <li><strong>Communications:</strong> Send service-related notifications, appointment reminders, and (with your consent) marketing communications</li>
              <li><strong>Safety and security:</strong> Detect and prevent fraud, abuse, and unauthorized access</li>
              <li><strong>Legal compliance:</strong> Meet our obligations under Qatar law, including health data regulations</li>
            </ul>
            <p className="mt-3">We process your personal data on the legal bases of: (a) contract performance (to provide the Service you've requested), (b) legitimate interests (to operate and improve our platform), (c) legal obligation (to comply with applicable law), and (d) consent (for marketing communications).</p>
          </Section>

          <Section title="4. How We Share Your Information">
            <p>We do not sell your personal information. We share information only as described below:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Healthcare providers:</strong> When you book an appointment, we share your booking details and any notes you provide with the relevant healthcare provider to facilitate your care</li>
              <li><strong>Service providers:</strong> We use trusted third-party vendors (e.g., cloud hosting, email delivery, analytics) who process data only on our behalf and under strict data processing agreements</li>
              <li><strong>Legal requirements:</strong> We may disclose information when required by Qatar law, court order, or to protect the rights, property, or safety of Tabiby, our users, or the public</li>
              <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction, with prior notice to you</li>
            </ul>
          </Section>

          <Section title="5. Health Information">
            <p>We recognize that health information is particularly sensitive. Any health-related information you share through our platform (including appointment reasons, symptoms, or notes) is:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Encrypted in transit and at rest using industry-standard encryption</li>
              <li>Shared only with the healthcare provider(s) you choose to book</li>
              <li>Never sold or used for advertising purposes</li>
              <li>Retained only as long as necessary to provide the Service or as required by Qatar health regulations</li>
            </ul>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain your personal information for as long as your account is active or as needed to provide you services. When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain certain information for legal, regulatory, or legitimate business purposes.</p>
            <p>Appointment records may be retained for up to 7 years in accordance with Qatar healthcare regulations.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Under Qatar's Personal Data Privacy Protection Law, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete personal information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements</li>
              <li><strong>Objection:</strong> Object to certain processing of your personal information</li>
              <li><strong>Portability:</strong> Request your personal information in a structured, machine-readable format</li>
              <li><strong>Withdraw consent:</strong> Where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us at privacy@tabiby.co. We will respond within 30 days.</p>
          </Section>

          <Section title="8. Cookies">
            <p>We use cookies and similar technologies to operate and improve our Service. Cookies we use include:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Essential cookies:</strong> Required for the Service to function (e.g., session authentication). Cannot be disabled.</li>
              <li><strong>Functional cookies:</strong> Remember your preferences (e.g., language setting). Can be disabled but may affect functionality.</li>
              <li><strong>Analytics cookies:</strong> Help us understand how users interact with the platform (e.g., Google Analytics). Can be disabled.</li>
            </ul>
            <p className="mt-3">You can manage cookie preferences through your browser settings or our cookie banner.</p>
          </Section>

          <Section title="9. Data Security">
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>TLS/SSL encryption for all data in transit</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Multi-factor authentication for provider accounts</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls limiting employee access to personal data</li>
              <li>Comprehensive incident response procedures</li>
            </ul>
            <p className="mt-3">For details, see our <Link to="/security" className="text-primary hover:underline font-medium">Security page</Link>.</p>
          </Section>

          <Section title="10. International Data Transfers">
            <p>Your data is primarily stored and processed in Qatar. Where we use service providers outside Qatar, we ensure appropriate safeguards are in place in accordance with Qatar data protection law, including data processing agreements that require equivalent protections.</p>
          </Section>

          <Section title="11. Children's Privacy">
            <p>The Service is not directed to children under 18. We do not knowingly collect personal information from children under 18. If you believe we have inadvertently collected information from a child, please contact us immediately at privacy@tabiby.co.</p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. When we make material changes, we will notify you by updating the date at the top of this policy and, where appropriate, by email. We encourage you to review this policy periodically.</p>
          </Section>

          <Section title="13. Contact Us">
            <p>For privacy questions, requests, or complaints:</p>
            <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-semibold text-slate-900">Data Protection Officer — Tabiby Health LLC</p>
              <p>West Bay, Doha, Qatar</p>
              <p>Email: privacy@tabiby.co</p>
              <p>Phone: +974 4000 8888</p>
            </div>
            <p className="mt-3">You also have the right to lodge a complaint with Qatar's data protection authority, the Ministry of Communications and Information Technology (MCIT).</p>
          </Section>
        </div>

        <div className="mt-8 flex gap-4 text-sm text-slate-500">
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <span>·</span>
          <Link to="/security" className="hover:text-primary transition-colors">Security</Link>
          <span>·</span>
          <Link to="/help" className="hover:text-primary transition-colors">Help Center</Link>
        </div>
      </div>
    </div>
  );
}
