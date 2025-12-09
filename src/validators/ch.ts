import { PhoneValidator } from "../types";

/**
 * Validates Swiss phone numbers (mobile and landline).
 *
 * Rules:
 * - Mobile: 10 digits starting with 07x
 * - Landline: 10 digits with area codes (e.g., 044-Zurich, 031-Bern)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+41 prefix)
 *
 * Mobile prefixes: 074-079
 * Major area codes:
 * - 044: Zurich
 * - 031: Bern
 * - 061: Basel
 * - 021: Lausanne
 *
 * @example
 * validateCH("079 123 45 67") // true (mobile)
 * validateCH("044 123 45 67") // true (landline - Zurich)
 * validateCH("+41 79 123 45 67") // true (international mobile)
 * validateCH("+41 44 123 45 67") // true (international landline)
 */
export const validateCH: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");

  // Remove country code if present (+41)
  if (digits.startsWith("41")) {
    digits = "0" + digits.slice(2);
  }

  // Must be 10 digits starting with 0
  if (!/^0\d{9}$/.test(digits)) {
    return false;
  }

  // Mobile: 07[4-9] followed by 7 digits (10 total)
  const isMobile = /^07[4-9]\d{7}$/.test(digits);

  // Landline: 0[1-6,8-9] followed by 8 digits (10 total)
  const isLandline = /^0[1-6,8-9]\d{8}$/.test(digits);

  return isMobile || isLandline;
};
