import { PhoneValidator } from "../types";

/**
 * Validates UK mobile phone numbers.
 *
 * Rules:
 * - Must start with 07, followed by 1-9 (not 0)
 * - Valid patterns: 071, 072, 073, 074, 075, 076, 077, 078, 079
 * - 070 is NOT standard mobile (personal numbers)
 * - Must be 11 digits total (or 12-13 with country code)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+44 prefix)
 *
 * Note: This validates UK mobile numbers only, not landlines.
 *
 * @example
 * validateGB("07123 456789") // true
 * validateGB("07912345678") // true
 * validateGB("+44 7912 345678") // true
 * validateGB("07012345678") // false (070 is personal numbers, not mobile)
 * validateGB("08123456789") // false (doesn't start with 07)
 */
export const validateGB: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");

  // Remove country code if present (+44)
  // UK mobile in international format: +44 7xxx instead of 07xxx
  if (digits.startsWith("44") && digits.length > 11) {
    digits = "0" + digits.slice(2);
  }

  // Must start with 07, followed by 1-9 (not 0), then 9 more digits
  return /^07[1-9]\d{8}$/.test(digits);
};
