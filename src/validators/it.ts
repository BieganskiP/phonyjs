import { PhoneValidator } from "../types";

/**
 * Validates Italian phone numbers (mobile and landline).
 *
 * Rules:
 * - Mobile: 10 digits starting with 3
 * - Landline: 9-11 digits starting with 0, followed by area code
 * - Common area codes: 02 (Milan), 06 (Rome), 055 (Florence), 081 (Naples)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+39 prefix)
 *
 * @example
 * validateIT("320 123 4567") // true (mobile)
 * validateIT("02 1234 5678") // true (landline - Milan)
 * validateIT("06 1234 5678") // true (landline - Rome)
 * validateIT("+39 320 123 4567") // true (international mobile)
 * validateIT("+39 02 1234 5678") // true (international landline)
 */
export const validateIT: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");

  // Remove country code if present (+39)
  if (digits.startsWith("39") && digits.length > 9) {
    digits = digits.slice(2);
  }

  // Mobile: 3 + 9 digits (10 total)
  // Landline: 0 + area code + number (9-11 digits total)
  return /^(3\d{9}|0\d{8,10})$/.test(digits);
};
