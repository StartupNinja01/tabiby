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

export default function TermsPage() {
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
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Terms of Service</h1>
          <p className="text-slate-500">Last updated: {LAST_UPDATED}</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-sm">
            <strong>Important:</strong> Please read these Terms of Service carefully before using Tabiby. By accessing or using our platform, you agree to be bound by these terms.
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12">

          <Section title="1. Acceptance of Terms">
            <p>Welcome to Tabiby ("Tabiby," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of the Tabiby website located at tabiby.co, mobile applications, and related services (collectively, the "Service") operated by Tabiby Health LLC, a company registered in Qatar.</p>
            <p>By creating an account, accessing, or using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.</p>
            <p>These Terms constitute a legally binding agreement between you and Tabiby. If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.</p>
          </Section>

          <Section title="2. Description of the Service">
            <p>Tabiby is an online healthcare marketplace that connects patients with licensed healthcare providers in Qatar. Tabiby provides a technology platform that enables patients to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Search for and discover licensed healthcare providers</li>
              <li>View doctor profiles, credentials, ratings, and reviews</li>
              <li>Book, modify, and cancel appointments</li>
              <li>Check insurance coverage and accepted plans</li>
              <li>Access telehealth and video consultation services where available</li>
            </ul>
            <p className="mt-3"><strong>Important:</strong> Tabiby is not a healthcare provider, medical practice, or insurance company. We do not provide medical advice, diagnosis, or treatment. The healthcare providers accessible through our platform are independent practitioners who are solely responsible for the medical services they deliver.</p>
          </Section>

          <Section title="3. Eligibility and User Accounts">
            <p>To use the Service, you must be at least 18 years of age. If you are under 18, a parent or legal guardian must create an account and book appointments on your behalf.</p>
            <p>When you create an account, you agree to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security and confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
            <p className="mt-3">Tabiby reserves the right to suspend or terminate accounts that contain inaccurate, fraudulent, or incomplete information.</p>
          </Section>

          <Section title="4. Booking and Appointment Policy">
            <p>When you book an appointment through Tabiby, you are entering into a direct relationship with the healthcare provider. Tabiby facilitates the booking but is not a party to the provider-patient relationship.</p>
            <p><strong>Cancellations:</strong> You may cancel appointments at no charge up to 24 hours prior to the scheduled appointment time. Cancellations made less than 24 hours in advance may be subject to a cancellation fee at the provider's discretion.</p>
            <p><strong>No-shows:</strong> Repeated no-shows without notice may result in restrictions on your ability to book future appointments through Tabiby.</p>
            <p><strong>Provider Cancellations:</strong> Healthcare providers may occasionally need to cancel or reschedule appointments. Tabiby will notify you promptly and assist in rebooking.</p>
            <p><strong>Fees:</strong> Consultation fees are determined by individual healthcare providers and paid directly to them. Tabiby does not collect payments from patients for consultations.</p>
          </Section>

          <Section title="5. Healthcare Disclaimer">
            <p>THE SERVICE IS NOT INTENDED TO BE A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT. ALWAYS SEEK THE ADVICE OF YOUR PHYSICIAN OR OTHER QUALIFIED HEALTH PROVIDER WITH ANY QUESTIONS YOU MAY HAVE REGARDING A MEDICAL CONDITION.</p>
            <p>In a medical emergency, call 999 (Qatar Emergency Services) immediately or go to the nearest emergency department.</p>
            <p>Tabiby makes no warranty regarding the quality, accuracy, or fitness for purpose of any healthcare services provided by practitioners listed on the platform. Healthcare providers listed on Tabiby are independent professionals licensed by the Qatar Council for Healthcare Practitioners (QCHP).</p>
          </Section>

          <Section title="6. Provider Verification">
            <p>Tabiby conducts verification of healthcare providers' credentials, including QCHP registration status. However, such verification is provided as a convenience and Tabiby does not guarantee the ongoing accuracy, completeness, or currency of any provider credentials. You are encouraged to independently verify any provider's credentials through the QCHP public registry.</p>
          </Section>

          <Section title="7. User Reviews and Content">
            <p>Tabiby allows patients to submit reviews and ratings for healthcare providers. By submitting a review, you represent that:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>You had a genuine appointment with the provider through Tabiby</li>
              <li>Your review reflects your honest, personal experience</li>
              <li>Your review does not contain false, defamatory, or misleading information</li>
              <li>Your review does not violate any third party's rights or any applicable law</li>
            </ul>
            <p className="mt-3">Tabiby reserves the right to remove reviews that violate these guidelines or that we determine, in our sole discretion, to be inappropriate.</p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>The Service and its content, features, and functionality (including but not limited to all information, software, text, displays, images, and the design, selection, and arrangement thereof) are owned by Tabiby, its licensors, or other providers of such material and are protected by Qatar and international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
            <p>You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service for personal, non-commercial purposes in accordance with these Terms.</p>
          </Section>

          <Section title="9. Privacy">
            <p>Your privacy is important to us. Please review our <Link to="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>, which describes how we collect, use, and share information about you when you use our Service. By using our Service, you consent to the collection and use of your information as described in our Privacy Policy.</p>
            <p>Tabiby complies with Qatar's Personal Data Privacy Protection Law (Law No. 13 of 2016) and applicable health data regulations.</p>
          </Section>

          <Section title="10. Prohibited Conduct">
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Use the Service for any unlawful purpose or in violation of any applicable laws or regulations</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with a person or entity</li>
              <li>Book appointments with no intention of attending (appointment fraud)</li>
              <li>Harass, abuse, or harm healthcare providers or Tabiby staff</li>
              <li>Attempt to gain unauthorized access to any portion of the Service</li>
              <li>Engage in data mining, scraping, or other unauthorized data collection</li>
              <li>Transmit any malware, viruses, or other malicious code</li>
              <li>Use the Service to send unsolicited communications</li>
            </ul>
          </Section>

          <Section title="11. Limitation of Liability">
            <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, TABIBY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Your access to or use of (or inability to access or use) the Service</li>
              <li>Any conduct or content of any healthcare provider or third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            <p className="mt-3">TABIBY'S TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO TABIBY (IF ANY) IN THE 12 MONTHS PRECEDING THE CLAIM.</p>
          </Section>

          <Section title="12. Governing Law and Dispute Resolution">
            <p>These Terms shall be governed by and construed in accordance with the laws of Qatar. Any dispute arising out of or in connection with these Terms shall be submitted to the exclusive jurisdiction of the competent courts in Doha, Qatar.</p>
            <p>We encourage you to contact us first to resolve any disputes informally before pursuing formal legal proceedings.</p>
          </Section>

          <Section title="13. Changes to These Terms">
            <p>We may revise these Terms from time to time. When we make material changes, we will notify you by updating the date at the top of these Terms and, where appropriate, notifying you by email. Your continued use of the Service after any change constitutes your acceptance of the new Terms.</p>
          </Section>

          <Section title="14. Contact Us">
            <p>If you have questions about these Terms, please contact us:</p>
            <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-semibold text-slate-900">Tabiby Health LLC</p>
              <p>West Bay, Doha, Qatar</p>
              <p>Email: legal@tabiby.co</p>
              <p>Phone: +974 4000 8888</p>
            </div>
          </Section>
        </div>

        <div className="mt-8 flex gap-4 text-sm text-slate-500">
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link to="/security" className="hover:text-primary transition-colors">Security</Link>
          <span>·</span>
          <Link to="/help" className="hover:text-primary transition-colors">Help Center</Link>
        </div>
      </div>
    </div>
  );
}
