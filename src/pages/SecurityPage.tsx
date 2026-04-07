import { Link } from 'react-router-dom';
import { Stethoscope, ArrowLeft, Shield, Lock, Eye, Server, AlertTriangle, CheckCircle } from 'lucide-react';

const LAST_UPDATED = 'April 7, 2026';

const SECURITY_FEATURES = [
  {
    icon: Lock,
    title: 'Encryption in Transit',
    desc: 'All data between your browser and our servers is encrypted using TLS 1.3 — the latest and most secure transport layer protocol. We use HSTS to enforce HTTPS-only connections.',
  },
  {
    icon: Server,
    title: 'Encryption at Rest',
    desc: 'All stored personal and health data is encrypted using AES-256 encryption, the gold standard in data-at-rest protection.',
  },
  {
    icon: Shield,
    title: 'Access Controls',
    desc: 'We operate on a strict need-to-know basis. Only authorized Tabiby personnel with a legitimate business reason can access personal data, and all access is logged and audited.',
  },
  {
    icon: Eye,
    title: 'Security Monitoring',
    desc: 'We continuously monitor our infrastructure for anomalous behavior, unauthorized access attempts, and potential security threats using automated detection systems.',
  },
  {
    icon: AlertTriangle,
    title: 'Vulnerability Management',
    desc: 'We conduct regular penetration testing and vulnerability assessments. Our security team reviews and patches vulnerabilities according to severity and risk.',
  },
  {
    icon: CheckCircle,
    title: 'Incident Response',
    desc: 'We maintain a documented incident response plan. In the event of a data breach, we will notify affected users and regulatory authorities within the timeframes required by Qatar law.',
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">{title}</h2>
      <div className="space-y-3 text-slate-600 leading-relaxed">{children}</div>
    </section>
  );
}

export default function SecurityPage() {
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
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-teal-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Security</h1>
          </div>
          <p className="text-slate-500">Last updated: {LAST_UPDATED}</p>
          <p className="text-slate-600 mt-3 text-lg leading-relaxed">
            At Tabiby, the security of your personal and health information is our highest priority. This page describes how we protect your data and what you can do to keep your account secure.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {SECURITY_FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1.5">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12">

          <Section title="Our Security Commitments">
            <p>Tabiby is committed to maintaining the security and integrity of your personal information. We understand that health data is among the most sensitive personal information, and we treat it accordingly.</p>
            <p>Our security program is built on internationally recognized security frameworks and is designed to meet the requirements of Qatar's Personal Data Privacy Protection Law (Law No. 13 of 2016) and applicable health data regulations.</p>
          </Section>

          <Section title="Infrastructure Security">
            <p>Tabiby's infrastructure is hosted on industry-leading cloud providers with ISO 27001 certification and SOC 2 Type II compliance. Our infrastructure security measures include:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Servers located in secure, access-controlled data centers</li>
              <li>Network segmentation and firewalling to isolate sensitive systems</li>
              <li>Regular automated patching of operating systems and dependencies</li>
              <li>Web Application Firewall (WAF) to protect against common web attacks</li>
              <li>DDoS protection to maintain availability</li>
              <li>Automated backups with encryption and tested restoration procedures</li>
            </ul>
          </Section>

          <Section title="Application Security">
            <p>Our application is developed with security built in from the start ("security by design"). Key practices include:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Secure development lifecycle (SDL) with security reviews at each stage</li>
              <li>Regular third-party penetration testing and code security reviews</li>
              <li>Protection against OWASP Top 10 vulnerabilities (injection, XSS, CSRF, etc.)</li>
              <li>Multi-factor authentication (MFA) available for all user accounts</li>
              <li>Session management with automatic timeouts and secure token handling</li>
              <li>Input validation and output encoding throughout the application</li>
              <li>Secure password storage using bcrypt hashing with salts</li>
            </ul>
          </Section>

          <Section title="Data Security">
            <p>We apply layered protections to your personal and health data:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>In transit:</strong> TLS 1.3 encryption for all data moving between your device and our servers</li>
              <li><strong>At rest:</strong> AES-256 encryption for all stored personal and health data</li>
              <li><strong>Database:</strong> Encrypted database fields for sensitive attributes; database access restricted to application services only</li>
              <li><strong>Backups:</strong> Encrypted backups with strict retention policies</li>
              <li><strong>Deletion:</strong> Secure data deletion in accordance with our retention policy and user requests</li>
            </ul>
          </Section>

          <Section title="Employee Security">
            <p>Our team members go through rigorous security training and are bound by confidentiality agreements. Data access controls ensure that employees can only access the data necessary for their role. We conduct background checks for employees who handle sensitive health data.</p>
          </Section>

          <Section title="Third-Party Security">
            <p>We carefully vet all third-party service providers who may process personal data on our behalf. All such providers are required to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Sign Data Processing Agreements with security requirements</li>
              <li>Maintain adequate technical and organizational security measures</li>
              <li>Notify us of any security incidents affecting our data promptly</li>
              <li>Undergo periodic security assessments</li>
            </ul>
          </Section>

          <Section title="Protecting Your Account">
            <p>You play an important role in keeping your account secure. We recommend:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Use a strong, unique password</strong> — at least 12 characters, mixing letters, numbers, and symbols</li>
              <li><strong>Enable multi-factor authentication (MFA)</strong> from your account settings</li>
              <li><strong>Never share your password</strong> with anyone, including Tabiby staff (we will never ask for your password)</li>
              <li><strong>Log out of shared devices</strong> after using Tabiby</li>
              <li><strong>Be cautious of phishing</strong> — verify that emails from Tabiby come from @tabiby.co domains</li>
              <li><strong>Report suspicious activity</strong> immediately to security@tabiby.co</li>
            </ul>
          </Section>

          <Section title="Security Incident Response">
            <p>Despite our best efforts, no system can guarantee perfect security. In the event of a security incident:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>We will investigate promptly and contain the incident</li>
              <li>We will notify affected users within 72 hours of confirming a data breach</li>
              <li>We will report to Qatar's regulatory authorities as required by law</li>
              <li>We will provide guidance on protective steps you should take</li>
              <li>We will conduct a post-incident review to prevent recurrence</li>
            </ul>
          </Section>

          <Section title="Responsible Disclosure">
            <p>We welcome responsible disclosure of security vulnerabilities. If you discover a security issue in Tabiby, please report it to us at <strong>security@tabiby.co</strong> before publicly disclosing it.</p>
            <p>Please include a description of the vulnerability, steps to reproduce, and your contact information. We will:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Acknowledge receipt within 48 hours</li>
              <li>Investigate and keep you informed of our progress</li>
              <li>Notify you when the issue is resolved</li>
              <li>Recognize your contribution (with your permission) once fixed</li>
            </ul>
            <p className="mt-3">We ask that you do not access, modify, or delete data that doesn't belong to you, and do not perform testing that could degrade the service for others.</p>
          </Section>

          <Section title="Contact Our Security Team">
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl">
              <p className="font-semibold text-teal-900 mb-2">Security Contact</p>
              <p className="text-teal-800">Email: <strong>security@tabiby.co</strong></p>
              <p className="text-teal-700 text-sm mt-1">For responsible disclosure and urgent security issues only. For general support, use <Link to="/help" className="underline">our Help Center</Link>.</p>
            </div>
          </Section>
        </div>

        <div className="mt-8 flex gap-4 text-sm text-slate-500">
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <span>·</span>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link to="/help" className="hover:text-primary transition-colors">Help Center</Link>
        </div>
      </div>
    </div>
  );
}
