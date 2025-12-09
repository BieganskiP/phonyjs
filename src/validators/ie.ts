import { PhoneValidator } from "../types";

/**
 * Validates Irish phone numbers (mobile and landline).
 *
 * Rules:
 * - Mobile: 9 digits starting with 8 (08x)
 * - Landline: 9 digits with area codes (01-Dublin, 021-Cork, etc.)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+353 prefix)
 *
 * Mobile prefixes: 083, 085, 086, 087, 089
 * Major area codes:
 * - 01: Dublin
 * - 021: Cork
 * - 091: Galway
 * - 061: Limerick
 *
 * @example
 * validateIE("087 123 4567") // true (mobile)
 * validateIE("01 123 4567") // true (landline - Dublin)
 * validateIE("+353 87 123 4567") // true (international mobile)
 * validateIE("+353 1 123 4567") // true (international landline)
 */
export const validateIE: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");

  // Remove country code if present (+353)
  if (digits.startsWith("353")) {
    digits = "0" + digits.slice(3);
  }

  // Irish numbers: 9-10 digits starting with 0 (domestic format)
  if (!/^0\d{8,9}$/.test(digits)) {
    return false;
  }

  // Mobile: 08[3-9] followed by 7 digits (10 total)
  const isMobile = /^08[3-9]\d{7}$/.test(digits);

  // Landline: 0[1-7,9] (not 08) followed by 6-8 digits (9-10 total)
  // Valid: 01, 02x, 04x, 05x, 06x, 07x, 09x
  // Invalid: 08x (mobile), 097 (invalid area code)
  const isLandline = /^0(?:[1-7]|9[0-6,8-9])\d{6,8}$/.test(digits);

  return isMobile || isLandline;
};
