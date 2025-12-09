import { PhoneValidator } from "../types";

/**
 * Validates UAE (United Arab Emirates) phone numbers (mobile and landline).
 *
 * Rules:
 * - Mobile: 9 digits starting with 50, 52, 54, 55, 56, or 58
 * - Landline: 8-9 digits with area codes (2-Abu Dhabi, 3-Al Ain, 4-Dubai, 6-Sharjah, 7-RAK, 9-other)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+971 prefix)
 *
 * Mobile carriers:
 * - Etisalat: 050, 052, 056
 * - du: 054, 055, 058
 *
 * @example
 * validateAE("050 123 4567") // true (mobile)
 * validateAE("04 234 5678") // true (landline - Dubai)
 * validateAE("02 123 4567") // true (landline - Abu Dhabi)
 * validateAE("+971 50 123 4567") // true (international mobile)
 * validateAE("+971 4 234 5678") // true (international landline)
 */
export const validateAE: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");

  // Remove country code if present (+971)
  if (digits.startsWith("971") && digits.length > 8) {
    digits = "0" + digits.slice(3);
  }

  // Mobile: 05[024568] + 7 digits (9 total)
  // Landline: 0[2-4679] + 7 digits (8-9 total)
  return /^(05[024568]\d{7}|0[2-4679]\d{6,7})$/.test(digits);
};
