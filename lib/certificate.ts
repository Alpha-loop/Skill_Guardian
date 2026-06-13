import { addMonths, format } from 'date-fns';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export const CARE_CERT_COURSE_ID = '10000000-0000-0000-0000-000000000012';

export const CARE_CERT_STANDARDS = [
  'Standard 1  — Understand Your Role',
  'Standard 2  — Your Personal Development',
  'Standard 3  — Duty of Care',
  'Standard 4  — Equality, Diversity & Human Rights',
  'Standard 5  — Work in a Person-Centred Way',
  'Standard 6  — Communication',
  'Standard 7  — Privacy & Dignity',
  'Standard 8  — Fluids & Nutrition',
  'Standard 9  — Awareness of Mental Health, Dementia & Learning Disability',
  'Standard 10 — Safeguarding Adults',
  'Standard 11 — Safeguarding Children',
  'Standard 12 — Basic Life Support',
  'Standard 13 — Health & Safety',
  'Standard 14 — Handling Information',
  'Standard 15 — Infection Prevention & Control',
  'Standard 16 — Awareness of Learning Disability & Autism',
];

export interface CertificateData {
  employeeName: string;
  courseName: string;
  completionDate: string;
  expiryMonths: number | null;
  certificateId: string;
  organisationName: string;
  approvedByName?: string;
}

// Brand colours
const BLUE       = '#005EB8';
const BLUE_DARK  = '#004a93';
const BLUE_LIGHT = '#e8f1fb';
const SLATE      = '#334155';
const SLATE_MID  = '#64748b';
const SLATE_LIGHT= '#94a3b8';
const WHITE      = '#ffffff';

// hex → r,g,b
function hex(h: string): [number, number, number] {
  const n = parseInt(h.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function setFill(doc: jsPDF, h: string) { doc.setFillColor(...hex(h)); }
function setDraw(doc: jsPDF, h: string) { doc.setDrawColor(...hex(h)); }
function setTextColor(doc: jsPDF, h: string) { doc.setTextColor(...hex(h)); }

export async function generateCertificatePDF(data: CertificateData): Promise<void> {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  const W = 297; // A4 landscape width
  const H = 210; // A4 landscape height

  const completionFormatted = format(new Date(data.completionDate), 'dd MMMM yyyy');
  const expiryDate = data.expiryMonths
    ? format(addMonths(new Date(data.completionDate), data.expiryMonths), 'dd MMMM yyyy')
    : null;

  // ── Background ──────────────────────────────────────────────────────────────
  setFill(doc, WHITE);
  doc.rect(0, 0, W, H, 'F');

  // Navy left accent stripe
  setFill(doc, BLUE_DARK);
  doc.rect(0, 0, 14, H, 'F');

  // Right accent stripe (thinner)
  setFill(doc, BLUE);
  doc.rect(W - 6, 0, 6, H, 'F');

  // Top and bottom decorative bars
  setFill(doc, BLUE);
  doc.rect(14, 0, W - 20, 4, 'F');
  setFill(doc, BLUE_DARK);
  doc.rect(14, H - 4, W - 20, 4, 'F');

  // Subtle background pattern — diagonal watermark lines
  doc.setGState(new (doc as any).GState({ opacity: 0.03 }));
  setDraw(doc, BLUE);
  doc.setLineWidth(0.4);
  for (let x = 14; x < W - 6; x += 18) {
    doc.line(x, 4, x + 30, H - 4);
  }
  doc.setGState(new (doc as any).GState({ opacity: 1 }));

  // Outer border frame (double border effect)
  setDraw(doc, BLUE);
  doc.setLineWidth(0.8);
  doc.rect(18, 8, W - 28, H - 16, 'S');
  doc.setLineWidth(0.3);
  doc.rect(20, 10, W - 44, H - 20, 'S'); // inner rect — leaves space for QR

  // ── Logo area (top-left, inside stripe) ─────────────────────────────────────
  const logoX = 26;
  const logoY = 16;

  // Logo square
  setFill(doc, BLUE);
  doc.roundedRect(logoX, logoY, 16, 16, 2, 2, 'F');
  setTextColor(doc, WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('SG', logoX + 8, logoY + 10.5, { align: 'center' });

  // SkillGuardian text beside logo
  setTextColor(doc, BLUE_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('SkillGuardian', logoX + 20, logoY + 9);
  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('CQC-Compliant Training Platform', logoX + 20, logoY + 14);

  // ── Title block ──────────────────────────────────────────────────────────────
  setTextColor(doc, SLATE_LIGHT);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setCharSpace(2);
  doc.text('CERTIFICATE OF COMPLETION', W / 2 - 22, 32, { align: 'center' });
  doc.setCharSpace(0);

  // Blue divider under title
  setDraw(doc, BLUE);
  doc.setLineWidth(1.2);
  doc.line(W / 2 - 40, 35, W / 2 + 18, 35);
  doc.setLineWidth(0.3);

  // ── Presented to ────────────────────────────────────────────────────────────
  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('This is to certify that', W / 2 - 22, 44, { align: 'center' });

  // Employee name — large italic
  setTextColor(doc, SLATE);
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(28);
  doc.text(data.employeeName, W / 2 - 22, 58, { align: 'center' });

  // Name underline
  setDraw(doc, SLATE_LIGHT);
  doc.setLineWidth(0.3);
  const nameWidth = doc.getTextWidth(data.employeeName);
  doc.line(W / 2 - 22 - nameWidth / 2, 61, W / 2 - 22 + nameWidth / 2, 61);

  // ── Has completed ────────────────────────────────────────────────────────────
  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('has successfully completed', W / 2 - 22, 69, { align: 'center' });

  // Course name
  setTextColor(doc, BLUE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);

  // Wrap long course names
  const maxCourseWidth = 160;
  const courseLines = doc.splitTextToSize(data.courseName, maxCourseWidth);
  const courseY = 79;
  doc.text(courseLines, W / 2 - 22, courseY, { align: 'center' });
  const courseBottomY = courseY + (courseLines.length - 1) * 7;

  // ── Metadata row ─────────────────────────────────────────────────────────────
  const metaY = courseBottomY + 14;

  // Light background bar for meta
  setFill(doc, BLUE_LIGHT);
  doc.roundedRect(22, metaY - 5, W - 50, 18, 2, 2, 'F');

  const metaItems: { label: string; value: string }[] = [
    { label: 'Completion Date', value: completionFormatted },
    ...(expiryDate ? [{ label: 'Valid Until', value: expiryDate }] : []),
    { label: 'Organisation', value: data.organisationName || 'Independent' },
  ];

  const metaCols = metaItems.length;
  const metaSlotW = (W - 50) / metaCols;
  const metaStartX = 22;

  metaItems.forEach((item, idx) => {
    const cx = metaStartX + metaSlotW * idx + metaSlotW / 2;

    // Vertical divider between items
    if (idx > 0) {
      setDraw(doc, BLUE);
      doc.setLineWidth(0.2);
      doc.line(metaStartX + metaSlotW * idx, metaY - 3, metaStartX + metaSlotW * idx, metaY + 10);
    }

    setTextColor(doc, SLATE_LIGHT);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setCharSpace(1);
    doc.text(item.label.toUpperCase(), cx, metaY + 1, { align: 'center' });
    doc.setCharSpace(0);

    setTextColor(doc, SLATE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(item.value, cx, metaY + 8, { align: 'center' });
  });

  // ── Signature line & approved by ────────────────────────────────────────────
  const sigY = metaY + 26;
  const sigX = 36;

  setDraw(doc, SLATE_LIGHT);
  doc.setLineWidth(0.4);
  doc.line(sigX, sigY, sigX + 55, sigY);

  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(data.approvedByName ? data.approvedByName : 'Approved Manager', sigX + 27, sigY + 4, { align: 'center' });
  doc.text('Authorised Signatory', sigX + 27, sigY + 8, { align: 'center' });

  // ── Certificate ID ───────────────────────────────────────────────────────────
  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(`Certificate ID: ${data.certificateId}`, W / 2 - 22, sigY + 4, { align: 'center' });

  // Compliance badges row
  const badgeY = sigY + 11;
  const badges = ['CQC Compliant', 'SkillGuardian Certified', 'NMC CPD Eligible'];
  const badgeSlot = 46;
  const badgesStartX = W / 2 - 22 - (badgeSlot * badges.length) / 2 + badgeSlot / 2;

  badges.forEach((badge, i) => {
    const bx = badgesStartX + i * badgeSlot;
    setFill(doc, BLUE_LIGHT);
    setDraw(doc, BLUE);
    doc.setLineWidth(0.2);
    doc.roundedRect(bx - 18, badgeY - 3, 36, 7, 1, 1, 'FD');
    setTextColor(doc, BLUE_DARK);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.text(badge, bx, badgeY + 1, { align: 'center' });
  });

  // ── QR Code ──────────────────────────────────────────────────────────────────
  // Verification URL — when scanned shows the certificate on SkillGuardian
  const verifyUrl = `https://skillguardian.com/verify/${data.certificateId}`;

  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 256,
    margin: 1,
    color: { dark: '#004a93', light: '#ffffff' },
    errorCorrectionLevel: 'H',
  });

  // QR panel — right side
  const qrPanelX = W - 42;
  const qrPanelY = 10;
  const qrPanelW = 20;
  const qrPanelH = H - 20;

  setFill(doc, BLUE_LIGHT);
  doc.rect(qrPanelX - 2, qrPanelY, qrPanelW + 4, qrPanelH, 'F');

  // QR image
  const qrSize = 22;
  const qrX = qrPanelX + (qrPanelW - qrSize) / 2;
  const qrY = qrPanelY + (qrPanelH - qrSize) / 2 - 8;
  doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

  // Label above QR
  setTextColor(doc, BLUE_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.text('VERIFY', qrPanelX + qrPanelW / 2, qrY - 4, { align: 'center' });
  doc.text('CERTIFICATE', qrPanelX + qrPanelW / 2, qrY - 1, { align: 'center' });

  // Label below QR
  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.text('Scan to verify', qrPanelX + qrPanelW / 2, qrY + qrSize + 3, { align: 'center' });
  doc.text('authenticity', qrPanelX + qrPanelW / 2, qrY + qrSize + 6, { align: 'center' });

  // Cert ID below that
  setTextColor(doc, SLATE_LIGHT);
  doc.setFont('courier', 'normal');
  doc.setFontSize(4.5);
  const shortId = data.certificateId.replace('SG-', '');
  doc.text(shortId, qrPanelX + qrPanelW / 2, qrY + qrSize + 10, { align: 'center' });

  // Vertical "skillguardian.com" text along the right stripe
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  setTextColor(doc, WHITE);
  doc.text('skillguardian.com', W - 3, H / 2, {
    angle: 270,
    align: 'center',
  });

  // ── Footer ───────────────────────────────────────────────────────────────────
  setTextColor(doc, SLATE_LIGHT);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text(
    `This certificate was issued by SkillGuardian on ${completionFormatted} and is valid for verification at skillguardian.com/verify/${data.certificateId}`,
    W / 2 - 22,
    H - 7,
    { align: 'center', maxWidth: W - 60 }
  );

  // ── Save / download ──────────────────────────────────────────────────────────
  const filename = `${data.certificateId}-${data.employeeName.replace(/\s+/g, '-')}-${data.courseName.replace(/\s+/g, '-').substring(0, 30)}.pdf`;
  doc.save(filename);
}

// ── Care Certificate Portfolio PDF (all 16 standards on one cert) ─────────────

export interface PortfolioCertificateData {
  employeeName: string;
  completionDate: string;
  certificateId: string;
  organisationName: string;
  approvedByName?: string;
}

export async function generatePortfolioCertificatePDF(data: PortfolioCertificateData): Promise<void> {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const W = 297;
  const H = 210;

  const completionFormatted = format(new Date(data.completionDate), 'dd MMMM yyyy');

  // ── Background ───────────────────────────────────────────────────────────────
  setFill(doc, WHITE);
  doc.rect(0, 0, W, H, 'F');

  // Amber/gold accent stripe left (distinct from standard blue)
  const GOLD        = '#b45309';
  const GOLD_LIGHT  = '#fef9ee';
  const GOLD_MID    = '#d97706';

  doc.setFillColor(180, 83, 9);
  doc.rect(0, 0, 14, H, 'F');
  doc.setFillColor(217, 119, 6);
  doc.rect(W - 6, 0, 6, H, 'F');

  // Top/bottom bars
  doc.setFillColor(217, 119, 6);
  doc.rect(14, 0, W - 20, 4, 'F');
  doc.setFillColor(180, 83, 9);
  doc.rect(14, H - 4, W - 20, 4, 'F');

  // Outer border frame
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.8);
  doc.rect(18, 8, W - 28, H - 16, 'S');
  doc.setLineWidth(0.3);
  doc.rect(20, 10, W - 44, H - 20, 'S');

  // ── Logo area ────────────────────────────────────────────────────────────────
  const logoX = 26;
  const logoY = 14;

  setFill(doc, BLUE);
  doc.roundedRect(logoX, logoY, 16, 16, 2, 2, 'F');
  setTextColor(doc, WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('SG', logoX + 8, logoY + 10.5, { align: 'center' });

  setTextColor(doc, BLUE_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('SkillGuardian', logoX + 20, logoY + 9);
  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Healthcare Training Platform', logoX + 20, logoY + 14);

  // Portfolio badge top-right
  doc.setFillColor(254, 249, 238);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.5);
  doc.roundedRect(W - 70, logoY, 46, 16, 2, 2, 'FD');
  doc.setTextColor(180, 83, 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('CARE CERTIFICATE', W - 47, logoY + 7, { align: 'center' });
  doc.setFontSize(6);
  doc.text('ALL 16 STANDARDS', W - 47, logoY + 12, { align: 'center' });

  // ── Title block ──────────────────────────────────────────────────────────────
  setTextColor(doc, SLATE_LIGHT);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setCharSpace(2);
  doc.text('PORTFOLIO CERTIFICATE OF ACHIEVEMENT', W / 2 - 22, 38, { align: 'center' });
  doc.setCharSpace(0);

  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(1.2);
  doc.line(W / 2 - 52, 41, W / 2 + 8, 41);
  doc.setLineWidth(0.3);

  // ── Presented to ────────────────────────────────────────────────────────────
  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('This is to certify that', W / 2 - 22, 49, { align: 'center' });

  setTextColor(doc, SLATE);
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(26);
  doc.text(data.employeeName, W / 2 - 22, 62, { align: 'center' });

  setDraw(doc, SLATE_LIGHT);
  doc.setLineWidth(0.3);
  const nameWidth = doc.getTextWidth(data.employeeName);
  doc.line(W / 2 - 22 - nameWidth / 2, 65, W / 2 - 22 + nameWidth / 2, 65);

  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('has successfully completed all 16 standards of the', W / 2 - 22, 73, { align: 'center' });

  doc.setTextColor(180, 83, 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('Care Certificate', W / 2 - 22, 82, { align: 'center' });

  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('as issued by Skills for Care, in accordance with the Health and Care Act 2022', W / 2 - 22, 89, { align: 'center' });

  // ── Standards grid (2 columns, 8 per column) ─────────────────────────────────
  const col1X = 26;
  const col2X = 156;
  let rowY = 97;
  const rowH = 7.2;

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');

  CARE_CERT_STANDARDS.forEach((std, idx) => {
    const x = idx < 8 ? col1X : col2X;
    const y = rowY + (idx < 8 ? idx : idx - 8) * rowH;

    // Tick circle
    doc.setFillColor(254, 249, 238);
    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(0.3);
    doc.circle(x + 2.5, y - 1.2, 2.2, 'FD');

    // Tick mark
    doc.setDrawColor(180, 83, 9);
    doc.setLineWidth(0.5);
    doc.line(x + 1.4, y - 1.2, x + 2.2, y - 0.3);
    doc.line(x + 2.2, y - 0.3, x + 3.6, y - 2.2);

    setTextColor(doc, SLATE);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.text(std, x + 7, y - 0.2);
  });

  // ── Metadata row ─────────────────────────────────────────────────────────────
  const metaY = H - 38;

  doc.setFillColor(254, 249, 238);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.3);
  doc.roundedRect(22, metaY, W - 50, 16, 2, 2, 'FD');

  const metaItems = [
    { label: 'Completion Date', value: completionFormatted },
    { label: 'Organisation', value: data.organisationName || 'Independent' },
    { label: 'Standards Completed', value: '16 / 16' },
  ];

  const metaSlotW = (W - 50) / metaItems.length;
  metaItems.forEach((item, idx) => {
    const cx = 22 + metaSlotW * idx + metaSlotW / 2;
    if (idx > 0) {
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(0.2);
      doc.line(22 + metaSlotW * idx, metaY + 2, 22 + metaSlotW * idx, metaY + 13);
    }
    setTextColor(doc, SLATE_LIGHT);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setCharSpace(1);
    doc.text(item.label.toUpperCase(), cx, metaY + 5, { align: 'center' });
    doc.setCharSpace(0);
    setTextColor(doc, SLATE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(item.value, cx, metaY + 12, { align: 'center' });
  });

  // ── Signature line ────────────────────────────────────────────────────────────
  const sigY = metaY + 22;
  const sigX = 36;

  setDraw(doc, SLATE_LIGHT);
  doc.setLineWidth(0.4);
  doc.line(sigX, sigY, sigX + 55, sigY);
  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(data.approvedByName ?? 'Authorised Manager', sigX + 27, sigY + 4, { align: 'center' });
  doc.text('Authorised Signatory', sigX + 27, sigY + 8, { align: 'center' });

  // Certificate ID centre
  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(`Certificate ID: ${data.certificateId}`, W / 2 - 22, sigY + 4, { align: 'center' });

  // Compliance badges
  const badges = ['Skills for Care Aligned', 'SkillGuardian Certified', 'Health & Care Act 2022'];
  const badgeSlot = 52;
  const badgesStartX = W / 2 - 22 - (badgeSlot * badges.length) / 2 + badgeSlot / 2;
  badges.forEach((badge, i) => {
    const bx = badgesStartX + i * badgeSlot;
    doc.setFillColor(254, 249, 238);
    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(0.2);
    doc.roundedRect(bx - 22, sigY + 10, 44, 7, 1, 1, 'FD');
    doc.setTextColor(180, 83, 9);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.text(badge, bx, sigY + 15, { align: 'center' });
  });

  // ── QR Code ──────────────────────────────────────────────────────────────────
  const verifyUrl = `https://skillguardian.com/verify/${data.certificateId}`;
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 256,
    margin: 1,
    color: { dark: '#b45309', light: '#ffffff' },
    errorCorrectionLevel: 'H',
  });

  const qrPanelX = W - 42;
  const qrPanelW = 20;
  doc.setFillColor(254, 249, 238);
  doc.rect(qrPanelX - 2, 10, qrPanelW + 4, H - 20, 'F');

  const qrSize = 22;
  const qrX = qrPanelX + (qrPanelW - qrSize) / 2;
  const qrY = 10 + (H - 20 - qrSize) / 2 - 8;
  doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

  doc.setTextColor(180, 83, 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.text('VERIFY', qrPanelX + qrPanelW / 2, qrY - 4, { align: 'center' });
  doc.text('CERTIFICATE', qrPanelX + qrPanelW / 2, qrY - 1, { align: 'center' });

  setTextColor(doc, SLATE_MID);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.text('Scan to verify', qrPanelX + qrPanelW / 2, qrY + qrSize + 3, { align: 'center' });
  doc.text('authenticity', qrPanelX + qrPanelW / 2, qrY + qrSize + 6, { align: 'center' });

  setTextColor(doc, SLATE_LIGHT);
  doc.setFont('courier', 'normal');
  doc.setFontSize(4.5);
  doc.text(data.certificateId.replace('SG-', ''), qrPanelX + qrPanelW / 2, qrY + qrSize + 10, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  setTextColor(doc, WHITE);
  doc.text('skillguardian.com', W - 3, H / 2, { angle: 270, align: 'center' });

  // ── Footer ───────────────────────────────────────────────────────────────────
  setTextColor(doc, SLATE_LIGHT);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text(
    `This Care Certificate Portfolio was issued by SkillGuardian on ${completionFormatted} and is valid for verification at skillguardian.com/verify/${data.certificateId}`,
    W / 2 - 22, H - 7,
    { align: 'center', maxWidth: W - 60 }
  );

  const filename = `${data.certificateId}-${data.employeeName.replace(/\s+/g, '-')}-Care-Certificate-Portfolio.pdf`;
  doc.save(filename);
}
