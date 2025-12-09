import { PhoneValidator } from "../types";

/**
 * Validates Montenegro phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 8 digits starting with 6x
 * - Landline: 8 digits with area codes (e.g., 20-Podgorica, 30-Nikšić)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+382 prefix)
 * 
 * Mobile prefixes: 61-69
 * Major area codes:
 * - 20: Podgorica
 * - 30: Nikšić
 * - 32: Herceg Novi
 * - 33: Budva
 * 
 * @example
 * validateME("067 123 456") // true (mobile)
 * validateME("20 123 456") // true (landline - Podgorica)
 * validateME("+382 67 123 456") // true (international mobile)
 * validateME("+382 20 123 456") // true (international landline)
 */
export const validateME: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+382)
  if (digits.startsWith("382")) {
    digits = "0" + digits.slice(3);
  }
  
  // Montenegro numbers: 9 digits starting with 0
  if (!/^0?\d{8}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 06[0-9] followed by 6 digits (9 total with leading 0)
  const isMobile = /^0?6[0-9]\d{6}$/.test(digits);
  
  // Landline: 0?[2-5] followed by 6 digits (8-9 total with optional leading 0)
  const isLandline = /^0?[2-5]\d{6,7}$/.test(digits);
  
  return isMobile || isLandline;
};

