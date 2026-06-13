'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfUsePage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Terms of Use</h1>
          <p className="text-blue-200 text-sm">
            Last updated: 29 May 2026 &nbsp;·&nbsp; Governed by the laws of England and Wales
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">

          <Intro />

          <Section id="1" title="1. About Us">
            <p>
              SkillGuardian is a trading name operated in the United Kingdom. We provide an online
              learning management system ("Platform") designed to support healthcare and social care
              organisations with staff training, competency tracking, and regulatory compliance.
            </p>
            <p>
              Our registered office and principal place of business is in England. You can contact us
              at{' '}
              <a href="mailto:support@skillguardian.co.uk" className="text-[#005EB8]">
                support@skillguardian.co.uk
              </a>.
            </p>
          </Section>

          <Section id="2" title="2. Acceptance of These Terms">
            <p>
              By accessing or using the Platform you confirm that you have read, understood, and agree
              to be bound by these Terms of Use ("Terms") and our{' '}
              <Link href="/privacy" className="text-[#005EB8]">Privacy Policy</Link>. If you are
              using the Platform on behalf of an organisation, you warrant that you have authority to
              bind that organisation to these Terms.
            </p>
            <p>
              If you do not agree to these Terms, you must stop using the Platform immediately.
            </p>
          </Section>

          <Section id="3" title="3. Eligibility">
            <p>
              You must be at least 18 years old and legally permitted to work in the United Kingdom
              (or otherwise authorised by your employer) to use the Platform. The Platform is
              intended solely for professional training purposes within healthcare and social care
              settings.
            </p>
          </Section>

          <Section id="4" title="4. Your Account">
            <ul>
              <li>
                You are responsible for keeping your login credentials confidential and for all
                activity that occurs under your account.
              </li>
              <li>
                You must notify us immediately at{' '}
                <a href="mailto:support@skillguardian.co.uk" className="text-[#005EB8]">
                  support@skillguardian.co.uk
              </a>{' '}
                if you suspect any unauthorised use of your account.
              </li>
              <li>
                You must provide accurate, complete, and up-to-date registration information and
                keep it updated.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that breach these Terms or
                where we have reasonable grounds to believe misuse has occurred.
              </li>
            </ul>
          </Section>

          <Section id="5" title="5. Permitted Use">
            <p>You may use the Platform only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul>
              <li>Use the Platform in any way that violates applicable UK or EU law or regulation.</li>
              <li>
                Attempt to gain unauthorised access to any part of the Platform, its server, or any
                database connected to it.
              </li>
              <li>
                Transmit any unsolicited commercial communications or any material that is harmful,
                offensive, defamatory, or infringes any third-party rights.
              </li>
              <li>
                Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Platform
                without our express written permission.
              </li>
              <li>
                Reverse engineer, decompile, or disassemble any software forming part of the Platform.
              </li>
              <li>
                Impersonate any person or entity or misrepresent your affiliation with any person
                or entity.
              </li>
            </ul>
          </Section>

          <Section id="6" title="6. Subscriptions and Payments">
            <p>
              Access to certain features of the Platform is available only under a paid subscription.
              Subscription fees, billing cycles, and renewal terms are set out on our Pricing page
              and in any Order Form agreed between us and your organisation.
            </p>
            <ul>
              <li>
                All fees are stated in pounds sterling (GBP) and are exclusive of VAT unless
                otherwise stated.
              </li>
              <li>
                Subscriptions auto-renew at the end of each billing period unless cancelled before
                the renewal date.
              </li>
              <li>
                We reserve the right to change our fees on reasonable notice. We will notify you at
                least 30 days before any price change takes effect.
              </li>
              <li>
                Refunds are handled in accordance with our Refund Policy and applicable consumer
                protection legislation.
              </li>
            </ul>
          </Section>

          <Section id="7" title="7. Intellectual Property">
            <p>
              All content on the Platform, including but not limited to course materials, text,
              graphics, logos, icons, images, audio clips, and software, is owned by or licensed to
              SkillGuardian and is protected by copyright, trade mark, and other intellectual
              property laws of England and Wales and international conventions.
            </p>
            <p>
              We grant you a limited, non-exclusive, non-transferable licence to access and use the
              Platform content solely for your internal training purposes. No other rights are granted.
            </p>
          </Section>

          <Section id="8" title="8. User-Generated Content">
            <p>
              Where the Platform allows you to submit content (e.g. quiz responses, competency
              records), you retain ownership of that content. By submitting it, you grant us a
              worldwide, royalty-free licence to store and process it solely for the purpose of
              providing the service to you.
            </p>
            <p>
              You warrant that any content you submit does not infringe the rights of any third party
              and complies with all applicable laws.
            </p>
          </Section>

          <Section id="9" title="9. Data Protection">
            <p>
              We process personal data in accordance with the UK General Data Protection Regulation
              (UK GDPR), the Data Protection Act 2018, and our{' '}
              <Link href="/privacy" className="text-[#005EB8]">Privacy Policy</Link>. Where your
              organisation is the data controller and we process personal data on your behalf, a Data
              Processing Agreement is available on request.
            </p>
          </Section>

          <Section id="10" title="10. Disclaimers">
            <p>
              The Platform and all content are provided "as is" and "as available" without warranty
              of any kind, express or implied, including but not limited to warranties of
              merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              Training content on the Platform is intended to supplement, not replace, formal
              clinical judgement, professional supervision, or regulatory guidance. SkillGuardian
              makes no representation that completion of any course satisfies any specific regulatory,
              professional, or statutory requirement. You remain responsible for ensuring compliance
              with all applicable legislation and professional standards.
            </p>
          </Section>

          <Section id="11" title="11. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, SkillGuardian shall not be liable for any:
            </p>
            <ul>
              <li>indirect, incidental, special, consequential, or punitive damages;</li>
              <li>loss of profits, revenue, data, goodwill, or business opportunity; or</li>
              <li>
                losses arising from your reliance on the accuracy or completeness of any course
                content.
              </li>
            </ul>
            <p>
              Nothing in these Terms excludes or limits liability for death or personal injury caused
              by negligence, fraud, or any other liability that cannot be excluded under English law.
            </p>
            <p>
              Our total aggregate liability to you in connection with the Platform shall not exceed
              the fees paid by you (or your organisation) in the 12 months preceding the event giving
              rise to the claim.
            </p>
          </Section>

          <Section id="12" title="12. Indemnity">
            <p>
              You agree to indemnify, defend, and hold harmless SkillGuardian and its officers,
              directors, employees, and agents from and against any claims, liabilities, damages,
              losses, and expenses (including reasonable legal fees) arising out of or in connection
              with your breach of these Terms or your use of the Platform.
            </p>
          </Section>

          <Section id="13" title="13. Third-Party Services">
            <p>
              The Platform may contain links to, or integrations with, third-party websites and
              services. We are not responsible for the content, privacy practices, or availability of
              those third-party services and do not endorse them.
            </p>
          </Section>

          <Section id="14" title="14. Changes to the Platform and Terms">
            <p>
              We may update or discontinue any part of the Platform at any time. We will endeavour to
              provide reasonable notice of material changes. We may also update these Terms from time
              to time. If we make material changes, we will notify you by email or by a prominent
              notice on the Platform at least 14 days before the changes take effect. Continued use
              of the Platform after the effective date constitutes acceptance of the updated Terms.
            </p>
          </Section>

          <Section id="15" title="15. Termination">
            <p>
              Either party may terminate access to the Platform in accordance with the subscription
              agreement. We may suspend or terminate your access immediately if you breach these
              Terms, if required by law, or to protect the security of the Platform or other users.
            </p>
            <p>
              On termination, your right to use the Platform ceases immediately. Provisions that by
              their nature should survive termination (including intellectual property, disclaimers,
              limitation of liability, and governing law) will continue in full force.
            </p>
          </Section>

          <Section id="16" title="16. Governing Law and Disputes">
            <p>
              These Terms are governed by the laws of England and Wales. Any dispute arising out of
              or in connection with these Terms shall be subject to the exclusive jurisdiction of the
              courts of England and Wales, except that you may bring proceedings in your local courts
              if required by applicable consumer protection legislation.
            </p>
            <p>
              We aim to resolve disputes promptly and informally. Please contact us at{' '}
              <a href="mailto:support@skillguardian.co.uk" className="text-[#005EB8]">
                support@skillguardian.co.uk
              </a>{' '}
              before initiating formal proceedings.
            </p>
          </Section>

          <Section id="17" title="17. Contact Us">
            <p>If you have questions about these Terms, please contact:</p>
            <address className="not-italic bg-slate-50 rounded-xl p-5 border border-slate-100 text-sm leading-relaxed">
              <strong className="text-slate-900">SkillGuardian</strong><br />
              Email:{' '}
              <a href="mailto:support@skillguardian.co.uk" className="text-[#005EB8]">
                support@skillguardian.co.uk
              </a><br />
              United Kingdom
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
      Please read these Terms of Use carefully before using the SkillGuardian platform. These Terms
      constitute a legally binding agreement between you (and the organisation you represent) and
      SkillGuardian. They are governed by the laws of England and Wales and comply with UK consumer
      and business legislation including the Consumer Rights Act 2015, the Electronic Commerce
      (EC Directive) Regulations 2002, and the UK General Data Protection Regulation.
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
