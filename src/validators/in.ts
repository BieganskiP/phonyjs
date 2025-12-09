import { PhoneValidator } from "../types";

/**
 * Validates Indian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 6, 7, 8, or 9
 * - Landline: 10 digits with area codes (2-4 digits) + subscriber number
 * - Common area codes: 11 (Delhi), 22 (Mumbai), 33 (Kolkata), 44 (Chennai), 80 (Bangalore)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+91 prefix)
 * 
 * @example
 * validateIN("98765 43210") // true (mobile)
 * validateIN("11 2345 6789") // true (landline - Delhi)
 * validateIN("22 1234 5678") // true (landline - Mumbai)
 * validateIN("+91 98765 43210") // true (international mobile)
 * validateIN("+91 11 2345 6789") // true (international landline)
 */
export const validateIN: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+91)
  if (digits.startsWith("91") && digits.length > 10) {
    digits = digits.slice(2);
  }
  
  // Mobile: 10 digits starting with 6-9
  // Landline: 10 digits starting with 1-5 (area code prefixes)
  return /^[1-9]\d{9}$/.test(digits);
};

