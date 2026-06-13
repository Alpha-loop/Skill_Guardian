'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#005EB8] flex items-center justify-center">
                <span className="font-black text-white text-sm tracking-tight" style={{ letterSpacing: '-0.03em' }}>SG</span>
              </div>
              <span className="text-xl font-bold text-slate-900">SkillGuardian</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#005EB8] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-[#005EB8] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-blue-200 mb-2 uppercase tracking-wider">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-blue-200 text-sm">
            Last updated: 29 May 2026 &nbsp;·&nbsp; UK GDPR &amp; Data Protection Act 2018 compliant
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">

          <Intro />

          <Section id="1" title="1. Who We Are">
            <p>
              SkillGuardian ("we", "us", "our") is the data controller for personal data collected
              through the Platform. We are registered in England and Wales.
            </p>
            <p>
              Our data protection contact is:{' '}
              <a href="mailto:support@skillguardian.co.uk" className="text-[#005EB8]">
                support@skillguardian.co.uk
              </a>
            </p>
          </Section>

          <Section id="2" title="2. What Personal Data We Collect">
            <p>We collect personal data in the following categories:</p>
            <table className="w-full text-sm border border-slate-100 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-2 text-slate-700 font-semibold">Category</th>
                  <th className="text-left px-4 py-2 text-slate-700 font-semibold">Examples</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Identity data', 'Full name, job title, role'],
                  ['Contact data', 'Email address, organisation name'],
                  ['Account data', 'Username, hashed password, account settings'],
                  ['Training data', 'Course completions, quiz scores, competency records, certificates'],
                  ['Usage data', 'Pages visited, features used, login timestamps, IP address'],
                  ['Communication data', 'Messages sent to us via contact forms or email'],
                  ['Technical data', 'Browser type, operating system, device identifiers'],
                ].map(([cat, ex]) => (
                  <tr key={cat} className="border-t border-slate-100">
                    <td className="px-4 py-2 font-medium text-slate-800">{cat}</td>
                    <td className="px-4 py-2 text-slate-600">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3">
              We do not knowingly collect special category data (health, biometric, etc.) unless
              explicitly provided by you or your organisation in the context of training records, in
              which case it is processed under Article 9(2)(b) UK GDPR (employment / social security
              obligations) or your explicit consent.
            </p>
          </Section>

          <Section id="3" title="3. How We Collect Personal Data">
            <ul>
              <li>
                <strong>Directly from you:</strong> when you register, complete courses, submit contact
                forms, or communicate with us.
              </li>
              <li>
                <strong>From your employer / organisation:</strong> when an organisation administrator
                creates or manages your account.
              </li>
              <li>
                <strong>Automatically:</strong> through cookies and similar tracking technologies when
                you use the Platform (see Section 11).
              </li>
            </ul>
          </Section>

          <Section id="4" title="4. Lawful Bases for Processing">
            <p>
              Under the UK GDPR, we rely on the following lawful bases to process your personal data:
            </p>
            <table className="w-full text-sm border border-slate-100 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-2 text-slate-700 font-semibold">Purpose</th>
                  <th className="text-left px-4 py-2 text-slate-700 font-semibold">Lawful basis</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Providing the Platform and account management', 'Contract (Art. 6(1)(b))'],
                  ['Processing subscription payments', 'Contract (Art. 6(1)(b))'],
                  ['Sending service and compliance notifications', 'Legitimate interests (Art. 6(1)(f))'],
                  ['Marketing communications (opt-in only)', 'Consent (Art. 6(1)(a))'],
                  ['Legal compliance and regulatory obligations', 'Legal obligation (Art. 6(1)(c))'],
                  ['Security monitoring and fraud prevention', 'Legitimate interests (Art. 6(1)(f))'],
                  ['Analytics and platform improvement', 'Legitimate interests (Art. 6(1)(f))'],
                ].map(([purpose, basis]) => (
                  <tr key={purpose} className="border-t border-slate-100">
                    <td className="px-4 py-2 text-slate-600">{purpose}</td>
                    <td className="px-4 py-2 text-slate-600">{basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section id="5" title="5. How We Use Your Personal Data">
            <ul>
              <li>To create and manage your user account and organisation profile.</li>
              <li>
                To deliver training content, track course progress, record assessment results, and
                issue completion certificates.
              </li>
              <li>
                To send you notifications about expiring training, platform updates, and service
                messages.
              </li>
              <li>
                To generate compliance reports and analytics for organisation administrators.
              </li>
              <li>To respond to enquiries submitted via our contact form or email.</li>
              <li>To process subscription payments and manage billing.</li>
              <li>To detect, investigate, and prevent fraud or security incidents.</li>
              <li>
                To fulfil our legal obligations, including retaining records as required under
                applicable UK legislation.
              </li>
              <li>
                With your consent, to send marketing communications about new features, courses,
                and offers. You may withdraw consent at any time.
              </li>
            </ul>
          </Section>

          <Section id="6" title="6. Data Sharing and Disclosure">
            <p>
              We do not sell, rent, or trade your personal data. We may share it with:
            </p>
            <ul>
              <li>
                <strong>Your organisation's administrators:</strong> who may view your training
                records, competency status, and certificates within the Platform.
              </li>
              <li>
                <strong>Service providers:</strong> who process data on our behalf under Data
                Processing Agreements (e.g. cloud hosting, payment processing, email delivery).
                These providers are contractually required to protect your data and may not use it
                for their own purposes.
              </li>
              <li>
                <strong>Law enforcement or regulators:</strong> where required by law, court order,
                or to protect the rights and safety of individuals.
              </li>
              <li>
                <strong>Business transfers:</strong> in connection with a merger, acquisition, or
                sale of assets, with appropriate safeguards.
              </li>
            </ul>
          </Section>

          <Section id="7" title="7. International Transfers">
            <p>
              We aim to keep personal data within the UK and the European Economic Area (EEA).
              Where any transfer outside these areas is necessary, we ensure appropriate safeguards
              are in place, such as the UK International Data Transfer Agreement (IDTA) or equivalent
              adequacy decisions, in accordance with Chapter V of the UK GDPR.
            </p>
          </Section>

          <Section id="8" title="8. Data Retention">
            <p>
              We retain personal data only for as long as necessary to fulfil the purposes for which
              it was collected, including for the purposes of satisfying any legal, regulatory,
              accounting, or reporting requirements.
            </p>
            <ul>
              <li>
                <strong>Active account data:</strong> retained for the duration of your subscription
                plus 6 years (limitation period for contract claims under the Limitation Act 1980).
              </li>
              <li>
                <strong>Training and certificate records:</strong> retained for a minimum of 7 years
                from the date of completion to support regulatory audit requirements.
              </li>
              <li>
                <strong>Contact form submissions:</strong> retained for 2 years.
              </li>
              <li>
                <strong>Usage/technical logs:</strong> retained for up to 12 months.
              </li>
            </ul>
            <p>
              When data is no longer required it is securely deleted or anonymised in accordance
              with our Data Retention Policy.
            </p>
          </Section>

          <Section id="9" title="9. Your Rights Under UK GDPR">
            <p>
              You have the following rights in relation to your personal data. To exercise any of
              them, contact us at{' '}
              <a href="mailto:support@skillguardian.co.uk" className="text-[#005EB8]">
                support@skillguardian.co.uk
              </a>. We will respond within one calendar month.
            </p>
            <table className="w-full text-sm border border-slate-100 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-2 text-slate-700 font-semibold">Right</th>
                  <th className="text-left px-4 py-2 text-slate-700 font-semibold">What it means</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Access', 'Request a copy of the personal data we hold about you (Subject Access Request).'],
                  ['Rectification', 'Ask us to correct inaccurate or incomplete data.'],
                  ['Erasure', 'Ask us to delete your data where there is no compelling reason to continue processing.'],
                  ['Restriction', 'Ask us to restrict processing while a complaint or accuracy issue is resolved.'],
                  ['Portability', 'Receive your data in a structured, machine-readable format where processing is automated and based on consent or contract.'],
                  ['Object', 'Object to processing based on legitimate interests, including profiling.'],
                  ['Withdraw consent', 'Withdraw any consent given at any time, without affecting prior lawful processing.'],
                  ['Automated decisions', 'Not be subject to solely automated decisions that produce significant effects on you.'],
                ].map(([right, desc]) => (
                  <tr key={right} className="border-t border-slate-100">
                    <td className="px-4 py-2 font-medium text-slate-800 align-top">{right}</td>
                    <td className="px-4 py-2 text-slate-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3">
              You also have the right to lodge a complaint with the Information Commissioner's Office
              (ICO) at{' '}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#005EB8]">
                ico.org.uk
              </a>{' '}
              or by calling 0303 123 1113, although we encourage you to contact us first so we can
              address your concern directly.
            </p>
          </Section>

          <Section id="10" title="10. Data Security">
            <p>
              We implement appropriate technical and organisational measures to protect your personal
              data against unauthorised access, loss, destruction, or disclosure. These include:
            </p>
            <ul>
              <li>Encryption of data in transit (TLS) and at rest.</li>
              <li>Role-based access controls and audit logging.</li>
              <li>Regular security assessments and penetration testing.</li>
              <li>Staff training on data protection and information security.</li>
              <li>Incident response procedures in accordance with ICO guidance.</li>
            </ul>
            <p>
              In the event of a personal data breach that is likely to result in a risk to your
              rights and freedoms, we will notify the ICO within 72 hours and, where required, inform
              you without undue delay.
            </p>
          </Section>

          <Section id="11" title="11. Cookies and Tracking Technologies">
            <p>
              We use cookies and similar technologies to operate the Platform and improve your
              experience. Cookies are small text files stored on your device.
            </p>
            <table className="w-full text-sm border border-slate-100 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-2 text-slate-700 font-semibold">Type</th>
                  <th className="text-left px-4 py-2 text-slate-700 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Strictly necessary', 'Authentication, session management, security. Cannot be disabled.'],
                  ['Functional', 'Remember your preferences and settings.'],
                  ['Analytics', 'Understand how the Platform is used so we can improve it. Anonymised where possible.'],
                ].map(([type, purpose]) => (
                  <tr key={type} className="border-t border-slate-100">
                    <td className="px-4 py-2 font-medium text-slate-800">{type}</td>
                    <td className="px-4 py-2 text-slate-600">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3">
              You can control non-essential cookies through your browser settings. Blocking cookies
              may affect Platform functionality.
            </p>
          </Section>

          <Section id="12" title="12. Children's Privacy">
            <p>
              The Platform is not directed at children under 18 years of age. We do not knowingly
              collect personal data from children. If you believe we have inadvertently collected
              such data, please contact us immediately.
            </p>
          </Section>

          <Section id="13" title="13. Links to Other Websites">
            <p>
              The Platform may contain links to third-party websites. This Privacy Policy does not
              apply to those sites. We encourage you to review the privacy policies of any third-party
              sites you visit.
            </p>
          </Section>

          <Section id="14" title="14. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices,
              technology, or legal requirements. When we make material changes we will notify you by
              email or by a prominent notice on the Platform at least 14 days before the changes take
              effect. The "last updated" date at the top of this page will always reflect the most
              recent version.
            </p>
          </Section>

          <Section id="15" title="15. Contact Us">
            <p>
              For any questions, concerns, or to exercise your data protection rights, please contact:
            </p>
            <address className="not-italic bg-slate-50 rounded-xl p-5 border border-slate-100 text-sm leading-relaxed">
              <strong className="text-slate-900">Data Protection Contact — SkillGuardian</strong><br />
              Email:{' '}
              <a href="mailto:support@skillguardian.co.uk" className="text-[#005EB8]">
                support@skillguardian.co.uk
              </a><br />
              United Kingdom<br /><br />
              <strong className="text-slate-900">Information Commissioner's Office (ICO)</strong><br />
              Website:{' '}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#005EB8]">
                ico.org.uk
              </a><br />
              Helpline: 0303 123 1113
            </address>
          </Section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <div className="max-w-3xl mx-auto px-4">
          <p className="mb-2">© 2026 SkillGuardian. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-xs">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Intro() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8 text-sm text-slate-700 leading-relaxed">
      SkillGuardian is committed to protecting your privacy and handling your personal data
      transparently and responsibly. This Privacy Policy explains what data we collect, why we
      collect it, how we use it, and your rights under the UK General Data Protection Regulation
      (UK GDPR) and the Data Protection Act 2018.
    </div>
  );
}

function Section({
  id, title, children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={`section-${id}`} className="mb-10">
      <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
        {title}
      </h2>
      <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
