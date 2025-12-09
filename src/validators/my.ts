import { PhoneValidator } from "../types";

/**
 * Validates Malaysian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10-11 digits starting with 01x
 * - Landline: 9-10 digits with area codes (e.g., 03-Kuala Lumpur, 04-Penang)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+60 prefix)
 * 
 * Mobile prefixes: 010-019
 * Major area codes:
 * - 03: Kuala Lumpur/Selangor
 * - 04: Penang
 * - 07: Johor
 * 
 * @example
 * validateMY("012 345 6789") // true (mobile)
 * validateMY("03 1234 5678") // true (landline - KL)
 * validateMY("+60 12 345 6789") // true (international mobile)
 * validateMY("+60 3 1234 5678") // true (international landline)
 */
export const validateMY: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+60)
  if (digits.startsWith("60")) {
    digits = "0" + digits.slice(2);
  }
  
  // Malaysian numbers: 9-11 digits starting with 0
  if (!/^0\d{8,10}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 01[0-9] followed by 7-8 digits (10-11 total)
  const isMobile = /^01\d{8,9}$/.test(digits);
  
  // Landline: 0[2-9] (not 01) followed by 7-8 digits (9-10 total)
  const isLandline = /^0[2-9]\d{7,8}$/.test(digits);
  
  return isMobile || isLandline;
};

