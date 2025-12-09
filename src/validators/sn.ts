import { PhoneValidator } from "../types";

/**
 * Validates Senegalese phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 7x or 70
 * - Landline: 9 digits starting with 3x
 * - Non-digit characters are stripped before validation
 * - Handles international format (+221 prefix)
 * 
 * Mobile prefixes: 70-79
 * Landline prefixes: 30-39
 * 
 * @example
 * validateSN("77 123 45 67") // true (mobile)
 * validateSN("33 123 45 67") // true (landline)
 * validateSN("+221 77 123 45 67") // true (international mobile)
 * validateSN("+221 33 123 45 67") // true (international landline)
 */
export const validateSN: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+221)
  if (digits.startsWith("221")) {
    digits = digits.slice(3);
  }
  
  // Senegalese numbers: 9 digits
  if (!/^\d{9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 7[0-9] followed by 7 digits (9 total)
  const isMobile = /^7\d{8}$/.test(digits);
  
  // Landline: 3[0-9] followed by 7 digits (9 total)
  const isLandline = /^3\d{8}$/.test(digits);
  
  return isMobile || isLandline;
};

