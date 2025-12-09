import { PhoneValidator } from "../types";

/**
 * Validates Philippine phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 11 digits starting with 09xx
 * - Landline: 10 digits with area codes (e.g., 02-Manila, 032-Cebu)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+63 prefix)
 * 
 * Mobile prefixes: 0905-0999 (various operators)
 * Major area codes:
 * - 02: Metro Manila
 * - 032: Cebu
 * - 082: Davao
 * - 045: Pampanga
 * 
 * @example
 * validatePH("0917 123 4567") // true (mobile)
 * validatePH("02 1234 5678") // true (landline - Manila)
 * validatePH("+63 917 123 4567") // true (international mobile)
 * validatePH("+63 2 1234 5678") // true (international landline)
 */
export const validatePH: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+63)
  if (digits.startsWith("63")) {
    digits = "0" + digits.slice(2);
  }
  
  // Philippine numbers: 10-11 digits starting with 0
  if (!/^0\d{9,10}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 09xx followed by 8 digits (11 total)
  const isMobile = /^09\d{9}$/.test(digits);
  
  // Landline: 0[2-8] (not 09) followed by 7-9 digits (9-11 total)
  const isLandline = /^0[2-8]\d{7,9}$/.test(digits);
  
  return isMobile || isLandline;
};

