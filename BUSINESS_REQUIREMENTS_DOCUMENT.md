# SkillGuardian — Business Requirements Document

**Version**: 2.0  
**Date**: May 2026  
**Status**: Active Development — MVP Complete  
**Prepared by**: Product & Engineering Team

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Goals](#2-product-vision--goals)
3. [Target Market & Users](#3-target-market--users)
4. [Technology Stack](#4-technology-stack)
5. [What Has Been Built](#5-what-has-been-built)
6. [What Remains to Be Built](#6-what-remains-to-be-built)
7. [Production Readiness Checklist](#7-production-readiness-checklist)
8. [Developer Guidance — Making the Application Production Ready](#8-developer-guidance--making-the-application-production-ready)
9. [Data Model Reference](#9-data-model-reference)
10. [Subscription Tiers & Pricing Logic](#10-subscription-tiers--pricing-logic)
11. [Non-Functional Requirements](#11-non-functional-requirements)

---

## 1. Executive Summary

SkillGuardian is a **multi-tenant SaaS healthcare training compliance platform** designed for care homes, supported living providers, and social care organisations operating in the UK.

The platform enables organisations to:
- Assign mandatory and role-appropriate training courses to their staff
- Track employee progress through structured flashcard-based learning and assessed quizzes
- Generate and manage compliance certificates aligned to CQC (Care Quality Commission) inspection frameworks
- Receive automatic expiry warnings so no member of staff falls out of compliance
- Produce audit-ready compliance reports at any time

The application is built on a modern serverless stack (Next.js + Supabase) and is designed to scale from a single care home to a national provider with hundreds of locations.

**The MVP is functionally complete.** The core training workflow — assign, learn, quiz, certify, report — works end to end. The outstanding work is primarily around production hardening: email notifications, payment integration, performance at scale, and security auditing.

---

## 2. Product Vision & Goals

### Vision
To become the leading compliance training platform for frontline care workers in the UK — replacing paper-based records, spreadsheet trackers, and generic LMS tools with a purpose-built, regulation-aligned solution.

### Business Goals
| Goal | Metric |
|---|---|
| Reduce training non-compliance incidents | 90% of staff completing mandatory training before expiry |
| Save management time | Compliance reports generated in seconds, not hours |
| Reduce CQC inspection risk | One-click audit-ready report export |
| Grow recurring revenue | Subscription tiers from £49–£199/month per organisation |
| Scalable multi-tenancy | Support 500+ organisations without infrastructure changes |

---

## 3. Target Market & Users

### Primary Market
UK-regulated care providers who are legally required to maintain training records:
- Care homes (residential and nursing)
- Supported living providers
- Domiciliary care agencies
- NHS-contracted community care teams

### User Personas

| Persona | Platform Role | Needs |
|---|---|---|
| **Care Staff (Carer)** | Employee | Easy access to assigned courses, clear progress, certificate downloads |
| **Nurse (RGN/RMN)** | Employee | Clinically-relevant courses, NMC revalidation support |
| **Senior Carer** | Employee | Carer courses plus supervisory-level management content |
| **Care Manager** | Employee | Management & leadership courses, team oversight |
| **Registered Manager / RM** | Org Admin | Staff compliance visibility, certificate approvals, CQC reports |
| **HR / Training Coordinator** | Org Admin | Employee onboarding, bulk assignment, compliance dashboards |
| **Platform Owner / SkillGuardian** | Super Admin | Tenant management, course library, subscription billing |

---

## 4. Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| **Frontend** | Next.js 15 (App Router), TypeScript | React Server + Client components |
| **UI Library** | shadcn/ui + Tailwind CSS | Consistent component library |
| **Icons** | Lucide React | |
| **Database** | Supabase (PostgreSQL) | Row Level Security on all tables |
| **Authentication** | Supabase Auth (email/password) | JWT with app_metadata for roles |
| **Server Functions** | Supabase Edge Functions (Deno) | Employee creation, expiry checks |
| **Date handling** | date-fns | |
| **Hosting** | Netlify (configured) | netlify.toml present |

---

## 5. What Has Been Built

This section documents all features that are implemented and working.

### 5.1 Authentication & Multi-Tenancy

- **Email/password authentication** via Supabase Auth
- **Three-tier role system**: Super Admin, Organisation Admin, Employee
- **Multi-tenant architecture**: Each organisation is fully isolated via Row Level Security
- **Organisation profiles**: Name, subdomain, contact details, primary colour branding, seat limits, subscription tier
- **Auth trigger**: Automatic profile creation on first login
- **Session persistence**: JWT-based with app_metadata for role and org storage
- **Demo accounts**: Six ready-to-use demo accounts across all roles and professional types

### 5.2 Course Library

**45 courses across 5 categories**, all with full flashcard and quiz content:

| Category | Courses | Who Sees It |
|---|---|---|
| Core Mandatory | 12 courses | All staff (every role) |
| Legal Requirement | 2 courses (Oliver McGowan Tiers 1 & 2) | All staff |
| Role-Based | 8 courses | Carers and senior carers |
| Clinical / Nurse | 10 courses | Registered nurses only |
| Management & Leadership | 15 courses | Managers, senior carers |

Each course includes:
- 20–50+ flashcards (question/answer pairs) per course
- 10–20 quiz questions (multiple choice A/B/C/D) per course
- Correct answer + explanation for each question
- `expiry_months` value for automatic renewal tracking
- `prerequisite_course_id` for learning path enforcement

### 5.3 Role-Based Access Control (RBAC)

Courses are filtered automatically based on the employee's professional role:

| Professional Role | Course Access |
|---|---|
| Care Assistant | Core Mandatory + Legal + Carers-only |
| Senior Carer | Core Mandatory + Legal + Carers-only + Managers & Seniors |
| RGN / RMN / Nurse Associate / Clinical Lead | Core Mandatory + Legal + Nurses-only |
| Manager | Core Mandatory + Legal + Managers-only + Managers & Seniors |
| Org Admin | Full library (management view) |

Subscription tier further restricts which course categories an organisation can access.

### 5.4 Training Workflow

The complete learning journey is implemented end to end:

1. **Course assigned** by admin to employee
2. **Employee reviews flashcards** (spaced repetition — 3 reviews recommended)
3. **Employee takes quiz** (10 randomly selected questions, 80% pass mark)
4. **Pass recorded** in database with score, attempts, and completion date
5. **Certificate request submitted** by employee
6. **Admin reviews and approves** (or rejects with reason)
7. **Certificate generated** with unique ID (format: SG-XXXXXXXX)
8. **Employee downloads PDF certificate**

Additional workflow features:
- Prerequisite course enforcement (cannot take advanced course until prerequisite passed)
- Unlimited quiz retakes
- Review count tracking per course
- Quiz attempt counting
- Score recording and display

### 5.5 Employee Management (Admin)

- **Add employees**: Creates Supabase Auth account via Edge Function with temporary password
- **Edit employees**: Update name, professional role, platform role
- **Assign courses**: Matrix view grouped by category, checkbox selection per employee
- **Activate / deactivate**: Soft delete (never hard delete to preserve compliance history)
- **Search and filter**: By name or email
- **Credentials display**: Temp password shown once on creation (copy to clipboard)

### 5.6 Certificate Management

**Employee view**:
- List of all certificate requests with status (Pending / Approved / Rejected)
- Download approved certificates as PDF
- View rejection reason if applicable
- Certificate ID display for approved certificates

**Admin view**:
- All organisation certificate requests in one place
- Filter by status (All / Pending / Approved / Rejected)
- One-click approve (generates unique certificate ID)
- Reject with mandatory reason comment
- Employee name and course details visible per request

### 5.7 Compliance Reporting

A full CQC-aligned compliance report is available to org admins:

- **Summary statistics**: Total staff, fully compliant, at-risk, non-compliant, overall completion rate
- **RAG status per employee**:
  - Green: ≥80% completion rate
  - Amber: 50–79% completion rate
  - Red: <50% completion rate
- **Expandable employee detail**: Course-by-course breakdown with status, score, completion date, expiry date
- **CSV export**: Full compliance data including all course statuses per employee
- **Print / PDF export**: Print-ready layout with all CQC-relevant data visible

### 5.8 Notification & Expiry System

- **Notifications table**: Stores in-app notifications per user
- **Training expiry view**: Calculates days until expiry for every passed course with an expiry date
- **Notification types**: `expiry_warning` (60/30/7 days), `expiry_overdue`, `certificate_approved`, `certificate_rejected`, `course_assigned`
- **Bell indicator in navigation**: Red unread count badge, dropdown panel with all notifications
- **Mark read / Mark all read**: Individual and bulk dismiss
- **Real-time delivery**: Supabase Realtime subscription — new notifications appear without page refresh
- **Employee dashboard banners**: Red overdue banner with CTA, amber warning banner listing upcoming expirations
- **Expiry timeline panel**: Progress bars colour-coded by urgency for employee dashboard
- **Admin dashboard panel**: Lists staff members with expiring training, colour-coded
- **Edge Function**: `check-expiring-training` — scans expiry view, creates notifications at each threshold, deduplicates, can be triggered manually via POST

### 5.9 Organisation Management (Super Admin)

- **Create and edit organisations**: Name, subdomain, contact details, subscription tier, seat limit, brand colour
- **Suspend and reactivate**: Soft suspend without data loss
- **Course library assignment**: Assign specific courses from global library to each organisation
- **Subscription tier presets**: One-click apply Basic / Standard / Premium course sets
- **Tier-based course locking**: Courses outside an org's tier are greyed out and unselectable
- **Seat usage tracking**: Shows X/Y staff used per organisation

### 5.10 Navigation & UX

- **Responsive sidebar navigation**: Collapsible desktop sidebar, slide-in mobile drawer
- **Role-based navigation menus**: Different nav items for each user role
- **Active route highlighting**: Current page indicator
- **Notification bell**: Integrated into sidebar header with unread count
- **Loading states**: Skeleton loaders on all data-heavy pages
- **Empty states**: Illustrated empty state messages on all list pages
- **Demo account quick-fill**: Login page lists all demo accounts; clicking auto-fills credentials

---

## 6. What Remains to Be Built

The following features are not yet implemented. They are grouped by priority.

### Priority 1 — Required Before Launch

#### 1.1 Email Notifications (Transactional)
**Why critical**: Users need to receive alerts outside the app. Without email, expiry warnings are silent until a user logs in.

Required emails:
- **Welcome / Invitation**: Sent to new employee with their temporary password and login link
- **Certificate Approved**: Notifies employee their certificate is ready to download
- **Certificate Rejected**: Notifies employee with the rejection reason
- **Training Expiry Warning**: 60, 30, and 7-day reminders sent to both the employee and their org admin
- **Training Overdue**: Urgent notification to employee and org admin
- **Password Reset**: Supabase handles this but custom template required

Recommended approach: Supabase provides built-in email templates (SMTP or Resend/SendGrid integration). Deploy a `send-notification-email` edge function that is triggered when a new notification is inserted into the notifications table, or integrate with Supabase's `pg_net` extension to send emails from database triggers.

#### 1.2 Stripe Billing Integration
**Why critical**: No revenue collection mechanism exists.

Required:
- **Checkout flow**: When a super admin creates an organisation, link to Stripe checkout for subscription selection
- **Subscription management**: Upgrade, downgrade, cancel
- **Webhook handler**: Supabase edge function to receive Stripe events (payment success, cancellation, trial end)
- **Seat limit enforcement**: Block employee creation when seat_limit is reached (currently not enforced in edge function)
- **Trial period**: 14-day free trial logic

#### 1.3 Seat Limit Enforcement
**Why critical**: Currently the `manage-employee` edge function creates new users regardless of seat limits.

Fix required in `supabase/functions/manage-employee/index.ts`: Before creating a new auth user, count existing active employees in the organisation and compare against `profiles.seat_limit`. Return a `403` error with a clear message if the limit is reached.

#### 1.4 Certificate PDF Generation
**Why critical**: The download button exists in the UI but the actual PDF file is not generated.

The `generateCertificatePDF` function is referenced in `app/dashboard/certificates/page.tsx` but is not implemented. A proper certificate PDF should include:
- Organisation name and logo
- Employee full name and professional role
- Course title and category
- Completion date and expiry date
- Certificate ID (SG-XXXXXXXX)
- SkillGuardian branding and declaration of compliance

Recommended approach: Use a Supabase edge function with a Deno-compatible PDF library (e.g., `pdf-lib` via npm:), generate the PDF on demand, and return it as a base64 blob or store it in Supabase Storage.

#### 1.5 Password Change / Reset Flow
**Why critical**: New employees receive a temporary password but have no way to change it from within the app.

Required:
- "Change Password" option in user profile/settings
- First-login prompt encouraging password change
- Supabase's built-in password reset email flow surfaced in the UI

### Priority 2 — Important for Retention & Compliance

#### 2.1 Scheduled Expiry Checks (Cron Job)
The `check-expiring-training` edge function is deployed but needs to be triggered automatically every day.

Options (in order of preference):
- **Supabase Cron** (pg_cron): Available on Pro plan — `SELECT cron.schedule('0 7 * * *', ...)`. This is the cleanest approach.
- **External cron service**: Cron-job.org, EasyCron, or GitHub Actions workflow calling the edge function URL once daily
- **Netlify Scheduled Functions**: If hosting on Netlify, use their scheduled functions feature

#### 2.2 Notifications Page / Inbox
Currently notifications are shown in a bell dropdown only. Employees with many notifications need a full-page inbox view.

Required: `/dashboard/notifications` page showing all notifications, grouped by date, with read/unread filtering and a link to the related course.

#### 2.3 Quiz Answer Review
After completing a quiz, employees should be able to review which questions they answered correctly/incorrectly and see the explanations. The data (correct answer, explanation) is already stored in `quiz_questions` — this is a display-only change.

#### 2.4 User Profile & Settings Page
No profile page exists currently. Required:
- View and edit personal details (name)
- Change password
- Notification preferences (opt in/out of email notifications)
- View own training history

#### 2.5 Audit Log Viewer
The `audit_logs` table exists in the schema but nothing writes to it and there is no UI to view it. For CQC compliance, all significant actions (course completion, certificate approval, employee deactivation) must be logged.

Required:
- Write audit log entries on key actions (use a shared helper function)
- `/dashboard/audit` page for org admins showing action history

#### 2.6 Custom Email Templates
Supabase sends default plain-text auth emails. These must be branded with SkillGuardian styling for a professional appearance.

### Priority 3 — Growth & Scale Features

#### 3.1 Bulk Employee Import
Allow org admins to upload a CSV file of employees rather than adding one at a time. Required fields: first_name, last_name, email, professional_role. The import should validate each row and create auth accounts via the existing edge function.

#### 3.2 Organisation Logo Upload
The schema has `logo_url` on the `organisations` table but the upload UI is not built. Use Supabase Storage to store uploaded logos and display them in the navigation and on certificates.

#### 3.3 Advanced Reporting & Analytics
- **Historical trend data**: Completion rates over time (requires storing snapshots)
- **Cohort analysis**: Compare compliance between teams or professional roles
- **Scheduled email reports**: Weekly/monthly compliance summary emailed to org admin
- **Export to Excel**: More accessible than CSV for non-technical managers

#### 3.4 Custom Course Creation
Allow premium organisations to create their own internal training courses (procedures, policies, inductions) using the same flashcard + quiz format. Super admins can also create new global courses via the platform.

#### 3.5 Manager Dashboard View
A team-level compliance view specifically for care managers (professional_role = 'manager') showing their direct reports' training status, upcoming expirations, and outstanding certificates — without full org admin access.

#### 3.6 Mobile App (PWA)
Carers often complete training on mobile devices during breaks. Converting the existing Next.js app into a Progressive Web App (PWA) requires:
- `next-pwa` package configuration
- Service worker for offline flashcard access
- App install prompt
- Push notifications (replacing in-app notifications for mobile)

#### 3.7 Learning Path / Course Sequences
The existing prerequisite system only supports a single prerequisite per course. A proper learning path would allow chaining: e.g., "Complete these 5 courses to earn the Care Certificate bundle."

---

## 7. Production Readiness Checklist

The following must be completed before the application serves real paying customers.

### Security

| Item | Status | Notes |
|---|---|---|
| Row Level Security on all tables | DONE | All 11 tables have RLS enabled |
| JWT role verification in edge functions | DONE | manage-employee function checks caller role |
| No hardcoded secrets in codebase | DONE | All secrets via environment variables |
| Supabase anon key scoped correctly | REVIEW | Ensure anon key has no excessive permissions |
| Input sanitisation on all forms | PARTIAL | Basic React form validation only — server-side validation needed in edge functions |
| Rate limiting on auth endpoints | NOT DONE | Supabase provides basic rate limiting; configure CAPTCHA for signup |
| SQL injection protection | DONE | All queries use Supabase client (parameterised) |
| XSS protection | REVIEW | Verify no `dangerouslySetInnerHTML` usage |
| CORS policy on edge functions | DONE | All functions return correct headers |
| Audit logging for sensitive actions | NOT DONE | Table exists, writes not implemented |
| Seat limit enforcement | NOT DONE | Must be added to manage-employee edge function |

### Infrastructure

| Item | Status | Notes |
|---|---|---|
| Environment variables configured | DONE | .env file for local, Supabase secrets for edge functions |
| Database backups | CHECK | Supabase Pro includes daily backups; verify retention policy |
| Error monitoring | NOT DONE | Add Sentry or equivalent |
| Uptime monitoring | NOT DONE | Add Checkly, BetterUptime, or UptimeRobot |
| CDN for static assets | PARTIAL | Netlify serves static assets; add Supabase Storage for user uploads |
| Database connection pooling | DONE | Supabase handles this automatically |
| Edge function error alerting | NOT DONE | Set up alerts for function failures |

### Legal & Compliance

| Item | Status | Notes |
|---|---|---|
| Privacy Policy page | NOT DONE | Required before processing employee data |
| Terms of Service page | NOT DONE | Required for paying customers |
| GDPR compliance | PARTIAL | Data stays in Supabase EU region; DPA with Supabase needed; cookie consent banner |
| Data retention policy | NOT DONE | How long are training records kept after employee/org deactivation? |
| ICO registration | CHECK | Required if processing UK personal data as a business |

### Performance

| Item | Status | Notes |
|---|---|---|
| Database indexes | PARTIAL | Key indexes exist; run EXPLAIN ANALYZE on report queries at scale |
| Image optimisation | N/A | No user-uploaded images yet |
| API response caching | NOT DONE | Consider caching course content (rarely changes) |
| Query optimisation on reports page | REVIEW | Report page fetches all user_courses for the org — paginate at scale |
| Bundle size analysis | NOT DONE | Run `next build` with `ANALYZE=true` |

### Testing

| Item | Status | Notes |
|---|---|---|
| Unit tests | NOT DONE | No test files exist in codebase |
| Integration tests | NOT DONE | |
| End-to-end tests | NOT DONE | Recommend Playwright |
| RLS policy tests | NOT DONE | Critical — test that employees cannot access other orgs' data |

---

## 8. Developer Guidance — Making the Application Production Ready

This section provides specific, actionable guidance for the developer picking up this codebase.

### 8.1 Understand the Codebase First

Before making any changes, spend time understanding the following files in order:

1. `/lib/types.ts` — All TypeScript types and enums. This is the contract for the entire application.
2. `/lib/supabase.ts` — Supabase client initialisation.
3. `/contexts/AuthContext.tsx` — Authentication state, profile fetching, role storage.
4. `/contexts/NotificationContext.tsx` — Notification state and real-time subscriptions.
5. `/app/dashboard/layout.tsx` — The shell that wraps all dashboard pages.
6. `/supabase/migrations/` — Read them in timestamp order to understand the full database evolution.

### 8.2 Local Development Setup

```bash
# 1. Clone the repository
# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from your Supabase project

# 4. Run development server
npm run dev

# 5. Run build check (do this before every commit)
npm run build
```

The `.env` file must contain:
```
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
```

### 8.3 Database Workflow

**Never run raw SQL directly in production.** Always use Supabase migrations:

1. Write your SQL in a new file: `supabase/migrations/[timestamp]_descriptive_name.sql`
2. Apply via the MCP tool or Supabase dashboard SQL editor
3. Follow the existing migration format — include a detailed comment block at the top

**Critical rule**: Never use `DROP TABLE`, `DELETE FROM` (without a WHERE clause), or destructive ALTER operations. Add columns with `IF NOT EXISTS`, rename using new columns + data copy + remove old column approach.

**RLS policy pattern** — follow this for every new table:
```sql
ALTER TABLE my_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON my_table FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Org admins can read org data"
  ON my_table FOR SELECT TO authenticated
  USING (organisation_id IN (
    SELECT organisation_id FROM profiles
    WHERE id = auth.uid() AND role = 'org_admin'
  ));
```

### 8.4 Edge Functions Workflow

Edge functions live in `/supabase/functions/[function-name]/index.ts`.

Follow this template for every function:

```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }
  try {
    // Always use service role for admin operations
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );
    // ... your logic
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
```

Deploy using the MCP tool — never use the Supabase CLI directly.

### 8.5 Implementing Email Notifications (Priority 1.1)

The recommended approach is a Supabase Edge Function + Resend (simple, generous free tier):

**Step 1**: Create a `send-email` edge function that accepts `{ to, subject, html }` and calls the Resend API.

**Step 2**: In the `check-expiring-training` function (already deployed), after inserting notifications, also call `send-email` for each notification where the user has email notifications enabled.

**Step 3**: For certificate approval/rejection, update the certificates page admin actions to also insert a `certificate_approved` / `certificate_rejected` notification — the existing notification real-time subscription will display it in-app, and the email function handles the email.

**Step 4**: For new employee welcome emails, update the `manage-employee` edge function to call `send-email` after successful user creation.

### 8.6 Implementing Certificate PDF Generation (Priority 1.4)

Create a `generate-certificate` edge function:

```typescript
import { PDFDocument, rgb, StandardFonts } from "npm:pdf-lib@1.17.1";

// Accept: { certificate_request_id }
// 1. Fetch certificate_request + user + course + organisation from DB
// 2. Build PDF with pdf-lib
// 3. Upload to Supabase Storage bucket 'certificates' (private)
// 4. Update certificate_requests.certificate_file_url with signed URL
// 5. Return the file URL
```

The certificate should display:
- Organisation name and logo (fetch from organisations.logo_url)
- Employee full name and professional role
- Course title and completion date
- Certificate ID, expiry date, SkillGuardian seal

In the certificates page, change the Download button to call this edge function, then open the returned URL.

### 8.7 Implementing Seat Limit Enforcement (Priority 1.3)

In `/supabase/functions/manage-employee/index.ts`, add this block before the `auth.admin.createUser` call:

```typescript
// Check seat limit
const { count: activeCount } = await supabase
  .from('profiles')
  .select('id', { count: 'exact' })
  .eq('organisation_id', organisation_id)
  .eq('is_active', true)
  .eq('role', 'employee');

const { data: org } = await supabase
  .from('organisations')
  .select('seat_limit')
  .eq('id', organisation_id)
  .single();

if (activeCount !== null && org && activeCount >= org.seat_limit) {
  return new Response(JSON.stringify({
    error: `Seat limit reached. Your plan allows ${org.seat_limit} employees. Please upgrade to add more.`
  }), { status: 403, headers: corsHeaders });
}
```

Handle this error in the employees page UI with a clear upgrade prompt.

### 8.8 Setting Up the Daily Cron Job

The `check-expiring-training` edge function is deployed and works. It needs a daily trigger.

**Option A — Supabase Cron (Pro plan)**:
```sql
SELECT cron.schedule(
  'check-expiring-training-daily',
  '0 7 * * *',
  $$SELECT net.http_post(
    url := 'https://[project-ref].supabase.co/functions/v1/check-expiring-training',
    headers := '{"Authorization":"Bearer [service-role-key]"}'::jsonb,
    body := '{}'::jsonb
  )$$
);
```

**Option B — GitHub Actions (free)**:
Create `.github/workflows/daily-expiry-check.yml`:
```yaml
name: Daily Training Expiry Check
on:
  schedule:
    - cron: '0 7 * * *'
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger edge function
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}" \
            https://[project-ref].supabase.co/functions/v1/check-expiring-training
```

### 8.9 Adding Error Monitoring (Sentry)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Wrap edge functions:
```typescript
import * as Sentry from "npm:@sentry/deno";
Sentry.init({ dsn: Deno.env.get("SENTRY_DSN") });
```

### 8.10 Testing Strategy

Given there are currently no tests, prioritise in this order:

**1. RLS Security Tests** (highest priority — data breach risk)
Use `pgTAP` or write Supabase test SQL scripts that:
- Attempt to read another organisation's data as an authenticated user
- Verify each policy blocks what it should block

**2. Edge Function Integration Tests**
Test the `manage-employee` function with:
- Valid create request → expect 200 + user_id
- Invalid role → expect 403
- Seat limit exceeded → expect 403 (once implemented)
- Duplicate email → expect 400

**3. End-to-End Tests with Playwright**
Critical user journeys to cover:
- Login as each demo role → verify correct nav and content
- Employee: complete a course (flashcards → quiz → pass → request certificate)
- Admin: approve a certificate
- Admin: generate compliance report and export CSV
- Notification bell shows unread count and dismisses correctly

**4. Component Unit Tests (Jest + React Testing Library)**
Focus on:
- RBAC helper function (`isCourseVisibleForRole`)
- Certificate status display logic
- RAG status calculation in reports
- Date/expiry calculation utilities

### 8.11 Performance Optimisations for Scale

The following queries will become slow as data grows:

**Reports page**: Currently fetches all user_courses for an organisation in a single query. At 200 employees × 30 courses = 6,000 rows. Add server-side pagination and consider a materialised view for compliance summaries updated nightly.

**Training expiry view**: Full table scan on `user_courses` joined to `courses`. Add a composite index:
```sql
CREATE INDEX IF NOT EXISTS user_courses_status_completed_idx 
  ON user_courses(user_id, status, completed_at) 
  WHERE status = 'passed';
```

**Notification polling**: The current real-time subscription per user is fine up to ~10,000 concurrent users. Beyond that, consider batching notifications and reducing subscription channels.

### 8.12 Going Live Checklist

Follow this sequence when deploying to production:

1. Verify all environment variables are set in Netlify (or chosen host)
2. Run `npm run build` — must complete with zero errors
3. Apply all database migrations to production Supabase project
4. Deploy all edge functions via MCP tool
5. Configure Supabase SMTP settings (Resend/SendGrid)
6. Set up Stripe webhooks endpoint
7. Configure pg_cron for daily expiry checks (or GitHub Actions)
8. Add Sentry DSN to environment variables
9. Set up uptime monitoring on the production URL
10. Run Playwright end-to-end tests against staging environment
11. Verify RLS policies by logging in as a demo employee and confirming no cross-org data is visible
12. Load-test the reports page with realistic data volume (use k6 or Artillery)
13. Publish Privacy Policy and Terms of Service pages
14. Set up GDPR cookie consent banner (e.g., CookieYes or Termly)

---

## 9. Data Model Reference

### Core Tables

| Table | Purpose | Key Columns |
|---|---|---|
| `organisations` | Multi-tenant accounts | id, name, subdomain, subscription_tier, seat_limit, is_active |
| `profiles` | Extended user data | id (= auth.users.id), organisation_id, role, professional_role, is_active |
| `courses` | Training courses | id, category, target_role, expiry_months, prerequisite_course_id |
| `flashcards` | Learning content | course_id, question_text, answer_text, order_index, difficulty |
| `quiz_questions` | Assessment questions | course_id, question_text, option_a–d, correct_option, explanation |
| `user_courses` | Progress tracking | user_id, course_id, status, quiz_score, completed_at, review_count |
| `certificate_requests` | Certificate workflow | user_id, course_id, status, certificate_id, approved_date |
| `notifications` | In-app alerts | user_id, type, title, message, read, expires_on |
| `audit_logs` | Compliance trail | organisation_id, performed_by, action, resource_type, details |
| `course_assignments` | Bulk assignment | organisation_id, course_id, assigned_to, assigned_role, due_date |

### Views

| View | Purpose |
|---|---|
| `training_expiry_status` | Calculates days_until_expiry for all passed courses with expiry dates |

### Edge Functions

| Function | Trigger | Purpose |
|---|---|---|
| `manage-employee` | HTTP POST | Create auth users, assign courses (bypasses RLS securely) |
| `check-expiring-training` | HTTP POST / Cron daily | Scan expiry view, create notifications at 60/30/7 day thresholds |
| `create-demo-users` | HTTP POST (one-time) | Seeds demo accounts (development use only) |

---

## 10. Subscription Tiers & Pricing Logic

| Tier | Price | Course Access | Notes |
|---|---|---|---|
| **Basic** | £49/month | Core Mandatory only (12 courses) | Small single-site care homes |
| **Standard** | £99/month | + Legal Requirement + Role-Based (22 courses) | Growing providers |
| **Premium** | £199/month | All categories (45 courses) | Multi-site, nursing homes, NHS-contracted |

### Course Access by Tier

```
Basic     → core_mandatory
Standard  → core_mandatory + legal_requirement + role_based
Premium   → core_mandatory + legal_requirement + role_based + clinical_nurse + management_leadership
```

This logic is enforced in:
- Organisation course library assignment modal (super admin)
- Locked course indicators per tier (organisation page)

**Gap**: This gating is currently visual only — there is no server-side check preventing an org admin from accessing a course their tier doesn't include if they navigate directly. The RLS policies on `org_course_library` provide the actual enforcement, but this should be verified and tested.

---

## 11. Non-Functional Requirements

### Availability
- Target uptime: 99.5% (Supabase Pro SLA applies)
- Planned maintenance window: Sundays 02:00–04:00 UTC

### Performance
- Page load time: < 2 seconds on 4G mobile
- Quiz submission: < 500ms response
- Report generation: < 5 seconds for organisations up to 100 employees

### Security
- All data encrypted in transit (HTTPS only)
- All data encrypted at rest (Supabase default AES-256)
- No PII stored in client-side localStorage
- Password minimum: 8 characters (enforced at Supabase Auth level)
- Session timeout: 7 days inactivity (Supabase default)

### Browser Support
- Chrome 100+, Firefox 100+, Safari 15+, Edge 100+
- iOS Safari 15+, Android Chrome 100+

### Data Retention
- Training records: Retained indefinitely (CQC requires historical evidence)
- Deleted/deactivated employees: Profile soft-deleted, training history preserved
- Audit logs: Minimum 3 years retention
- Notification records: 90-day retention (can be auto-purged)

### Accessibility
- Target: WCAG 2.1 Level AA
- Current status: Not formally audited — keyboard navigation and screen reader testing required before launch

---

*This document should be reviewed and updated at the end of each development sprint. Version history is tracked in the project repository.*
