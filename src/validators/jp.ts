import { PhoneValidator } from "../types";

/**
 * Validates Japanese phone numbers (mobile and landline).
 *
 * Rules:
 * - Mobile: 11 digits starting with 070, 080, or 090
 * - Landline: 10 digits with area codes (03-Tokyo, 06-Osaka, 045-Yokohama, etc.)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+81 prefix)
 *
 * Mobile prefixes:
 * - 070: Mobile (newer allocations)
 * - 080: Mobile
 * - 090: Mobile
 *
 * @example
 * validateJP("090 1234 5678") // true (mobile)
 * validateJP("03 1234 5678") // true (landline - Tokyo)
 * validateJP("06 1234 5678") // true (landline - Osaka)
 * validateJP("+81 90 1234 5678") // true (international mobile)
 * validateJP("+81 3 1234 5678") // true (international landline)
 */
export const validateJP: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");

  // Remove country code if present (+81)
  // For landlines, international format drops the leading 0
  if (digits.startsWith("81")) {
    if (digits.length === 12 && /^81[789]0/.test(digits)) {
      // Mobile: +81 90 -> 090
      digits = "0" + digits.slice(2);
    } else if (digits.length >= 11) {
      // Landline: +81 3 -> 03
      digits = "0" + digits.slice(2);
    }
  }

  // Mobile: 0[789]0 + 8 digits (11 total)
  // Landline: 0[1-9] + 8-9 digits (10 total, or 9 for some areas)
  return /^(0[789]0\d{8}|0[1-9]\d{8,9})$/.test(digits);
};
