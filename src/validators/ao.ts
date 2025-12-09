import { PhoneValidator } from "../types";

/**
 * Validates Angolan phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 9x
 * - Landline: 9 digits starting with 2x
 * - Non-digit characters are stripped before validation
 * - Handles international format (+244 prefix)
 * 
 * Mobile prefixes: 91-94
 * Landline prefixes: 22 (Luanda), 23x (other regions)
 * 
 * @example
 * validateAO("923 123 456") // true (mobile)
 * validateAO("222 123 456") // true (landline - Luanda)
 * validateAO("+244 923 123 456") // true (international mobile)
 * validateAO("+244 222 123 456") // true (international landline)
 */
export const validateAO: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+244)
  if (digits.startsWith("244")) {
    digits = digits.slice(3);
  }
  
  // Angolan numbers: 9 digits
  if (!/^\d{9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 9[0-9] followed by 7 digits (9 total)
  const isMobile = /^9\d{8}$/.test(digits);
  
  // Landline: 2[0-9] followed by 7 digits (9 total)
  const isLandline = /^2\d{8}$/.test(digits);
  
  return isMobile || isLandline;
};

