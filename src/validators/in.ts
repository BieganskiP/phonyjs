import { PhoneValidator } from "../types";

/**
 * Validates Indian phone numbers.
 * 
 * Rules:
 * - Must be 10 digits
 * - Mobile numbers start with 6, 7, 8, or 9
 * - Non-digit characters are stripped before validation
 * - Handles international format (+91 prefix)
 * 
 * @example
 * validateIN("98765 43210") // true
 * validateIN("9876543210") // true
 * validateIN("+91 98765 43210") // true
 * validateIN("88123 45678") // true
 * validateIN("76543 21098") // true
 */
export const validateIN: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+91)
  if (digits.startsWith("91") && digits.length > 10) {
    digits = digits.slice(2);
  }
  
  // Must be 10 digits starting with 6, 7, 8, or 9
  return /^[6-9]\d{9}$/.test(digits);
};

