import { PhoneValidator } from "../types";

/**
 * Validates Polish phone numbers (mobile and landline).
 * 
 * Rules:
 * - Must contain exactly 9 digits
 * - Mobile numbers start with 4, 5, 6, 7, or 8
 * - Landline numbers start with 1, 2, or 3 (area codes)
 * - Cannot start with 9 (reserved for special services)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+48 prefix)
 * 
 * @example
 * validatePL("500 123 456") // true (mobile)
 * validatePL("123456789") // true (landline - Warsaw area code 12)
 * validatePL("223456789") // true (landline - area code 22)
 * validatePL("+48 700 123 456") // true (mobile, international)
 * validatePL("900 123 456") // false (reserved for special services)
 */
export const validatePL: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+48)
  if (digits.startsWith("48") && digits.length > 9) {
    digits = digits.slice(2);
  }
  
  // Must be 9 digits starting with 1-8 (landline 1-3, mobile 4-8)
  return /^[1-8]\d{8}$/.test(digits);
};
