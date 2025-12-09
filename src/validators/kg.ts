import { PhoneValidator } from "../types";

/**
 * Validates Kyrgyzstan phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 5, 7
 * - Landline: 9 digits with area codes (e.g., 312-Bishkek, 3722-Osh)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+996 prefix)
 * 
 * Mobile prefixes: 5xx, 7xx
 * Major area codes:
 * - 312: Bishkek
 * - 3722: Osh
 * - 3922: Jalal-Abad
 * 
 * @example
 * validateKG("555 123 456") // true (mobile)
 * validateKG("312 123 456") // true (landline - Bishkek)
 * validateKG("+996 555 123 456") // true (international mobile)
 * validateKG("+996 312 123 456") // true (international landline)
 */
export const validateKG: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+996)
  if (digits.startsWith("996")) {
    digits = digits.slice(3);
  }
  
  // Kyrgyzstan numbers: 9 digits
  if (!/^\d{9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: starts with 5, 7
  const isMobile = /^[57]\d{8}$/.test(digits);
  
  // Landline: starts with 3 (area codes)
  const isLandline = /^3\d{8}$/.test(digits);
  
  return isMobile || isLandline;
};

