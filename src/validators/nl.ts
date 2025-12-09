import { PhoneValidator } from "../types";

/**
 * Validates Dutch (Netherlands) phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 06
 * - Landline: 9 digits starting with 01-05 (area codes)
 * - Common area codes: 010 (Rotterdam), 020 (Amsterdam), 030 (Utrecht), 040 (Eindhoven)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+31 prefix)
 * 
 * @example
 * validateNL("06 1234 5678") // true (mobile)
 * validateNL("020 123 4567") // true (landline - Amsterdam)
 * validateNL("010 123 4567") // true (landline - Rotterdam)
 * validateNL("+31 6 1234 5678") // true (international mobile)
 * validateNL("+31 20 123 4567") // true (international landline)
 */
export const validateNL: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+31) and add leading 0
  if (digits.startsWith("31") && digits.length > 9) {
    digits = "0" + digits.slice(2);
  }
  
  // Mobile: 06 + 8 digits
  // Landline: 0[1-5] + 8 digits
  return /^0[1-6]\d{8}$/.test(digits);
};

