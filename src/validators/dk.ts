import { PhoneValidator } from "../types";

/**
 * Validates Danish phone numbers (mobile and landline).
 * 
 * Rules:
 * - All Danish numbers are 8 digits
 * - No distinction between mobile and landline in format
 * - Non-digit characters are stripped before validation
 * - Handles international format (+45 prefix)
 * 
 * Note: Denmark does not use area codes, and mobile/landline cannot
 * be distinguished by prefix alone in modern numbering.
 * 
 * Common patterns:
 * - Mobile often starts with 2, 3, 4, 5, 6, 7, 8, 9
 * - Landline historically started with specific prefixes but now mixed
 * 
 * @example
 * validateDK("12 34 56 78") // true
 * validateDK("98 76 54 32") // true
 * validateDK("+45 12 34 56 78") // true (international)
 */
export const validateDK: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+45)
  if (digits.startsWith("45") && digits.length > 8) {
    digits = digits.slice(2);
  }
  
  // Must be exactly 8 digits
  return /^\d{8}$/.test(digits);
};

