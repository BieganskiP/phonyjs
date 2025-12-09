import { PhoneValidator } from "../types";

/**
 * Validates Czech phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 6, 7
 * - Landline: 9 digits with area codes (e.g., 2-Prague region, 5-Moravia)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+420 prefix)
 * 
 * Mobile prefixes: 60x-77x
 * Major area codes:
 * - 2: Prague and Central Bohemia
 * - 3: West and South Bohemia
 * - 5: Moravia
 * 
 * @example
 * validateCZ("601 123 456") // true (mobile)
 * validateCZ("234 567 890") // true (landline - Prague)
 * validateCZ("+420 601 123 456") // true (international mobile)
 * validateCZ("+420 234 567 890") // true (international landline)
 */
export const validateCZ: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+420)
  if (digits.startsWith("420") && digits.length > 9) {
    digits = digits.slice(3);
  }
  
  // Must be 9 digits
  if (digits.length !== 9) {
    return false;
  }
  
  // Mobile: starts with 6 or 7
  const isMobile = /^[67]\d{8}$/.test(digits);
  
  // Landline: starts with 2-5 (area codes)
  const isLandline = /^[2-5]\d{8}$/.test(digits);
  
  return isMobile || isLandline;
};

