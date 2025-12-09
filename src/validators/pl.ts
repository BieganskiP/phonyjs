import { PhoneValidator } from "../types";

/**
 * Validates Polish phone numbers.
 *
 * Rules:
 * - Must contain exactly 9 digits
 * - Mobile numbers start with 4, 5, 6, 7, or 8
 * - Cannot start with 9 (reserved for special services)
 * - Cannot start with 1, 2, 3 (landline area codes)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+48 prefix)
 *
 * @example
 * validatePL("500 123 456") // true (mobile)
 * validatePL("600123456") // true (mobile)
 * validatePL("+48 700 123 456") // true (mobile, international)
 * validatePL("900 123 456") // false (reserved for special services)
 * validatePL("123456789") // false (landline area code format)
 */
export const validatePL: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");

  // Remove country code if present (+48)
  if (digits.startsWith("48") && digits.length > 9) {
    digits = digits.slice(2);
  }

  // Must be 9 digits starting with 4, 5, 6, 7, or 8 (mobile numbers)
  return /^[4-8]\d{8}$/.test(digits);
};
