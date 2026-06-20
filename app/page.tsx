'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Award, Users, BookOpen, CheckCircle, Star,
  ArrowRight, Heart, Stethoscope, Building2,
  FileCheck, BarChart3, Clock, Menu, X, QrCode,
  AlertTriangle, Bell, ChevronDown, ChevronUp,
  GraduationCap, UserCheck, Briefcase, Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContactModal } from '@/components/ContactModal';
import Image from 'next/image';

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: BookOpen,
    title: 'Flashcard-Based Learning',
    description: 'Engaging flashcard courses replace outdated video training. Staff learn at their own pace on any device — phone, tablet, or desktop.',
  },
  {
    icon: Award,
    title: 'CQC-Compliant Certificates',
    description: 'Auto-generated PDF certificates with unique IDs for instant verification by CQC inspectors. Approved by your registered manager.',
  },
  {
    icon: Stethoscope,
    title: 'NMC Revalidation Support',
    description: 'Registered nurses download CPD evidence directly. All clinical courses mapped to NMC standards and revalidation requirements.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Compliance Tracking',
    description: 'Live dashboard shows completion rates, overdue training, and expiry alerts across your entire organisation at a glance.',
  },
  {
    icon: Bell,
    title: 'Automatic Expiry Reminders',
    description: 'Smart notifications alert staff and managers at 60, 30, and 7 days before a certificate expires — so no one ever lapses.',
  },
  {
    icon: FileCheck,
    title: 'Audit-Ready Reports',
    description: 'Export compliance reports instantly for CQC inspections. Full audit trail of every course completion, certificate, and action.',
  },
];

const careStandardsGrid = [
  { num: '01', title: 'Understand Your Role',           desc: 'Responsibilities, accountability, and the importance of following agreed ways of working.' },
  { num: '02', title: 'Your Personal Development',      desc: 'Continuous learning, reflective practice, and working towards qualifications.' },
  { num: '03', title: 'Duty of Care',                   desc: 'Balancing duty of care with individuals\' rights and responding to complaints.' },
  { num: '04', title: 'Equality, Diversity & Human Rights', desc: 'Promoting inclusion, avoiding discrimination, and supporting individuals\' rights.' },
  { num: '05', title: 'Work in a Person-Centred Way',   desc: 'Putting the individual at the centre of everything — their wishes, needs, and goals.' },
  { num: '06', title: 'Communication',                  desc: 'Verbal, non-verbal, and written communication; overcoming barriers.' },
  { num: '07', title: 'Privacy & Dignity',              desc: 'Respecting confidentiality, promoting self-respect, and supporting autonomy.' },
  { num: '08', title: 'Fluids & Nutrition',             desc: 'Recognising dehydration and malnutrition risks and supporting healthy eating.' },
  { num: '09', title: 'Mental Health, Dementia & Learning Disability', desc: 'Awareness of conditions and how they affect individuals in care settings.' },
  { num: '10', title: 'Adult Safeguarding',             desc: 'Recognising and reporting abuse, and understanding safeguarding procedures.' },
  { num: '11', title: 'Safeguarding Children',          desc: 'Recognising harm and following correct reporting and referral processes.' },
  { num: '12', title: 'Basic Life Support',             desc: 'Cardiopulmonary resuscitation (CPR) and emergency first-aid procedures.' },
  { num: '13', title: 'Health & Safety',                desc: 'Risk assessments, moving and handling, fire safety, and COSHH.' },
  { num: '14', title: 'Handling Information',           desc: 'GDPR, data protection, confidentiality, and information governance.' },
  { num: '15', title: 'Infection Prevention & Control', desc: 'Hand hygiene, PPE use, and preventing the spread of infection.' },
  { num: '16', title: 'Awareness of Learning Disability & Autism', desc: 'Person-centred support, reasonable adjustments, and Oliver McGowan requirements.' },
];

const allCourses = [
  // Core Mandatory
  { name: 'The Care Certificate (All 16 Standards)', category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Safeguarding Adults Level 1',             category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Safeguarding Children Level 1',           category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Infection Prevention & Control',          category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Basic Life Support (BLS)',                category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Health and Safety',                       category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Moving and Handling',                     category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Fire Safety',                             category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Mental Capacity Act & DoLS',              category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Medication Management (Basic)',           category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Information Governance & GDPR',           category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Equality, Diversity & Human Rights',      category: 'Core Mandatory', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  // Legal
  { name: 'Oliver McGowan Training — Tier 1',        category: 'Legal Requirement', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'Oliver McGowan Training — Tier 2',        category: 'Legal Requirement', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  // Role-Based
  { name: 'Dementia Awareness',                      category: 'Role-Based', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { name: 'Falls Prevention and Management',         category: 'Role-Based', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { name: 'Pressure Area Care',                      category: 'Role-Based', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { name: 'Food Hygiene',                            category: 'Role-Based', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { name: 'Conflict Resolution',                     category: 'Role-Based', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { name: 'Communication and Duty of Candour',       category: 'Role-Based', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  // Clinical
  { name: 'Catheter Care',                           category: 'Clinical / Nurse', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Wound Management',                        category: 'Clinical / Nurse', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Clinical Observations & NEWS2',           category: 'Clinical / Nurse', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Deterioration Recognition & Sepsis',      category: 'Clinical / Nurse', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Advanced Medication Management',          category: 'Clinical / Nurse', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'NMC Code and Revalidation',               category: 'Clinical / Nurse', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Oxygen Therapy',                          category: 'Clinical / Nurse', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Diabetes Management',                     category: 'Clinical / Nurse', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'PEG Feeding',                             category: 'Clinical / Nurse', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Clinical Governance',                     category: 'Clinical / Nurse', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  // Management
  { name: 'Preparing for a CQC Inspection',          category: 'Management', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { name: 'Duty of Candour (Regulation 20)',          category: 'Management', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { name: 'Safeguarding Adults Level 3',             category: 'Management', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { name: 'Supervision and Appraisal',               category: 'Management', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { name: 'Complaints Handling (Regulation 16)',     category: 'Management', color: 'bg-rose-50 text-rose-700 border-rose-200' },
];

const categoryFilters = [
  { label: 'All',                  value: 'All' },
  { label: 'Core Mandatory',       value: 'Core Mandatory' },
  { label: 'Legal Requirement',    value: 'Legal Requirement' },
  { label: 'Role-Based',           value: 'Role-Based' },
  { label: 'Clinical / Nurse',     value: 'Clinical / Nurse' },
  { label: 'Management',          value: 'Management' },
];

const plans = [
  {
    name: 'Basic',
    price: '£49',
    period: '/month',
    description: 'Perfect for small care homes',
    seats: 'Up to 10 staff',
    features: [
      'All 12 core mandatory courses',
      'Care Certificate (All 16 Standards)',
      'CQC-compliant certificates',
      'Compliance dashboard',
      'Automatic expiry reminders',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: false,
    color: '',
  },
  {
    name: 'Standard',
    price: '£99',
    period: '/month',
    description: 'Most popular for growing teams',
    seats: 'Up to 30 staff',
    features: [
      'Everything in Basic',
      'Oliver McGowan Mandatory Training',
      'Role-based course assignment',
      'Advanced analytics & reports',
      'Certificate approval workflow',
      'Priority email support',
    ],
    cta: 'Get Started',
    highlighted: true,
    color: '',
  },
  {
    name: 'Premium',
    price: '£199',
    period: '/month',
    description: 'For large organisations',
    seats: 'Up to 100 staff',
    features: [
      'Everything in Standard',
      'NMC revalidation support',
      '10 clinical nurse courses',
      '15 management & leadership courses',
      'Dedicated account manager',
      'Phone & live chat support',
    ],
    cta: 'Get Started',
    highlighted: false,
    color: '',
  },
];

const stats = [
  { value: '45+', label: 'Accredited Courses' },
  { value: '16',  label: 'Care Certificate Standards' },
  { value: 'CQC', label: 'Compliance Ready' },
  { value: 'NMC', label: 'Revalidation Support' },
];

const faqs = [
  {
    q: 'Is the Care Certificate legally mandatory?',
    a: 'The Care Certificate is not a legal requirement, but it is the expected standard for anyone new to health and social care in England. The CQC expects all regulated care providers to ensure their staff meet the 16 Care Certificate standards. Not having one significantly reduces your chances of securing employment in the UK care sector.',
  },
  {
    q: 'Is the Care Certificate portable between employers?',
    a: 'Yes. The Care Certificate is fully portable. If you change jobs, there is no need to be retested before you can assume your duties with a new employer. Your certificate stays with you throughout your career.',
  },
  {
    q: 'Who needs to complete the Care Certificate?',
    a: 'Anyone who is new to the health and social care sector, employed as a social care worker, provides direct care in a nursing home, residential home, or hospice, or works as a home care worker should complete the Care Certificate.',
  },
  {
    q: 'What is Oliver McGowan Mandatory Training?',
    a: 'Following the Health and Care Act 2022, all CQC-regulated providers must ensure their staff complete Oliver McGowan Mandatory Training on learning disability and autism. SkillGuardian provides both Tier 1 (awareness) and Tier 2 (with interaction) as part of the Standard and Premium plans.',
  },
  {
    q: 'How does SkillGuardian help with CQC inspections?',
    a: 'SkillGuardian provides one-click compliance reports showing each employee\'s training status, completion rates, and certificate records. Inspectors can verify certificates via unique IDs. Our audit trail logs every action, giving you full transparency.',
  },
  {
    q: 'Can nurses use SkillGuardian for NMC revalidation?',
    a: 'Yes. All clinical courses are mapped to NMC standards. Registered nurses can download CPD certificates as PDF evidence for their revalidation portfolio. The NMC Code and Revalidation course is also included in the clinical track.',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [activeCourseFilter, setActiveCourseFilter] = useState('All');
  const [openFaq, setOpenFaq]                 = useState<number | null>(null);
  const [contactOpen, setContactOpen]         = useState(false);
  const [getStartedOpen, setGetStartedOpen]   = useState(false);

  const visibleCourses = activeCourseFilter === 'All'
    ? allCourses
    : allCourses.filter(c => c.category === activeCourseFilter);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 w-[200px] h-20 ">
              <div className="relative w-full h-full">
                <Image
                  src="/SG_logo2-.png"
                  alt="SkillGuardian"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#who-needs" className="text-sm text-slate-600 hover:text-[#005EB8] transition-colors">Who It's For</a>
              <a href="#care-certificate" className="text-sm text-slate-600 hover:text-[#005EB8] transition-colors">Care Certificate</a>
              <a href="#individual" className="text-sm text-slate-600 hover:text-[#005EB8] transition-colors">Individual Carers</a>
              <a href="#courses" className="text-sm text-slate-600 hover:text-[#005EB8] transition-colors">Courses</a>
              <a href="#pricing" className="text-sm text-slate-600 hover:text-[#005EB8] transition-colors">Pricing</a>
              <a href="#faq" className="text-sm text-slate-600 hover:text-[#005EB8] transition-colors">FAQ</a>
              <button
                onClick={() => setContactOpen(true)}
                className="text-sm text-slate-600 hover:text-[#005EB8] transition-colors"
              >
                Contact Us
              </button>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-slate-600">Sign In</Button>
              </Link>
              <div className="relative">
                <Button
                  size="sm"
                  className="bg-[#005EB8] hover:bg-[#004a93] text-white"
                  onClick={() => setGetStartedOpen(prev => !prev)}
                >
                  Get Started
                  <ChevronDown className={`ml-1.5 w-3.5 h-3.5 transition-transform ${getStartedOpen ? 'rotate-180' : ''}`} />
                </Button>
                {getStartedOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setGetStartedOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                      <div className="p-1.5">
                        <Link href="/signup" onClick={() => setGetStartedOpen(false)}>
                          <div className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#005EB8] transition-colors">
                              <Building2 className="w-4.5 h-4.5 text-[#005EB8] group-hover:text-white transition-colors" style={{width:'18px',height:'18px'}} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">Organisation</p>
                              <p className="text-xs text-slate-500 leading-snug mt-0.5">For care homes & social care services managing a team</p>
                            </div>
                          </div>
                        </Link>
                        <Link href="/signup/individual" onClick={() => setGetStartedOpen(false)}>
                          <div className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-500 transition-colors">
                              <UserCheck className="w-4.5 h-4.5 text-amber-600 group-hover:text-white transition-colors" style={{width:'18px',height:'18px'}} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">Individual Carer</p>
                              <p className="text-xs text-slate-500 leading-snug mt-0.5">Get your Care Certificate or full course access independently</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
            {['who-needs', 'care-certificate', 'courses', 'pricing', 'faq'].map(id => (
              <a key={id} href={`#${id}`} className="block text-sm text-slate-600 capitalize"
                onClick={() => setMobileMenuOpen(false)}>
                {id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </a>
            ))}
            <button
              className="block text-sm text-slate-600 hover:text-[#005EB8] transition-colors w-full text-left"
              onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }}
            >
              Contact Us
            </button>
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
              </Link>
              <Link href="/signup" className="flex-1">
                <Button size="sm" className="w-full bg-[#005EB8] text-white text-xs">Organisation</Button>
              </Link>
              <Link href="/signup/individual" className="flex-1">
                <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs">Individual</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#005EB8] via-[#0070d4] to-[#1E6B8C] text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {['CQC Compliant', 'NMC Revalidation', 'Oliver McGowan Ready', 'Care Certificate'].map(badge => (
                <span key={badge} className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-xs font-medium">
                  <CheckCircle className="w-3.5 h-3.5" /> {badge}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Mandatory Training<br />
              <span className="text-blue-200">Done Right</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
              The complete training platform for UK care homes and social care organisations.
              Flashcard-based learning, automated certificates, and real-time compliance tracking —
              built to the exact standards CQC expects.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-[#005EB8] hover:bg-blue-50 font-semibold shadow-lg">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="#care-certificate">
                <Button size="lg" variant="outline" className="border-white text-white bg-white/15 hover:bg-white/25 hover:border-white">
                  View Care Certificate
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-200 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section id="who-needs" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-blue-50 text-[#005EB8] border-blue-200">Who It's For</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Built for Every Role in Care</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Whether you're a care assistant just starting out, a registered nurse, or a manager responsible
              for your whole team's compliance — SkillGuardian has a dedicated training track for you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                color: 'bg-blue-50 text-[#005EB8]',
                badge: 'Care Staff',
                badgeColor: 'bg-blue-50 text-[#005EB8] border-blue-200',
                title: 'Care Assistants & Support Workers',
                desc: 'New to care? Start with the full Care Certificate covering all 16 standards. Then build your skills with safeguarding, moving & handling, infection control, and medication awareness.',
                items: ['Care Certificate (All 16 Standards)', 'Safeguarding Adults & Children', 'Basic Life Support', 'Annual refresher reminders'],
              },
              {
                icon: UserCheck,
                color: 'bg-teal-50 text-teal-700',
                badge: 'Senior Carers',
                badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
                title: 'Senior Carers',
                desc: 'Take on more responsibility with specialist role-based training in dementia, falls prevention, pressure care, and food hygiene — plus supervisory-level management modules.',
                items: ['Dementia Awareness', 'Falls Prevention & Management', 'Pressure Area Care', 'Supervisory Management Modules'],
              },
              {
                icon: Stethoscope,
                color: 'bg-emerald-50 text-emerald-700',
                badge: 'Registered Nurses',
                badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                title: 'Registered Nurses (RGN / RMN)',
                desc: 'Advanced clinical courses aligned to NMC standards. Download CPD certificates directly for your revalidation portfolio. All clinical competencies covered.',
                items: ['NMC Code & Revalidation', 'Clinical Observations & NEWS2', 'Catheter Care & Wound Management', 'Deterioration Recognition & Sepsis'],
              },
              {
                icon: Building2,
                color: 'bg-rose-50 text-rose-700',
                badge: 'Managers & RMs',
                badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
                title: 'Managers & Registered Managers',
                desc: 'CQC Regulation 7 & 17 compliance for Registered Managers. Inspection readiness, governance, supervision, DoLS, complaints handling, and safe recruitment.',
                items: ['CQC Inspection Preparation', 'Duty of Candour (Regulation 20)', 'Supervision & Appraisal', 'Safeguarding Level 3'],
              },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <Badge className={`mb-3 self-start text-xs ${card.badgeColor}`}>{card.badge}</Badge>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed flex-1">{card.desc}</p>
                <ul className="space-y-1.5 mt-auto">
                  {card.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-[#005EB8] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Organisations callout */}
          <div className="mt-12 bg-[#005EB8] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-2">For Organisations</p>
              <h3 className="text-xl font-bold mb-2">Running a care home or social care service?</h3>
              <p className="text-blue-200 text-sm max-w-xl leading-relaxed">
                SkillGuardian gives you a single platform to manage training for your entire workforce —
                from onboarding new carers to tracking annual refreshers for your whole team.
                Real-time compliance dashboards mean you're always inspection-ready.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/signup">
                <Button className="bg-white text-[#005EB8] hover:bg-blue-50 font-semibold whitespace-nowrap">
                  Set Up Your Organisation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Care Certificate Deep Dive ── */}
      <section id="care-certificate" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-amber-50 text-amber-700 border-amber-200">Included in All Plans</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">The Care Certificate — All 16 Standards</h2>
            <p className="text-slate-600 mt-4 max-w-3xl mx-auto text-base leading-relaxed">
              The Care Certificate is the expected standard for anyone working in health and social care in England.
              While not a legal requirement, the CQC expects all regulated care providers to ensure their staff
              meet all 16 standards — and not having one significantly reduces your chances of securing
              employment in the UK care sector.
            </p>
          </div>

          {/* Portable callout */}
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {[
              {
                icon: GraduationCap,
                color: 'bg-blue-50 text-[#005EB8]',
                title: 'Who Needs It?',
                desc: 'Anyone new to the health and care sector, employed as a social care worker, providing direct care in a care home or hospice, or working as a home care worker.',
              },
              {
                icon: Globe,
                color: 'bg-emerald-50 text-emerald-700',
                title: 'Fully Portable',
                desc: 'Your Care Certificate travels with you. If you change employers, there is no need to be retested. Your qualification is recognised across the entire UK care sector.',
              },
              {
                icon: AlertTriangle,
                color: 'bg-amber-50 text-amber-700',
                title: 'CQC Expectation',
                desc: 'The CQC expects all care providers to ensure their staff adhere to all 16 Care Certificate standards. It is reviewed regularly to keep pace with best practice and regulatory changes.',
              },
            ].map(card => (
              <div key={card.title} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1.5">{card.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* 16 Standards grid */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">All 16 Care Certificate Standards — Covered in SkillGuardian</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {careStandardsGrid.map(std => (
                <div
                  key={std.num}
                  className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-[#005EB8]/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-[#005EB8] bg-blue-50 rounded-lg px-2 py-1 flex-shrink-0 leading-none mt-0.5">
                      {std.num}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 leading-snug">{std.title}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{std.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standard 16 highlight */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-amber-700">16</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Standard 16 — Now Mandatory</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Awareness of Learning Disability & Autism</h3>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  Standard 16 was added to the Care Certificate framework to reflect the growing importance
                  of supporting people with learning disabilities and autism in all health and care settings.
                  The <strong>Health and Care Act 2022</strong> made Oliver McGowan Mandatory Training a legal
                  requirement for all CQC-regulated providers — and Standard 16 is directly aligned to this.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  SkillGuardian's Care Certificate course covers Standard 16 in full, including person-centred
                  support, the social model of disability, sensory sensitivity in autism, and how to make
                  reasonable adjustments under the Equality Act 2010. Oliver McGowan Tier 1 and Tier 2
                  training are also available as standalone courses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-blue-50 text-[#005EB8] border-blue-200">Platform Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Everything You Need to Stay Compliant</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Purpose-built for the complexities of healthcare training compliance — not a generic LMS bolted on.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => (
              <div
                key={feature.title}
                className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-[#005EB8]/30 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-blue-50 group-hover:bg-[#005EB8] rounded-lg flex items-center justify-center mb-4 transition-colors">
                  <feature.icon className="w-5 h-5 text-[#005EB8] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certificate Workflow ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Streamlined Certificate Workflow</h2>
            <p className="text-slate-600 mt-3">From course completion to verified certificate in minutes</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '1', icon: BookOpen,    title: 'Complete Training',    desc: 'Study flashcards and pass the assessed quiz with 80% or higher.' },
              { step: '2', icon: FileCheck,   title: 'Request Certificate',  desc: 'One-click certificate request sent directly to your manager.' },
              { step: '3', icon: CheckCircle, title: 'Manager Approves',     desc: 'Admin reviews and approves — or provides feedback if needed.' },
              { step: '4', icon: QrCode,      title: 'Download & Verify',    desc: 'PDF certificate with unique ID for instant CQC verification.' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-[#005EB8] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg shadow-md">
                  {item.step}
                </div>
                <div className="w-10 h-10 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-[#005EB8]" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course Library ── */}
      <section id="courses" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-blue-50 text-[#005EB8] border-blue-200">Course Library</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">45+ Accredited Courses</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Covering all mandatory, clinical, and management training requirements across the UK care sector.
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categoryFilters.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveCourseFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  activeCourseFilter === f.value
                    ? 'bg-[#005EB8] text-white border-[#005EB8] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {visibleCourses.map(course => (
              <div
                key={course.name}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${course.color}`}>
                  {course.category}
                </span>
                <p className="mt-2 text-sm font-medium text-slate-800 leading-snug">{course.name}</p>
              </div>
            ))}
          </div>

          {activeCourseFilter === 'All' && (
            <p className="text-center text-sm text-slate-500 mt-6">
              Showing all {allCourses.length} featured courses. Platform includes 45+ courses in total.
            </p>
          )}
        </div>
      </section>

      {/* ── Individual Carer Section ── */}
      <section id="individual" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 border-y border-amber-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200">Individual Carers</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Get Your Care Certificate as an Individual
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Not with an organisation? No problem. Sign up directly, complete all 16 standards at your own pace,
                and receive your portfolio certificate instantly — no manager approval needed.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Care Certificate Portfolio assigned the moment you sign up',
                  '100+ flashcards across all 16 mandatory standards',
                  'Pass the quiz and your certificate is issued automatically',
                  'Downloadable PDF with QR code for instant verification',
                  'Fully portable — accepted by any UK care employer',
                  'Optionally upgrade to 45+ courses for your full career portfolio',
                ].map(f => (
                  <li key={f} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/signup/individual">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md">
                    Start My Care Certificate — £29
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/signup/individual?plan=full_access">
                  <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-white">
                    Full Access — £49
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Sign up in 2 minutes',
                  desc: 'Choose your plan, create your account. Care Certificate Portfolio is instantly assigned.',
                  color: 'bg-amber-500',
                },
                {
                  step: '2',
                  title: 'Learn at your own pace',
                  desc: 'Study 100+ flashcards covering all 16 standards. Use any device, any time.',
                  color: 'bg-[#005EB8]',
                },
                {
                  step: '3',
                  title: 'Pass the assessment',
                  desc: 'Complete the quiz with 80%+ for each standard. Review and retry as needed.',
                  color: 'bg-teal-600',
                },
                {
                  step: '4',
                  title: 'Certificate issued instantly',
                  desc: 'Your portfolio certificate is generated automatically. Download your PDF and share with employers.',
                  color: 'bg-emerald-600',
                },
              ].map(item => (
                <div key={item.step} className="flex items-start gap-4 bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                  <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-blue-50 text-[#005EB8] border-blue-200">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
            <p className="text-slate-600 mt-3">No hidden fees. No long contracts. Cancel anytime.</p>
          </div>

          {/* Individual plans */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Individual Carers</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                {
                  name: 'Care Certificate',
                  price: '£29',
                  period: 'one-time',
                  badge: null,
                  description: 'All 16 Care Certificate standards + instant portfolio certificate.',
                  features: [
                    'Care Certificate Portfolio (All 16 Standards)',
                    '100+ flashcards for every standard',
                    'Instant portfolio certificate on passing',
                    'CQC-compliant — accepted by UK employers',
                    'Lifetime access',
                  ],
                  href: '/signup/individual',
                  cta: 'Get Care Certificate',
                  highlighted: false,
                },
                {
                  name: 'Full Access',
                  price: '£49',
                  period: 'one-time',
                  badge: 'Best Value',
                  description: 'Care Certificate + 45+ additional accredited courses.',
                  features: [
                    'Everything in Care Certificate',
                    '45+ additional accredited courses',
                    'Moving & Handling, IPC, Safeguarding',
                    'Medication, BLS, Mental Capacity & more',
                    'Instant certificate for every course',
                  ],
                  href: '/signup/individual?plan=full_access',
                  cta: 'Get Full Access',
                  highlighted: true,
                },
              ].map(plan => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-7 ${
                    plan.highlighted
                      ? 'bg-amber-500 text-white shadow-xl ring-2 ring-amber-500'
                      : 'bg-white border border-slate-200 shadow-sm'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">{plan.badge}</span>
                    </div>
                  )}
                  <h3 className={`text-lg font-semibold mb-1 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                  <p className={`text-sm mb-4 ${plan.highlighted ? 'text-amber-100' : 'text-slate-500'}`}>{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.highlighted ? 'text-amber-100' : 'text-slate-500'}`}>{plan.period}</span>
                  </div>
                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlighted ? 'text-amber-50' : 'text-slate-600'}`}>
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-emerald-500'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button className={`w-full ${plan.highlighted ? 'bg-white text-amber-600 hover:bg-amber-50' : 'bg-amber-500 hover:bg-amber-600 text-white'}`}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Organisation plans */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Organisations & Care Homes</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {plans.map(plan => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-8 ${
                    plan.highlighted
                      ? 'bg-[#005EB8] text-white shadow-xl ring-2 ring-[#005EB8]'
                      : 'bg-white border border-slate-200 shadow-sm'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold mb-1 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm mb-4 ${plan.highlighted ? 'text-blue-200' : 'text-slate-500'}`}>{plan.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                      <span className={`text-sm ${plan.highlighted ? 'text-blue-200' : 'text-slate-500'}`}>{plan.period}</span>
                    </div>
                    <p className={`text-sm mt-1 ${plan.highlighted ? 'text-blue-200' : 'text-slate-500'}`}>{plan.seats}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-slate-600'}`}>
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-blue-300' : 'text-[#005EB8]'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/signup?plan=${plan.name.toLowerCase()}`}>
                    <Button className={`w-full ${plan.highlighted ? 'bg-white text-[#005EB8] hover:bg-blue-50' : 'bg-[#005EB8] text-white hover:bg-[#004a93]'}`}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise / large org card */}
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col border border-slate-700 mt-12">
            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Enterprise</p>
              <h3 className="text-xl font-bold text-white mb-2">More than 100 staff?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We offer custom pricing and dedicated support for larger organisations. Get in touch and we'll put together a plan that fits your team.
              </p>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                'Custom seat limit',
                'Dedicated account manager',
                'Bulk onboarding support',
                'Custom reporting & CQC exports',
                'Priority phone & live chat support',
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-500" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="mailto:support@skillguardian.co.uk">
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-semibold">
                Contact Us
              </Button>
            </a>
            <p className="text-center text-xs text-slate-500 mt-3">support@skillguardian.co.uk</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-50 text-[#005EB8] border-blue-200">FAQ</Badge>
            <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-slate-900 text-sm leading-snug">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-12">        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3 w-[200px] h-20">
                <div className="relative w-full h-full">
                  <Image
                    src="/SG_logo2-.png"
                    alt="SkillGuardian"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <p className="text-sm max-w-xs leading-relaxed">
                CQC-compliant training platform for healthcare and social care organisations across the UK.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="text-white font-medium mb-3">Platform</p>
                <ul className="space-y-2">
                  <li><a href="#who-needs" className="hover:text-white transition-colors">Who It's For</a></li>
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <p className="text-white font-medium mb-3">Training</p>
                <ul className="space-y-2">
                  <li><a href="#care-certificate" className="hover:text-white transition-colors">Care Certificate</a></li>
                  <li><span>Oliver McGowan</span></li>
                  <li><span>NMC Revalidation</span></li>
                  <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <p className="text-white font-medium mb-3">Compliance</p>
                <ul className="space-y-2">
                  <li><span>CQC Standards</span></li>
                  <li><span>NMC Framework</span></li>
                  <li><span>Health & Care Act 2022</span></li>
                  <li><span>Equality Act 2010</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 SkillGuardian. Built for healthcare compliance in the UK.</p>
            <div className="flex items-center gap-5 text-xs text-slate-500">
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

    </div>
  );
}
