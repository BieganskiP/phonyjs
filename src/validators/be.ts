import { PhoneValidator } from "../types";

/**
 * Validates Belgian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 04xx
 * - Landline: 9 digits with area codes (e.g., 02-Brussels, 03-Antwerp)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+32 prefix)
 * 
 * Mobile prefixes: 046-049
 * Major area codes:
 * - 02: Brussels
 * - 03: Antwerp
 * - 04: Liège
 * - 09: Ghent
 * 
 * @example
 * validateBE("0470 12 34 56") // true (mobile)
 * validateBE("02 123 45 67") // true (landline - Brussels)
 * validateBE("+32 470 12 34 56") // true (international mobile)
 * validateBE("+32 2 123 45 67") // true (international landline)
 */
export const validateBE: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+32)
  if (digits.startsWith("32")) {
    digits = "0" + digits.slice(2);
  }
  
  // Belgian numbers: 9-10 digits starting with 0
  if (!/^0\d{8,9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 04[5-9] followed by 7 digits (10 total)
  const isMobile = /^04[5-9]\d{7}$/.test(digits);
  
  // Landline: 0[1-3,9] followed by 7-8 digits (9-10 total)
  const isLandline = /^0[1-3,9]\d{7,8}$/.test(digits);
  
  return isMobile || isLandline;
};

