import { PhoneValidator } from "../types";

/**
 * Validates Austrian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 11-13 digits starting with 06xx
 * - Landline: 10-13 digits with area codes (e.g., 01-Vienna, 0316-Graz)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+43 prefix)
 * 
 * Mobile prefixes: 0650-0699, 0660-0699
 * Major area codes:
 * - 01: Vienna
 * - 0316: Graz
 * - 0512: Innsbruck
 * - 0662: Salzburg
 * 
 * @example
 * validateAT("0650 123 4567") // true (mobile)
 * validateAT("01 123 4567") // true (landline - Vienna)
 * validateAT("+43 650 123 4567") // true (international mobile)
 * validateAT("+43 1 123 4567") // true (international landline)
 */
export const validateAT: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+43)
  if (digits.startsWith("43")) {
    digits = "0" + digits.slice(2);
  }
  
  // Austrian numbers: 9-13 digits starting with 0
  if (!/^0\d{8,12}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 06[0-9]x followed by 7-9 digits (11-13 total)
  const isMobile = /^06[0-9]\d{8,10}$/.test(digits);
  
  // Landline: 0[1-9] (not 06) followed by varying digits (9-12 total)
  // Area codes: 1 (Vienna), 316 (Graz), 512 (Innsbruck), etc.
  // Note: 05xx can be valid area codes (e.g., 0512 Innsbruck)
  const isLandline = /^0[1-59]\d{7,11}$/.test(digits);
  
  return isMobile || isLandline;
};

