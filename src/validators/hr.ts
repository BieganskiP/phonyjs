import { PhoneValidator } from "../types";

/**
 * Validates Croatian phone numbers (mobile and landline).
 *
 * Rules:
 * - Mobile: 9 digits starting with 9x (e.g., 91, 92, 95, 97, 98, 99)
 * - Landline: 9 digits with area codes (e.g., 1-Zagreb, 21-Split, 31-Osijek)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+385 prefix)
 *
 * Mobile prefixes: 91, 92, 95, 97, 98, 99
 * Major area codes:
 * - 1: Zagreb
 * - 21: Split
 * - 31: Osijek
 * - 51: Rijeka
 *
 * @example
 * validateHR("091 123 4567") // true (mobile)
 * validateHR("01 234 5678") // true (landline - Zagreb)
 * validateHR("+385 91 123 4567") // true (international mobile)
 * validateHR("+385 1 234 5678") // true (international landline)
 */
export const validateHR: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");

  // Remove country code if present (+385)
  if (digits.startsWith("385")) {
    digits = "0" + digits.slice(3);
  }

  // Croatian numbers: 9-10 digits starting with 0
  if (!/^0\d{8,9}$/.test(digits)) {
    return false;
  }

  // Mobile: 09[1-9] followed by 6-7 digits (9-10 total)
  const isMobile = /^09[1-9]\d{6,7}$/.test(digits);

  // Landline: 0[1-8] followed by 6-8 digits (8-10 total)
  const isLandline = /^0[1-8]\d{6,8}$/.test(digits) && !isMobile;

  return isMobile || isLandline;
};
