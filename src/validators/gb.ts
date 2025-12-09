import { PhoneValidator } from "../types";

/**
 * Validates UK phone numbers (mobile and landline).
 *
 * Rules:
 * - Mobile: Start with 07, followed by 1-9 (not 0), 11 digits total
 * - Landline: Start with 01, 02, or 03, 10-11 digits total
 * - 070 is NOT standard mobile (personal numbers)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+44 prefix)
 *
 * @example
 * validateGB("07123 456789") // true (mobile)
 * validateGB("0201234567") // true (landline - London)
 * validateGB("01612345678") // true (landline - Manchester)
 * validateGB("+44 20 1234 5678") // true (international landline)
 * validateGB("07012345678") // false (070 is personal numbers)
 */
export const validateGB: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");

  // Remove country code if present (+44)
  if (digits.startsWith("44") && digits.length > 10) {
    digits = "0" + digits.slice(2);
  }

  // Mobile: 07[1-9] + 8 digits (11 total)
  // Landline: 01/02/03 + 8-9 digits (10-11 total)
  return /^(07[1-9]\d{8}|0[123]\d{8,9})$/.test(digits);
};
