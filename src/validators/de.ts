import { PhoneValidator } from "../types";

/**
 * Validates German phone numbers.
 * 
 * Rules:
 * - Mobile numbers: 10-11 digits starting with 15, 16, or 17
 * - Must start with 015, 016, or 017
 * - Non-digit characters are stripped before validation
 * - Handles international format (+49 prefix)
 * 
 * Note: This validator focuses on mobile numbers only.
 * German landlines have variable length area codes (2-5 digits) which are complex to validate.
 * 
 * @example
 * validateDE("0151 12345678") // true (mobile)
 * validateDE("0170 1234567") // true (mobile)
 * validateDE("+49 151 12345678") // true (international)
 * validateDE("0162 12345678") // true (mobile)
 */
export const validateDE: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+49)
  if (digits.startsWith("49") && digits.length > 10) {
    digits = "0" + digits.slice(2);
  }
  
  // Mobile numbers: 01[567]X (10-11 digits total)
  return /^01[567]\d{7,9}$/.test(digits);
};

