import { CourseTargetRole, ProfessionalRole } from './types';

/**
 * Returns true if a course with the given target_role is visible
 * to a user with the given professional_role.
 *
 * Rules:
 *  all_staff          → everyone
 *  carers_only        → care_assistant, senior_carer
 *  nurses_only        → rgn, rmn, nurse_associate, clinical_lead
 *  managers_only      → manager
 *  managers_and_seniors → manager, senior_carer
 */
export function isCourseVisibleForRole(
  targetRole: CourseTargetRole,
  professionalRole: ProfessionalRole,
): boolean {
  switch (targetRole) {
    case 'all_staff':
      return true;
    case 'carers_only':
      return professionalRole === 'care_assistant' || professionalRole === 'senior_carer';
    case 'nurses_only':
      return (
        professionalRole === 'rgn' ||
        professionalRole === 'rmn' ||
        professionalRole === 'nurse_associate' ||
        professionalRole === 'clinical_lead'
      );
    case 'managers_only':
      return professionalRole === 'manager';
    case 'managers_and_seniors':
      return professionalRole === 'manager' || professionalRole === 'senior_carer';
    default:
      return false;
  }
}

export const targetRoleLabel: Record<CourseTargetRole, string> = {
  all_staff:            'All Staff',
  carers_only:          'Carers',
  nurses_only:          'Nurses',
  managers_only:        'Managers',
  managers_and_seniors: 'Managers & Senior Carers',
};
