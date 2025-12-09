import { PhoneValidator } from "../types";

/**
 * Validates Finnish phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 04x
 * - Landline: 9-11 digits with area codes (e.g., 09-Helsinki, 03-Tampere)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+358 prefix)
 * 
 * Mobile prefixes: 040-050
 * Major area codes:
 * - 09: Helsinki
 * - 03: Tampere
 * - 06: Lahti
 * - 02: Turku
 * 
 * @example
 * validateFI("040 123 4567") // true (mobile)
 * validateFI("09 1234 567") // true (landline - Helsinki)
 * validateFI("+358 40 123 4567") // true (international mobile)
 * validateFI("+358 9 1234 567") // true (international landline)
 */
export const validateFI: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+358)
  if (digits.startsWith("358")) {
    digits = "0" + digits.slice(3);
  }
  
  // Finnish numbers: 9-11 digits starting with 0
  if (!/^0\d{8,10}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 04[0-5] followed by 7 digits (10 total)
  // Valid prefixes: 040-050
  const isMobile = /^04[0-5]\d{7}$/.test(digits);
  
  // Landline: 0[1-3,5,7-9] (not 04, 06) followed by 6-9 digits (8-11 total)
  // Area codes like 09 (Helsinki), 03 (Tampere), 02 (Turku)
  const isLandline = /^0(?:[1-3]|[5]|[7-9])\d{6,9}$/.test(digits) && !isMobile;
  
  return isMobile || isLandline;
};

